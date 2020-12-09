function transform(source, value, from, to) {
  const find = source.find((s) => s[from] == value);
  return find ? find[to] : value;
}

function removeAllSpace(str) {
  return str.replace(/\s*/g, "");
}

module.exports = {
  transform,
  removeAllSpace,
};
