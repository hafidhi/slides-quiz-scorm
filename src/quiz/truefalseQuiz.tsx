// src/quiz/truefalseQuiz.tsx
import React from 'react'
import { motion } from 'framer-motion'
import type { QuizQuestion } from './quizType'

interface TrueFalseQuizProps {
    question: QuizQuestion
    userAnswer: number[] | null
    submitted: boolean
    selectedAnswer: number[] // ex: [0] or [1] or [-1]
    onSelectionChange: (answer: number[]) => void
}

const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({
    question,
    userAnswer,
    submitted,
    selectedAnswer,
    onSelectionChange,
}) => {
    const selectedIndex = selectedAnswer[0]

    const isCorrect = (): boolean => {
        if (!submitted || !userAnswer) return false
        return userAnswer[0] === (question.correctAnswers as number[])[0]
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
                Pilih Benar atau Salah
            </motion.h2>

            <motion.p
                className="text-[clamp(1.25rem,min(2.5vw,2.5vh),2rem)] text-gray-800 dark:text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {question.statements[0]}
            </motion.p>

            <div className="flex flex-col gap-[clamp(0.75rem,min(1.5vw,1.5vh),1.5rem)] w-full">
                {question.options.map((opt, idx) => {
                    const isSelected = selectedIndex === idx
                    let btnStyle =
                        'w-full px-[clamp(1rem,min(2vw,2vh),1.5rem)] py-[clamp(0.5rem,min(1.25vw,1.25vh),1rem)] rounded-[clamp(0.5rem,min(1vw,1vh),1rem)] font-semibold shadow-lg transition border-[clamp(1px,min(0.3vw,0.3vh),2px)] text-[clamp(0.9rem,min(1.5vw,1.5vh),1.25rem)] '
                    if (submitted) {
                        if (isCorrect() && isSelected) {
                            btnStyle +=
                                'bg-green-500 text-white border-green-500 cursor-not-allowed'
                        } else if (!isCorrect() && isSelected) {
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
                                if (!submitted) onSelectionChange([idx])
                            }}
                            className={`${btnStyle} justify-center`}
                            whileHover={!submitted ? { scale: 1.02 } : {}}
                            whileTap={!submitted ? { scale: 0.98 } : {}}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                        >
                            {opt}
                        </motion.button>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default TrueFalseQuiz
