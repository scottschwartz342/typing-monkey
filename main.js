let firstTimeRun = true;

function run() {
    console.log("Here we go...");

    const time = getTime();
        if(!time) return;
    console.log(time);

    let currString = "";
    for(let i = 0; i < 3; i++)
    {
        currString = currString + getRandomLetter(26);
    }
    console.log(currString);
}

let getTime = () => {
    const input = document.getElementById("time");
    return input.value;
}

let getRandomLetter = (n) => {return String.fromCharCode(Math.floor(Math.random() * n) + 97)};