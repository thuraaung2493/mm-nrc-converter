const Utils = require("../src/utils");
const data = require("../data/nrc.json");
const townships = data.flatMap(({ townships }) => townships);

describe("Utils functions", () => {
  describe("removeAllSpace func", () => {
    it("must remove all space in a string", () => {
      const str = "12 /  MaMa Na (N ) 0222 00";
      const removeSpaceStr = Utils.removeAllSpace(str);

      expect(removeSpaceStr).toBe("12/MaMaNa(N)022200");
      expect(removeSpaceStr).not.toBe(str);
    });
  });

  describe("transform func", () => {
    it("must transform a value from 'mm to eng' or 'eng to mm'", () => {
      const value = "MaMaNa";
      const transformVal = Utils.transform(townships, value, "en", "mm");

      expect(transformVal).toBe("မမန");
      expect(transformVal).not.toBe("MaMaNa");
    });
  });
});
