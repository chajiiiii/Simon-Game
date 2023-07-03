![simon1](https://github.com/chajiiiii/Simon-Game/assets/93015253/3933a1a5-aa9b-4b92-a694-d319bb4e27df)

# Simon

Simon(game) is a short-term memory game. It’s a game that shows a random sequence and requires a player to repeat it exactly the same by pressing the color panels. Reach the highest score 20, then you win! 😎

[🟩🟨 Click here to play 🟥🟦](https://chajiiiii.github.io/Simon-Game/)
<br><br>

## Description

I chose this game for my first project because it’s one of the most familiar games I played in my childhood.\
This is a **solo** project created using **HTML**, **CSS** and **JavaScript**.
<br><br>

## Planning

### - Wireframe & Pseudocode

![simon-game-wireframe](https://github.com/chajiiiii/Simon-Game/assets/93015253/3e70929d-cac5-41d0-9526-058580ba7f19)
This is the wireframe of the UI. I wanted to make it look simple, and include all necessary game features.
<br><br>

<details>
<summary>Pseudocode</summary>

This is the initial pseudocode below.

/_----- constants -----_/\
// Define a color panel object\
// Audio

/_----- state variables -----_/\
// Current score, highest score\
// Randomly generated sequence

/_----- cached elements -----_/\
// 4 color panels\
// Render messages(current score, highest score)\
// Start button, Reset button

/_----- event listeners -----_/\
// Game start event listener\
// Color panels click event listener\
// Replay event listener

/_----- functions -----_/\
// Initialize function\
// 1. Initialize the current score\
// 2. Display the start button\
// 3. Initialize the randomly generated sequence

// Color panel sequence generating function\
// 1. Generate random sequence increasing by 1 every round\
// 2. Store the sequence in an array\
// 3. Repeat the previous sequence and generate one more new beep every round

// Player clicks the color panels & store the clicks in an array\
// 1. Store the clicked panels in an array\
// 2. If clicked something else other than panels, do nothing

// Check if player did it right or wrong\
// 1. Use every method to compare if player clicked correct ones\
// 2. If the player did it correct, generate another random sequence\
// 3. If the player did it wrong\
// 3-1. Disable clicking panels any longer\
// 3-2. Display render message, replay button, current & highest score

// Color panel audio & visual effect\
// 1. Give 2-3 seconds before computer shows the sequence\
// 2. Give the chosen color panels audio & visual effect for every picked panel

// Render score messages\
// 1. If the player clicked the right sequence, update current score by 1\
// 2. If the current score becomes higher than highest score(0, or previous highest score),\
// store it and display in both current and highest scores

// Render replay button\
// 1. Init\
// 2. Render game

</details>
<br><br>

## Code Process

I started this project by writing a pseudocode and sketching wireframe first. Then I started HTML and CSS parts. It was fun because I could see the changes I made.\
The most challenging part for me was to structure this game code. It was difficult for me to actually start writing code even if I had my pseudocode. I tried to divide smaller and smaller to write actual code, and also, I searched for information a lot.\
Eventually, I figured it out by writing small pices one by one. For my next projects, I would like to be able to structure code with less struggles.
<br><br>

```JavaScript
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
```

In the code snippet above, I learned when to use the setInterval() method. I used this method to show the randomly generated sequence repeating from first to last one, one by one with visual and sound effects.
<br><br>

```JavaScript
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
```

My game kept generating a random sequence even after the winning condition was met. I tried to put the if condition here and there but it didn’t work. Eventually, I figured it out by placing it after the ‘increaseScore’ function call with return. Thinking about it now, it was simple logic and I learned how I can approach this kind of matter.
<br><br>

```JavaScript
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
```

For this game, one of the important features was that panels need to show sound&visual effects as the random sequence is showing and when they are clicked by a player. I used the setTimeout function to make the visual effects disappear(return to original colors) after some time.
<br><br>

## Game Screenshots

![gameScreenshots](https://github.com/chajiiiii/Simon-Game/assets/93015253/2191e806-e6f6-4742-82c5-9d149618b150)
<br><br>

## Key Learnings & Wins

### - Usage of `setInterval()` method.

```JavaScript
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
```

I used the setInterval method in this game for countdown and showing a sequence. It was a great method to use for this kind of game, and I like how I used it.
<br><br>

### - Making the player not able to click while the random sequence is showing & able to click afterwards.

```JavaScript
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
```

By adding & removing a click event listener for color panels, I could make the player not able to click while the computer is showing the sequence, and make the player able to click afterwards. If there are other ways of doing this task, I would like to learn more.
<br><br>

### - Making render messages and buttons all in the circle in the middle.

![renderImage](https://github.com/chajiiiii/Simon-Game/assets/93015253/0aae86fb-014a-43f8-b710-605a79ca5cf7)
I could place the play/play again buttons, render message and scores outside of the game board, but I wanted something simpler looking and that’s why I tried putting everything in the circle in the middle. As I was writing code, it was more to write and more complicated than I expected, but I made it.
<br><br>

## Planned future enhancements

- Make it responsive to mobile
  <br><br>

## Sources

> Game background image (Adobe Stock)\
> Game sounds (Freesound)
