// src/components/LoadingScreen.tsx

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
    onLoaded: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
    const [progress, setProgress] = useState(0)
    const [currentFile, setCurrentFile] = useState('')
    const [dots, setDots] = useState(0) // jumlah titik: 0,1,2,3

    // Animasi titik typing (looping setiap 500ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev + 1) % 4)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    // Preload aset
    useEffect(() => {
        const modules = import.meta.glob(
            '/public/**/*.{png,jpg,jpeg,gif,svg,mp4,mp3,wav,webm,ogg}',
        )
        const paths = Object.keys(modules).map((path) =>
            path.replace('/public/', './'),
        )
        let loaded = 0
        const total = paths.length

        if (total === 0) {
            onLoaded()
            return
        }

        const promises = paths.map(async (path) => {
            setCurrentFile(path) // tampilkan file yang sedang diproses
            try {
                await fetch(path)
            } catch {}
            loaded++
            setProgress(Math.round((loaded / total) * 100))
        })

        Promise.all(promises).then(() => onLoaded())
    }, [onLoaded])

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <div className="loader mb-4 text-xl font-semibold">
                    Memuat aset{'.'.repeat(dots)}
                </div>
                {/* Nama file yang sedang dimuat */}
                {currentFile && (
                    <div className="text-sm text-gray-400 mt-1 truncate max-w-xs mx-auto">
                        {currentFile}
                    </div>
                )}
                <div className="w-64 h-2 bg-gray-700 rounded overflow-hidden mt-4">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-2">{progress}%</p>
            </div>
        </div>
    )
}

export default LoadingScreen
