// src/components/VideoTutorialPlayer.tsx
import { useRef, useState, useEffect, useCallback } from 'react'
import {
    FaPlay,
    FaPause,
    FaExpand,
    FaCompress,
    FaChevronUp,
    FaChevronDown,
    FaVolumeUp,
    FaVolumeMute,
} from 'react-icons/fa'
import { GiSoundOn, GiSoundOff } from 'react-icons/gi'
import { useInteraction } from '../hooks/useInteraction'
import { useAudio } from '../context/AudioContext'

interface VideoTutorialPlayerProps {
    onUnderstand: () => void
}

const VideoTutorialPlayer: React.FC<VideoTutorialPlayerProps> = ({
    onUnderstand,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const [isSeeking, setIsSeeking] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [controlsVisible, setControlsVisible] = useState(false)
    const [videoVolume, setVideoVolume] = useState(1)
    const [videoMuted, setVideoMuted] = useState(false)
    const prevRemainingRef = useRef<number>(Infinity)

    const { handleClick } = useInteraction()
    const { isBackgroundMuted, toggleBackgroundMute } = useAudio()

    // Sinkronkan volume & mute ke elemen video
    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.volume = videoVolume
            video.muted = videoMuted
        }
    }, [videoVolume, videoMuted])

    const ensureFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {})
        }
    }, [])

    useEffect(() => {
        const onFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', onFsChange)
        // Cek status fullscreen saat komponen pertama kali dimuat
        setIsFullscreen(!!document.fullscreenElement)
        return () =>
            document.removeEventListener('fullscreenchange', onFsChange)
    }, [])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen?.()
        }
    }

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            if (!isSeeking) {
                setCurrentTime(video.currentTime)
            }
            const remaining = video.duration - video.currentTime
            setShowButton(remaining <= 3 && video.duration > 0)

            if (
                prevRemainingRef.current > 3 &&
                remaining <= 3 &&
                video.duration > 0
            ) {
                setControlsVisible(true)
            }
            prevRemainingRef.current = remaining
        }

        const handleLoadedMetadata = () => {
            setDuration(video.duration)
        }

        const handleEnded = () => {
            setCurrentTime(video.duration)
        }

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)

        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('loadedmetadata', handleLoadedMetadata)
        video.addEventListener('ended', handleEnded)
        video.addEventListener('play', handlePlay)
        video.addEventListener('pause', handlePause)

        video.volume = videoVolume
        video.muted = videoMuted

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('loadedmetadata', handleLoadedMetadata)
            video.removeEventListener('ended', handleEnded)
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('pause', handlePause)
        }
    }, [isSeeking, videoVolume, videoMuted])

    const togglePlay = () => {
        ensureFullscreen()
        const video = videoRef.current
        if (!video) return
        if (video.paused) {
            video.play()
        } else {
            video.pause()
        }
    }

    const handleSeekStart = () => {
        ensureFullscreen()
        setIsSeeking(true)
    }
    const handleSeekEnd = () => setIsSeeking(false)

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value)
        if (videoRef.current) {
            videoRef.current.currentTime = newTime
            setCurrentTime(newTime)
        }
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = Math.floor(seconds % 60)
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    const handleUnderstand = () => {
        ensureFullscreen()
        onUnderstand()
    }

    return (
        <div className="relative w-full h-full">
            <style>{`
                @keyframes shimmer {
                    0% { left: -150%; }
                    100% { left: 150%; }
                }
                .shimmer-btn {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer-btn::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -150%;
                    width: 150%;
                    height: 100%;
                    background: linear-gradient(
                        135deg,
                        transparent 25%,
                        rgba(255, 255, 255, 0.3) 50%,
                        transparent 75%
                    );
                    transform: rotate(-45deg);
                    animation: shimmer 2s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(-50%, -10px); }
                }
                .animate-bounce-loop {
                    animation: bounce 1.2s infinite;
                    position: absolute;
                    left: 50%;
                    bottom: 1rem;
                    transform: translateX(-50%);
                    cursor: pointer;
                }
                .cursor-pointer {
                    cursor: pointer;
                }
            `}</style>

            <video
                ref={videoRef}
                src="./videos/tutorial.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                playsInline
                preload="auto"
            />

            <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-2xl bg-black/60 backdrop-blur-md rounded-xl px-6 py-4 flex items-center gap-4 transition-all duration-500 ease-in-out ${
                    controlsVisible
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
                <button
                    onClick={togglePlay}
                    className="text-white text-2xl focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <div className="flex-1 flex items-center gap-3">
                    <span className="text-white text-sm w-10 text-right">
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step="any"
                        value={currentTime}
                        onChange={handleSliderChange}
                        onMouseDown={handleSeekStart}
                        onMouseUp={handleSeekEnd}
                        onTouchStart={handleSeekStart}
                        onTouchEnd={handleSeekEnd}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-white text-sm w-10">
                        {formatTime(duration)}
                    </span>

                    {/* Tombol suara latar di sebelah kiri kontrol volume video */}
                    <button
                        onClick={handleClick(toggleBackgroundMute)}
                        className="text-white text-2xl focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                        aria-label={
                            isBackgroundMuted
                                ? 'Suarakan latar'
                                : 'Bisukan latar'
                        }
                    >
                        {isBackgroundMuted ? <GiSoundOff /> : <GiSoundOn />}
                    </button>

                    {/* Kontrol volume video */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setVideoMuted(!videoMuted)}
                            className="text-white text-xl focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                            aria-label={
                                videoMuted ? 'Unmute video' : 'Mute video'
                            }
                        >
                            {videoMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={videoVolume}
                            onChange={(e) =>
                                setVideoVolume(Number(e.target.value))
                            }
                            className="w-20 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            aria-label="Volume video"
                        />
                    </div>
                </div>

                <button
                    onClick={toggleFullscreen}
                    className="text-white text-xl focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                    aria-label={
                        isFullscreen ? 'Keluar fullscreen' : 'Fullscreen'
                    }
                >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>

                <button
                    onClick={() => setControlsVisible(false)}
                    className="text-white text-xl focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                    aria-label="Sembunyikan kontrol"
                >
                    <FaChevronDown />
                </button>
            </div>

            {!controlsVisible && (
                <button
                    onClick={() => setControlsVisible(true)}
                    className="animate-bounce-loop text-white text-3xl focus:outline-none z-10"
                    aria-label="Tampilkan kontrol"
                >
                    <FaChevronUp />
                </button>
            )}

            {showButton && (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={handleClick(handleUnderstand)}
                        className="shimmer-btn cursor-pointer px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-2xl transition-all text-lg"
                    >
                        OKE SAYA MENGERTI
                    </button>
                </div>
            )}
        </div>
    )
}

export default VideoTutorialPlayer
