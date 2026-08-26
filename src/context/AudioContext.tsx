// src/context/AudioContext.tsx
import {
    createContext,
    useContext,
    useRef,
    useState,
    useCallback,
    useEffect,
} from 'react'
import type { ReactNode } from 'react'

const STORAGE_KEY = `app_state_${window.location.pathname}`

interface AudioContextType {
    isBackgroundMuted: boolean
    toggleBackgroundMute: () => void
    volumeNarasi: number
    setVolumeNarasi: (v: number) => void
    playClick: () => void
    startBackground: () => void
    isOpenerMuted: boolean
    toggleOpenerMute: () => void
}

const AudioContext = createContext<AudioContextType>({
    isBackgroundMuted: false,
    toggleBackgroundMute: () => {},
    volumeNarasi: 0.7,
    setVolumeNarasi: () => {},
    playClick: () => {},
    startBackground: () => {},
    isOpenerMuted: false,
    toggleOpenerMute: () => {},
})

export const useAudio = () => useContext(AudioContext)

const getSavedMuteState = (): boolean => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            if (typeof parsed.isBackgroundMuted === 'boolean') {
                return parsed.isBackgroundMuted
            }
        }
    } catch {
        // ignore
    }
    return false // default tidak di-mute
}

const saveMuteState = (muted: boolean) => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        let state: any = {}
        if (saved) {
            state = JSON.parse(saved)
        }
        state.isBackgroundMuted = muted
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
        // ignore
    }
}

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isBackgroundMuted, setIsBackgroundMuted] =
        useState(getSavedMuteState)
    const [volumeNarasi, setVolumeNarasi] = useState(1)
    const [isOpenerMuted, setIsOpenerMuted] = useState(false)
    const bgAudioRef = useRef<HTMLAudioElement | null>(null)
    const clickAudioRef = useRef<HTMLAudioElement | null>(null)

    const toggleBackgroundMute = useCallback(() => {
        setIsBackgroundMuted((prev) => {
            const newVal = !prev
            if (bgAudioRef.current) bgAudioRef.current.muted = newVal
            saveMuteState(newVal) // simpan ke localStorage
            return newVal
        })
    }, [])

    const startBackground = useCallback(() => {
        if (!bgAudioRef.current) {
            bgAudioRef.current = new Audio('./audios/background.wav')
            bgAudioRef.current.loop = true
            bgAudioRef.current.volume = 0.03
            bgAudioRef.current.muted = isBackgroundMuted
        }
        if (bgAudioRef.current.paused) {
            bgAudioRef.current.play().catch(() => {})
        }
    }, [isBackgroundMuted])

    const playClick = useCallback(() => {
        if (!clickAudioRef.current) {
            clickAudioRef.current = new Audio('./audios/mouse-click.wav')
        }
        clickAudioRef.current.currentTime = 0
        clickAudioRef.current.play().catch(() => {})
    }, [])

    const toggleOpenerMute = useCallback(() => {
        setIsOpenerMuted((prev) => !prev)
    }, [])

    // Sinkronkan mute ke audio jika bgAudioRef sudah ada (mis. saat state berubah)
    useEffect(() => {
        if (bgAudioRef.current) {
            bgAudioRef.current.muted = isBackgroundMuted
        }
    }, [isBackgroundMuted])

    return (
        <AudioContext.Provider
            value={{
                isBackgroundMuted,
                toggleBackgroundMute,
                volumeNarasi,
                setVolumeNarasi,
                playClick,
                startBackground,
                isOpenerMuted,
                toggleOpenerMute,
            }}
        >
            {children}
        </AudioContext.Provider>
    )
}
