import DLBInterpreter from "./DLBInterpreter.js";

const interpreter = new DLBInterpreter();

let getTime = () => {
  const input = document.getElementById("time");
  return input.value;
};

let getRandomLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function populateFoundWords(time) {
  let startTime = Date.now();
  const foundWords = [];

  console.log("Starting to loop...");

  // while (Date.now() - startTime < time * 1000) {
  for (let i = 0; i < 10000; i++) {
    let charToAdd = getRandomLetter();
    let currWord = "";
    let lastValidWord = "";

    while (true) {
      interpreter.addChar(charToAdd);
      currWord += charToAdd;

      let isPrefixIsWordResult = interpreter.isPrefixIsWord();

      // not prefix, not word
      if (isPrefixIsWordResult === 0) {
        break;
      }

      // just a word, not a prefix
      if (isPrefixIsWordResult === 1) {
        foundWords.push(currWord);
        break;
      }

      // prefix, word
      if (isPrefixIsWordResult === 3) {
        lastValidWord = currWord;
      }

      //prefix and word OR prefix and word
      //either way get another letter and keep looping
      charToAdd = getRandomLetter();
    }
    interpreter.reset();
    console.log("Looping...");
  }

  console.log("Done looping!");

  return foundWords;
}

export function run() {
  console.log("Here we go...");

  const time = getTime();
  if (!time) return;

  const foundWords = populateFoundWords(time);

  console.log(foundWords);
}

window.run = run;
