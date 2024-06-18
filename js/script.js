document.addEventListener('DOMContentLoaded', function() {
    showScreen('startScreen');
    document.getElementById('startButton').addEventListener('click', startGame);

    const nightingale = document.getElementById('nightingale');
    const speechBubble = document.createElement('img');
    speechBubble.src = 'images/speech_bubble.png';
    speechBubble.id = 'speechBubble';
    speechBubble.style.display = 'none';
    speechBubble.style.position = 'absolute';
    speechBubble.style.pointerEvents = 'none'; // Ensure speech bubble doesn't interfere with mouse events

    document.body.appendChild(speechBubble);

    nightingale.addEventListener('mouseover', showSpeechBubble);
    nightingale.addEventListener('mousemove', moveSpeechBubble);
    nightingale.addEventListener('mouseout', hideSpeechBubble);
    nightingale.addEventListener('click', toggleNightingaleSong); // Add click listener for audio

    function showSpeechBubble() {
        speechBubble.style.display = 'block';
    }

    function moveSpeechBubble(event) {
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        // Adjust position to place the speech bubble at the cursor tip
        speechBubble.style.left = mouseX + 'px';
        speechBubble.style.top = mouseY + 'px';
    }

    function hideSpeechBubble() {
        speechBubble.style.display = 'none';
    }

    function toggleNightingaleSong() {
        const audioElement = document.getElementById('nightingaleAudio');

        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
            audioElement.currentTime = 0; // Reset audio to start
        }
    }
});
