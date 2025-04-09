const video = document.getElementById('nexusVideoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        video.pause();
        playPauseBtn.textContent = '▶️';
    }
});

// Update progress bar
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;
    currentTime.textContent = formatTime(video.currentTime);
});

// Set video time on progress bar change
progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * video.duration;
    video.currentTime = time;
});

// Update duration
video.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(video.duration);
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
    }
});

// Format time (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}