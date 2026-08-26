// src/quiz/QuizScreenBase.tsx
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import SlideContainerHeader from '../components/SlideContainerHeader'
import SlideContainerFooter from '../components/SlideContainerFooter'
import FloatingControls from '../components/FloatingControls'
import FloatingIcons from '../components/FloatingIcons'
import MatchingQuiz from './matchingQuiz'
import TrueFalseQuiz from './truefalseQuiz'
import OrderingQuiz from './orderingQuiz'
import MatchingMultipleQuiz from './MatchingMultipleQuiz'
import { useTheme } from '../context/ThemeContext'
import { useAudio } from '../context/AudioContext'
import { sendXAPIStatement } from '../utils/xapi'
import type { QuizQuestion } from './quizType'

interface QuizScreenBaseProps {
    onQuizComplete: () => void
    onGoOpening: () => void
    appTitle: string
    quizData: QuizQuestion[]
    onGoToSlideGroup?: () => void
    onFooterHome?: () => void
    groupIndex: number
}

const MAX_PER_TYPE: Record<string, number> = {
    matching: 2,
    truefalse: 3,
    ordering: 1,
    matchingMultiple: 1,
}

const selectRandomQuestions = (
    allQuestions: QuizQuestion[],
): QuizQuestion[] => {
    const grouped: Record<string, QuizQuestion[]> = {
        matching: [],
        truefalse: [],
        ordering: [],
        matchingMultiple: [],
    }
    allQuestions.forEach((q) => {
        if (grouped[q.type]) {
            grouped[q.type].push(q)
        }
    })
    const selected: QuizQuestion[] = []
    for (const [type, max] of Object.entries(MAX_PER_TYPE)) {
        const pool = grouped[type] || []
        const shuffled = [...pool].sort(() => Math.random() - 0.5)
        selected.push(...shuffled.slice(0, max))
    }
    return selected.sort(() => Math.random() - 0.5)
}

const QuizScreenBase: React.FC<QuizScreenBaseProps> = ({
    onQuizComplete,
    onGoOpening,
    appTitle,
    quizData,
    onGoToSlideGroup,
    onFooterHome,
    groupIndex,
}) => {
    const [questions] = useState(() => selectRandomQuestions(quizData))
    const totalQuiz = questions.length
    const [currentIndex, setCurrentIndex] = useState(0)
    const [submitted, setSubmitted] = useState<boolean[]>(
        Array(totalQuiz).fill(false),
    )
    const [finalAnswers, setFinalAnswers] = useState<
        (number[] | number[][] | null)[]
    >(Array(totalQuiz).fill(null))
    const [tempSelections, setTempSelections] = useState<
        (number[] | number[][])[]
    >(() =>
        questions.map((q) => {
            if (q.type === 'matchingMultiple') {
                return Array.from(
                    { length: q.statements.length },
                    () => [] as number[],
                )
            }
            if (q.type === 'truefalse') return [-1]
            return Array(q.statements.length).fill(-1)
        }),
    )
    const { isDark, toggleTheme } = useTheme()
    const {
        volumeNarasi,
        setVolumeNarasi,
        isOpenerMuted,
        toggleOpenerMute,
        isBackgroundMuted,
        toggleBackgroundMute,
        startBackground,
        playClick,
    } = useAudio()
    const [isFullscreen, setIsFullscreen] = useState(
        !!document.fullscreenElement,
    )

    const experiencedSent = useRef(false)
    useEffect(() => {
        if (!experiencedSent.current) {
            sendXAPIStatement('experienced', {
                object: {
                    id: 'quiz',
                    definition: { name: { 'en-US': 'Quiz' } },
                },
                context: {
                    extensions: {
                        screen: 'QuizScreen',
                        totalQuestions: totalQuiz,
                    },
                },
            })
            experiencedSent.current = true
        }
    }, [totalQuiz])

    const narasiAudioRef = useRef<HTMLAudioElement | null>(null)
    useEffect(() => {
        const audio = new Audio(
            `./quiz-data/group-${groupIndex + 1}/opener.mp3`,
        )
        audio.volume = volumeNarasi
        narasiAudioRef.current = audio
        if (!isOpenerMuted) audio.play().catch(() => {})
        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    }, [groupIndex])

    useEffect(() => {
        const audio = narasiAudioRef.current
        if (!audio) return
        audio.volume = volumeNarasi
        if (isOpenerMuted) audio.pause()
        else if (audio.paused) audio.play().catch(() => {})
    }, [isOpenerMuted, volumeNarasi])

    useEffect(() => {
        startBackground()
    }, [startBackground])
    useEffect(() => {
        const handler = () => {
            if (!document.fullscreenElement)
                document.documentElement.requestFullscreen().catch(() => {})
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])
    useEffect(() => {
        const fsHandler = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', fsHandler)
        return () => document.removeEventListener('fullscreenchange', fsHandler)
    }, [])

    const currentSelection = tempSelections[currentIndex]
    const handleSelectionChange = useCallback(
        (newSel: number[] | number[][]) => {
            setTempSelections((prev) => {
                const upd = [...prev]
                upd[currentIndex] = newSel
                return upd
            })
        },
        [currentIndex],
    )

    const allCompleted = tempSelections.every((sel, i) => {
        const q = questions[i]
        if (q.type === 'matchingMultiple') {
            const selArr = sel as number[][]
            return selArr.every((arr) => arr.length > 0)
        }
        const selArr = sel as number[]
        return !selArr.some((v) => v === -1)
    })

    const handleSubmitAll = useCallback(() => {
        if (!allCompleted) return
        playClick()
        const correctCount = tempSelections.reduce((count, sel, i) => {
            const q = questions[i]
            if (q.type === 'matchingMultiple') {
                const userSel = sel as number[][]
                const correct = q.correctAnswers as number[][]
                const allStmtCorrect = userSel.every((ansArr, stmtIdx) => {
                    const correctArr = correct[stmtIdx]
                    return (
                        ansArr.length === correctArr.length &&
                        ansArr.every((a) => correctArr.includes(a))
                    )
                })
                return allStmtCorrect ? count + 1 : count
            }
            if (q.type === 'ordering') {
                const correct = q.correctAnswers as number[]
                return (sel as number[]).every(
                    (ans, idx) => ans === correct[idx],
                )
                    ? count + 1
                    : count
            }
            // matching & truefalse
            const correct = q.correctAnswers as number[]
            return (sel as number[]).every((ans, idx) => ans === correct[idx])
                ? count + 1
                : count
        }, 0)
        const scorePercent = (correctCount / totalQuiz) * 100
        const passed = scorePercent >= 70
        sendXAPIStatement(passed ? 'passed' : 'failed', {
            object: {
                id: 'quiz-result',
                definition: { name: { 'en-US': 'Hasil Kuis' } },
            },
            result: {
                score: {
                    scaled: scorePercent / 100,
                    raw: correctCount,
                    max: totalQuiz,
                },
                success: passed,
            },
        })
        sendXAPIStatement('answered', {
            object: { id: 'quiz', definition: { name: { 'en-US': 'Quiz' } } },
            result: {
                success: passed,
                response: tempSelections
                    .map((sel, i) => {
                        const q = questions[i]
                        if (q.type === 'matchingMultiple') {
                            const arr = sel as number[][]
                            return arr
                                .map((ans) =>
                                    ans.length
                                        ? ans.map((a) => q.options[a]).join(',')
                                        : '-',
                                )
                                .join(' || ')
                        }
                        const arr = sel as number[]
                        return arr
                            .map((a) =>
                                a !== -1
                                    ? (q.options[a] ?? q.statements[a])
                                    : '-',
                            )
                            .join('; ')
                    })
                    .join(' |||| '),
            },
        })
        new Audio(passed ? '/audios/win.wav' : '/audios/lose.wav')
            .play()
            .catch(() => {})
        setSubmitted(Array(totalQuiz).fill(true))
        setFinalAnswers(
            tempSelections.map((sel) =>
                Array.isArray(sel[0])
                    ? [...(sel as number[][])]
                    : [...(sel as number[])],
            ) as any,
        )
    }, [allCompleted, tempSelections, totalQuiz, questions, playClick])

    const allSubmitted = submitted.every(Boolean)
    const correctCount = finalAnswers.reduce((c, ans, i) => {
        if (ans === null) return c
        const q = questions[i]
        if (q.type === 'matchingMultiple') {
            const userAns = ans as number[][]
            const correct = q.correctAnswers as number[][]
            const allCorrect = userAns.every(
                (arr, idx) =>
                    arr.length === correct[idx].length &&
                    arr.every((a) => correct[idx].includes(a)),
            )
            return allCorrect ? c + 1 : c
        }
        if (q.type === 'ordering') {
            const correct = q.correctAnswers as number[]
            return (ans as number[]).every((v, idx) => v === correct[idx])
                ? c + 1
                : c
        }
        // matching / truefalse
        const correct = q.correctAnswers as number[]
        return (ans as number[]).every((v, idx) => v === correct[idx])
            ? c + 1
            : c
    }, 0)
    const scorePercent = (correctCount / totalQuiz) * 100
    const passed = scorePercent >= 70

    const handleCompleteQuiz = () => {
        if (!passed) return
        playClick()
        sendXAPIStatement('completed', {
            object: { id: 'quiz', definition: { name: { 'en-US': 'Quiz' } } },
        })
        onQuizComplete()
    }

    const handleRetryQuiz = () => {
        playClick()
        setSubmitted(Array(totalQuiz).fill(false))
        setFinalAnswers(Array(totalQuiz).fill(null))
        setTempSelections(
            questions.map((q) => {
                if (q.type === 'matchingMultiple')
                    return Array.from({ length: q.statements.length }, () => [])
                if (q.type === 'truefalse') return [-1]
                return Array(q.statements.length).fill(-1)
            }),
        )
        setCurrentIndex(0)
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setVolumeNarasi(parseFloat(e.target.value))

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

    const question = questions[currentIndex]
    const isCurrentSubmitted = submitted[currentIndex]
    const userAnswer = finalAnswers[currentIndex]

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
                    searchTerm=""
                    setSearchTerm={() => {}}
                    onSearch={() => {}}
                    onSearchKeyDown={() => {}}
                    onOpenDevScreen={() => {}}
                    appTitle={appTitle}
                    onHome={onGoOpening}
                    showSearch={false}
                />
                <FloatingIcons />
                <div className="flex-1 flex items-stretch justify-center p-4 pt-16 pb-20">
                    <div className="grid grid-cols-12 gap-2 w-full max-w-7xl">
                        {/* Kolom soal */}
                        <div
                            className={`col-span-12 ${
                                totalQuiz === 1
                                    ? 'lg:col-span-9'
                                    : totalQuiz > 1
                                      ? 'lg:col-span-10'
                                      : ''
                            } flex flex-col items-center justify-center`}
                        >
                            {question.type === 'matching' ? (
                                <MatchingQuiz
                                    question={question}
                                    userAnswer={userAnswer as number[]}
                                    submitted={isCurrentSubmitted}
                                    selectedAnswers={
                                        currentSelection as number[]
                                    }
                                    onSelectionChange={
                                        handleSelectionChange as (
                                            answers: number[],
                                        ) => void
                                    }
                                />
                            ) : question.type === 'truefalse' ? (
                                <TrueFalseQuiz
                                    question={question}
                                    userAnswer={userAnswer as number[]}
                                    submitted={isCurrentSubmitted}
                                    selectedAnswer={
                                        currentSelection as number[]
                                    }
                                    onSelectionChange={
                                        handleSelectionChange as (
                                            answers: number[],
                                        ) => void
                                    }
                                />
                            ) : question.type === 'ordering' ? (
                                <OrderingQuiz
                                    question={question}
                                    userAnswer={userAnswer as number[]}
                                    submitted={isCurrentSubmitted}
                                    selectedAnswers={
                                        currentSelection as number[]
                                    }
                                    onSelectionChange={
                                        handleSelectionChange as (
                                            answers: number[],
                                        ) => void
                                    }
                                />
                            ) : question.type === 'matchingMultiple' ? (
                                <MatchingMultipleQuiz
                                    question={question}
                                    userAnswer={userAnswer as number[][]}
                                    submitted={isCurrentSubmitted}
                                    selectedAnswers={
                                        currentSelection as number[][]
                                    }
                                    onSelectionChange={
                                        handleSelectionChange as (
                                            answers: number[][],
                                        ) => void
                                    }
                                />
                            ) : null}
                            {/* Semua kontrol (submit/hasil) untuk 1 soal dipindahkan ke kolom kanan */}
                        </div>

                        {/* Kolom kanan untuk kontrol jika totalQuiz === 1 */}
                        {totalQuiz === 1 && (
                            <div className="col-span-12 lg:col-span-3 flex flex-col justify-center items-center gap-6">
                                {!allSubmitted && (
                                    <button
                                        onClick={handleSubmitAll}
                                        disabled={!allCompleted}
                                        className={`w-full px-8 py-3 rounded-xl font-semibold shadow-lg transition ${
                                            allCompleted
                                                ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                                                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        }`}
                                    >
                                        {allCompleted
                                            ? 'Kirim Jawaban'
                                            : 'Lengkapi Semua Pernyataan'}
                                    </button>
                                )}
                                {allSubmitted && (
                                    <div className="bg-black/60 dark:bg-white/40 backdrop-blur-md rounded-xl p-5 w-full text-center shadow-lg">
                                        <p className="text-white dark:text-gray-900 font-bold text-lg">
                                            Skor: {correctCount}/{totalQuiz} (
                                            {Math.round(scorePercent)}%)
                                        </p>
                                        {passed ? (
                                            <button
                                                onClick={handleCompleteQuiz}
                                                className="mt-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition cursor-pointer w-full"
                                            >
                                                Selesaikan Kuis
                                            </button>
                                        ) : (
                                            <>
                                                <p className="text-red-300 dark:text-red-700 font-medium text-sm mt-2">
                                                    Belum lulus (batas 70%)
                                                </p>
                                                <div className="flex flex-col gap-2 mt-3 w-full">
                                                    <button
                                                        onClick={
                                                            handleRetryQuiz
                                                        }
                                                        className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-semibold shadow transition cursor-pointer w-full"
                                                    >
                                                        Ulangi Kuis
                                                    </button>
                                                    {onGoToSlideGroup && (
                                                        <button
                                                            onClick={() => {
                                                                playClick()
                                                                onGoToSlideGroup?.()
                                                            }}
                                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow transition cursor-pointer w-full"
                                                        >
                                                            Pelajari Ulang
                                                            Materi
                                                        </button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sidebar navigasi soal – hanya muncul jika lebih dari 1 soal */}
                        {totalQuiz > 1 && (
                            <div className="col-span-12 lg:col-span-2 flex flex-col justify-center items-center gap-6">
                                <div className="grid grid-cols-2 gap-3 w-full max-w-[200px]">
                                    {questions.map((_, i) => {
                                        const isSub = submitted[i]
                                        const sel = tempSelections[i]
                                        const isComplete = Array.isArray(sel[0])
                                            ? (sel as number[][]).every(
                                                  (arr) => arr.length > 0,
                                              )
                                            : !(sel as number[]).some(
                                                  (v) => v === -1,
                                              )
                                        const isActive = i === currentIndex
                                        let bgClass = ''
                                        if (isSub) {
                                            const correct =
                                                finalAnswers[i] &&
                                                (Array.isArray(
                                                    finalAnswers[i]?.[0],
                                                )
                                                    ? (
                                                          finalAnswers[
                                                              i
                                                          ] as number[][]
                                                      ).every((arr, idx) => {
                                                          const correctArr = (
                                                              questions[i]
                                                                  .correctAnswers as number[][]
                                                          )[idx]
                                                          return (
                                                              arr.length ===
                                                                  correctArr.length &&
                                                              arr.every((a) =>
                                                                  correctArr.includes(
                                                                      a,
                                                                  ),
                                                              )
                                                          )
                                                      })
                                                    : (
                                                          finalAnswers[
                                                              i
                                                          ] as number[]
                                                      ).every(
                                                          (a, idx) =>
                                                              a ===
                                                              (
                                                                  questions[i]
                                                                      .correctAnswers as number[]
                                                              )[idx],
                                                      ))
                                            bgClass = correct
                                                ? 'bg-green-600 text-white shadow-md'
                                                : 'bg-red-600 text-white shadow-md'
                                        } else if (isActive)
                                            bgClass =
                                                'bg-yellow-400 text-black shadow-md ring-2 ring-yellow-500'
                                        else if (isComplete)
                                            bgClass =
                                                'bg-blue-600 text-white shadow-md'
                                        else
                                            bgClass =
                                                'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    playClick()
                                                    setCurrentIndex(i)
                                                }}
                                                className={`w-full aspect-square relative flex items-center justify-center text-lg font-semibold rounded-xl transition cursor-pointer ${bgClass}`}
                                            >
                                                {i + 1}
                                                {!isSub && !isComplete && (
                                                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                                                        !
                                                    </span>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                                {!allSubmitted && (
                                    <button
                                        onClick={handleSubmitAll}
                                        disabled={!allCompleted}
                                        className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition ${
                                            allCompleted
                                                ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                                                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        }`}
                                    >
                                        {allCompleted
                                            ? 'Kirim Jawaban'
                                            : 'Lengkapi Semua Soal'}
                                    </button>
                                )}
                                {allSubmitted && (
                                    <div className="text-center space-y-4 bg-black/60 dark:bg-white/40 backdrop-blur-md rounded-xl p-5 w-full max-w-[200px] shadow-lg">
                                        <p className="text-white dark:text-gray-900 font-bold text-lg">
                                            Skor: {correctCount}/{totalQuiz} (
                                            {Math.round(scorePercent)}%)
                                        </p>
                                        {passed ? (
                                            <button
                                                onClick={handleCompleteQuiz}
                                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition cursor-pointer"
                                            >
                                                Selesaikan Kuis
                                            </button>
                                        ) : (
                                            <>
                                                <p className="text-red-300 dark:text-red-700 font-medium text-sm">
                                                    Belum lulus (batas 70%)
                                                </p>
                                                <button
                                                    onClick={handleRetryQuiz}
                                                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-semibold shadow transition cursor-pointer"
                                                >
                                                    Ulangi Kuis
                                                </button>
                                                {onGoToSlideGroup && (
                                                    <button
                                                        onClick={() => {
                                                            playClick()
                                                            onGoToSlideGroup?.()
                                                        }}
                                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow transition cursor-pointer"
                                                    >
                                                        Pelajari Ulang Materi
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
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
                        if (!document.fullscreenElement)
                            document.documentElement.requestFullscreen()
                        else document.exitFullscreen?.()
                    }}
                    volumeNarasi={volumeNarasi}
                    onVolumeChange={handleVolumeChange}
                    onHome={onFooterHome ?? onGoOpening}
                    isOpenerMuted={isOpenerMuted}
                    onToggleOpenerMute={toggleOpenerMute}
                />
            </div>
        </div>
    )
}

export default QuizScreenBase
