const numberLists = require("./data/numbers.json");
const nrcLists = require("./data/nrc-list.json");
const nrcTypes = [
  { eng: "N", mm: "နိုင်" },
  { eng: "Naing", mm: "နိုင်" },
  { eng: "P", mm: "ပြု" },
  { eng: "Pyu", mm: "ပြု" },
];

function convertNrc(nrc, from = "eng", to = "mm") {
  const pattern = {
    mm: /([၀-၉]+)\/([က-အ]+)\((ပြု|နိုင်)\)([၀-၉]+|[0-9]+)/g,
    eng: /(\d+)\/(\w+)\((\w+)\)(\d+)/g,
  };

  const nrcWithoutSpace = nrc.replace(/\s*/g, "");

  function replacer(_, state, township, nrcType, numbers) {
    state = converNumbers(state, from, to);
    numbers = converNumbers(numbers, from, to);
    nrcType = transform(nrcTypes, nrcType, from, to);
    township = transform(nrcLists, township, from, to);

    return `${state}/${township}(${nrcType})${numbers}`;
  }

  return nrcWithoutSpace.replace(pattern[from], replacer);
}

function converNumbers(numbers, from, to) {
  return numbers
    .split("")
    .map((s) => transform(numberLists, s, from, to))
    .join("");
}

function transform(source, value, from, to) {
  const find = source.find((s) => s[from] == value);
  return find ? find[to] : value;
}

module.exports = {
  convertNrc,
  converNumbers,
  transform,
};
