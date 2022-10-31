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

const button = document.getElementById("btn");
button.addEventListener("click", () => {
  let userChar = document.getElementById("charInput").value;
  document.getElementById("charInput").value = "";

  console.log(userChar);
});

console.log(guessWord());

// let userInput = prompt("Gissa på ett ord");

//if (prompt === words) {
//prompt("Du lyckades!");
//} else {
//prompt("fortsätt gissa");
//}
