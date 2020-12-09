const nrcLists = require("../data/nrc-list.json");
const Utils = require("./utils");
const getPattern = require("./nrcPattern");
const detect = require("./detect");
const convertNumbers = require("./convertNumbers");

const nrcTypes = [
  { eng: "N", mm: "နိုင်" },
  { eng: "Naing", mm: "နိုင်" },
  { eng: "P", mm: "ပြု" },
  { eng: "Pyu", mm: "ပြု" },
];

const convert = {
  eng: { from: "eng", to: "mm" },
  mm: { from: "mm", to: "eng" },
};

function autoConvertNrc(nrc) {
  const type = detect(nrc) ? "eng" : "mm";
  const { from, to } = convert[type];

  return _convert(nrc, from, to);
}

function convertNrc(nrc, from = "eng", to = "mm") {
  return _convert(nrc, from, to);
}

function _convert(nrc, from, to) {
  const nrcWithoutSpace = Utils.removeAllSpace(nrc);

  function replacer(_, state, township, nrcType, numbers) {
    state = convertNumbers(state, from, to);
    numbers = convertNumbers(numbers, from, to);
    nrcType = Utils.transform(nrcTypes, nrcType, from, to);
    township = Utils.transform(nrcLists, township, from, to);

    return `${state}/${township}(${nrcType})${numbers}`;
  }

  return nrcWithoutSpace.replace(getPattern(from), replacer);
}

module.exports = {
  autoConvertNrc,
  convertNrc,
};
