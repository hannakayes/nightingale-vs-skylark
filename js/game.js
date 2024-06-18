// game.js

let gameStarted = false;
let obstaclesPassedCount = 0; // Track how many obstacles have passed through gameArea
let obstaclesInsideCount = 0; // Track how many obstacles are currently inside gameArea

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
    obstaclesPassedCount = 0; // Reset obstacles passed count
    obstaclesInsideCount = 0; // Reset obstacles inside count
    gameStats.resetStats(); // Reset game stats
    showScreen('startScreen');
    document.getElementById('startButton').textContent = 'START';
    
    // Clear any existing obstacles on the screen
    clearObstacles();

    // Reload the page
    window.location.reload();
}

function endGame() {
    showScreen('endScreen');
    document.getElementById('endMessage').textContent = 'Your final scores...';
}

// Initialize game stats
const gameStats = {
    lives: 3, // Initial lives
    level: 1, // Initial level
    flyingSkills: 0, // Initial flying skills
    decrementLives: function() {
        this.lives--;
        if (this.lives <= 0) {
            endGame(); // Transition to end screen when lives reach 0
        }
        this.updateStatsUI();
    },
    incrementLevel: function() {
        this.level++;
        if (this.level >= 10) {
            endGame(); // Transition to end screen when level reaches 10
        }
        this.updateStatsUI();
    },
    updateStatsUI: function() {
        document.getElementById('singingPoints').textContent = this.lives;
        document.getElementById('level').textContent = `${this.level}`;
        document.getElementById('flyingSkills').textContent = this.flyingSkills;
    },
    resetStats: function() {
        this.lives = 3;
        this.level = 1;
        this.flyingSkills = 0;
        this.updateStatsUI();
    }
};

function obstaclePass() {
    obstaclesPassedCount++;
    if (obstaclesPassedCount % 5 === 0) { // Check if 5 obstacles have passed
        gameStats.incrementLevel(); // Increment level
    }
    // Implement further logic if needed when an obstacle passes through gameArea
}

function obstacleEnter() {
    obstaclesInsideCount++;
    if (obstaclesInsideCount === 5 || obstaclesInsideCount === 10 || obstaclesInsideCount === 15 || 
        obstaclesInsideCount === 20 || obstaclesInsideCount === 25 || obstaclesInsideCount === 30 || 
        obstaclesInsideCount === 35 || obstaclesInsideCount === 40 || obstaclesInsideCount === 45 || 
        obstaclesInsideCount === 50) {
        gameStats.incrementLevel();
    }
}

function obstacleLeave() {
    obstaclesInsideCount--;
}

document.addEventListener('DOMContentLoaded', function() {
    showScreen('startScreen');
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('restartButton').addEventListener('click', restartGame); // Restart game on restart button click
    document.querySelector('.title-image').addEventListener('click', startGame); // Start game when title image is clicked
});
