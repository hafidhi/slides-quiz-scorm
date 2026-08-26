// src/quiz/group-2/QuizScreen.tsx
import QuizScreenBase from '../QuizScreenBase'
import type { QuizQuestion } from '../quizType'

const quizQuestions: QuizQuestion[] = [
    {
        type: 'matchingMultiple',
        instruction:
            'Pilih pasangan yang sesuai untuk setiap layanan BPPK di bawah ini.',
        statementLabel: 'Layanan',
        optionsLabel: 'Pasangan',
        statements: ['Uji Kompetensi', 'Sertifikasi profesi'],
        options: [
            'Analis Keuangan Negara',
            'Ahli Kepabeanan',
            'Pengawas Keuangan Negara',
            'Penilai',
            'Konsultan Pajak',
            'Pelelang',
        ],
        correctAnswers: [
            [0, 2, 3, 5], // Uji Kompetensi → Analis Keuangan Negara, Pengawas Keuangan Negara, Penilai, Pelelang
            [1, 4], // Sertifikasi profesi → Ahli Kepabeanan, Konsultan Pajak
        ],
    },
]

interface Props {
    onQuizComplete: () => void
    onGoOpening: () => void
    appTitle: string
    onGoToSlideGroup?: () => void
    onFooterHome?: () => void
    groupIndex: number
}

export default function QuizScreenGroup1(props: Props) {
    return <QuizScreenBase {...props} quizData={quizQuestions} />
}
