// src/components/OpeningScreen.tsx
import { useEffect, useRef } from 'react'
import { useInteraction } from '../hooks/useInteraction'
import { useAudio } from '../context/AudioContext'
import { useTheme } from '../context/ThemeContext'
import FloatingControls from './FloatingControls'
import { captureAndSave } from '../utils/screenshotCapture'
import { screenshotEnabled } from '../globalConfig'

interface OpeningScreenProps {
    onStart: () => void
}

const OpeningScreen: React.FC<OpeningScreenProps> = ({ onStart }) => {
    const {
        startBackground,
        isBackgroundMuted,
        toggleBackgroundMute,
        isOpenerMuted,
        volumeNarasi,
    } = useAudio()
    const { isDark, toggleTheme } = useTheme()
    const { handleClick } = useInteraction()
    const openerAudioRef = useRef<HTMLAudioElement | null>(null)

    // Mulai musik latar
    useEffect(() => {
        startBackground()
    }, [startBackground])

    // Screenshot otomatis (jika diaktifkan)
    useEffect(() => {
        if (!screenshotEnabled) return
        const timer = setTimeout(() => {
            captureAndSave(-1)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    // Putar narasi pembuka
    useEffect(() => {
        const audio = new Audio('./audios/opening-opener.mp3')
        audio.volume = volumeNarasi
        audio.muted = isOpenerMuted
        audio
            .play()
            .catch((err) => console.warn('Gagal memutar narasi opening:', err))
        openerAudioRef.current = audio

        return () => {
            audio.pause()
            audio.currentTime = 0
        }
        // hanya dijalankan sekali saat mounting
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Sinkronkan properti muted jika state berubah
    useEffect(() => {
        if (openerAudioRef.current) {
            openerAudioRef.current.muted = isOpenerMuted
        }
    }, [isOpenerMuted])

    const backgroundImage = isDark
        ? './images/background-opening-1.png'
        : './images/background-opening-2.png'

    return (
        <>
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
                        rgba(255, 255, 255, 0.25) 50%,
                        transparent 75%
                    );
                    transform: rotate(-45deg);
                    animation: shimmer 2s infinite;
                }
            `}</style>

            <div
                className="h-screen w-screen flex flex-col items-center justify-center text-gray-900 dark:text-white"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <FloatingControls
                    isMuted={isBackgroundMuted}
                    onToggleMute={toggleBackgroundMute}
                    isDark={isDark}
                    onToggleDarkMode={toggleTheme}
                    showDarkModeToggle={true}
                    showFullscreenToggle={true}
                    className="absolute bottom-4 left-4"
                />

                <div className="flex flex-col items-center -mt-20">
                    <div className="text-center px-4 mb-10">
                        <div className="inline-block bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-white/60 dark:border-gray-700/50 rounded-2xl shadow-2xl px-10 py-7">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                Pengelolaan Uji Kompetensi dan Sertifikasi
                                Bidang Keuangan Negara
                            </h1>
                            <div
                                className={`w-24 h-1 mx-auto mt-4 mb-3 rounded-full bg-gradient-to-r ${
                                    isDark
                                        ? 'from-orange-500 to-orange-700'
                                        : 'from-blue-500 to-blue-700'
                                }`}
                            />
                            <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 tracking-wide">
                                <i>E-Learning</i> Pemahaman Tugas dan Fungsi
                                Pegawai BPPK
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleClick(onStart)}
                        className={`shimmer-btn px-10 py-4 font-bold text-2xl rounded-full shadow-lg transition cursor-pointer
                            ${
                                isDark
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white shadow-orange-500/25'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-blue-500/30'
                            }
                        `}
                    >
                        MULAI
                    </button>
                </div>
            </div>
        </>
    )
}

export default OpeningScreen
