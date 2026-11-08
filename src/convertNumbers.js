const normalizeLanguage = require("./language");
const digits = { en: "0123456789", mm: "၀၁၂၃၄၅၆၇၈၉" };

function convertNumbers(numbers, from = "eng", to = "mm") {
  if (typeof numbers !== "string") throw new TypeError("Numbers must be a string.");
  const source = digits[normalizeLanguage(from)];
  const target = digits[normalizeLanguage(to)];
  return numbers.replace(/[0-9၀-၉]/g, (digit) => {
    const index = source.indexOf(digit);
    return index === -1 ? digit : target[index];
  });
}

module.exports = convertNumbers;
