import { useRef, useState, useEffect } from "react";

import './videoplay.css'

const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Обработчик воспроизведения/паузы
    const togglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Обновление времени видео
    const updateTime = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    // Установка времени при изменении прогресс-бара
    const handleProgressChange = (e) => {
        const time = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = time;
    };

    // Полноэкранный режим
    const toggleFullscreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }
    };

    // Форматирование времени (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Загрузка метаданных видео
    useEffect(() => {
        const video = videoRef.current;
        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    return (
        <div className="video-player">
            <div className="video-container" onClick={togglePlayPause}>
                <video ref={videoRef} onTimeUpdate={updateTime}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="controls">
                <button className="control-btn" onClick={togglePlayPause}>
                    {isPlaying ? "⏸️" : "▶️"}
                </button>
                <input
                    type="range"
                    className="progress-bar"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleProgressChange}
                />
                <span className="time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <button className="control-btn" onClick={toggleFullscreen}>
                    ⛶
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;