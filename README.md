# Simon-Game

### Wireframe
![simon-game-wireframe](https://github.com/chajiiiii/Simon-Game/assets/93015253/3e70929d-cac5-41d0-9526-058580ba7f19)

### Pseudocode
/*----- constants -----*/\
// Define a color panel object\
// Audio

/*----- state variables -----*/\
// Current score, highest score\
// Randomly generated sequence

/*----- cached elements  -----*/\
// 4 color panels\
// Render messages(current score, highest score)\
// Start button, Reset button

/*----- event listeners -----*/\
// Game start event listener\
// Color panels click event listener\
// Replay event listener

/*----- functions -----*/\
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
//    store it and display in both current and highest scores

// Render replay button\
// 1. Init\
// 2. Render game
