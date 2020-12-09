const NrcConverter = require("./src/nrcConverter");
const Utils = require("./src/utils");
const convertNumbers = require("./src/convertNumbers");
const detect = require("./src/detect");

module.exports = {
  ...NrcConverter,
  ...Utils,
  convertNumbers,
  detect,
};
