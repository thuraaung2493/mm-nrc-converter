const getPattern = require("./nrcPattern");
const Utils = require("./utils");

function detect(nrc, type = "eng") {
  return getPattern(type).test(Utils.removeAllSpace(nrc));
}

module.exports = detect;
