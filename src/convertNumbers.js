const numberLists = require("../data/numbers.json");
const Utils = require("./utils");

function convertNumbers(numbers, from = "eng", to = "mm") {
  return numbers
    .split("")
    .map((s) => Utils.transform(numberLists, s, from, to))
    .join("");
}

module.exports = convertNumbers;
