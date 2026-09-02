// src/quiz/matchingQuiz.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import type { QuizQuestion } from './quizType'

interface MatchingQuizProps {
    question: QuizQuestion
    userAnswer: number[] | null
    submitted: boolean
    selectedAnswers: number[]
    onSelectionChange: (answers: number[]) => void
}

const MatchingQuiz: React.FC<MatchingQuizProps> = ({
    question,
    userAnswer,
    submitted,
    selectedAnswers,
    onSelectionChange,
}) => {
    // Untuk tipe matching, correctAnswers dipastikan number[]
    const correctAnswers = question.correctAnswers as number[]
    const numStatements = question.statements.length
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        setActiveIndex(0)
    }, [question])

    const currentAnswerIndex = selectedAnswers[activeIndex]

    const usedOptionsMap = useMemo(() => {
        const map = new Map<number, number>()
        selectedAnswers.forEach((optIdx, stmtIdx) => {
            if (optIdx !== -1) {
                map.set(optIdx, stmtIdx)
            }
        })
        return map
    }, [selectedAnswers])

    const handleSelectAnswer = (answerIdx: number) => {
        if (submitted) return
        if (
            usedOptionsMap.has(answerIdx) &&
            usedOptionsMap.get(answerIdx) !== activeIndex
        ) {
            return
        }
        const newAnswers = [...selectedAnswers]
        newAnswers[activeIndex] = answerIdx
        onSelectionChange(newAnswers)
    }

    const handleRemoveAssignment = (optionIdx: number) => {
        if (submitted) return
        const stmtIdx = usedOptionsMap.get(optionIdx)
        if (stmtIdx === undefined) return

        const newAnswers = [...selectedAnswers]
        newAnswers[stmtIdx] = -1
        onSelectionChange(newAnswers)
    }

    const goToPrev = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : numStatements - 1))
    }
    const goToNext = () => {
        setActiveIndex((prev) => (prev < numStatements - 1 ? prev + 1 : 0))
    }

    // Opsi yang akan ditampilkan: semua jika belum submit, hanya yang dipilih user jika sudah submit
    const displayOptions = useMemo(() => {
        if (!submitted || !userAnswer) {
            return question.options.map((opt, idx) => ({
                originalIndex: idx,
                text: opt,
            }))
        }
        const answerIdx = userAnswer[activeIndex]
        if (answerIdx === -1) return []
        return [
            {
                originalIndex: answerIdx,
                text: question.options[answerIdx],
            },
        ]
    }, [submitted, userAnswer, activeIndex, question.options])

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
                        {question.statements[activeIndex]}
                    </motion.p>
                </AnimatePresence>

                {currentAnswerIndex !== -1 && (
                    <div className="mt-[clamp(0.75rem,min(1.5vw,1.5vh),1.25rem)] text-[clamp(0.8rem,min(1.5vw,1.5vh),1.25rem)] text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <span>{question.options[currentAnswerIndex]}</span>
                    </div>
                )}
            </div>

            {question.optionsLabel && (
                <div className="text-[clamp(1.25rem,min(2vw,2vh),1.75rem)] font-semibold text-gray-900 dark:text-white">
                    {question.optionsLabel}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.5rem,min(1vw,1vh),1rem)]">
                {displayOptions.map((option) => {
                    const idx = option.originalIndex
                    const isSelected = currentAnswerIndex === idx
                    const isUsedByOther =
                        usedOptionsMap.has(idx) &&
                        usedOptionsMap.get(idx) !== activeIndex
                    const owningStatementIndex = isUsedByOther
                        ? usedOptionsMap.get(idx)
                        : undefined

                    let btnStyle =
                        'p-[clamp(0.5rem,min(1.25vw,1.25vh),1rem)] rounded-[clamp(0.5rem,min(1vw,1vh),1rem)] font-medium text-center border-[clamp(1px,min(0.3vw,0.3vh),2px)] transition w-full relative min-h-[clamp(4rem,min(12vw,12vh),8rem)] flex flex-col items-center justify-center '

                    if (submitted) {
                        // Karena hanya opsi yang dipilih yang tampil, maka idx pasti jawaban user
                        const isCorrect = idx === correctAnswers[activeIndex]
                        btnStyle += isCorrect
                            ? 'bg-green-600 text-white border-green-300 cursor-not-allowed'
                            : 'bg-red-600 text-white border-red-300 cursor-not-allowed'
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
                            key={idx}
                            disabled={submitted}
                            onClick={() => {
                                if (!submitted && !isUsedByOther) {
                                    handleSelectAnswer(idx)
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
                            transition={{ delay: 0.1 * idx }}
                        >
                            <span className="text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)]">
                                {option.text}
                            </span>

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
                                                    handleRemoveAssignment(idx)
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

export default MatchingQuiz
