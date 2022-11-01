//  För att toggla SVG:en
document.querySelector("figure").classList.add("scaffold");
document.querySelector("figure").classList.add("head");
document.querySelector("figure").classList.add("body");
document.querySelector("figure").classList.add("arms");
document.querySelector("figure").classList.add("legs");

let words = ["dog", "cat", "duck", "volvo", "horse", "apple", "lizard"];
let rndWord = "";
let guessedChars = "";
let showWord = document.querySelector("#hold");
let pickWord = "";
let lastInput = "";
const button = document.querySelector("#btn");

function getWord() {
  let rndWord = Math.floor(Math.random() * words.length);
  pickWord = words[rndWord];
  console.log(pickWord);

  printUnderscores(pickWord);
}

function printUnderscores(pickWord) {
  let underscoreVar = "";
  for (i = 0; i < pickWord.length; i++) {
    underscoreVar += "_";
  }

  document.querySelector(".secretWord").innerText = underscoreVar;
}

function controlChars(input) {
  lastInput = input;
  if (guessedChars.length === 0) {
    guessedChars = input;
    swtichLetter();
    document.querySelector(".inputtedChars").innerText = guessedChars;
  } else {
    for (i = 0; i < guessedChars.length; i++) {
      if (guessedChars[i] === input) {
        return alert("Letter already chosen! Try a different one!");
      }
    }
    guessedChars += input;
    input = "";
    document.querySelector(".inputtedChars").innerText = guessedChars;
    document.querySelector("#charInput").value = "";
  }
}

function swtichLetter() {
  let switchVar = "";
  let tmpArray = [];
  for (i = 0; i < pickWord.length; i++) {
    if (lastInput === pickWord[i]) {
      switchVar = document.querySelector(".secretWord").innerText;
      for (k = 0; k < pickWord.length; k++) {
        tmpArray[k] = switchVar[k];
        tmpArray[i] = switchVar[i];
      }

      console.log(tmpArray, tmpArray[i], switchVar[i]);
    }
  }
}

var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

button.addEventListener("click", () => {
  let userChar = document.getElementById("charInput").value;
  controlChars(userChar);
});

getWord();
