// add rand int generator

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// convert the random normal number to the roman one
function romanize(normalNumber) {
  if (isNaN(normalNumber)) return NaN;
  // number as list of digits
  var digits = String(+normalNumber).split("");
  // lookup table
  var key = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  // output string of the roman number
  var roman = "";
  // units, tens, hundreds
  for (var i = 2; i >= 0; i--) {
    roman = (key[+digits.pop() + i * 10] || "") + roman;
  }
  // add the thousands to the left (max allowed number is 3999) and return
  return Array(+digits.join("") + 1).join("M") + roman;
}

// add number to convert generator and show

// global number to be converted by the user
var currentNumber = 0;

// this function updates and visualize the current number to convert
function updateCurrentNumber() {
  // update the global current random number with a new one
  // Roman numerals go from 1 to 3999
  currentNumber = getRandomInt(1, 3999);

  // show the number on the page
  document.getElementById("rand").innerHTML = currentNumber;
}

// init and show the number for the user
updateCurrentNumber();

//  add counters and reset function

// global counters, init to 0
var totalGuesses = 0;
var totalMistakes = 0;

// reset all counters (new game)
function resetCounters() {
  totalGuesses = 0;
  totalMistakes = 0;
}

// add main game engine

//function to show a message
function showMessage(msg) {
  document.getElementById("message").innerHTML = msg;
}

// function to compare the guess to the roman numeral of the random n,
// generate the messages
function elaborator() {
  // get the value from the user input
  var inputElement = document.getElementById("number");
  var userGuess = inputElement.value;
  // empty the value of user (not needed)
  inputElement.value = "";
  // call the game engine to check the input number
  gameEngine(userGuess);
}

var MSG_CORRECT = "Correct";
var MSG_WRONG = "Wrong!";
var MSG_GAMEOVER = "Game Over";
var MAX_MISTAKES = 3;
var MAX_GUESSES = 10;

function get_win_msg(totalCorrectAnswers) {
  return (
    "Congratulations, you win with " + totalCorrectAnswers + " correct answers!"
  );
}

function gameEngine(userGuess) {
  // userGuess is a roman number

  // the random number is converted to roman numeral
  var romNum = romanize(currentNumber);

  //comparison between the current n in roman numeral and the user guess
  var msg = "";
  if (userGuess === romNum) {
    msg = MSG_CORRECT;
  } else {
    msg = MSG_WRONG;
    totalMistakes++;
  }

  showMessage(msg);

  totalGuesses++;

  if (totalMistakes === MAX_MISTAKES) {
    var msg = MSG_GAMEOVER;
    showMessage(msg);
    // reset counters
    resetCounters();
  } else if (totalGuesses === MAX_GUESSES) {
    // show number of correct answers, together with the congratulations
    var totalCorrectAnswers = totalGuesses - totalMistakes;
    var msg = get_win_msg(totalCorrectAnswers);
    showMessage(msg);
    // reset counters
    resetCounters();
  }

  // generate a new random number and show it to the user
  updateCurrentNumber();
}

// add restart game function

// restart game
function restartGame() {
  resetCounters();
  // empty message
  showMessage("");
  // generate a new random number and show it to the user
  updateCurrentNumber();
}

// uncomment this to run tests
// const script = document.createElement("script");
// script.src = "denkwerkTest.js"; // URL
// script.id = "denkwerkTest";
// document.body.appendChild(script);
