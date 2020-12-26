console.log("Tests start -----------------------");

// Here follow some tests to verify that the algorithm works correctly.

// 1. Test algorithm of the conversion (function romanize)
//    most common cases: units, tens and hundreds
function testRomanize() {
  let result = [];

  result.push(romanize(0) === "");
  result.push(romanize(3999) === "MMMCMXCIX");

  result.push(romanize(4) === "IV");
  // ...all units
  result.push(romanize(6) === "VI");
  result.push(romanize(30) === "XXX");
  // ...all tens
  result.push(romanize(50) === "L");
  // ...all hundreds
  result.push(romanize(100) === "C");

  // make result readable
  const readableResult = result.map((e) => (e ? "." : "F")).join("");

  // console.log(result);
  console.log(
    "testRomanize result",
    result.every((e) => e === true),
    readableResult
  );
}
testRomanize(); // run the test

// 2. Test the messages are correct:
// 2a. "Correct" if the answer is correct.
// 2b. "Wrong" if the answer is incorrect.
function runGameEngine(romanNumber, msg) {
  // run the game engine with romanNumber return true if the shown message is msg

  currentNumber = 4; // change the global currentNumber
  gameEngine(romanNumber);

  // return true if the message is the expected one
  return document.getElementById("message").innerHTML === msg;
}

function testAnswerGameEngine() {
  // e.g. in case we wanted to test the UI
  // numberToTest = 4;
  // // get the value from the user input
  // var inputElement = document.getElementById('number');
  // inputElement.value = numberToTest;

  let result = [];

  let correctRomanNumber = "IV";
  let wrongRomanNumber = "X";
  resetCounters();
  result.push(runGameEngine(correctRomanNumber, MSG_CORRECT));
  resetCounters();
  result.push(runGameEngine(wrongRomanNumber, MSG_WRONG));

  // make result readable
  const readableResult = result.map((e) => (e ? "." : "F")).join("");

  // console.log(result);
  console.log(
    "testAnswerGameEngine result",
    result.every((e) => e === true),
    readableResult
  );
}
testAnswerGameEngine();

// 3. Test the game engine:
// 3a. with 3 mistakes the game is over.
// 3b. with 10 rounds the game is completed.
function testFinishGame() {
  // e.g. in case we wanted to test the UI
  // numberToTest = 4;
  // // get the value from the user input
  // var inputElement = document.getElementById('number');
  // inputElement.value = numberToTest;

  let result = [];

  let correctRomanNumber = "IV";
  let wrongRomanNumber = "X";
  let lastResult = false;

  // x3 mistakes
  resetCounters();
  for (var round = 0; round < MAX_MISTAKES; round++) {
    lastResult = runGameEngine(wrongRomanNumber, MSG_GAMEOVER);
  }
  result.push(lastResult);

  // x10 correct get_win_msg(10)
  resetCounters();
  const win_msg = get_win_msg(MAX_GUESSES);
  for (var round = 0; round < MAX_GUESSES; round++) {
    lastResult = runGameEngine(correctRomanNumber, win_msg);
  }
  result.push(lastResult);

  // make result readable
  const readableResult = result.map((e) => (e ? "." : "F")).join("");

  // console.log(result);
  console.log(
    "testFinishGame result",
    result.every((e) => e === true),
    readableResult
  );
}
testFinishGame();

// 4. Test the function restartGame,
//    the counters must be reset to zero, and there is message.
function testRestartGame() {
  let result = [];

  const oldCurrentNumber = currentNumber; // save currentNumber
  // global counters, set them to 3
  totalGuesses = 3;
  totalMistakes = 3;

  restartGame();

  result.push(oldCurrentNumber !== currentNumber);
  result.push(totalGuesses === 0);
  result.push(totalMistakes === 0);
  result.push(document.getElementById("message").innerHTML === "");

  // make result readable
  const readableResult = result.map((e) => (e ? "." : "F")).join("");

  // console.log(result);
  console.log(
    "testRestartGame result",
    result.every((e) => e === true),
    readableResult
  );
}
testRestartGame();

console.log("Tests done! -----------------------");
