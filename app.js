// allows game to be played
let estoyJugando = true;

// creates random number
let numeroCorrecto = Math.floor(Math.random() * 100);

// sets number of permitted attempts
let numIntentos = 10;

// displays initial number of attempts left
document.querySelector(".lastResult").textContent = numIntentos;

// selects input field
let inputField = document.querySelector("#guessField");

// selects p element
var pElement = document.querySelector(".lowOrHi");
// adds multiple styles to p element --> Object.assign(toBeStyled.style, styles) <--
var styles = {
  backgroundColor: "purple",
  fontSize: "30px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// creates array of previous guesses
let prevGuesses = [];

// input event listener
inputField.addEventListener("change", (e) => {
  // checks to see if the inputted number is a valid number
  if (/^\d+$/.test(e.target.value) === false) {
    alert("Please enter a valid number");
  }

  // checks inputted number against random number
  if (estoyJugando == true && e.target.value < 101) {
    if (e.target.value == numeroCorrecto) {
      pElement.textContent = "You guessed correctly!";
      estoyJugando = false;
      inputField.disabled = "true";
    } else if (e.target.value < numeroCorrecto) {
      pElement.textContent = "Too Low! Try again!";
      numIntentos--;
    } else if (e.target.value > numeroCorrecto && e.target.value < 101) {
      pElement.textContent = "Too High! Try again!";
      numIntentos--;
    }
    // shows remaining number of tries left
    document.querySelector(".lastResult").textContent = numIntentos;
    // updates array of previous guesses
    prevGuesses.push(e.target.value);
    // removes commas from the array and converts to a string
    document.querySelector(".guesses").textContent = prevGuesses.join(" ");
    // style node with multiple styles --> var styles = backgroundColor: "purple", etc. <--
    Object.assign(pElement.style, styles);
    inputField.value = "";
  }

  // checks inputted number is within possible range
  if (e.target.value > 100) {
    pElement.style = "display: none";
    alert("Please enter a number less than 100!");
  } else if (estoyJugando == false && numIntentos == 0) {
    // ends the game and disables the input when 0 tries left
    inputField.removeEventListener("change", () => {});
    e.target.value = "";
    inputField.disabled = "true";
    pElement.textContent = "Game Over! The number was: " + numeroCorrecto;
  }
});

// submit button checks to see number of tries left and ends the game if so
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault(); // Impedimos que el formulario haga un petición GET
  if (numIntentos < 1) {
    estoyJugando = false;
  }
});
