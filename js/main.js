import DLBInterpreter from "./DLBInterpreter.js";
import Sorter from "./Sorter.js";

const interpreter = new DLBInterpreter();
let everyLetterAttempted = "";

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

  while (Date.now() - startTime < time * 1000) {
    // for (let i = 0; i < 10000; i++) {
    let charToAdd = getRandomLetter();
    let currWord = "";
    let lastValidWord = "";

    while (true) {
      interpreter.addChar(charToAdd);
      currWord += charToAdd;
      everyLetterAttempted += charToAdd;

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
    console.log(`remaining time: ${Date.now() - startTime}`);
    console.log("Looping...");
  }

  console.log("Done looping!");

  return foundWords;
}

// function run() {
//   const element = document.getElementById("monkey_sure");
//   element.classList.remove("hidden");

//   const time = getTime();
//   if (!time) return;

//   const foundWords = populateFoundWords(time);
//   const foundWordsSorter = new Sorter(foundWords);

//   console.log(foundWordsSorter.arr);
//   console.log(foundWordsSorter.shortestWord);
//   console.log(foundWordsSorter.longestWord);
// }

function run() {
  const element = document.getElementById("monkey_sure");
  element.classList.remove("hidden");

  setTimeout(processWords, 0);
}

function processWords() {
  const time = getTime();
  if (!time) return;

  const foundWords = populateFoundWords(time);
  const foundWordsSorter = new Sorter(foundWords);

  console.log(foundWordsSorter.arr);
  console.log(foundWordsSorter.shortestWord);
  console.log(foundWordsSorter.longestWord);
}

window.run = run;
