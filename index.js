const NrcConverter = require("./src/nrcConverter");
const Utils = require("./src/utils");
const convertNumbers = require("./src/convertNumbers");
const detect = require("./src/detect");
const { convert, toEnglish, toMyanmar, parse, isValid } = require("./src/nrc");
const { getTownships } = require("./src/data");

module.exports = {
  convert,
  toEnglish,
  toMyanmar,
  parse,
  isValid,
  getTownships,
  ...NrcConverter,
  ...Utils,
  convertNumbers,
  detect,
};
