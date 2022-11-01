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

    switchLetter();

    document.querySelector(".inputtedChars").innerText = guessedChars;
  } else {
    for (i = 0; i < guessedChars.length; i++) {
      if (guessedChars[i] === input) {
        return alert("Letter already chosen! Try a different one!");
      }
    }

    switchLetter();

    guessedChars += input;
    input = "";
    document.querySelector(".inputtedChars").innerText = guessedChars;
    document.querySelector("#charInput").value = "";
  }
}

function switchLetter() {
  let switchVar = document.querySelector(".secretWord").innerText;
  let tmpArray = [];

  // Skapar array med underscores
  for (i = 0; i < pickWord.length; i++) {
    tmpArray[i] = switchVar[i];
  }

  // Byter ut bokstäverna i arrayen om användaren gissar rätt
  for (i = 0; i < pickWord.length; i++) {
    if (lastInput === pickWord[i]) {
      tmpArray[i] = pickWord[i];
    }
  }

  // Skapar en ny variabel med bokstäver som bytts ut
  switchVar = "";
  for (i = 0; i < pickWord.length; i++) {
    switchVar += tmpArray[i];
  }

  // Ordet som ska "gissas på" uppdateras på skärmen
  console.log(tmpArray);
  document.querySelector(".secretWord").innerText = switchVar;
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
  document.getElementById("charInput").value = "";
});

getWord();
