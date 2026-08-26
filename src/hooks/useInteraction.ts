// src/hooks/useInteraction.ts

import { useCallback } from 'react'
import { useAudio } from '../context/AudioContext'

export const useInteraction = () => {
    const { playClick } = useAudio()

    const handleClick = useCallback(
        (callback?: () => void) => (e?: React.MouseEvent) => {
            e?.stopPropagation?.()
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {})
            }
            playClick()
            callback?.()
        },
        [playClick],
    )

    return { handleClick }
}
