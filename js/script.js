let gameStarted = false;
let skylark, gameArea, skylarkPosition, nightingale, nightingalePosition;
let isJumping = false;
let isFlying = false;
let jumpInterval; // Variable to store interval for jump animation
let fallInterval; // Variable to store interval for falling animation

document.addEventListener('DOMContentLoaded', function() {
    skylark = document.getElementById('skylark');
    nightingale = document.getElementById('nightingale');
    gameArea = document.getElementById('gameArea');

    // Initial positions
    skylarkPosition = { left: skylark.offsetLeft, top: skylark.offsetTop };
    nightingalePosition = { 
        right: parseInt(window.getComputedStyle(nightingale).right),
        top: parseInt(window.getComputedStyle(nightingale).top)
    };

    showScreen('startScreen');
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    startFalling(); // Start falling animation when game starts
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
        console.log('Game started.');
        document.getElementById('startButton').textContent = 'RESTART';
    } else {
        restartGame();
    }
}

function restartGame() {
    gameStarted = false;
    showScreen('startScreen');
    console.log('Game restarted.');
    document.getElementById('startButton').textContent = 'START';
}

function endGame() {
    showScreen('endScreen');
    document.getElementById('endMessage').textContent = 'Your final scores...';
}

function handleKeyDown(event) {
    const step = 10; // Increase step for faster movement
    const gameAreaWidth = gameArea.clientWidth;
    const gameAreaHeight = gameArea.clientHeight;
    const skylarkWidth = skylark.clientWidth;
    const skylarkHeight = skylark.clientHeight;
    const nightingaleWidth = nightingale.clientWidth;

    const maxRightPosition = gameAreaWidth - nightingaleWidth - nightingalePosition.right - skylarkWidth - 1;

    // Handle left and right movement
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        skylarkPosition.left = Math.max(0, Math.min(maxRightPosition, skylarkPosition.left + direction * step));
        skylark.style.left = skylarkPosition.left + 'px';
        return;
    }

    // Handle up and down movement
    if (event.key === 'ArrowUp' && !isJumping) {
        isJumping = true;
        jumpUp(); // Start jump animation
        switchToFlyingImage();
    } else if (event.key === 'ArrowDown' && !isFlying) {
        isFlying = true;
        clearInterval(fallInterval); // Clear any existing fall interval
        fallInterval = setInterval(fallDown, 16); // Start fall animation
        switchToStandingImage(); // Switch to standing image when falling
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowUp') {
        clearInterval(jumpInterval); // Stop jump animation
        isJumping = false;
        // Optionally, start falling animation here if needed
    } else if (event.key === 'ArrowDown') {
        clearInterval(fallInterval); // Stop fall animation
        isFlying = false;
        // Optionally switch to standing image here if needed
    }
}

function jumpUp() {
    let skylarkTop = skylark.offsetTop;

    function animateJump() {
        if (skylarkTop > 0 && isJumping) {
            skylarkTop -= 5; // Adjust jump speed as needed
            skylark.style.top = skylarkTop + 'px';
            requestAnimationFrame(animateJump);
        } else {
            clearInterval(jumpInterval); // Stop jump animation when reached top or stopped jumping
            isJumping = false;
            // Optionally start falling animation here if needed
        }
    }

    animateJump(); // Initial call to start jump animation
}

function startFalling() {
    clearInterval(fallInterval); // Clear any existing fall interval

    fallInterval = setInterval(() => {
        let skylarkTop = skylark.offsetTop;
        const initialTop = skylarkPosition.top;

        if (skylarkTop < initialTop && !isJumping) {
            skylarkTop += 5; // Adjust fall speed as needed
            skylark.style.top = skylarkTop + 'px';
        } else {
            clearInterval(fallInterval); // Stop falling animation when reached initial position
            if (skylarkTop >= gameAreaHeight - skylarkHeight) {
                switchToStandingImage(); // Switch to standing image when reaching the bottom
            }
        }
    }, 16); // Adjust interval as needed
}

function switchToFlyingImage() {
    skylark.src = 'images/skylark_flying.png';
}

function switchToStandingImage() {
    skylark.src = 'images/skylark_standing.png';
}

function fallDown() {
    let skylarkTop = skylark.offsetTop;
    const gameAreaHeight = gameArea.clientHeight;
    const skylarkHeight = skylark.clientHeight;

    function animateFall() {
        if (skylarkTop < gameAreaHeight - skylarkHeight && isFlying) {
            skylarkTop += 5; // Adjust fall speed as needed
            skylark.style.top = skylarkTop + 'px';
        } else {
            clearInterval(fallInterval); // Stop falling animation when reached bottom or stopped flying
            isFlying = false;
            if (skylarkTop >= gameAreaHeight - skylarkHeight) {
                switchToStandingImage(); // Switch to standing image when reaching the bottom
            }
        }
    }

    animateFall(); // Initial call to start fall animation
}
