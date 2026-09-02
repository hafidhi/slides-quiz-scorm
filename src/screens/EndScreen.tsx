// src/components/EndScreen.tsx
import { useState } from 'react'
import { useInteraction } from '../hooks/useInteraction'
import { useAudio } from '../context/AudioContext'
import { useTheme } from '../context/ThemeContext'
import FloatingControls from '../components/FloatingControls'
import { BsFillDoorOpenFill, BsFilePdf } from 'react-icons/bs'
import { APP_TITLE } from '../globalConfig'

interface EndScreenProps {
    onGoOpening?: () => void
}

const EndScreen: React.FC<EndScreenProps> = ({ onGoOpening }) => {
    const { isBackgroundMuted, toggleBackgroundMute } = useAudio()
    const { isDark, toggleTheme } = useTheme()
    const { handleClick } = useInteraction()
    const [isDownloading, setIsDownloading] = useState(false)

    const handleUnduhPDF = () => {
        setIsDownloading(true)
        try {
            const link = document.createElement('a')
            link.href = './screens-data/end/materi.pdf'
            link.download = `${APP_TITLE}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Gagal mengunduh PDF:', error)
            alert('Terjadi kesalahan saat mengunduh PDF. Silakan coba lagi.')
        } finally {
            setIsDownloading(false)
        }
    }

    const backgroundImage = isDark
        ? './screens-data/end/background-dark.png'
        : './screens-data/end/background-light.png'

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
                    transform: rotate(-45deg);
                    animation: shimmer 2s infinite;
                }
                .shimmer-btn::after {
                    background: linear-gradient(
                        135deg,
                        transparent 25%,
                        rgba(0, 0, 0, 0.15) 50%,
                        transparent 75%
                    );
                }
                .dark .shimmer-btn::after {
                    background: linear-gradient(
                        135deg,
                        transparent 25%,
                        rgba(255, 255, 255, 0.25) 50%,
                        transparent 75%
                    );
                }
            `}</style>

            <div
                className="h-screen w-screen flex flex-col items-center justify-center text-gray-900 dark:text-white relative"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="fixed top-4 left-4 z-20 flex gap-3">
                    {onGoOpening && (
                        <button
                            onClick={handleClick(onGoOpening)}
                            className="shimmer-btn flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer
                                bg-white/90 hover:bg-white text-gray-900 border border-gray-300/50
                                dark:bg-blue-600/90 dark:hover:bg-blue-700 dark:text-white dark:border-blue-400/50"
                        >
                            <BsFillDoorOpenFill className="text-xl text-gray-900 dark:text-white" />
                            <span className="text-sm font-semibold">
                                Kembali ke Materi
                            </span>
                        </button>
                    )}

                    <button
                        onClick={handleUnduhPDF}
                        disabled={isDownloading}
                        className="shimmer-btn flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer
                            bg-green-600 hover:bg-green-700 text-white border border-green-400/50
                            disabled:opacity-50 disabled:cursor-wait"
                    >
                        <BsFilePdf className="text-xl" />
                        <span className="text-sm font-semibold">
                            {isDownloading ? 'Mengunduh PDF...' : 'Unduh PDF'}
                        </span>
                    </button>
                </div>

                <FloatingControls
                    isMuted={isBackgroundMuted}
                    onToggleMute={toggleBackgroundMute}
                    isDark={isDark}
                    onToggleDarkMode={toggleTheme}
                    showDarkModeToggle={true}
                    showFullscreenToggle={true} // ← aktifkan
                    className="absolute bottom-4 left-4"
                />
            </div>
        </>
    )
}

export default EndScreen
