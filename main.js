let numberOfLettersTyped = 0;
let numberOfFailedWordsTyped = 0;

let getTime = () => {
  const input = document.getElementById("time");
  return input.value;
};

let getRandomLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

async function getWordData(wordToCheck) {
  try {
    const response = await fetch(
      `https://api.datamuse.com/words?sp=${wordToCheck}*`
    );

    if (!response.ok) {
      throw new Error("Could not find word");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

async function populateFoundWords(time) {
  let startTime = Date.now();

  while (Date.now() - startTime < time * 1000) {
    let currWordIsPrefix = true;
    let currWord = getRandomLetter();
    let lastValidWord = "";

    const wordData = await getWordData(currWord);

    if (wordData.length == 0) {
      // not prefix, not word
    } else if (wordData[1] !== currWord) {
      // prefix, not word
    } else if (wordData.length == 1) {
      // not prefix, word
    } else {
      // prefix, word
    }

    console.log("Looping...");
  }

  console.log("Done looping!");
}

async function run() {
  console.log("Here we go...");

  const time = getTime();
  if (!time) return;

  const foundWords = populateFoundWords(time0);

  console.log(foundWords);
}
