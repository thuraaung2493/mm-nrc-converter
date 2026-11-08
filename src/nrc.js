const getPattern = require("./nrcPattern");
const convertNumbers = require("./convertNumbers");
const normalizeLanguage = require("./language");
const { removeAllSpace } = require("./utils");
const { findTownship } = require("./data");

const types = {
  n: { en: "N", mm: "နိုင်" },
  naing: { en: "N", mm: "နိုင်" },
  "နိုင်": { en: "N", mm: "နိုင်" },
  p: { en: "P", mm: "ပြု" },
  pyu: { en: "P", mm: "ပြု" },
  "ပြု": { en: "P", mm: "ပြု" },
};

// One parser drives conversion and validation. Legacy wrappers relax the serial length.
function readNrc(input, strict = true, from) {
  if (typeof input !== "string") return null;
  const value = removeAllSpace(input);
  const languages = from ? [normalizeLanguage(from)] : ["en", "mm"];
  for (const language of languages) {
    const match = getPattern(language).exec(value);
    if (!match) continue;
    const state = convertNumbers(match[1], "mm", "en");
    const township = findTownship(state, match[2]);
    const type = types[match[3].toLowerCase()];
    const number = convertNumbers(match[4], "mm", "en");
    if (!township || !type || (strict && number.length !== 6)) return null;
    return { state, township, type, number, language };
  }
  return null;
}

function parse(input) {
  const result = readNrc(input);
  if (!result) return null;
  return {
    state: result.state,
    township: result.township.en,
    type: result.type.en,
    number: result.number,
    language: result.language,
  };
}

function formatNrc(result, to) {
  const language = normalizeLanguage(to);
  const state = convertNumbers(result.state, "en", language);
  const number = convertNumbers(result.number, "en", language);
  return `${state}/${result.township[language]}(${result.type[language]})${number}`;
}

function convert(input, to = "en") {
  const language = normalizeLanguage(to);
  if (typeof input !== "string") throw new TypeError("NRC must be a string.");
  const result = readNrc(input);
  if (!result) throw new RangeError("Invalid NRC: expected a known state/township, N or P type, and six-digit number.");
  return formatNrc(result, language);
}

function toEnglish(input) { return convert(input, "en"); }
function toMyanmar(input) { return convert(input, "mm"); }
function isValid(input) { return readNrc(input) !== null; }

module.exports = { convert, toEnglish, toMyanmar, parse, isValid, readNrc, formatNrc };
