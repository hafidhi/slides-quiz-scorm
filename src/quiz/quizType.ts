// src/quiz/quizType.ts
export interface QuizQuestion {
    type: 'matching' | 'truefalse' | 'ordering' | 'matchingMultiple'
    statements: string[]
    options: string[]
    correctAnswers: number[] | number[][] // matchingMultiple → number[][]
    instruction?: string
    statementLabel?: string
    optionsLabel?: string
}
