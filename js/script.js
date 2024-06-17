let gameStarted = false;

document.addEventListener('DOMContentLoaded', function() {
    showScreen('startScreen');
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'flex';
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        showScreen('gameScreen');
        // Initialize game variables and start the game logic
        console.log('Game started.');
        // Change button text to "RESTART"
        document.getElementById('startButton').textContent = 'RESTART';
    } else {
        // Game is already started, so restart it
        restartGame();
    }
}

function restartGame() {
    gameStarted = false;
    showScreen('startScreen');
    // Reset game variables and prepare for a new game
    console.log('Game restarted.');
    // Change button text back to "START"
    document.getElementById('startButton').textContent = 'START';
}

function endGame() {
    showScreen('endScreen');
    // Display end game statistics
    document.getElementById('endMessage').textContent = 'Your final scores...'; // Update with actual scores
}
