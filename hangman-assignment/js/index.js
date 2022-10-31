//  För att toggla SVG:en
document.querySelector("figure").classList.add("scaffold");
document.querySelector("figure").classList.add("head");
document.querySelector("figure").classList.add("body");
document.querySelector("figure").classList.add("arms");
document.querySelector("figure").classList.add("legs");

let words = ["dog", "cat", "duck", "volvo", "horse", "apple", "lizard"];
let rndWord = "";

function guessWord() {
  let rndWord = Math.floor(Math.random() * words.length);
  return;
}

let guessedChars = "";

function controlChars(input) {
  if (guessedChars.length === 0) {
    guessedChars = input;
    document.querySelector(".inputtedChars").innerText = guessedChars;
    console.log(`Längden är ${guessedChars.length}. Så jag körde denna.`);
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
    console.log(`Längden är på gussedChars är nu ${guessedChars.length}`);
  }
}

const button = document.querySelector("#btn");

button.addEventListener("click", () => {
  let userChar = document.getElementById("charInput").value;
  controlChars(userChar);
});

// let userInput = prompt("Gissa på ett ord");

//if (prompt === words) {
//prompt("Du lyckades!");
//} else {
//prompt("fortsätt gissa");
//}
