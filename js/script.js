// script.js

document.addEventListener('DOMContentLoaded', function() {
    showScreen('startScreen');
    document.getElementById('startButton').addEventListener('click', startGame);
});

function toggleNightingaleSong() {
    const audioElement = document.getElementById('nightingaleAudio');

    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
        audioElement.currentTime = 0; // Reset audio to start
    }
}