const data = require("../data/nrc.json");
const normalizeLanguage = require("./language");
const convertNumbers = require("./convertNumbers");

const townshipsByState = new Map(data.map(({ state, townships }) => {
  const codes = new Map();
  for (const township of townships) {
    codes.set(township.en.toLowerCase(), township);
    codes.set(township.mm, township);
  }
  return [state, codes];
}));

function findTownship(state, code) {
  return townshipsByState.get(state)?.get(code.toLowerCase());
}

function getTownships(state, language = "en") {
  const locale = normalizeLanguage(language);
  const stateCode = convertNumbers(String(state), "mm", "en");
  const group = data.find((group) => group.state === stateCode);
  return group ? group.townships.map((township) => township[locale]) : [];
}
module.exports = { findTownship, getTownships };
