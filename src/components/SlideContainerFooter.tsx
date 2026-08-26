// src/components/SlideContainerFooter.tsx
import { useState } from 'react'
import {
    FaHome,
    FaVolumeUp,
    FaVolumeMute,
    FaSun,
    FaMoon,
    FaExpand,
    FaCompress,
} from 'react-icons/fa'
import { useInteraction } from '../hooks/useInteraction'

// --- Komponen Tooltip untuk footer (muncul ke atas) ---
interface TooltipProps {
    text: string
    children: React.ReactNode
    align?: 'center' | 'right'
}
const TooltipTop: React.FC<TooltipProps> = ({
    text,
    children,
    align = 'center',
}) => {
    const [visible, setVisible] = useState(false)

    const tooltipPositionClass =
        align === 'right'
            ? 'left-auto right-0 translate-x-0'
            : 'left-1/2 -translate-x-1/2'

    // Panah di atas tooltip (mengarah ke bawah) – untuk align right panah di ujung kanan
    const arrowClass =
        align === 'right'
            ? "before:content-[''] before:absolute before:top-full before:right-3 before:border-4 before:border-transparent before:border-t-white dark:before:border-t-gray-800"
            : "before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-white dark:before:border-t-gray-800"

    return (
        <span
            className="relative inline-flex items-center" // ← diubah dari inline-block ke inline-flex items-center
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <span
                    className={`absolute bottom-full mb-2 z-50 w-auto min-w-[200px] max-w-xs sm:max-w-sm p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[10px] sm:text-xs rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center leading-relaxed pointer-events-none ${tooltipPositionClass} ${arrowClass}`}
                >
                    {text}
                </span>
            )}
        </span>
    )
}

interface SlideContainerFooterProps {
    isDark: boolean
    toggleDarkMode: () => void
    isFullscreen: boolean
    toggleFullscreen: () => void
    volumeNarasi: number
    onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onHome: () => void
    isOpenerMuted: boolean
    onToggleOpenerMute: () => void
}

const SlideContainerFooter: React.FC<SlideContainerFooterProps> = ({
    isDark,
    toggleDarkMode,
    isFullscreen,
    toggleFullscreen,
    volumeNarasi,
    onVolumeChange,
    onHome,
    isOpenerMuted,
    onToggleOpenerMute,
}) => {
    const { handleClick } = useInteraction()

    return (
        <div className="absolute bottom-0 left-0 w-full h-16 group z-20">
            <footer className="absolute bottom-0 left-0 w-full h-14 bg-gray-800 dark:bg-gray-200 flex items-center px-6 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <p className="text-sm">
                    Pusat Pendidikan dan Pelatihan Kepemimpinan dan Manajemen —
                    © 2026
                </p>
                <div className="ml-auto flex items-center gap-2">
                    {/* Tombol Home */}
                    <TooltipTop text="Kembali ke Slide 1">
                        <button
                            onClick={handleClick(onHome)}
                            className="p-1.5 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition cursor-pointer"
                            aria-label="Slide pertama"
                        >
                            <FaHome className="w-4 h-4" />
                        </button>
                    </TooltipTop>

                    {/* Volume narasi (slider) + tombol mute/unmute */}
                    <div className="group flex items-center gap-1">
                        <TooltipTop text="Matikan / Nyalakan Suara Narasi">
                            <button
                                onClick={handleClick(onToggleOpenerMute)}
                                className="p-1.5 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition cursor-pointer"
                                aria-label={
                                    isOpenerMuted
                                        ? 'Unmute narasi'
                                        : 'Mute narasi'
                                }
                            >
                                {isOpenerMuted ? (
                                    <FaVolumeMute className="w-4 h-4" />
                                ) : (
                                    <FaVolumeUp className="w-4 h-4" />
                                )}
                            </button>
                        </TooltipTop>

                        <TooltipTop text="Sesuaikan Tingkat Suara Narasi">
                            <span className="inline-flex items-center">
                                {' '}
                                {/* wrapper tetap inline-flex untuk jaga-jaga */}
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volumeNarasi}
                                    onChange={onVolumeChange}
                                    className="w-20 h-1 rounded-lg appearance-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                                            volumeNarasi * 100
                                        }%, ${
                                            isDark ? '#9ca3af' : '#6b7280'
                                        } ${volumeNarasi * 100}%, ${
                                            isDark ? '#9ca3af' : '#6b7280'
                                        } 100%)`,
                                    }}
                                    aria-label="Volume narasi"
                                />
                            </span>
                        </TooltipTop>
                    </div>

                    {/* Tombol dark mode – posisi agak kanan, pakai align right agar tooltip tidak terpotong */}
                    <TooltipTop
                        text="Tampilkan Tema Terang / Gelap"
                        align="right"
                    >
                        <button
                            onClick={handleClick(toggleDarkMode)}
                            className="p-1.5 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition cursor-pointer"
                            aria-label={isDark ? 'Mode terang' : 'Mode gelap'}
                        >
                            {isDark ? (
                                <FaSun className="w-4 h-4" />
                            ) : (
                                <FaMoon className="w-4 h-4" />
                            )}
                        </button>
                    </TooltipTop>

                    {/* Tombol fullscreen – paling kanan, wajib align right */}
                    <TooltipTop text="Toggle Full Screen" align="right">
                        <button
                            onClick={handleClick(toggleFullscreen)}
                            className="p-1.5 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition cursor-pointer"
                            aria-label={
                                isFullscreen
                                    ? 'Keluar fullscreen'
                                    : 'Masuk fullscreen'
                            }
                        >
                            {isFullscreen ? (
                                <FaCompress className="w-4 h-4" />
                            ) : (
                                <FaExpand className="w-4 h-4" />
                            )}
                        </button>
                    </TooltipTop>
                </div>
            </footer>
        </div>
    )
}

export default SlideContainerFooter
