const convertNumbers = require("../src/convertNumbers");

describe("Number Converter", () => {
  describe("convert func", () => {
    it("must convert 'mm-numbers to eng-numbers' or 'eng-numbers to mm-numbers'", () => {
      const engNum = "0123456789";
      const mmNum = "၀၁၂၃၄၅၆၇၈၉";

      expect(convertNumbers(engNum, "eng", "mm")).toEqual(mmNum);
      expect(convertNumbers(engNum, "eng", "mm")).not.toEqual(engNum);
      expect(convertNumbers(mmNum, "mm", "eng")).toEqual(engNum);
      expect(convertNumbers(mmNum, "mm", "eng")).not.toEqual(mmNum);
    });
  });
});
