import DLBInterpreter from "./DLBInterpreter";

const interpreter = new DLBInterpreter();

let getTime = () => {
  const input = document.getElementById("time");
  return input.value;
};

let getRandomLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

async function populateFoundWords(time) {
  let startTime = Date.now();
  const foundWords = [];

  console.log("Starting to loop...");

  while (Date.now() - startTime < time * 1000) {
    let currWord = getRandomLetter();
    let lastValidWord = "";

    while (true) {
      const wordData = await getWordData(currWord);

      // not prefix, not word
      if (wordData.length == 0) {
        break;
      }

      // just a word, not a prefix
      if (wordData[1] === currWord && wordData.length == 1) {
        foundWords.push(currWord);
        break;
      }

      // prefix, word
      if (wordData[1] === currWord && wordData.length > 1) {
        lastValidWord = currWord;
      }

      //prefix and word OR prefix and word
      //either way get another letter and keep looping
      currWord += getRandomLetter();
    }

    console.log("Looping...");
  }

  console.log("Done looping!");

  return foundWords;
}

async function run() {
  console.log("Here we go...");

  const time = getTime();
  if (!time) return;

  const foundWords = await populateFoundWords(time);

  console.log(foundWords);
}
