// src/components/DeveloperScreen.tsx
import React, { useEffect } from 'react'

interface DeveloperScreenProps {
    onClose: () => void
}

const DeveloperScreen: React.FC<DeveloperScreenProps> = ({ onClose }) => {
    useEffect(() => {
        const style = document.createElement('style')
        style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="relative w-full h-full overflow-hidden">
                {/* Marquee */}
                <div
                    className="flex h-full items-center"
                    style={{
                        width: 'max-content',
                        animation: 'marquee 30s linear infinite',
                    }}
                >
                    <img
                        src="./images/ptp-kemenkeu.webp"
                        alt="PTP Kemenkeu"
                        className="h-full w-auto"
                    />
                    <img
                        src="./images/ptp-kemenkeu.webp"
                        alt="PTP Kemenkeu"
                        className="h-full w-auto"
                    />
                </div>

                {/* Teks pengembang */}
                <div className="absolute tracking-wider bg-black/50 w-full top-4/6 left-1/2 transform -translate-x-1/2 z-10 text-center text-white pointer-events-none pt-2 pb-4">
                    <p className="text-sm md:text-base">
                        <i>E-Learning</i> ini dibangun oleh:
                    </p>
                    <p className="text-2xl md:text-3xl font-bold mb-2">
                        Pengembang Teknologi Pembelajaran
                    </p>
                    <p className="text-xl md:text-2xl font-bold">
                        Badan Pendidikan dan Pelatihan Keuangan - Kementerian
                        Keuangan
                    </p>
                </div>

                {/* Tombol tutup dengan title */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold transition-colors"
                    aria-label="Tutup"
                    title="Tutup"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}

export default DeveloperScreen
