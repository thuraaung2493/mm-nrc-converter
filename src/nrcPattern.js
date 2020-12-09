const pattern = {
  mm: /([၀-၉]+)\/([က-အ]+)\((ပြု|နိုင်)\)([၀-၉]+|[0-9]+)/g,
  eng: /(\d+)\/(\w+)\((\w+)\)(\d+)/g,
};

function getPattern(type) {
  return pattern[type];
}

module.exports = getPattern;
