const nrc = require("..");
const data = require("../data/nrc.json");

describe("public NRC API", () => {
  const english = "12/LaMaNa(N)001234";
  const myanmar = "၁၂/လမန(နိုင်)၀၀၁၂၃၄";

  it("detects input and converts to an explicit language, preserving leading zeroes", () => {
    expect(nrc.toEnglish(" ၁၂ / လမန (နိုင်) ၀၀၁၂၃၄ ")).toBe(english);
    expect(nrc.toMyanmar("12/lamana(naing)001234")).toBe(myanmar);
    expect(nrc.convert(myanmar)).toBe(english);
    expect(nrc.convert(english, "mm")).toBe(myanmar);
    expect(nrc.convert(myanmar, "eng")).toBe(english);
    expect(nrc.toEnglish(english)).toBe(english);
    expect(nrc.toMyanmar(myanmar)).toBe(myanmar);
    expect(nrc.toEnglish("၁၂/လမန(နိုင်)001234")).toBe(english);
  });

  it("parses components into English and identifies the input language", () => {
    expect(nrc.parse(myanmar)).toEqual({ state: "12", township: "LaMaNa", type: "N", number: "001234", language: "mm" });
    expect(nrc.parse(english).language).toBe("en");
    expect(nrc.toEnglish("၁၂/လမန(ပြု)၀၀၁၂၃၄")).toBe("12/LaMaNa(P)001234");
    expect(nrc.toMyanmar("12/LaMaNa(pyu)001234")).toBe("၁၂/လမန(ပြု)၀၀၁၂၃၄");
  });

  it.each([
    "", "prefix12/LaMaNa(N)001234", "12/LaMaNa(N)001234suffix",
    "12/LaMaNa(N)12345", "12/LaMaNa(N)1234567", "12/LaMaNa(X)001234",
    "1/LaMaNa(N)001234", "15/LaMaNa(N)001234", "012/LaMaNa(N)001234",
    "12/Unknown(N)001234", "12/LaMaNa(N)00123412/LaMaNa(N)001234",
    "12/LaMaNa(N)၀၀၁၂၃၄", "၁၂/လမန(နိုင်)၀၀၁၂၃x",
  ])("rejects invalid input: %s", (value) => {
    expect(nrc.isValid(value)).toBe(false);
    expect(nrc.parse(value)).toBeNull();
    expect(() => nrc.toEnglish(value)).toThrow(RangeError);
  });

  it.each([null, undefined, 123456, {}, []])("handles non-string values: %p", (value) => {
    expect(nrc.isValid(value)).toBe(false);
    expect(nrc.parse(value)).toBeNull();
    expect(nrc.detect(value)).toBe(false);
    expect(() => nrc.toMyanmar(value)).toThrow(TypeError);
  });

  it("rejects unsupported language arguments consistently", () => {
    expect(() => nrc.convert(english, "fr")).toThrow(RangeError);
    expect(() => nrc.getTownships(12, "fr")).toThrow(RangeError);
    expect(() => nrc.convertNumbers("123", "fr", "mm")).toThrow(RangeError);
    expect(() => nrc.convertNumbers("123", "en", "fr")).toThrow(RangeError);
    expect(() => nrc.detect(english, "fr")).toThrow(RangeError);
  });

  it("returns independent township lists in both languages", () => {
    expect(nrc.getTownships(12)).toContain("LaYaRa");
    expect(nrc.getTownships("၁၂", "mm")).toContain("လယရ");
    expect(nrc.getTownships("12", "eng")).toEqual(nrc.getTownships(12));
    expect(nrc.getTownships(9)).toEqual(expect.arrayContaining(["UTaTha", "MaNaMa"]));
    expect(nrc.getTownships(99)).toEqual([]);
    const townships = nrc.getTownships(12);
    townships.length = 0;
    expect(nrc.getTownships(12).length).toBeGreaterThan(0);
  });

  it("uses the source corrections and supports independent Myanmar vowels", () => {
    expect(nrc.toEnglish("၁/ခဖန(နိုင်)၁၂၃၄၅၆")).toBe("1/KhaHpaNa(N)123456");
    expect(nrc.toEnglish("၆/ရဖန(နိုင်)၁၂၃၄၅၆")).toBe("6/RaHpaNa(N)123456");
    expect(nrc.toMyanmar("9/ZaBaTha(N)123456")).toBe("၉/ဇဗသ(နိုင်)၁၂၃၄၅၆");
    expect(nrc.toMyanmar("10/ThaHpaRa(N)123456")).toBe("၁၀/သဖရ(နိုင်)၁၂၃၄၅၆");
    expect(nrc.isValid("၁၂/ဥကမ(နိုင်)၁၂၃၄၅၆")).toBe(true);
    expect(nrc.isValid("၁၂/ဥကတ(နိုင်)၁၂၃၄၅၆")).toBe(true);
  });

  it.each(data)("round-trips every township in state $state", ({ state, townships }) => {
    for (const township of townships) {
      for (const type of ["N", "P"]) {
        const englishNrc = `${state}/${township.en}(${type})000001`;
        const myanmarNrc = nrc.toMyanmar(englishNrc);
        expect(nrc.isValid(myanmarNrc)).toBe(true);
        expect(nrc.toEnglish(myanmarNrc)).toBe(englishNrc);
        expect(nrc.parse(myanmarNrc).township).toBe(township.en);
      }
    }
  });
});

describe("legacy API compatibility and corrections", () => {
  it("retains the original exports and default conversion direction", () => {
    expect(nrc.convertNrc("8/MaMaNa(N)939433")).toBe("၈/မမန(နိုင်)၉၃၉၄၃၃");
    expect(nrc.autoConvertNrc("၈/မမန(နိုင်)၉၃၉၄၃၃")).toBe("8/MaMaNa(N)939433");
    expect(nrc.convertNrc("8/MaMaNa(N)1")).toBe("၈/မမန(နိုင်)၁");
    expect(nrc.convertNumbers("001234")).toBe("၀၀၁၂၃၄");
    expect(nrc.convertNumbers("ID ၀၀၁၂၃၄", "mm", "en")).toBe("ID 001234");
    expect(nrc.removeAllSpace(" a b ")).toBe("ab");
    expect(nrc.transform([{ en: "N", mm: "နိုင်" }], "N", "en", "mm")).toBe("နိုင်");
  });

  it("returns invalid strings without whitespace without partially converting", () => {
    expect(nrc.convertNrc(" 1/LaMaNa(N)123456 ")).toBe("1/LaMaNa(N)123456");
    expect(nrc.autoConvertNrc(" invalid input ")).toBe("invalidinput");
    expect(nrc.convertNrc("prefix8/MaMaNa(N)123456")).toBe("prefix8/MaMaNa(N)123456");
  });

  it("checks whole strings and is deterministic across repeated detect calls", () => {
    for (let index = 0; index < 5; index++) {
      expect(nrc.detect("12/LaMaNa(N)001234")).toBe(true);
      expect(nrc.detect("၁၂/လမန(နိုင်)၀၀၁၂၃၄", "mm")).toBe(true);
    }
    expect(nrc.detect("prefix12/LaMaNa(N)001234")).toBe(false);
    expect(nrc.detect("12/LaMaNa(N)001234suffix")).toBe(false);
    expect(nrc.detect("12/LaMaNa(X)001234")).toBe(false);
    expect(nrc.detect("1/LaMaNa(N)1")).toBe(true);
    expect(nrc.isValid("1/LaMaNa(N)1")).toBe(false);
  });
});
