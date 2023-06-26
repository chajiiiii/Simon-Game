const colors = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue",
};

let currentScore;
let highestScore;
let randomSequence = [];
let playerSequence = [];

const audios = document.getElementsByTagName("audio");
console.log(audios);

const greenPanel = document.getElementById("#green");
const redPanel = document.getElementById("red");
const yellowPanel = document.getElementById("yellow");
const bluePanel = document.getElementById("blue");
const colorPanels = document.querySelectorAll(".panel");

const countdownEl = document.getElementById("countdown");
const messageEl = document.querySelector(".render-message");
const curScore = document.querySelector(".current-score-play");
const curScoreNum = document.querySelector(".current-score-number-play");
const highScore = document.querySelector(".highest-score-play");
const highScoreNum = document.querySelector(".highest-score-number-play");

const playBtn = document.getElementById("play-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const buttons = document.querySelectorAll("button");

playBtn.addEventListener("click", renderCountdown);

buttons.forEach(function (button) {
  button.addEventListener("mouseover", hoverSoundEffct);
});

colorPanels.forEach(function (panel) {
  panel.addEventListener("mouseover", hoverSoundEffct);
});

function hoverSoundEffct() {
  audios[0].play();
}

buttons.forEach(function (button) {
  button.addEventListener("click", clickSoundEffect);
});

function clickSoundEffect() {
  audios[1].play();
}

function init() {
  randomSequence = [];
  playerSequence = [];

  curScoreNum.innerText = 0;
  highScoreNum.innerText = 0;
}

function renderCountdown(callback) {
  playBtn.style.display = "none";

  let count = 3;
  countdownEl.style.display = "flex";
  countdownEl.innerText = count;
  audios[2].play();
  const timerId = setInterval(function () {
    count--;
    if (count) {
      audios[2].play();
      countdownEl.innerText = count;
    } else {
      curScore.style.display = "inline-flex";
      curScoreNum.style.display = "inline-flex";
      highScore.style.display = "inline-flex";
      highScoreNum.style.display = "inline-flex";

      clearInterval(timerId);
      countdownEl.style.display = "none";
      callback();
    }
  }, 1000);
}

function render() {
  renderCountdown(function () {
    init();
  });
}
