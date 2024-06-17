// Define variables
let score = 0;
let timeLeft = 30; // in seconds
let timerId;

// Function to start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    timerId = setInterval(updateTimer, 1000); // Update timer every second
}

// Function to update the score
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Function to update the timer
function updateTimer() {
    document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft === 0) {
        clearInterval(timerId);
        alert(`Game over! Your final score is ${score}.`);
    }

    timeLeft--;
}

// Function to handle click events
function incrementScore() {
    score++;
    updateScore();
}

// Event listener for the button click
document.getElementById('click-button').addEventListener('click', incrementScore);

// Event listener for starting the game
document.getElementById('start-button').addEventListener('click', startGame);
