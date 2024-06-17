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
    showScreen('gameScreen');
    // Initialize game variables and start the game logic
}

function pauseGame() {
    // Implement pause functionality
}

function endGame() {
    showScreen('endScreen');
    // Display end game statistics
    document.getElementById('endMessage').textContent = 'Your final scores...'; // Update with actual scores
}

function restartGame() {
    showScreen('startScreen');
    // Reset game variables and prepare for a new game
}
