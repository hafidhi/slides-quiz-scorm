// src/quiz/orderingQuiz.tsx
import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { QuizQuestion } from './quizType'
import { FaCheck, FaTimes } from 'react-icons/fa'

interface OrderingQuizProps {
    question: QuizQuestion
    userAnswer: number[] | null
    submitted: boolean
    selectedAnswers: number[]
    onSelectionChange: (answers: number[]) => void
}

const OrderingQuiz: React.FC<OrderingQuizProps> = ({
    question,
    userAnswer,
    submitted,
    selectedAnswers,
    onSelectionChange,
}) => {
    const numSlots = question.statements.length
    const [activeSlot, setActiveSlot] = useState<number | null>(null) // slot yang sedang dipilih

    // Indeks item sumber yang belum terpakai
    const availableItems = useMemo(() => {
        const used = new Set(selectedAnswers.filter((v) => v !== -1))
        return question.statements.map((_, i) => i).filter((i) => !used.has(i))
    }, [selectedAnswers, question.statements])

    // Slot kosong pertama (fallback jika tidak ada slot yang dipilih)
    const firstEmptySlot = useMemo(() => {
        return selectedAnswers.findIndex((v) => v === -1)
    }, [selectedAnswers])

    // Klik slot (hanya slot kosong yang bisa dipilih)
    const handleSlotClick = useCallback(
        (slotIndex: number) => {
            if (submitted) return
            // Hanya bisa memilih slot yang kosong
            if (selectedAnswers[slotIndex] === -1) {
                setActiveSlot(slotIndex)
            }
        },
        [submitted, selectedAnswers],
    )

    // Klik item sumber → tempatkan di slot yang aktif, atau slot kosong pertama
    const handleSourceClick = useCallback(
        (itemIndex: number) => {
            if (submitted) return

            const targetSlot =
                activeSlot !== null && selectedAnswers[activeSlot] === -1
                    ? activeSlot
                    : firstEmptySlot

            if (targetSlot === -1) return // tidak ada slot tersedia

            const newAnswers = [...selectedAnswers]
            newAnswers[targetSlot] = itemIndex
            onSelectionChange(newAnswers)

            // Reset slot aktif setelah pengisian
            setActiveSlot(null)
        },
        [
            submitted,
            selectedAnswers,
            activeSlot,
            firstEmptySlot,
            onSelectionChange,
        ],
    )

    // Hapus item dari slot tertentu
    const handleRemoveFromSlot = useCallback(
        (slotIndex: number) => {
            if (submitted) return
            const newAnswers = [...selectedAnswers]
            newAnswers[slotIndex] = -1
            onSelectionChange(newAnswers)

            // Jika slot yang dihapus sedang aktif, nonaktifkan
            if (activeSlot === slotIndex) {
                setActiveSlot(null)
            }
        },
        [submitted, selectedAnswers, activeSlot, onSelectionChange],
    )

    // Cek kebenaran per slot (setelah submit)
    const isSlotCorrect = (slotIndex: number) => {
        if (!submitted || !userAnswer) return null
        return userAnswer[slotIndex] === question.correctAnswers[slotIndex]
    }

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

            {/* Sumber potongan kalimat */}
            <div className="flex flex-wrap gap-[clamp(0.5rem,min(1vw,1vh),1rem)]">
                <span className="text-[clamp(1.1rem,min(2vw,2vh),1.5rem)] font-semibold text-gray-900 dark:text-white w-full">
                    Potongan Kalimat:
                </span>
                {availableItems.length > 0 ? (
                    availableItems.map((itemIdx) => (
                        <motion.button
                            key={itemIdx}
                            onClick={() => handleSourceClick(itemIdx)}
                            disabled={submitted}
                            className="px-[clamp(0.5rem,min(1.25vw,1.25vh),1rem)] py-[clamp(0.25rem,min(0.6vw,0.6vh),0.6rem)] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-[clamp(0.5rem,min(1vw,1vh),1rem)] border-[clamp(1px,min(0.3vw,0.3vh),2px)] border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)]"
                            whileHover={!submitted ? { scale: 1.03 } : {}}
                            whileTap={!submitted ? { scale: 0.97 } : {}}
                        >
                            {question.statements[itemIdx]}
                        </motion.button>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)]">
                        Semua potongan sudah ditempatkan.
                    </p>
                )}
            </div>

            {/* Slot urutan */}
            <div className="space-y-[clamp(0.75rem,min(1.5vw,1.5vh),1.5rem)]">
                <span className="text-[clamp(1.1rem,min(2vw,2vh),1.5rem)] font-semibold text-gray-900 dark:text-white">
                    Urutan Jawaban:
                </span>
                {Array.from({ length: numSlots }).map((_, slotIdx) => {
                    const assignedItem = selectedAnswers[slotIdx]
                    const isEmpty = assignedItem === -1
                    const correctStatus = isSlotCorrect(slotIdx)
                    const isActive = activeSlot === slotIdx

                    return (
                        <div
                            key={slotIdx}
                            className="flex items-center gap-[clamp(0.5rem,min(1vw,1vh),1rem)]"
                        >
                            <span className="w-[clamp(2rem,min(3vw,3vh),3rem)] h-[clamp(2rem,min(3vw,3vh),3rem)] flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)]">
                                {slotIdx + 1}
                            </span>
                            <div
                                onClick={() => handleSlotClick(slotIdx)}
                                className={`relative flex-1 p-[clamp(0.75rem,min(1.5vw,1.5vh),1.5rem)] rounded-[clamp(0.5rem,min(1vw,1vh),1rem)] border-[clamp(1px,min(0.3vw,0.3vh),2px)] min-h-[clamp(3rem,min(8vw,8vh),6rem)] flex items-center transition
                                    ${isEmpty ? 'cursor-pointer' : 'cursor-default'}
                                    ${isActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-400' : ''}
                                    ${
                                        !isActive && isEmpty
                                            ? 'border-dashed border-gray-400 dark:border-gray-500 bg-transparent hover:border-blue-400'
                                            : ''
                                    }
                                    ${
                                        !isActive && !isEmpty
                                            ? 'border-solid bg-gray-100 dark:bg-gray-800 group'
                                            : ''
                                    }
                                    ${
                                        correctStatus === true
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                            : correctStatus === false
                                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                              : ''
                                    }`}
                            >
                                {isEmpty ? (
                                    <span className="text-gray-400 dark:text-gray-500 italic text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)]">
                                        {isActive
                                            ? 'Klik potongan di atas untuk mengisi di sini'
                                            : 'Klik di sini, lalu pilih potongan di atas'}
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-gray-900 dark:text-white text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)]">
                                            {question.statements[assignedItem]}
                                        </span>
                                        {/* Tombol hapus hanya muncul saat hover dan belum disubmit */}
                                        {!submitted && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation() // agar tidak mengaktifkan slot
                                                    handleRemoveFromSlot(
                                                        slotIdx,
                                                    )
                                                }}
                                                className="absolute top-[clamp(0.3rem,min(0.6vw,0.6vh),0.6rem)] right-[clamp(0.3rem,min(0.6vw,0.6vh),0.6rem)] w-[clamp(1.25rem,min(2vw,2vh),1.5rem)] h-[clamp(1.25rem,min(2vw,2vh),1.5rem)] bg-red-500 hover:bg-red-600 text-white rounded-full hidden group-hover:flex items-center justify-center text-[clamp(0.6rem,min(1vw,1vh),0.9rem)] font-bold cursor-pointer"
                                                aria-label="Hapus dari urutan"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                            {/* Status benar/salah setelah submit */}
                            {submitted && correctStatus !== null && (
                                <span
                                    className={`text-[clamp(1rem,min(2vw,2vh),1.5rem)] font-bold ${
                                        correctStatus
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                    }`}
                                >
                                    {correctStatus ? <FaCheck /> : <FaTimes />}
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default OrderingQuiz
