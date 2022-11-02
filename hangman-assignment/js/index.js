const hangman = ["scaffold", "head", "body", "arms", "legs"];
const button = document.querySelector("#btn");
const totalGuesses = 5;

let words = ["dog", "cat", "duck", "volvo", "horse", "apple", "lizard"];
let rndWord = "";
let guessedChars = "";
let pickWord = "";
let lastInput = "";
let wrongAnswerCount = 0;

// Tar fram slumpat ord från arrayen "words"
function getWord() {
  let rndWord = Math.floor(Math.random() * words.length);
  pickWord = words[rndWord];
  console.log(pickWord);

  printUnderscores(pickWord);
}

// Tar fram antal undersocre per bokstav för ordet
function printUnderscores(pickWord) {
  let underscoreVar = "";
  for (i = 0; i < pickWord.length; i++) {
    underscoreVar += "_";
  }

  document.querySelector(".secretWord").innerText = underscoreVar;
}

// Inmatning av bokstäver
function controlChars(input) {
  input = input.toUpperCase();
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

// Kontrollerar om användaren skrivit in en bokstav som stämmer överens med någon bokstav i det förutbestämda/slumpade ordet. Om så är fallet byts motsvarande underscore ut mot den rätta bokstaven
function switchLetter() {
  let switchVar = document.querySelector(".secretWord").innerText;
  let tmpArray = [];
  let correctAnswerCount = 0;

  // Skapar array med underscores
  for (i = 0; i < pickWord.length; i++) {
    tmpArray[i] = switchVar[i];
  }

  // Byter ut bokstäverna i arrayen om användaren gissar rätt
  for (i = 0; i < pickWord.length; i++) {
    if (lastInput === pickWord[i].toUpperCase()) {
      tmpArray[i] = pickWord[i].toUpperCase();
      correctAnswerCount++;
    }
  }

  /* Om bokstaven användaren skrev in inte stämmer överens med någon av bokstäverna i det slumpade ordet så ritas nästa
     del av "hänggubben" ut och en mätare plussas på för att hålla koll på hur många felgissningar som gjorts */
  if (correctAnswerCount == 0) {
    document.querySelector("figure").classList.add(hangman[wrongAnswerCount]);
    wrongAnswerCount++;
    totalWrongAnswers(wrongAnswerCount);
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

// Om/När användaren klickar på knappen sparas inmatningen i en variabel och skickas vidare för kontroll, samt nollställer värdet i inmatningsfältet
button.addEventListener("click", () => {
  let userChar = document.getElementById("charInput").value;
  controlChars(userChar);
  document.getElementById("charInput").value = "";
});

function totalWrongAnswers(wrongAnswerCount) {
  if (wrongAnswerCount === totalGuesses) {
    button.textContent = "Play Again?";
    console.log("YOU LOSE");
  }
}

getWord();
