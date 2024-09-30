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

      //prefix and word OR prefix and word
      //either way get another letter and keep looping
      charToAdd = getRandomLetter();
    }
    interpreter.reset();
  }

  console.log("Done looping!");

  return foundWords;
}

function run() {
  const monkey_sure = document.getElementById("monkey_sure");
  const monkey_response = document.getElementById("monkey_response");

  monkey_sure.classList.remove("hidden");
  monkey_response.classList.remove("hidden");

  setTimeout(processWords, 0);
}

function processWords() {
  const monkey_response = document.getElementById("monkey_response");

  const time = getTime();
  if (!time) {
    monkey_response.innerHTML = "Please enter a valid time.";
    return;
  }

  const foundWords = populateFoundWords(time);
  const foundWordsSorter = new Sorter(foundWords);

  console.log(foundWordsSorter.arr);
  console.log(foundWordsSorter.shortestWord);
  console.log(foundWordsSorter.longestWord);
  monkey_response.innerHTML = `I typed ${foundWords.length} words. Here they are`;
}

window.run = run;
