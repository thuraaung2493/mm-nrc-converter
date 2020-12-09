const NrcConverter = require("../src/nrcConverter");

describe("NRC Converter", () => {
  describe("convert func", () => {
    it("must convert 'mm-nrc to eng-nrc' or 'eng-nrc to mm-nrc'", () => {
      const engNrc = "8/MaMaNa(N)939433";
      const mmNrc = "၈/မမန(နိုင်)၉၃၉၄၃၃";

      expect(NrcConverter.convertNrc(engNrc, "eng", "mm")).toEqual(mmNrc);
      expect(NrcConverter.convertNrc(engNrc, "eng", "mm")).not.toEqual(engNrc);
      expect(NrcConverter.convertNrc(mmNrc, "mm", "eng")).toEqual(engNrc);
      expect(NrcConverter.convertNrc(mmNrc, "mm", "eng")).not.toEqual(mmNrc);
    });

    it("must auto convert 'mm-nrc to eng-nrc' or 'eng-nrc to mm-nrc'", () => {
      const engNrc = "8/MaMaNa(N)939433";
      const mmNrc = "၈/မမန(နိုင်)၉၃၉၄၃၃";

      expect(NrcConverter.autoConvertNrc(engNrc)).toEqual(mmNrc);
      expect(NrcConverter.autoConvertNrc(engNrc)).not.toEqual(engNrc);
      expect(NrcConverter.autoConvertNrc(mmNrc)).toEqual(engNrc);
      expect(NrcConverter.autoConvertNrc(mmNrc)).not.toEqual(mmNrc);
    });
  });
});
