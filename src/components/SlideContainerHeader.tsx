// src/components/SlideContainerHeader.tsx
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useInteraction } from '../hooks/useInteraction'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { TbInfoOctagonFilled } from 'react-icons/tb'

interface TooltipProps {
    text: string
    children: React.ReactNode
    align?: 'center' | 'right'
}
const Tooltip: React.FC<TooltipProps> = ({
    text,
    children,
    align = 'center',
}) => {
    const [visible, setVisible] = useState(false)
    const tooltipPositionClass =
        align === 'right'
            ? 'left-auto right-0 translate-x-0'
            : 'left-1/2 -translate-x-1/2'
    const arrowClass =
        align === 'right'
            ? "before:content-[''] before:absolute before:bottom-full before:right-3 before:border-4 before:border-transparent before:border-b-white dark:before:border-b-gray-800"
            : "before:content-[''] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-white dark:before:border-b-gray-800"
    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <span
                    className={`absolute top-full mt-2 z-50 w-auto min-w-[200px] max-w-xs sm:max-w-sm p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[10px] sm:text-xs rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center leading-relaxed pointer-events-none ${tooltipPositionClass} ${arrowClass}`}
                >
                    {text}
                </span>
            )}
        </span>
    )
}

interface SlideContainerHeaderProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    onSearch: () => void
    onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onOpenDevScreen: () => void
    appTitle: string
    topicTitle?: string
    onHome: () => void
    showSearch?: boolean // ← tambahan
}

const SlideContainerHeader: React.FC<SlideContainerHeaderProps> = ({
    searchTerm,
    setSearchTerm,
    onSearch,
    onSearchKeyDown,
    onOpenDevScreen,
    appTitle,
    topicTitle,
    onHome,
    showSearch = true, // ← default true
}) => {
    const { handleClick } = useInteraction()

    return (
        <div className="absolute top-0 left-0 w-full h-16 group z-90">
            <header className="absolute top-0 left-0 w-full h-14 bg-gray-800 dark:bg-gray-200 flex items-center px-6 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{appTitle}</h2>
                    {topicTitle && (
                        <span className="text-sm text-gray-400 dark:text-gray-600">
                            |
                        </span>
                    )}
                    {topicTitle && (
                        <span className="text-sm font-medium text-gray-300 dark:text-gray-700">
                            {topicTitle}
                        </span>
                    )}
                </div>
                <div className="ml-auto flex items-center gap-2">
                    {/* Tombol Home */}
                    <Tooltip text="Kembali ke Opening Screen">
                        <button
                            onClick={handleClick(onHome)}
                            className="p-1.5 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition cursor-pointer"
                            aria-label="Kembali ke Opening Screen"
                        >
                            <BsFillDoorOpenFill className="w-4 h-4" />
                        </button>
                    </Tooltip>

                    {/* Hanya render input & tombol search jika showSearch true */}
                    {showSearch && (
                        <>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={onSearchKeyDown}
                                placeholder="Cari konten..."
                                className="bg-gray-700 dark:bg-gray-300 dark:text-gray-900 text-white rounded px-3 py-1 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <Tooltip
                                text="Cari konten dalam E-Learning"
                                align="right"
                            >
                                <button
                                    onClick={handleClick(onSearch)}
                                    className="p-1.5 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition cursor-pointer"
                                    aria-label="Cari"
                                >
                                    <FaSearch className="w-4 h-4" />
                                </button>
                            </Tooltip>
                        </>
                    )}

                    {/* Tombol Info (DeveloperScreen) */}
                    <Tooltip text="Tentang Pengembang" align="right">
                        <button
                            onClick={handleClick(onOpenDevScreen)}
                            className="p-1.5 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition cursor-pointer"
                            aria-label="Tentang Pengembang"
                        >
                            <TbInfoOctagonFilled className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>
            </header>
        </div>
    )
}

export default SlideContainerHeader
