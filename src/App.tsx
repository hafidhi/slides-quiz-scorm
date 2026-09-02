// src/App.tsx
import { useState, useCallback, useEffect, useRef } from 'react'
import { AudioProvider } from './context/AudioContext'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/LoadingScreen'
import IntroScreen from './screens/IntroScreen'
import OpeningScreen from './screens/OpeningScreen'
import TutorialScreen from './screens/TutorialScreen'
import EndScreen from './screens/EndScreen'
import SlideContainer from './components/SlideContainer'
import { groups, type SlideConfigItem } from './slides/groupConfig'
import { APP_TITLE } from './globalConfig'
import { sendXAPIStatement } from './utils/xapi'
import { extractUserData } from './utils/userDataExtractor'

type Screen =
    | 'loading'
    | 'intro'
    | 'opening'
    | 'tutorial'
    | 'slide'
    | 'quiz'
    | 'end'

// Gunakan __BUILD_ID__ yang akan di-define saat build
const STORAGE_KEY = `app_state_${__BUILD_ID__}`

interface SavedState {
    screen: Screen
    groupIndex?: number
    slideIndex?: number
    quizIndex?: number
}

const getSavedState = (): SavedState | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            const validScreens: Screen[] = [
                'intro',
                'opening',
                'tutorial',
                'slide',
                'quiz',
                'end',
            ]
            if (parsed && validScreens.includes(parsed.screen)) {
                return {
                    screen: parsed.screen,
                    groupIndex:
                        typeof parsed.groupIndex === 'number'
                            ? parsed.groupIndex
                            : undefined,
                    slideIndex:
                        typeof parsed.slideIndex === 'number'
                            ? parsed.slideIndex
                            : undefined,
                    quizIndex:
                        typeof parsed.quizIndex === 'number'
                            ? parsed.quizIndex
                            : undefined,
                }
            }
        }
    } catch {}
    return null
}

const App: React.FC = () => {
    const savedState = getSavedState()
    const [screen, setScreen] = useState<Screen>(
        savedState?.screen ?? 'loading',
    )
    const [currentGroupIndex, setCurrentGroupIndex] = useState(
        savedState?.groupIndex ?? 0,
    )
    const [slideIndex, setSlideIndex] = useState(savedState?.slideIndex ?? 0)
    const [quizIndex, setQuizIndex] = useState(savedState?.quizIndex ?? 0)
    const [isUserDataReady, setIsUserDataReady] = useState(false)

    const initializedSent = useRef(false)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await extractUserData()
            if (userData)
                localStorage.setItem('user_data', JSON.stringify(userData))
            setIsUserDataReady(true)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        if (screen !== 'loading') {
            const toSave: any = {
                screen,
                groupIndex: currentGroupIndex,
                slideIndex,
            }
            if (screen === 'quiz') toSave.quizIndex = quizIndex
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
        }
    }, [screen, currentGroupIndex, slideIndex, quizIndex])

    const handleLoaded = useCallback(async () => {
        if (!initializedSent.current) {
            initializedSent.current = true
            try {
                await sendXAPIStatement('initialized')
            } catch (err) {
                console.error(err)
            }
        }
        setScreen('intro')
    }, [])

    // xAPI opening, tutorial, end
    useEffect(() => {
        if (screen === 'opening') {
            sendXAPIStatement('experienced', {
                object: {
                    id: 'screen-opening',
                    definition: { name: { 'en-US': 'OpeningScreen' } },
                },
            })
        } else if (screen === 'tutorial') {
            sendXAPIStatement('experienced', {
                object: {
                    id: 'screen-tutorial',
                    definition: { name: { 'en-US': 'TutorialScreen' } },
                },
            })
        } else if (screen === 'end') {
            sendXAPIStatement('mastered', {
                object: {
                    id: 'screen-end',
                    definition: { name: { 'en-US': 'EndScreen' } },
                },
            })
        }
    }, [screen])

    const totalSlidesInGroup = groups[currentGroupIndex]?.slides.length ?? 0

    const handleNextSlide = useCallback(() => {
        if (slideIndex < totalSlidesInGroup - 1) setSlideIndex(slideIndex + 1)
    }, [slideIndex, totalSlidesInGroup])

    const handlePrevSlide = useCallback(() => {
        if (slideIndex > 0) setSlideIndex(slideIndex - 1)
    }, [slideIndex])

    const handleCompleteTopic = useCallback(() => {
        if (slideIndex === totalSlidesInGroup - 1) {
            setScreen('quiz')
            setQuizIndex(0)
        }
    }, [slideIndex, totalSlidesInGroup])

    const handleQuizComplete = useCallback(() => {
        if (currentGroupIndex < groups.length - 1) {
            setCurrentGroupIndex((prev) => prev + 1)
            setSlideIndex(0)
            setScreen('slide')
        } else {
            setScreen('end')
        }
    }, [currentGroupIndex])

    const handleGoToSlideGroup = useCallback(() => {
        // dipanggil saat user gagal quiz dan ingin belajar ulang
        setSlideIndex(0)
        setScreen('slide')
    }, [])

    const handleGoOpening = useCallback(() => {
        setScreen('opening')
    }, [])

    const handleStartTutorial = () => {
        setCurrentGroupIndex(0)
        setSlideIndex(0)
        setScreen('tutorial')
    }

    const handleUnderstandTutorial = () => {
        setCurrentGroupIndex(0)
        setSlideIndex(0)
        setScreen('slide')
    }

    // Dapatkan slide yang hanya milik grup aktif
    const currentGroupSlides: SlideConfigItem[] =
        groups[currentGroupIndex]?.slides ?? []

    if (!isUserDataReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-lg text-gray-600">Memuat data peserta...</p>
            </div>
        )
    }

    return (
        <ThemeProvider>
            <AudioProvider>
                {screen === 'loading' && (
                    <LoadingScreen onLoaded={handleLoaded} />
                )}
                {screen === 'intro' && (
                    <IntroScreen onEnter={() => setScreen('opening')} />
                )}
                {screen === 'opening' && (
                    <OpeningScreen onStart={handleStartTutorial} />
                )}
                {screen === 'tutorial' && (
                    <TutorialScreen onUnderstand={handleUnderstandTutorial} />
                )}
                {screen === 'slide' && (
                    <SlideContainer
                        SlideComponent={
                            currentGroupSlides[slideIndex]?.component
                        }
                        currentIndex={slideIndex}
                        totalSlides={totalSlidesInGroup}
                        onPrev={handlePrevSlide}
                        onNext={handleNextSlide}
                        onCompleteTopic={handleCompleteTopic}
                        accessibleSlides={currentGroupSlides}
                        onNavigateToSlide={(index) => setSlideIndex(index)}
                        onGoOpening={handleGoOpening}
                        appTitle={APP_TITLE}
                        groupIndex={currentGroupIndex} // 🔁 tambahan
                    />
                )}
                {screen === 'quiz' &&
                    (() => {
                        const QuizComponent =
                            groups[currentGroupIndex].quizComponent
                        return (
                            <QuizComponent
                                onQuizComplete={handleQuizComplete}
                                onGoOpening={handleGoOpening}
                                appTitle={`Kuis Grup ${currentGroupIndex + 1} - ${APP_TITLE}`}
                                onGoToSlideGroup={handleGoToSlideGroup}
                                onFooterHome={handleGoToSlideGroup}
                                groupIndex={currentGroupIndex} // 🔁 tambahan
                            />
                        )
                    })()}
                {screen === 'end' && (
                    <EndScreen onGoOpening={handleGoOpening} />
                )}
            </AudioProvider>
        </ThemeProvider>
    )
}

export default App
