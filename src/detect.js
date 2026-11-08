const getPattern = require("./nrcPattern");
const Utils = require("./utils");

function detect(nrc, type = "eng") {
  const pattern = getPattern(type);
  return typeof nrc === "string" && pattern.test(Utils.removeAllSpace(nrc));
}

module.exports = detect;
