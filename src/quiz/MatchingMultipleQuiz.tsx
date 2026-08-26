// src/quiz/MatchingMultipleQuiz.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import type { QuizQuestion } from './quizType'
import { useAudio } from '../context/AudioContext' // ditambahkan

interface MatchingMultipleQuizProps {
    question: QuizQuestion
    userAnswer: number[][] | null
    submitted: boolean
    selectedAnswers: number[][]
    onSelectionChange: (answers: number[][]) => void
}

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

const MatchingMultipleQuiz: React.FC<MatchingMultipleQuizProps> = ({
    question,
    userAnswer,
    submitted,
    selectedAnswers,
    onSelectionChange,
}) => {
    const statements = question.statements
    const numStatements = statements.length
    const [activeIndex, setActiveIndex] = useState(0)
    const { playClick } = useAudio() // ambil fungsi suara klik

    // Acak urutan opsi setiap kali mount
    const randomizedOptions = useMemo(
        () =>
            shuffleArray(
                question.options.map((opt, idx) => ({
                    originalIndex: idx,
                    text: opt,
                })),
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [question],
    )

    useEffect(() => {
        setActiveIndex(0)
    }, [question])

    // Pemetaan global: opsi mana yang sudah dipakai oleh statement mana
    const usedOptionsMap = useMemo(() => {
        const map = new Map<number, number>() // optIdx -> stmtIdx
        selectedAnswers.forEach((ansArr, stmtIdx) => {
            ansArr.forEach((optIdx) => {
                if (!map.has(optIdx)) {
                    map.set(optIdx, stmtIdx)
                }
            })
        })
        return map
    }, [selectedAnswers])

    // Jawaban benar untuk statement aktif
    const correctForStatement =
        (question.correctAnswers as number[][])[activeIndex] || []

    // Handle klik opsi
    const toggleOption = (optionIndex: number) => {
        if (submitted) return

        const usedBy = usedOptionsMap.get(optionIndex)
        if (usedBy !== undefined && usedBy !== activeIndex) {
            return
        }

        playClick() // suara klik saat memilih opsi

        const currentSelected = [...selectedAnswers[activeIndex]]
        const exists = currentSelected.includes(optionIndex)

        let newSelected: number[]
        if (exists) {
            newSelected = currentSelected.filter((idx) => idx !== optionIndex)
        } else {
            newSelected = [...currentSelected, optionIndex]
        }

        const updated = selectedAnswers.map((ans, idx) =>
            idx === activeIndex ? newSelected : ans,
        )
        onSelectionChange(updated)
    }

    // Hapus assignment (dari tombol X)
    const handleRemoveAssignment = (optionIdx: number) => {
        if (submitted) return
        const stmtIdx = usedOptionsMap.get(optionIdx)
        if (stmtIdx === undefined) return

        playClick() // suara klik saat menghapus

        const newAnswers = selectedAnswers.map((ans, idx) => {
            if (idx === stmtIdx) {
                return ans.filter((o) => o !== optionIdx)
            }
            return ans
        })
        onSelectionChange(newAnswers)
    }

    const goToPrev = () => {
        playClick() // suara navigasi
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : numStatements - 1))
    }
    const goToNext = () => {
        playClick() // suara navigasi
        setActiveIndex((prev) => (prev < numStatements - 1 ? prev + 1 : 0))
    }

    const currentSelections = selectedAnswers[activeIndex] || []

    // Status benar setelah submit
    const isStatementCorrect = (): boolean | null => {
        if (!submitted || !userAnswer) return null
        const userSet = new Set(userAnswer[activeIndex] || [])
        const correctSet = new Set(correctForStatement)
        return (
            userSet.size === correctSet.size &&
            [...userSet].every((val) => correctSet.has(val))
        )
    }

    const correctStatus = isStatementCorrect()

    return (
        <motion.div
            className="w-full max-w-[90vw] bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-[clamp(0.75rem,min(2vw,2vh),1.5rem)] shadow-2xl p-[clamp(1rem,min(2.5vw,2.5vh),2rem)] border-[clamp(1px,min(0.2vw,0.2vh),2px)] border-white/20 dark:border-gray-800 flex flex-col gap-[clamp(1rem,min(2vw,2vh),1.5rem)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.h2
                className="text-[clamp(1.5rem,min(3.5vw,3.5vh),2.5rem)] font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                {question.instruction}
            </motion.h2>

            {/* Area Statement dengan navigasi */}
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-[clamp(0.5rem,min(1vw,1vh),1rem)] p-[clamp(0.75rem,min(2vw,2vh),1.5rem)] min-h-[clamp(6rem,min(18vw,18vh),12rem)] flex flex-col justify-center items-center">
                <div className="flex items-center justify-between w-full mb-[clamp(0.5rem,min(1vw,1vh),1rem)]">
                    <button
                        onClick={goToPrev}
                        className="p-[clamp(0.3rem,min(1vw,1vh),0.75rem)] text-gray-600 dark:text-gray-300 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Sebelumnya"
                    >
                        <FaChevronLeft className="text-[clamp(1rem,min(2vw,2vh),1.5rem)]" />
                    </button>
                    <span className="text-[clamp(0.8rem,min(1.5vw,1.5vh),1.25rem)] text-gray-500 dark:text-gray-400">
                        {question.statementLabel || 'Pernyataan'}{' '}
                        {activeIndex + 1} dari {numStatements}
                    </span>
                    <button
                        onClick={goToNext}
                        className="p-[clamp(0.3rem,min(1vw,1vh),0.75rem)] text-gray-600 dark:text-gray-300 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Berikutnya"
                    >
                        <FaChevronRight className="text-[clamp(1rem,min(2vw,2vh),1.5rem)]" />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeIndex}
                        className="text-[clamp(1.25rem,min(2.5vw,2.5vh),2rem)] text-gray-900 dark:text-white font-medium text-center"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.2 }}
                    >
                        {statements[activeIndex]}
                    </motion.p>
                </AnimatePresence>

                {/* Pilihan yang sudah dipilih untuk statement aktif */}
                {currentSelections.length > 0 && (
                    <div className="mt-[clamp(0.75rem,min(1.5vw,1.5vh),1.25rem)] flex flex-wrap gap-[clamp(0.5rem,min(1vw,1vh),0.75rem)] justify-center">
                        {currentSelections.map((optIdx) => {
                            const optionData = randomizedOptions.find(
                                (o) => o.originalIndex === optIdx,
                            )
                            return optionData ? (
                                <span
                                    key={optIdx}
                                    className="px-[clamp(0.5rem,min(1.25vw,1.25vh),1rem)] py-[clamp(0.25rem,min(0.6vw,0.6vh),0.6rem)] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-[clamp(0.8rem,min(1.5vw,1.5vh),1.25rem)]"
                                >
                                    {optionData.text}
                                </span>
                            ) : null
                        })}
                    </div>
                )}

                {/* Feedback setelah submit */}
                {submitted && correctStatus !== null && (
                    <div className="mt-[clamp(0.75rem,min(1.5vw,1.5vh),1.25rem)] px-[clamp(0.75rem,min(1.5vw,1.5vh),1.25rem)] py-[clamp(0.4rem,min(0.8vw,0.8vh),0.8rem)] rounded-[clamp(0.5rem,min(1vw,1vh),1rem)] text-[clamp(0.8rem,min(1.5vw,1.5vh),1.25rem)] font-bold bg-white/80 dark:bg-gray-900/80 shadow">
                        {correctStatus ? (
                            <span className="text-green-600 dark:text-green-400">
                                ✔ Benar
                            </span>
                        ) : (
                            <span className="text-red-600 dark:text-red-400">
                                ✘ Jawaban benar:{' '}
                                {correctForStatement
                                    .map((idx) => question.options[idx])
                                    .join(', ')}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Label Opsi */}
            {question.optionsLabel && (
                <div className="text-[clamp(1.25rem,min(2vw,2vh),1.75rem)] font-semibold text-gray-900 dark:text-white">
                    {question.optionsLabel}
                </div>
            )}

            {/* Daftar Opsi yang bisa dipilih (diacak) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.5rem,min(1vw,1vh),1rem)]">
                {randomizedOptions.map((option) => {
                    const optIdx = option.originalIndex
                    const isSelected = currentSelections.includes(optIdx)
                    const usedBy = usedOptionsMap.get(optIdx)
                    const isUsedByOther =
                        usedBy !== undefined && usedBy !== activeIndex
                    const owningStatementIndex = isUsedByOther
                        ? usedBy
                        : undefined

                    let btnStyle =
                        'p-[clamp(0.5rem,min(1.25vw,1.25vh),1rem)] rounded-[clamp(0.5rem,min(1vw,1vh),1rem)] font-medium text-center border-[clamp(1px,min(0.3vw,0.3vh),2px)] transition w-full relative min-h-[clamp(4rem,min(12vw,12vh),8rem)] flex flex-col items-center justify-center '

                    if (submitted) {
                        const correctSet = new Set(correctForStatement)
                        if (correctSet.has(optIdx)) {
                            btnStyle +=
                                'bg-green-500 text-white border-green-500 cursor-not-allowed'
                        } else if (isSelected && !correctSet.has(optIdx)) {
                            btnStyle +=
                                'bg-red-500 text-white border-red-500 cursor-not-allowed'
                        } else {
                            btnStyle +=
                                'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                        }
                    } else {
                        if (isSelected) {
                            btnStyle +=
                                'bg-blue-600 text-white border-blue-600 cursor-pointer'
                        } else if (isUsedByOther) {
                            btnStyle +=
                                'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-400 dark:border-gray-500 cursor-not-allowed'
                        } else {
                            btnStyle +=
                                'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                        }
                    }

                    return (
                        <motion.button
                            key={optIdx}
                            disabled={submitted}
                            onClick={() => {
                                if (!submitted && !isUsedByOther) {
                                    toggleOption(optIdx)
                                }
                            }}
                            className={`group ${btnStyle} relative`}
                            whileHover={
                                !submitted && !isUsedByOther
                                    ? { scale: 1.02 }
                                    : {}
                            }
                            whileTap={
                                !submitted && !isUsedByOther
                                    ? { scale: 0.98 }
                                    : {}
                            }
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * optIdx }}
                        >
                            <span className="text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)]">
                                {option.text}
                            </span>

                            {/* Penanda jika dipakai statement lain */}
                            {isUsedByOther &&
                                owningStatementIndex !== undefined && (
                                    <>
                                        <span className="absolute bottom-[clamp(0.3rem,min(0.6vw,0.6vh),0.6rem)] left-[clamp(0.3rem,min(0.6vw,0.6vh),0.6rem)] transform rotate-10 text-gray-500 dark:text-gray-400 text-[clamp(0.8rem,min(1.2vw,1.2vh),1rem)] font-bold select-none">
                                            {owningStatementIndex + 1}
                                        </span>
                                        {!submitted && (
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemoveAssignment(
                                                        optIdx,
                                                    )
                                                }}
                                                className="absolute top-[clamp(0.3rem,min(0.6vw,0.6vh),0.6rem)] right-[clamp(0.3rem,min(0.6vw,0.6vh),0.6rem)] w-[clamp(1.25rem,min(2vw,2vh),1.5rem)] h-[clamp(1.25rem,min(2vw,2vh),1.5rem)] bg-red-500 hover:bg-red-600 rounded-full text-white hidden group-hover:flex items-center justify-center text-[clamp(0.6rem,min(1vw,1vh),0.9rem)] font-bold cursor-pointer"
                                            >
                                                ✕
                                            </span>
                                        )}
                                    </>
                                )}
                        </motion.button>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default MatchingMultipleQuiz
