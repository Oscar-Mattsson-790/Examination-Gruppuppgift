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

const button = document.querySelector("#btn");
let paragraph = "";

function controlChars(input) {
  if (paragraph.length === 0) {
    document.querySelector(".inputtedChars").innerText = input;
    paragraph = input;
  } else {
    for (i = 0; i < paragraph.length; i++) {
      if (paragraph[i] === input) {
        return;
      } else {
        paragraph += input;
        input = "";
        document.querySelector(".inputtedChars").innerText = paragraph;
        document.querySelector("#charInput").value = "";
      }
    }
  }
}

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
