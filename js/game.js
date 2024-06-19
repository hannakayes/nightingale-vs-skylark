// game.js

// Define gameAreaHeight if it's supposed to be a constant
const gameAreaHeight = 600; // Replace with your actual height value

let gameStarted = false;
let arrowClicksSum = 0; // Track total arrow clicks sum
let startTime = null; // Variable to store the start time
let skylarkSound = null; // Variable to store skylark sound element

// Function to stop all playing sounds except end game audio
function stopAllSounds() {
    const sounds = document.querySelectorAll('audio:not(#endGameAudio)');
    sounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

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
        startTime = new Date(); // Start the timer
        document.getElementById('startButton').textContent = 'RESTART';
        setInterval(updateFlyingSkills, 1000); // Check every second for flying skills update
    } else {
        restartGame();
    }
}

function restartGame() {
    gameStarted = false;
    arrowClicksSum = 0; // Reset arrow clicks sum
    gameStats.resetStats(); // Reset game stats
    showScreen('startScreen');
    document.getElementById('startButton').textContent = 'START';
    
    // Clear any existing obstacles on the screen
    clearObstacles();

    // Stop skylark sound specifically
    const skylarkSound = document.getElementById('endGameAudio');
    if (skylarkSound) {
        skylarkSound.pause();
        skylarkSound.currentTime = 0;
    }

    // Stop all other sounds
    stopAllSounds();

    // Reload the page after a short delay (ensure all sounds are stopped)
    setTimeout(() => {
        window.location.reload();
    }, 500); // Adjust the delay as needed
}


function endGame() {
    // Stop all playing sounds except end game audio
    stopAllSounds();

    // Play the end game audio
    const endGameAudio = document.getElementById('endGameAudio');
    endGameAudio.play();

    showScreen('endScreen');
    const endMessageElement = document.getElementById('endMessage');

    if (gameStats.level < 3) {
        endMessageElement.textContent = "City life is tough. Better luck next time!";
    } else if (gameStats.level < 6) {
        endMessageElement.textContent = "You're definitely an urban lark but nightingale wins!";
    } else if (gameStats.level < 10) {
        endMessageElement.textContent = "You use your voice well, little lark!";
    } else if (gameStats.level === 10) {
        endMessageElement.textContent = "You mastered all city noises – nightingale has nothing on you!";
    }

    // Display final stats
    const finalStatsElement = document.getElementById('finalStats');
    finalStatsElement.innerHTML = `
        <p>Lives remaining: ${gameStats.lives}</p>
        <p>Level reached: ${gameStats.level}</p>
        <p>Flying skills: ${gameStats.flyingSkills}</p>
    `;
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
        document.getElementById('level').textContent = this.level;
        document.getElementById('flyingSkills').textContent = this.flyingSkills;
    },
    resetStats: function() {
        this.lives = 3;
        this.level = 1;
        this.flyingSkills = 0;
        this.updateStatsUI();
    }
};

// Listen for keydown events on the document
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        arrowClicksSum++;
        checkLevelIncrease();
    }
});

// Function to check if level should be increased
function checkLevelIncrease() {
    if (arrowClicksSum >= 25) {
        gameStats.incrementLevel(); // Increment level
        arrowClicksSum = 0; // Reset arrow clicks sum
    }
}

// Function to update flying skills based on time elapsed
function updateFlyingSkills() {
    if (!startTime) return; // Return if game hasn't started

    const currentTime = new Date();
    const elapsedTimeInSeconds = (currentTime - startTime) / 1000;

    if (elapsedTimeInSeconds >= 10) {
        gameStats.flyingSkills += 25; // Increase flying skills by 25
        gameStats.updateStatsUI(); // Update UI to reflect new flying skills
        startTime = currentTime; // Reset start time for the next 10 seconds
    }
}

function checkCollision(obstacle) {
    const skylarkRect = skylark.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        skylarkRect.right > obstacleRect.left &&
        skylarkRect.left < obstacleRect.right &&
        skylarkRect.bottom > obstacleRect.top &&
        skylarkRect.top < obstacleRect.bottom
    ) {
        const obstacleType = obstacle.getAttribute('data-type');

        // Play sound based on obstacle type
        switch (obstacleType) {
            case 'boombox':
                playSound('boombox_sound');
                break;
            case 'airplane':
                playSound('airplane_sound');
                break;
            case 'ambulance':
                playSound('ambulance_sound');
                break;
            case 'jackhammer':
                playSound('jackhammer_sound');
                break;
            default:
                break;
        }

        handleCollision(obstacle);
    }
}

// Function to play a sound by its ID
function playSound(soundName) {
    const audio = document.getElementById(soundName);
    if (audio) {
        audio.currentTime = 0; // Rewind to the start
        audio.play();
    }
}

function handleCollision(obstacle) {
    collisionCount++; // Increment collision count
    if (collisionCount === 2) {
        gameStats.decrementLives(); // Decrement lives remaining after 3 collisions
        collisionCount = 0; // Reset collision count
    }
    gameArea.removeChild(obstacle); // Remove obstacle from DOM
    obstacles.splice(obstacles.indexOf(obstacle), 1); // Remove obstacle from array
}

document.addEventListener('DOMContentLoaded', function() {
    showScreen('startScreen');
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('restartButton').addEventListener('click', restartGame); // Restart game on restart button click
    document.querySelector('.title-image').addEventListener('click', startGame); // Start game when title image is clicked

    // Hover and click events for buttons to switch colors
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.borderColor = '#7A4A2B';
            this.style.color = '#7A4A2B';
            this.style.backgroundColor = '#D5F32F';
        });
        button.addEventListener('mouseout', function() {
            this.style.borderColor = '#D5F32F';
            this.style.color = '#D5F32F';
            this.style.backgroundColor = '#7A4A2B';
        });
        button.addEventListener('mousedown', function() {
            this.style.borderColor = '#7A4A2B';
            this.style.color = '#7A4A2B';
            this.style.backgroundColor = '#D5F32F';
        });
        button.addEventListener('mouseup', function() {
            this.style.borderColor = '#D5F32F';
            this.style.color = '#D5F32F';
            this.style.backgroundColor = '#7A4A2B';
        });
    });

    // Hover and click events for images to switch source
    const titleImage = document.querySelector('.title-image');
    const nightingaleImage = document.getElementById('nightingale');

    if (titleImage) {
        titleImage.addEventListener('mouseover', function() {
            this.src = 'images/title-image_inverted.png';
        });
        titleImage.addEventListener('mouseout', function() {
            this.src = 'images/title-image.png';
        });
        titleImage.addEventListener('mousedown', function() {
            this.src = 'images/title-image_inverted.png';
        });
        titleImage.addEventListener('mouseup', function() {
            this.src = 'images/title-image.png';
        });
    }

    if (nightingaleImage) {
        nightingaleImage.addEventListener('mouseover', function() {
            this.src = 'images/nightingale_inverted.png';
        });
        nightingaleImage.addEventListener('mouseout', function() {
            this.src = 'images/nightingale.png';
        });
        nightingaleImage.addEventListener('mousedown', function() {
            this.src = 'images/nightingale_inverted.png';
        });
        nightingaleImage.addEventListener('mouseup', function() {
            this.src = 'images/nightingale.png';
        });
    }
});
