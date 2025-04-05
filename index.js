document.addEventListener("DOMContentLoaded", () => {

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); // Used querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // Used querySelector() to get the timer element.
const difficultySelect = document.querySelector('#difficulty-select'); //added for ability to select difficulty

localStorage.removeItem("whackHighScore"); //resets the highscore on page refresh 

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "easy";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hole = randomInteger(0, 8);
/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {

  let delay;

  if (difficulty === "easy") {
    delay = 1500;
  } else if (difficulty === "normal") { 
    delay = 1000;
  } else if (difficulty === "hard") {
    delay = randomInteger(600, 1200);
  } else {
    console.log("Select difficulty");
    delay = 1000;
  } 
  return delay;
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  const index = randomInteger(0, holes.length -1);
  const hole = holes[index];

    if (hole === lastHole) {
      return chooseHole(holes);
    }
  
  lastHole = hole;
  return hole;
}

/**
* Calls the showUp function if time > 0 and stops the game if time = 0.
*/
function gameOver() {
  if (time > 0) {
    const timeoutId = showUp();
    return timeoutId;
  } else {
    const gameStopped = stopGame();
    return gameStopped;
  }
}

/**
* Calls the showAndHide() function with a specific delay and a hole.
*/
function showUp() {
  const delay = setDelay(difficulty); 
  const hole = chooseHole(holes);  

  if (!hole) return;

  return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. 
*/
function showAndHide(hole, delay){
  // call the toggleVisibility function so that it adds the 'show' class.
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    // call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    toggleVisibility(hole);
    gameOver();
  }, delay); // change the setTimeout delay to the one provided as a parameter
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  // hole.classList.toggle so that it adds or removes the 'show' class.
  hole.classList.toggle("show");

  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
*
*/
function updateScore() {
  points++;
  score.textContent = points;

  //added code for highscore   
  if (points > highScore) {
    highScore = points;
    localStorage.setItem("whackHighScore", highScore);
    document.getElementById("high-score").textContent = highScore;
  }

  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. 
*/
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
* Updates the control board with the timer if time > 0
*/
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  } else {
    clearInterval(timer); 
  }
  
  return time;
}

/**
*
* Starts the timer using setInterval. 
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
* This is the event handler that gets called when a player
* clicks on a mole. 
*/
function whack(event) {
  updateScore();
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles.
*/
function setEventListeners() {
  moles.forEach(
    mole => mole.addEventListener('click', whack)
  );
  return moles;

}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  clearInterval(timer);
  return "game stopped";
}

/**
* This function starts the game when the `startButton` is clicked and initializes the game 
*/
function startGame(){
  clearScore();
  stopGame();  
  setDuration(10);
  setEventListeners();
  startTimer();
  showUp();
  difficulty = difficultySelect.value; //added for ability to select difficulty
  return "game started";
}

let highScore = localStorage.getItem("whackHighScore") || 0;
document.getElementById("high-score").textContent = highScore;

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;

});