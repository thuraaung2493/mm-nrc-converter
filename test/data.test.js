const data = require("../data/nrc.json");

it("contains all states and township entries without duplicate codes within a state", () => {
  expect(data).toHaveLength(14);
  expect(data.flatMap(({ townships }) => townships)).toHaveLength(429);
  expect(data.map(({ state }) => state)).toEqual(Array.from({ length: 14 }, (_, index) => String(index + 1)));
  for (const { townships } of data) {
    expect(new Set(townships.map(({ en }) => en.toLowerCase())).size).toBe(townships.length);
    expect(new Set(townships.map(({ mm }) => mm)).size).toBe(townships.length);
  }
});
