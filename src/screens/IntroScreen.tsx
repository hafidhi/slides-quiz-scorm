// src/components/IntroScreen.tsx
import { useRef, useState, useEffect } from 'react'
import { useInteraction } from '../hooks/useInteraction'

interface UserData {
    name: string
    email: string
    photoUrl: string
}

interface IntroScreenProps {
    onEnter: () => void
}

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 0) return ''
    const first = parts[0].charAt(0).toUpperCase()
    const last =
        parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : ''
    return first + last
}

const getGreeting = (): string => {
    const hour = new Date().getHours()
    if (hour < 10) return 'Selamat Pagi'
    if (hour < 15) return 'Selamat Siang'
    if (hour < 18) return 'Selamat Sore'
    return 'Selamat Malam'
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [showButton, setShowButton] = useState(false)
    const [userData, setUserData] = useState<UserData | null>(null)
    const { handleClick } = useInteraction()

    // Ambil data pengguna dari localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('user_data')
            if (stored) {
                const parsed = JSON.parse(stored) as UserData
                if (parsed.name && parsed.email) {
                    setUserData(parsed)
                }
            }
        } catch (e) {
            console.warn('Gagal membaca user_data dari localStorage', e)
        }
    }, [])

    // Tampilkan tombol saat video mendekati akhir (4 detik sebelum selesai)
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            if (video.duration && video.duration - video.currentTime <= 4) {
                setShowButton(true)
            }
        }

        video.addEventListener('timeupdate', handleTimeUpdate)
        return () => video.removeEventListener('timeupdate', handleTimeUpdate)
    }, [])

    // Tentukan apakah foto harus diganti dengan inisial
    const useInitials =
        userData?.photoUrl && userData.photoUrl.toLowerCase().includes('upload')

    const greeting = getGreeting()

    return (
        <div className="relative h-screen w-screen bg-black">
            {/* Animasi shimmer untuk tombol */}
            <style>{`
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.3) 50%,
                        transparent 100%
                    );
                    transform: rotate(-10deg);
                    animation: shimmer-loop 2s infinite;
                }
                @keyframes shimmer-loop {
                    0% {
                        transform: rotate(-10deg) translateX(-100%);
                    }
                    100% {
                        transform: rotate(-10deg) translateX(100%);
                    }
                }
            `}</style>

            {/* Video latar */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="./screens-data/intro/video.mp4"
                autoPlay
                muted
                playsInline
            />

            {/* Panel informasi & tombol (muncul setelah video hampir selesai) – SEKARANG DI BAWAH */}
            {showButton && userData && (
                <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-8 pb-16">
                    <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-4 items-center">
                        {/* Kolom kiri (9/12) – TEKS HITAM */}
                        <div className="col-span-9 flex items-center gap-5">
                            {/* Avatar / Inisial */}
                            {useInitials ? (
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                                    {getInitials(userData.name)}
                                </div>
                            ) : (
                                <img
                                    src={userData.photoUrl}
                                    alt={userData.name}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/50 shadow-lg"
                                    onError={(e) => {
                                        const target = e.currentTarget
                                        target.style.display = 'none'
                                        const parent = target.parentElement
                                        if (parent) {
                                            const fallback =
                                                document.createElement('div')
                                            fallback.className =
                                                'w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center text-white text-2xl md:text-3xl font-bold'
                                            fallback.textContent = getInitials(
                                                userData.name,
                                            )
                                            parent.appendChild(fallback)
                                        }
                                    }}
                                />
                            )}

                            {/* Teks sapaan & nama – SEKARANG HITAM */}
                            <div className="text-black">
                                <p className="text-lg md:text-xl lg:text-2xl font-light mb-1">
                                    {greeting}, Sobat Pembelajar!
                                </p>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    {userData.name}
                                </h1>
                            </div>
                        </div>

                        {/* Kolom kanan (3/12) – tombol MULAI */}
                        <div className="col-span-3 flex justify-end">
                            <button
                                onClick={handleClick(onEnter)}
                                className="relative overflow-hidden px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-full shadow-lg transition cursor-pointer tracking-[0.2em] shimmer"
                            >
                                MULAI
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default IntroScreen
