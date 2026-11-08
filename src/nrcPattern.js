const normalizeLanguage = require("./language");
const pattern = {
  mm: /^([၀-၉]+)\/([\u1000-\u102a\u103f]+)\((ပြု|နိုင်)\)([၀-၉0-9]+)$/,
  en: /^(\d+)\/([a-z]+)\((N|Naing|P|Pyu)\)(\d+)$/i,
};

function getPattern(type) {
  return pattern[normalizeLanguage(type)];
}

module.exports = getPattern;
