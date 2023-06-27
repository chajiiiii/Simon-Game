const colors = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue",
};

let currentScore = 0;
let highestScore = 0;
let randomSequenceArr = [];
let playerSequenceArr = [];

const audios = document.getElementsByTagName("audio");
console.log(audios);
const beepSounds = document.querySelectorAll('[id^="beep-sound"]');

const greenPanel = document.getElementById("green");
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
const winningScore = 3;

const playBtn = document.getElementById("play-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const buttons = document.querySelectorAll("button");

playBtn.addEventListener("click", render);

buttons.forEach(function (button) {
  button.addEventListener("mouseover", hoverSoundEffct);
});

colorPanels.forEach(function (panel) {
  panel.addEventListener("mouseover", hoverSoundEffct);
});

buttons.forEach(function (button) {
  button.addEventListener("click", clickSoundEffect);
});

colorPanels.forEach(function (panel) {
  panel.addEventListener("click", handlePlayerClick);
});

function hoverSoundEffct() {
  audios[0].play();
}

function clickSoundEffect() {
  audios[1].play();
}

function renderStart() {
  randomSequenceArr = [];
  playerSequenceArr = [];

  curScore.style.display = "inline-flex";
  curScoreNum.style.display = "inline-flex";
  highScore.style.display = "inline-flex";
  highScoreNum.style.display = "inline-flex";
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
      clearInterval(timerId);
      countdownEl.style.display = "none";
      callback();
    }
  }, 1000);
}

function render() {
  renderCountdown(function () {
    renderStart();
    getRandomSequence(colors, randomSequenceArr);
  });
}

function handlePlayerClick(event) {
  const clickedPanel = event.target.id;
  playerSequenceArr.push(clickedPanel);

  const isCorrect = checkSequence();

  if (isCorrect && playerSequenceArr.length === randomSequenceArr.length) {
    increaseScore();
    if (currentScore === winningScore) {
      endGame();
      return;
    }
    clearPlayerSequence();
    getRandomSequence();
    playRandomSequence();
  }
  if (!isCorrect) {
    console.log("game over");
    endGame();
  }
}

function getRandomSequence() {
  const sequence = Object.keys(colors);
  let randomSequence = Math.floor(Math.random() * sequence.length);
  randomSequenceArr.push(randomSequence);

  return randomSequenceArr, randomSequence, playRandomSequence();
}

function playRandomSequence() {
  let i = 0;
  const randomSequenceLength = randomSequenceArr.length;

  const intervalId = setInterval(function () {
    const colorIdx = randomSequenceArr[i];
    const colorPanel = getColorPanel(colorIdx);

    playPanelSound(colorIdx);
    panelColorChange(colorPanel);

    i++;
    if (i >= randomSequenceLength) {
      clearInterval(intervalId);
    }
  }, 800);
}

function checkSequence() {
  // if (playerSequenceArr.length !== randomSequenceArr.length) return false;
  for (let i = 0; i < playerSequenceArr.length; i++) {
    console.log(playerSequenceArr[i], colors[randomSequenceArr[i]]);
    if (playerSequenceArr[i] !== colors[randomSequenceArr[i]]) {
      return false;
    }
  }
  return true;
}

function increaseScore() {
  currentScore = playerSequenceArr.length;
  curScoreNum.innerText = currentScore;
  if (currentScore > highestScore) {
    highestScore = currentScore;
    highScoreNum.innerText = highestScore;
  }
}

function clearPlayerSequence() {
  return (playerSequenceArr = []);
}

function getColorPanel(colorIdx) {
  if (colorIdx === 0) {
    return greenPanel;
  } else if (colorIdx === 1) {
    return redPanel;
  } else if (colorIdx === 2) {
    return yellowPanel;
  } else if (colorIdx === 3) {
    return bluePanel;
  }
}

function playPanelSound(colorIdx) {
  beepSounds[colorIdx].play();
  console.log(colorIdx);
}

function panelColorChange(colorPanel) {
  if (colorPanel === greenPanel) {
    greenPanel.style.backgroundColor = "var(--light-green)";
    greenPanel.style.border = "2px solid var(--white)";
  } else if (colorPanel === redPanel) {
    redPanel.style.backgroundColor = "var(--light-red)";
    redPanel.style.border = "2px solid var(--white)";
  } else if (colorPanel === yellowPanel) {
    yellowPanel.style.backgroundColor = "var(--light-yellow)";
    yellowPanel.style.border = "2px solid var(--white)";
  } else if (colorPanel === bluePanel) {
    bluePanel.style.backgroundColor = "var(--light-blue)";
    bluePanel.style.border = "2px solid var(--white)";
  }
  setTimeout(function () {
    resetPanelColor(colorPanel);
  }, 500);
}

function resetPanelColor(colorPanel) {
  if (colorPanel === greenPanel) {
    greenPanel.style.backgroundColor = "var(--green)";
    greenPanel.style.border = "none";
  } else if (colorPanel === redPanel) {
    redPanel.style.backgroundColor = "var(--red)";
    redPanel.style.border = "none";
  } else if (colorPanel === yellowPanel) {
    yellowPanel.style.backgroundColor = "var(--yellow)";
    yellowPanel.style.border = "none";
  } else if (colorPanel === bluePanel) {
    bluePanel.style.backgroundColor = "var(--blue)";
    bluePanel.style.border = "none";
  }
}

function endGame() {
  colorPanels.forEach(function (panel) {
    panel.removeEventListener("click", handlePlayerClick, true);
  });

  if (currentScore === winningScore) {
    messageEl.innerText = "You won!";
  } else {
    messageEl.innerText = "You lost!";
  }

  messageEl.style.display = "flex";

  curScore.classList.add("current-score-end");
  curScore.classList.remove("current-score-play");

  curScoreNum.classList.add("current-score-number-end");
  curScoreNum.classList.remove("current-score-number-play");
  curScoreNum.style.display = "flex";

  highScore.classList.add("highest-score-end");
  highScore.classList.remove("highest-score-play");

  highScoreNum.classList.add("highest-score-number-end");
  highScoreNum.classList.remove("highest-score-number-play");
  highScoreNum.style.display = "flex";

  playAgainBtn.style.display = "flex";
}
