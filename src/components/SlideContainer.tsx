// src/components/SlideContainer.tsx
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import type { ComponentType } from 'react'
import SlideContainerHeader from './SlideContainerHeader'
import SlideContainerFooter from './SlideContainerFooter'
import SlideContainerNavLeft from './SlideContainerNavLeft'
import SlideContainerNavRight from './SlideContainerNavRight'
import SlideContainerModalSearch from './SlideContainerModalSearch'
import FloatingControls from './FloatingControls'
import DeveloperScreen from './DeveloperScreen'
import { useTheme } from '../context/ThemeContext'
import { useAudio } from '../context/AudioContext'
import { sendXAPIStatement } from '../utils/xapi'
import { captureAndSave } from '../utils/screenshotCapture'
import { screenshotEnabled } from '../globalConfig'

export interface SlideItem {
    component: ComponentType<any>
    topicIndex: number
    slideIndex: number
    searchText: string
}

interface SlideContainerProps {
    SlideComponent: ComponentType<any>
    currentIndex: number
    totalSlides: number
    onPrev: () => void
    onNext: () => void
    onCompleteTopic?: () => void
    accessibleSlides: SlideItem[]
    onNavigateToSlide: (index: number) => void
    onGoOpening: () => void
    appTitle: string
    groupIndex: number
}

const SlideContainer: React.FC<SlideContainerProps> = ({
    SlideComponent,
    currentIndex,
    totalSlides,
    onPrev,
    onNext,
    onCompleteTopic,
    accessibleSlides,
    onNavigateToSlide,
    onGoOpening,
    appTitle,
    groupIndex,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(
        !!document.fullscreenElement,
    )
    const [navRightForced, setNavRightForced] = useState(false)
    const [navLeftForced, setNavLeftForced] = useState(false)
    const [isDevScreenOpen, setIsDevScreenOpen] = useState(false)

    const { isDark, toggleTheme } = useTheme()
    const {
        volumeNarasi,
        setVolumeNarasi,
        isOpenerMuted,
        toggleOpenerMute,
        isBackgroundMuted,
        toggleBackgroundMute,
        playClick,
        startBackground,
    } = useAudio()

    const audioOpenerRef = useRef<HTMLAudioElement | null>(null)
    const lastReportedSlideRef = useRef<number | null>(null)

    useEffect(() => {
        startBackground()
    }, [startBackground])

    // xAPI experienced setiap slide
    useEffect(() => {
        if (lastReportedSlideRef.current !== currentIndex) {
            sendXAPIStatement('experienced', {
                object: {
                    id: `slide-${currentIndex + 1}`,
                    definition: {
                        name: { 'en-US': `Slide ${currentIndex + 1}` },
                    },
                },
                context: {
                    extensions: {
                        slideNumber: currentIndex + 1,
                        totalSlides: totalSlides,
                        screen: 'SlideContainer',
                    },
                },
            })
            lastReportedSlideRef.current = currentIndex
        }
    }, [currentIndex, totalSlides])

    // Autoscreenshot setelah 2 detik, hanya jika screenshotEnabled true
    useEffect(() => {
        if (!screenshotEnabled) return
        const timer = setTimeout(() => {
            captureAndSave(currentIndex)
        }, 2000)
        return () => clearTimeout(timer)
    }, [currentIndex])

    const filteredSlides = useMemo(() => {
        if (!searchTerm.trim()) return []
        const term = searchTerm.toLowerCase()
        return accessibleSlides.filter((slide) =>
            slide.searchText.toLowerCase().includes(term),
        )
    }, [searchTerm, accessibleSlides])

    useEffect(() => {
        setNavRightForced(false)
        setNavLeftForced(false)
    }, [currentIndex])

    useEffect(() => {
        const root = document.documentElement
        if (isDark) root.classList.add('dark')
        else root.classList.remove('dark')
    }, [isDark])

    useEffect(() => {
        const handleFsChange = () =>
            setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', handleFsChange)
        return () =>
            document.removeEventListener('fullscreenchange', handleFsChange)
    }, [])

    // ===== Perbaikan: opener.mp3 berdasarkan groupIndex =====
    useEffect(() => {
        if (audioOpenerRef.current) {
            audioOpenerRef.current.pause()
            audioOpenerRef.current.currentTime = 0
        }

        const slideNumber = currentIndex + 1
        const audio = new Audio(
            `./slides-data/group-${groupIndex + 1}/${slideNumber}/opener.mp3`,
        )
        audio.volume = volumeNarasi
        audio.muted = isOpenerMuted

        audio.play().catch(() => {})

        audioOpenerRef.current = audio

        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    }, [currentIndex, groupIndex]) // tambahkan groupIndex sebagai dependensi

    useEffect(() => {
        if (audioOpenerRef.current) {
            audioOpenerRef.current.volume = volumeNarasi
            audioOpenerRef.current.muted = isOpenerMuted
        }
    }, [volumeNarasi, isOpenerMuted])

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setVolumeNarasi(parseFloat(e.target.value))

    const handleSearch = () => {
        if (searchTerm.trim()) setIsModalOpen(true)
    }

    const handleNavigateFromSearch = (slide: SlideItem) => {
        onNavigateToSlide(slide.slideIndex)
        setIsModalOpen(false)
        setSearchTerm('')
    }

    const SlideComponentWithProps = useCallback(() => {
        return (
            <SlideComponent
                onComplete={onCompleteTopic}
                slideIndex={currentIndex}
            />
        )
    }, [SlideComponent, onCompleteTopic, currentIndex])

    const handleNextSlide = useCallback(() => {
        if (currentIndex < totalSlides - 1) {
            onNext()
        }
    }, [currentIndex, totalSlides, onNext])

    const handlePrevSlide = useCallback(() => {
        if (currentIndex > 0) {
            onPrev()
        }
    }, [currentIndex, onPrev])

    const handleOpenDevScreen = useCallback(() => {
        playClick()
        sendXAPIStatement('interacted', {
            object: {
                id: 'dev-screen',
                definition: { name: { 'en-US': 'DeveloperScreen' } },
            },
        })
        setIsDevScreenOpen(true)
    }, [playClick])

    const handleCloseDevScreen = useCallback(() => {
        playClick()
        setIsDevScreenOpen(false)
    }, [playClick])

    const handleFooterHome = useCallback(() => {
        onNavigateToSlide(0)
    }, [onNavigateToSlide])

    const backgroundImage = useMemo(() => {
        if (groupIndex === 0) {
            return isDark
                ? './images/background-slide/group1-dark.png'
                : './images/background-slide/group1-light.png'
        } else if (groupIndex === 1) {
            return isDark
                ? './images/background-slide/group2-dark.png'
                : './images/background-slide/group2-light.png'
        }
        return isDark
            ? './images/background-slide-1.png'
            : './images/background-slide-2.png'
    }, [groupIndex, isDark])

    return (
        <div
            className="relative h-dvh w-screen overflow-hidden bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/30 dark:bg-white/10" />
            <div className="relative z-10 h-full flex flex-col">
                <SlideContainerHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    onSearchKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    onOpenDevScreen={handleOpenDevScreen}
                    appTitle={appTitle}
                    topicTitle=""
                    onHome={onGoOpening}
                />

                <div className="flex-1 flex items-center justify-center">
                    <SlideComponentWithProps />
                </div>

                <FloatingControls
                    isMuted={isBackgroundMuted}
                    onToggleMute={toggleBackgroundMute}
                    showDarkModeToggle={false}
                    className="absolute bottom-16 left-4 z-50"
                />

                <SlideContainerFooter
                    isDark={isDark}
                    toggleDarkMode={toggleTheme}
                    isFullscreen={isFullscreen}
                    toggleFullscreen={() => {
                        if (!document.fullscreenElement) {
                            document.documentElement.requestFullscreen()
                        } else {
                            document.exitFullscreen?.()
                        }
                    }}
                    volumeNarasi={volumeNarasi}
                    onVolumeChange={handleVolumeChange}
                    onHome={handleFooterHome}
                    isOpenerMuted={isOpenerMuted}
                    onToggleOpenerMute={toggleOpenerMute}
                />

                <SlideContainerNavLeft
                    visible={currentIndex > 0}
                    onClick={handlePrevSlide}
                    forceVisible={navLeftForced}
                />
                <SlideContainerNavRight
                    visible={currentIndex < totalSlides - 1}
                    onClick={handleNextSlide}
                    forceVisible={navRightForced}
                />
            </div>

            {isModalOpen && (
                <SlideContainerModalSearch
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    filteredSlides={filteredSlides}
                    onNavigate={handleNavigateFromSearch}
                />
            )}

            {isDevScreenOpen && (
                <DeveloperScreen onClose={handleCloseDevScreen} />
            )}
        </div>
    )
}

export default SlideContainer
