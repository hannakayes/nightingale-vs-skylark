// game.js

let gameStarted = false;

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
        initializePlayer();
        startObstacleGeneration();
        document.getElementById('startButton').textContent = 'RESTART';
    } else {
        restartGame();
    }
}

function restartGame() {
    gameStarted = false;
    showScreen('startScreen');
    document.getElementById('startButton').textContent = 'START';
    // Reset game state if needed
}

function endGame() {
    showScreen('endScreen');
    document.getElementById('endMessage').textContent = 'Your final scores...';
}
