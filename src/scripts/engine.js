const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    enemyCurrentValue: 1,
    scoreCurrentValue: 0,
    currentTime: 60,
  },
};

function randomSquare() {
  state.view.squares.forEach((square) => square.classList.remove("enemy"));

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  state.values.enemyCurrentValue = randomSquare.id;
  randomSquare.classList.add("enemy");
}

function moveEnemy() {
  setTimeout(() => {
    randomSquare();
    moveEnemy();
  }, state.values.gameVelocity);
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.enemyCurrentValue) {
        currentScore();
      }
    });
  });
}

function currentScore() {
  state.values.scoreCurrentValue++;
  state.view.score.innerText = state.values.scoreCurrentValue;
  state.values.enemyCurrentValue = null;
}

function decreasingTime() {
  const timerID = setInterval(() => {
    state.values.currentTime--;
    state.view.timeLeft.innerText = state.values.currentTime;
    if (state.values.currentTime <= 0) {
      clearInterval(timerID);
      alert("Game Over");
    }
  }, 1000);
}

function initialize() {
  moveEnemy();
  addListenerHitbox();
  decreasingTime();
}

initialize();
