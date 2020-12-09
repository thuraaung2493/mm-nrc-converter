const detect = require("../src/detect");

describe("Detect MM-NRC or Eng-NRC", () => {
  describe("detect func", () => {
    it("must remove all space in a string", () => {
      const engNrc = "12/MaMaNa(N)022200";
      const mmNrc = "၈/မမန(နိုင်)၃၄၉၃၀၃";

      expect(detect(engNrc, "eng")).toBeTruthy();
      expect(detect(mmNrc, "eng")).toBeFalsy();
      expect(detect(mmNrc, "mm")).toBeTruthy();
      expect(detect(engNrc, "mm")).toBeFalsy();
    });
  });
});
