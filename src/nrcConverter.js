const { readNrc, formatNrc } = require("./nrc");
const { removeAllSpace } = require("./utils");
const normalizeLanguage = require("./language");

// Compatibility API: keep positional languages, relaxed serial lengths and no-op invalid strings.
function convertNrc(input, from = "eng", to = "mm") {
  const source = normalizeLanguage(from);
  const target = normalizeLanguage(to);
  if (typeof input !== "string") throw new TypeError("NRC must be a string.");
  const result = readNrc(input, false, source);
  return result ? formatNrc(result, target) : removeAllSpace(input);
}

function autoConvertNrc(input) {
  if (typeof input !== "string") throw new TypeError("NRC must be a string.");
  const result = readNrc(input, false);
  return result ? formatNrc(result, result.language === "en" ? "mm" : "en") : removeAllSpace(input);
}

module.exports = { autoConvertNrc, convertNrc };
