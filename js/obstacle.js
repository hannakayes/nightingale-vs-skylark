// obstacle.js

const obstacles = [];
const obstacleTypes = ['boombox', 'jackhammer', 'ambulance', 'airplane'];
let collisionCount = 0; // Counter to track collisions with skylark

function createObstacle() {
    const obstacleType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const obstacle = document.createElement('img');
    obstacle.src = `images/${obstacleType}.png`;
    obstacle.className = 'element';
    obstacle.id = obstacleType;
    obstacle.setAttribute('data-type', obstacleType); // Set data-type attribute
    obstacle.style.top = '0px'; // Start from the top
    obstacle.style.left = `${Math.random() * (gameArea.clientWidth - 80)}px`; // Random horizontal position
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    const obstacleSpeed = 3 + (gameStats.level - 1) * 2; // Increase speed by 2 for each level
    obstacles.forEach(obstacle => {
        const topPosition = parseInt(obstacle.style.top);
        if (topPosition < gameArea.clientHeight) {
            obstacle.style.top = `${topPosition + obstacleSpeed}px`; // Move down with updated speed
            checkCollision(obstacle); // Check for collision with skylark
        } else {
            gameArea.removeChild(obstacle);
            obstacles.splice(obstacles.indexOf(obstacle), 1); // Remove obstacle from array
        }
    });
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
        handleCollision(obstacle);
    }
}

function handleCollision(obstacle) {
    collisionCount++; // Increment collision count
    if (collisionCount === 2) {
        gameStats.decrementLives(); // Decrement lives remaining after 2 collisions
        collisionCount = 0; // Reset collision count
    }
    gameArea.removeChild(obstacle); // Remove obstacle from DOM
    obstacles.splice(obstacles.indexOf(obstacle), 1); // Remove obstacle from array
}

function startObstacleGeneration() {
    const obstacleGenerationIntervalTime = 2000 - (gameStats.level - 1) * 200; // Decrease interval by 200ms for each level
    obstacleGenerationInterval = setInterval(() => {
        createObstacle();
    }, obstacleGenerationIntervalTime); // Generate a new obstacle every adjusted interval

    obstacleMovementInterval = setInterval(() => {
        moveObstacles();
    }, 16); // Move obstacles every 16ms
}
z