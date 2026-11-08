function normalizeLanguage(language) {
  if (language === "eng") return "en";
  if (language === "en" || language === "mm") return language;
  throw new RangeError('Language must be "en", "eng", or "mm".');
}
module.exports = normalizeLanguage;
