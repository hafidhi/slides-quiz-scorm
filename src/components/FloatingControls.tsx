// src/components/FloatingControls.tsx
import { useState, useEffect } from 'react'
import { GiSoundOn, GiSoundOff } from 'react-icons/gi'
import { FaSun, FaMoon, FaExpand, FaCompress } from 'react-icons/fa'
import { useInteraction } from '../hooks/useInteraction'

// --- Tooltip dengan align left (untuk grup kiri bawah) ---
interface TooltipProps {
    text: string
    children: React.ReactNode
}
const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [visible, setVisible] = useState(false)

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <span className="absolute bottom-full left-0 mb-2 z-50 w-auto min-w-[200px] max-w-xs sm:max-w-sm p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[10px] sm:text-xs rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center leading-relaxed pointer-events-none before:content-[''] before:absolute before:top-full before:left-4 before:border-4 before:border-transparent before:border-t-white dark:before:border-t-gray-800">
                    {text}
                </span>
            )}
        </span>
    )
}

interface FloatingControlsProps {
    isMuted: boolean
    onToggleMute: () => void
    isDark?: boolean
    onToggleDarkMode?: () => void
    showDarkModeToggle?: boolean
    showFullscreenToggle?: boolean // ← properti baru
    className?: string
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
    isMuted,
    onToggleMute,
    isDark = false,
    onToggleDarkMode,
    showDarkModeToggle = false,
    showFullscreenToggle = false, // default false
    className = '',
}) => {
    const { handleClick } = useInteraction()

    // Status fullscreen disinkronkan dengan keadaan nyata browser
    const [isFullscreen, setIsFullscreen] = useState(
        typeof document !== 'undefined' && !!document.fullscreenElement,
    )

    useEffect(() => {
        const handleFsChange = () =>
            setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', handleFsChange)
        return () =>
            document.removeEventListener('fullscreenchange', handleFsChange)
    }, [])

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen?.()
        } else {
            document.documentElement.requestFullscreen()
        }
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Tombol Suara – tooltip rata kiri */}
            <Tooltip text="Matikan / Nyalakan Suara Latar Belakang">
                <button
                    onClick={handleClick(onToggleMute)}
                    className="p-2 bg-gray-800/50 rounded-full text-white cursor-pointer hover:bg-gray-700 transition"
                    aria-label={isMuted ? 'Suarakan latar' : 'Bisukan latar'}
                >
                    {isMuted ? (
                        <GiSoundOff className="w-5 h-5" />
                    ) : (
                        <GiSoundOn className="w-5 h-5" />
                    )}
                </button>
            </Tooltip>

            {showDarkModeToggle && onToggleDarkMode && (
                <Tooltip text="Tampilkan Tema Terang / Gelap">
                    <button
                        onClick={handleClick(onToggleDarkMode)}
                        className="p-2 bg-gray-800/50 rounded-full text-white cursor-pointer hover:bg-gray-700 transition"
                        aria-label={isDark ? 'Mode terang' : 'Mode gelap'}
                    >
                        {isDark ? (
                            <FaSun className="w-5 h-5" />
                        ) : (
                            <FaMoon className="w-5 h-5" />
                        )}
                    </button>
                </Tooltip>
            )}

            {/* Tombol Fullscreen – muncul jika showFullscreenToggle true */}
            {showFullscreenToggle && (
                <Tooltip text="Masuk / Keluar Fullscreen">
                    <button
                        onClick={handleClick(toggleFullscreen)}
                        className="p-2 bg-gray-800/50 rounded-full text-white cursor-pointer hover:bg-gray-700 transition"
                        aria-label={
                            isFullscreen
                                ? 'Keluar fullscreen'
                                : 'Masuk fullscreen'
                        }
                    >
                        {isFullscreen ? (
                            <FaCompress className="w-5 h-5" />
                        ) : (
                            <FaExpand className="w-5 h-5" />
                        )}
                    </button>
                </Tooltip>
            )}
        </div>
    )
}

export default FloatingControls
