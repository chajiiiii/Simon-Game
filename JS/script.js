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
const winningScore = 20;

const audios = document.getElementsByTagName("audio");
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

const playBtn = document.getElementById("play-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const buttons = document.querySelectorAll("button");

// Event Listeners
buttons.forEach(function (button) {
  button.addEventListener("mouseover", hoverSoundEffct);
});

colorPanels.forEach(function (panel) {
  panel.addEventListener("mouseover", hoverSoundEffct);
});

buttons.forEach(function (button) {
  button.addEventListener("click", btnClickSoundEffect);
});

playBtn.addEventListener("click", render);

playAgainBtn.addEventListener("click", playAgain);

// Color Panels Hover Sound
function hoverSoundEffct() {
  audios[0].play();
}

// Play & Play Again Button Sound
function btnClickSoundEffect() {
  audios[1].play();
}

// After Clicking Play Button
function render() {
  if (randomSequenceArr.length > 0) {
    messageEl.style.display = "none";

    curScore.style.display = "none";
    curScoreNum.style.display = "none";

    highScore.style.display = "none";
    highScoreNum.style.display = "none";

    playAgainBtn.style.display = "none";
  }

  renderCountdown(function () {
    renderStart();
    getRandomSequence(colors, randomSequenceArr);
  });
}

// Countdown 3
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

// After Countdown
function renderStart() {
  randomSequenceArr = [];
  playerSequenceArr = [];

  curScore.classList.add("current-score-play");
  curScore.classList.remove("current-score-end");
  curScore.style.display = "inline-flex";

  curScoreNum.classList.add("current-score-number-play");
  curScoreNum.classList.remove("current-score-number-end");
  curScoreNum.style.display = "inline-flex";

  highScore.classList.add("highest-score-play");
  highScore.classList.remove("highest-score-end");
  highScore.style.display = "inline-flex";

  highScoreNum.classList.add("highest-score-number-play");
  highScoreNum.classList.remove("highest-score-number-end");
  highScoreNum.style.display = "inline-flex";

  colorPanels.forEach(function (panel) {
    panel.addEventListener("click", handlePlayerClick);
  });
}

// Generating Random Sequence Using the Colors Object Keys
function getRandomSequence() {
  const sequence = Object.keys(colors);
  let randomSequence = Math.floor(Math.random() * sequence.length);
  randomSequenceArr.push(randomSequence);

  return randomSequenceArr, randomSequence, playRandomSequence();
}

// Showing the Random Sequence on Color Panels
function playRandomSequence() {
  let i = 0;
  const randomSequenceLength = randomSequenceArr.length;

  colorPanels.forEach(function (panel) {
    panel.removeEventListener("click", handlePlayerClick);
  });

  const intervalId = setInterval(function () {
    const colorIdx = randomSequenceArr[i];
    const colorPanel = getColorPanel(colorIdx);

    panelColorChange(colorPanel);
    playPanelSound(colorIdx);

    i++;
    if (i >= randomSequenceLength) {
      clearInterval(intervalId);
      colorPanels.forEach(function (panel) {
        panel.addEventListener("click", handlePlayerClick);
      });
    }
  }, 800);
}

// Player Clicking Color Panels
function handlePlayerClick(event) {
  const clickedPanel = event.target.id;
  playerSequenceArr.push(clickedPanel);

  const isCorrect = checkSequence();
  clickPanelEffects(clickedPanel);

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
    endGame();
  }
}

// Compare Player's Sequence with Random Generated Sequence
function checkSequence() {
  for (let i = 0; i < playerSequenceArr.length; i++) {
    if (playerSequenceArr[i] !== colors[randomSequenceArr[i]]) {
      return false;
    }
  }
  return true;
}

// Increasing Score
function increaseScore() {
  currentScore = playerSequenceArr.length;
  curScoreNum.innerText = currentScore;
  if (currentScore > highestScore) {
    highestScore = currentScore;
    highScoreNum.innerText = highestScore;
  }
}

// Clearing Player's Previous Sequence
function clearPlayerSequence() {
  return (playerSequenceArr = []);
}

// Getting Color Panels' by Random Sequence Numbers
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

// Adding A Sound and Color Effects When Player Clicks Color Panels
function clickPanelEffects(clickedPanel) {
  if (clickedPanel === "green") {
    greenPanel.style.backgroundColor = "var(--light-green)";
    greenPanel.style.border = "2px solid var(--white)";
    beepSounds[0].play();
  } else if (clickedPanel === "red") {
    redPanel.style.backgroundColor = "var(--light-red)";
    redPanel.style.border = "2px solid var(--white)";
    beepSounds[1].play();
  } else if (clickedPanel === "yellow") {
    yellowPanel.style.backgroundColor = "var(--light-yellow)";
    yellowPanel.style.border = "2px solid var(--white)";
    beepSounds[2].play();
  } else if (clickedPanel === "blue") {
    bluePanel.style.backgroundColor = "var(--light-blue)";
    bluePanel.style.border = "2px solid var(--white)";
    beepSounds[3].play();
  }
  setTimeout(function () {
    resetClickedPanelColor(clickedPanel);
  }, 400);
}

// Resetting the Color Panels to Original Colors After Player Clicks the Sequence
function resetClickedPanelColor(clickedPanel) {
  if (clickedPanel === "green") {
    greenPanel.style.backgroundColor = "var(--green)";
    greenPanel.style.border = "none";
  } else if (clickedPanel === "red") {
    redPanel.style.backgroundColor = "var(--red)";
    redPanel.style.border = "none";
  } else if (clickedPanel === "yellow") {
    yellowPanel.style.backgroundColor = "var(--yellow)";
    yellowPanel.style.border = "none";
  } else if (clickedPanel === "blue") {
    bluePanel.style.backgroundColor = "var(--blue)";
    bluePanel.style.border = "none";
  }
}

// Adding A Sound Effect When Color Panels Are Showing the Sequence
function playPanelSound(colorIdx) {
  beepSounds[colorIdx].play();
}

// Adding A Color Effect when Color Panels Are Showing the Sequence
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

// Resetting the Color Panels to Original Colors After Showing the Sequence
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

// Ending the Game
function endGame() {
  colorPanels.forEach(function (panel) {
    panel.removeEventListener("click", handlePlayerClick);
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

// After Clicking the Play Again Button
function playAgain() {
  currentScore = 0;
  curScoreNum.innerText = currentScore;

  render();
}
