// src/components/SlideContainerNavRight.tsx
import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useInteraction } from '../hooks/useInteraction'

interface SlideContainerNavRightProps {
    visible: boolean
    onClick: () => void
    forceVisible?: boolean
}

const SlideContainerNavRight: React.FC<SlideContainerNavRightProps> = ({
    visible,
    onClick,
    forceVisible = false,
}) => {
    const { isDark } = useTheme()
    const { handleClick } = useInteraction()
    const [tooltipVisible, setTooltipVisible] = useState(false)

    if (!visible) return null

    return (
        <div
            className="absolute right-0 top-16 bottom-16 w-20 group z-20"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
        >
            <button
                onClick={handleClick(onClick)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-opacity duration-300 cursor-pointer ${
                    forceVisible
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
                } ${
                    isDark
                        ? 'bg-gray-800/70 hover:bg-gray-800/90 text-white'
                        : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
                aria-label="Slide berikutnya"
            >
                <FaChevronRight className="w-5 h-5" />
                {/* Tooltip muncul di bawah tombol, rata kanan */}
                {tooltipVisible && (
                    <span
                        className={`absolute top-full right-0 mt-2 z-50 w-auto min-w-[160px] max-w-[200px] p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-[10px] sm:text-xs rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center leading-relaxed pointer-events-none 
                        before:content-[''] before:absolute before:bottom-full before:right-3 before:border-4 before:border-transparent before:border-b-white dark:before:border-b-gray-800`}
                    >
                        Slide Selanjutnya
                    </span>
                )}
            </button>
        </div>
    )
}

export default SlideContainerNavRight
