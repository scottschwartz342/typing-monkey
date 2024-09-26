// work in progress ignore

import DLBInterpreter from "./DLBInterpreter";

describe("DLBInterpreter", () => {
  let dlb = null;

  beforeEach(() => {
    dlb = new DLBInterpreter();
  });

  test.each([
    ["hel", true],
    ["hello", true],
    ["helpslpslplsp", false],
  ])("%s is word %s", (wordToCheck, expectedIsWord) => {
    expect(dlb.isWord(wordToCheck)).toBe(expectedIsWord);
  });
});
