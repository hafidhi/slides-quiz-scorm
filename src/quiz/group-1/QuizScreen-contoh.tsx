// src/quiz/group-1/QuizScreen-contoh.tsx
import QuizScreenBase from '../QuizScreenBase'
import type { QuizQuestion } from '../quizType'

const quizQuestions: QuizQuestion[] = [
    // ===== MATCHING =====
    {
        type: 'matching',
        instruction: 'Pasangkan istilah dengan definisi/penjelasan yang tepat',
        statementLabel: 'Istilah',
        optionsLabel: 'Definisi / Penjelasan',
        statements: [
            'TTE Tersertifikasi',
            'Tugas dari Pejabat Pengelola Informasi dan Dokumentasi (PPID)',
            'Data pribadi (Pasal 1 UU 27/2022)',
            'Pejabat atau petugas yang melaksanakan fungsi Pelindungan Data Pribadi (PDP)',
            'Informasi yang dikecualikan (Pasal 17 UU KIP)',
        ],
        options: [
            'Data tentang orang yang teridentifikasi atau dapat diidentifikasi, baik langsung maupun tidak langsung',
            'Wajib ditunjuk oleh Kemenkeu sebagai pengendali data pribadi',
            'Kekuatan hukumnya sama dengan tanda tangan basah, diselenggarakan oleh PSrE',
            'Merespon permintaan informasi publik maksimal 10 hari, jika tidak bisa diajukan keberatan ke Komisi Informasi',
            'Contoh: informasi yang membahayakan pertahanan negara, hubungan luar negeri, atau kepentingan pribadi',
        ],
        correctAnswers: [2, 3, 0, 1, 4], // 1-C, 2-D, 3-A, 4-B, 5-E
    },
    // ===== MATCHING MULTIPLE =====
    {
        type: 'matchingMultiple',
        instruction:
            'Pilih kondisi yang sesuai untuk setiap jenis Uji Kompetensi di bawah ini.',
        statementLabel: 'Jenis Ukom',
        optionsLabel: 'Kondisi',
        statements: ['Ukom Kompleks', 'Ukom Sederhana', 'Tanpa Ukom'],
        options: [
            'Perpindahan JF Eksternal atau jabatan non-JF ke JF Bidang Keuangan Negara',
            'Perpindahan antar JF di Bidang Keuangan Negara (mis. JF AKN ke JF PKN)',
            'Perpindahan antar bidang tugas dalam 1 JF Keuangan Negara (mis. JF AKN Perbendaharaan ke AKN Penganggaran)',
            'Delayering Eselon III/IV ke JF',
        ],
        correctAnswers: [
            [0], // Ukom Kompleks → Pernyataan 1
            [1], // Ukom Sederhana → Pernyataan 2
            [2, 3], // Tanpa Ukom → Pernyataan 3 & 4
        ],
    },
    // ===== TRUE/FALSE =====
    {
        type: 'truefalse',
        statements: [
            'Prinsip UU KIP adalah: setiap informasi publik tertutup kecuali yang dikecualikan.',
        ],
        options: ['Benar', 'Salah'],
        correctAnswers: [1], // S (prinsipnya terbuka)
    },
    // ===== ORDERING =====
    {
        type: 'ordering',
        instruction:
            'Susunlah potongan kalimat berikut menjadi prosedur yang benar dan logis sesuai kewajiban Kemenkeu jika terjadi kebocoran data pribadi WP.',
        statements: [
            'Melaporkan kebocoran data', // A
            'Menunjuk Pejabat Pelindungan Data Pribadi (PDP)', // B
            'Menjaga kerahasiaan data WP (tax secrecy)', // C
            'Dalam waktu 3×24 jam', // D
            'Melakukan audit perlindungan data secara berkala', // E
        ],
        options: [], // tidak digunakan
        correctAnswers: [2, 1, 0, 3, 4], // C, B, A, D, E
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
