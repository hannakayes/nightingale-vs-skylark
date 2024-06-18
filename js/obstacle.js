// obstacle.js

const obstacles = [];
const obstacleTypes = ['boombox', 'jackhammer', 'ambulance', 'airplane'];

function createObstacle() {
    const obstacleType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const obstacle = document.createElement('img');
    obstacle.src = `images/${obstacleType}.png`;
    obstacle.className = 'element';
    obstacle.id = obstacleType;
    obstacle.style.top = '0px'; // Start from the top
    obstacle.style.left = `${Math.random() * (gameArea.clientWidth - 80)}px`; // Random horizontal position
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        const topPosition = parseInt(obstacle.style.top);
        if (topPosition < gameArea.clientHeight) {
            obstacle.style.top = `${topPosition + 5}px`; // Move down
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
    gameStats.decrementLives(); // Decrement lives remaining
    gameArea.removeChild(obstacle); // Remove obstacle from DOM
    obstacles.splice(obstacles.indexOf(obstacle), 1); // Remove obstacle from array
}

function startObstacleGeneration() {
    setInterval(() => {
        createObstacle();
    }, 2000); // Generate a new obstacle every 2 seconds

    setInterval(() => {
        moveObstacles();
    }, 16); // Move obstacles every 16ms
}
