const hangman = ["scaffold", "head", "body", "arms", "legs"];
const button = document.querySelector("#btn");
const charInput = document.querySelector("#charInput");
const totalGuesses = 5;
const words = [
  "wolverine",
  "characteristic",
  "barcelona",
  "billionaire",
  "gladiator",
  "thirsty",
  "lizardman",
  "deathproof",
  "adventure",
  "javascript",
];
const alphabet = "abcdefghijklmnopqrstuvwxyz";

let rndWord = "";
let guessedChars = "";
let pickWord = "";
let lastInput = "";
let wrongAnswerCount = 0;
let correctAnswerCount = 0;
let switchVar = "";
let userLost = 0;
let seconds = 0;

// Tar fram slumpat ord från arrayen "words"
function getWord() {
  let rndWord = Math.floor(Math.random() * words.length);
  pickWord = words[rndWord];
  console.log(pickWord);

  printUnderscores(pickWord);
}

getWord();

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

    if (userLost === 0) {
      document.querySelector(".inputtedChars").innerText = guessedChars;
    }
  } else {
    for (i = 0; i < guessedChars.length; i++) {
      if (guessedChars[i] === input) {
        return alert(
          "This letter has already been chosen! Pick a different one!"
        );
      }
    }

    switchLetter();

    if (userLost === 0) {
      guessedChars += input;
      input = "";
      document.querySelector(".inputtedChars").innerText = guessedChars;
      document.querySelector("#charInput").value = "";
    }
  }
  didUserWin();
  totalWrongAnswers();
}

// Kontrollera bokstav på "on keyup"
charInput.addEventListener("keyup", (input) => {
  const letter = input.key.toLowerCase();
  if (alphabet.includes(letter)) {
    controlChars(input.key);
  }
});

// Kontrollerar om användaren skrivit in en bokstav som stämmer överens med någon bokstav i det förutbestämda/slumpade ordet. Om så är fallet byts motsvarande underscore ut mot den rätta bokstaven
function switchLetter() {
  let tmpArray = [];
  correctAnswerCount = 0;

  switchVar = document.querySelector(".secretWord").innerText;

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
  if (correctAnswerCount === 0) {
    document.querySelector("figure").classList.add(hangman[wrongAnswerCount]);
    wrongAnswerCount++;
    totalWrongAnswers(wrongAnswerCount);
  }

  // Så länge användaren INTE gissat fel fem gånger (totalGuesses) så...
  if (wrongAnswerCount !== totalGuesses) {
    // Skapar en ny variabel med bokstäver som bytts ut
    switchVar = "";
    for (i = 0; i < pickWord.length; i++) {
      switchVar += tmpArray[i];
    }

    // Ordet som ska "gissas på" uppdateras på skärmen
    document.querySelector(".secretWord").innerText = switchVar;
  }
}

// Om/När användaren klickar på knappen...
button.addEventListener("click", () => {
  let whatButton = document.querySelector("#btn").innerText;

  // ...sparas inmatningen i en variabel och skickas vidare för kontroll, samt nollställer värdet i inmatningsfältet
  if (whatButton.includes("Win")) {
    let userChar = document.querySelector("#charInput").value;
    controlChars(userChar);
    document.querySelector("#charInput").value = "";

    didUserWin();

    // ...återställs sidan och användaren får spela igen
  } else {
    button.textContent = "Win or Die";
    location.reload();
  }
});

// Kontrollerar om användaren förbrukat sina gissningar eller inte. Har användaren det får han/hon möjligheten att spela igen
function totalWrongAnswers(wrongAnswerCount) {
  if (wrongAnswerCount === totalGuesses) {
    const para = document.createElement("p");
    const body = document.querySelector("body");

    clearInterval(countdownTimeout);

    body.style.background = "linear-gradient(black, white)";
    para.innerText = "YOU DIED!";
    document.querySelector(".winOrDie").appendChild(para);
    document.querySelector(".secretWord").innerText = pickWord;
    document.querySelector(".usedLetters").innerText =
      "The correct answer was:";
    userLost = 1;
    button.textContent = "Play Again";
  }
}

// Kontrollerar om användaren gissat alla rätt. Har användaren det visas det på skärmen för användaren och han/hon får möjligheten att spela igen
function didUserWin() {
  if (!switchVar.includes("_")) {
    const para = document.createElement("p");
    const body = document.querySelector("body");

    clearInterval(countdownTimeout);

    para.innerText = "YOU WON!";
    document.querySelector(".winOrDie").appendChild(para);
    document.querySelector(".secretWord").innerText = pickWord;
    body.style.background = "linear-gradient(green, white)";
    button.textContent = "Play Again";
  }
}

/* Startar nedräkningen, d.v.s. tiden användaren har på sig att gissa.
   Går tiden ut förlorar man */
function countdown() {
  seconds = 60;
  countdownTimeout = setInterval(tick, 1000);
  function tick() {
    let counter = document.getElementById("timer");
    seconds--;
    counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + seconds;
    if (seconds > 0) {
      countdownTimeout;
    } else {
      clearInterval(countdownTimeout);
      wrongAnswerCount = totalGuesses;
      totalWrongAnswers(wrongAnswerCount);
    }
  }
  tick();
}
countdown();
