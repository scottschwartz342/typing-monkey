let getTime = () => {
  const input = document.getElementById("time");
  return input.value;
};

let getRandomLetter = (n) => {
  return String.fromCharCode(Math.floor(Math.random() * n) + 97);
};

async function findWordInDictionary(wordToCheck) {
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
  console.log("Here we go...");

  const time = getTime();
  // if (!time) return;

  let notWord = false;

  while (!notWord) {
    let currWord = "";

    for (let i = 0; i < 3; i++) {
      currWord += getRandomLetter(26);
    }

    notWord = await findWordInDictionary(currWord);
    console.log(currWord);
    console.log(notWord);
  }

  console.log("YOU WIN");
}

run();
