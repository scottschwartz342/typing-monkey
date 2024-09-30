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

function typeAndFindWords(time) {
  let startTime = Date.now();
  let numOfWordsFound = 0;
  const uniqueWordsFound = new Set();

  console.log("Starting to loop...");

  while (Date.now() - startTime < time * 1000) {
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
        numOfWordsFound++;
        uniqueWordsFound.add(currWord);
        break;
      }

      //prefix and word OR prefix and word
      //either way get another letter and keep looping
      charToAdd = getRandomLetter();
    }
    interpreter.reset();
  }

  console.log("Done looping!");

  return [numOfWordsFound, uniqueWordsFound];
}

function run() {
  const monkey_sure = document.getElementById("monkey_sure");
  const monkey_response = document.getElementById("monkey_response");
  const monkey_output = document.getElementById("monkey_output");
  const submit_button = document.getElementById("submit_button");

  submit_button.classList.toggle("hidden");
  monkey_sure.classList.remove("hidden");
  monkey_response.classList.remove("hidden");
  monkey_output.classList.add("hidden");

  monkey_response.innerHTML = "...";

  setTimeout(processWords, 0);
}

function processWords() {
  const monkey_response = document.getElementById("monkey_response");
  const monkey_output = document.getElementById("monkey_output");

  const time = getTime();
  if (!time) {
    monkey_response.innerHTML = "Please enter a valid time.";
    return;
  }

  const [totalWordsCount, uniqueWordsFound] = typeAndFindWords(time);

  const wordsFoundSorted = new Sorter(uniqueWordsFound);

  console.log(wordsFoundSorted.longestWord);

  submit_button.classList.toggle("hidden");

  monkey_response.innerHTML = `I typed a total of ${totalWordsCount.toLocaleString()} words and ${uniqueWordsFound.size.toLocaleString()} unique words. Here they are:`;

  monkey_output.classList.remove("hidden");

  monkey_output.innerHTML = Array.from(wordsFoundSorted.longestWord).join("\t");
}

window.run = run;
