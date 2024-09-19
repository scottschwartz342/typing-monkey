let getTime = () => {
  const input = document.getElementById("time");
  return input.value;
};

let getRandomLetter = (n) => {
  return String.fromCharCode(Math.floor(Math.random() * n) + 97);
};

async function getPossibleWords(wordToCheck) {
  try {
    const response = await fetch(
      `https://api.datamuse.com/words?sp=${wordToCheck}*`
    );

    if (!response.ok) {
      throw new Error("Could not find word");
    }

    const data = await response.json();

    return data.length;
  } catch (error) {
    return 0;
  }
}

async function isWordInDictionary(wordToCheck) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`
    );

    if (!response.ok) {
      throw new Error("Could not find word");
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function run() {
  const foundWords = [];
  console.log("Here we go...");

  const time = getTime();
  if (!time) return;

  let currentPossibleWords = 1;

  let currWord = "";
  let prevWord = "";

  while (currentPossibleWords > 0) {
    prevWord = currWord;
    currWord += getRandomLetter(26);

    currentPossibleWords = await getPossibleWords(currWord);
  }

  console.log(prevWord);
  const isWord = await isWordInDictionary(prevWord);
  if (isWord) {
    foundWords.push(prevWord);
  }

  console.log(foundWords);
}
