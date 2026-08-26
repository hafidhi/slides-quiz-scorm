// src/components/FloatingIcons.tsx
import React from 'react'

interface FloatingIconsProps {
    className?: string
    icon1Src?: string
    icon2Src?: string
}

const FloatingIcons: React.FC<FloatingIconsProps> = ({
    className = '',
    icon1Src = './images/icon1.webp',
    icon2Src = './images/icon2.webp',
}) => {
    return (
        <div
            className={`fixed top-[min(1vw,1vh)] left-[min(1vw,1vh)] z-40 flex items-center gap-[min(0.5vw,0.5vh)] px-[min(1vw,1vh)] py-[min(0.5vw,0.5vh)] rounded-[min(0.5vw,0.5vh)] 
                  bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md 
                  border border-gray-200/50 dark:border-gray-700/50 ${className}`}
        >
            <img
                src={icon1Src}
                alt="Floating icon 1"
                className="w-[min(6vw,6vh)] h-[min(6vw,6vh)] rounded object-contain"
            />
            <img
                src={icon2Src}
                alt="Floating icon 2"
                className="w-[min(6vw,6vh)] h-[min(6vw,6vh)] rounded object-contain"
            />
        </div>
    )
}

export default FloatingIcons
