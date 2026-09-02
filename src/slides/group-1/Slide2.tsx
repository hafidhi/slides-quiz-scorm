// src/slides/group-1/Slide2.tsx
import React, { useState } from 'react'
import {
    FaClipboardCheck,
    FaCertificate,
    FaCogs,
    FaTimes,
    FaFilePdf,
    FaArrowRight,
} from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

/**
 * CATATAN UNTUK AI SELANJUTNYA (TAMBAHKAN KE DALAM PROMPT DAN JANGAN HAPUS CATATAN INI):
 * Gunakan pendekatan ukuran responsif berbasis viewport (vw/vh) untuk semua dimensi
 * (padding, margin, gap, font-size, dll.) pada slide ini dan slide lainnya.
 * Hindari penggunaan ukuran fixed (rem/px) kecuali untuk batas minimum/maksimum pada clamp().
 * Gunakan kombinasi `min(vw, vh)` agar proporsional di semua orientasi layar.
 * Contoh: text-[clamp(1rem,min(3vw,3vh),2rem)], p-[clamp(1rem,min(2vw,2vh),2rem)].
 * Div terluar <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 relative z-10"> JANGAN DIUBAH.
 * searchText semakin detail semakin baik, gunakan bahasa Indonesia yang baku, hindari singkatan, dan hindari kata-kata yang ambigu.
 */

// -------- TYPE DATA FUNGSI PUSBIN JFPM --------
interface JfpmFunction {
    icon: React.ComponentType<{ className?: string }>
    color: 'blue' | 'indigo' | 'green' | 'orange'
    title: string
    subtitle: string
    description: string
    detail: string
}

// -------- DATA FUNGSI PUSBIN JFPM --------
const jfpmFunctions: JfpmFunction[] = [
    {
        icon: FaClipboardCheck,
        color: 'blue',
        title: 'Uji Kompetensi',
        subtitle: 'Jabatan Fungsional Keuangan Negara',
        description:
            'Penilaian/uji kompetensi bagi Jabatan Fungsional di bidang Keuangan Negara untuk memastikan kualitas dan standar profesi.',
        detail: `Pusbin JFPM melaksanakan penilaian/uji Kompetensi bagi Jabatan Fungsional di bidang Keuangan Negara. Kegiatan ini bertujuan untuk mengukur dan memastikan bahwa setiap pemegang jabatan fungsional memiliki kompetensi sesuai dengan standar yang ditetapkan, sehingga mendukung pelaksanaan tugas yang profesional dan akuntabel di lingkungan Kementerian Keuangan.`,
    },
    {
        icon: FaCertificate,
        color: 'green',
        title: 'Sertifikasi Profesi',
        subtitle: 'Bidang Keuangan Negara',
        description:
            'Sertifikasi profesi bidang keuangan negara untuk meningkatkan pengakuan dan profesionalisme SDM.',
        detail: `Pusbin JFPM menyelenggarakan sertifikasi profesi bidang keuangan negara. Sertifikasi ini memberikan pengakuan resmi terhadap kompetensi dan keahlian seseorang di bidang keuangan negara, sejalan dengan upaya pengembangan sumber daya manusia yang berdaya saing dan berintegritas tinggi di BPPK.`,
    },
    {
        icon: FaCogs,
        color: 'indigo',
        title: 'Pengelolaan Tes',
        subtitle: 'di BPPK',
        description:
            'Mengelola dan menyelenggarakan berbagai tes di BPPK, termasuk tes kompetensi dan sertifikasi.',
        detail: `Pusbin JFPM mengelola tes di BPPK secara menyeluruh, mulai dari perencanaan, pelaksanaan, hingga evaluasi. Pengelolaan ini mencakup tes uji kompetensi, sertifikasi, dan asesmen lainnya, didukung oleh sistem dan prosedur yang terstandarisasi untuk menjamin objektivitas dan kualitas hasil.`,
    },
]

// -------- KOMPONEN MODAL INFORMASI (DETAIL FUNGSI) --------
interface InfoModalProps {
    onClose: () => void
    title: string
    subtitle: string
    detail: string
}

const InfoModal: React.FC<InfoModalProps> = ({
    onClose,
    title,
    subtitle,
    detail,
}) => {
    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-[clamp(0.5rem,min(1vw,1vh),1rem)]"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[90vh] rounded-[clamp(0.5rem,min(2vw,2vh),1rem)] shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center p-[clamp(1rem,min(3vw,3vh),2rem)] border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h3 className="text-[clamp(1.25rem,min(3vw,3vh),2rem)] font-bold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-[clamp(0.875rem,min(2vw,2vh),1.125rem)] text-gray-500 dark:text-gray-400 mt-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)]">
                            {subtitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-[clamp(0.5rem,min(1vw,1vh),1rem)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer ml-[clamp(1rem,min(2vw,2vh),2rem)]"
                    >
                        <FaTimes className="w-[clamp(1.25rem,min(3vw,3vh),2rem)] h-[clamp(1.25rem,min(3vw,3vh),2rem)]" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-[clamp(1rem,min(3vw,3vh),2rem)] text-gray-700 dark:text-gray-300 leading-relaxed text-[clamp(0.875rem,min(2vw,2vh),1.125rem)] whitespace-pre-wrap">
                    {detail}
                </div>

                <div className="flex-shrink-0 p-[clamp(0.5rem,min(1vw,1vh),1rem)] border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-[clamp(1rem,min(2vw,2vh),2rem)] py-[clamp(0.5rem,min(1vw,1vh),1rem)] bg-blue-600 hover:bg-blue-700 text-white rounded-[clamp(0.25rem,min(1vw,1vh),0.5rem)] text-[clamp(0.875rem,min(2vw,2vh),1.125rem)] font-semibold transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// -------- KOMPONEN MODAL PDF (PMK 124 TAHUN 2024) --------
interface PdfModalProps {
    onClose: () => void
    title: string
    subtitle: string
    pdfPath: string
}

const PdfModal: React.FC<PdfModalProps> = ({
    onClose,
    title,
    subtitle,
    pdfPath,
}) => {
    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-[clamp(0.5rem,min(1vw,1vh),1.5rem)]"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-6xl w-full h-[95vh] max-h-[98vh] rounded-[clamp(0.5rem,min(2vw,2vh),1rem)] shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center p-[clamp(1rem,min(3vw,3vh),2rem)] border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h3 className="text-[clamp(1.25rem,min(3vw,3vh),2.5rem)] font-bold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-[clamp(0.875rem,min(2vw,2vh),1.125rem)] text-gray-500 dark:text-gray-400 mt-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)]">
                            {subtitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-[clamp(0.5rem,min(1vw,1vh),1rem)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer ml-[clamp(1rem,min(2vw,2vh),2rem)]"
                    >
                        <FaTimes className="w-[clamp(1.25rem,min(3vw,3vh),2rem)] h-[clamp(1.25rem,min(3vw,3vh),2rem)]" />
                    </button>
                </div>

                <div className="flex-1 min-h-0 w-full">
                    <iframe
                        src={pdfPath}
                        className="w-full h-full border-0"
                        title={`PDF ${title}`}
                    />
                </div>

                <div className="flex-shrink-0 p-[clamp(0.5rem,min(1vw,1vh),1rem)] border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-[clamp(1rem,min(2vw,2vh),2rem)] py-[clamp(0.5rem,min(1vw,1vh),1rem)] bg-blue-600 hover:bg-blue-700 text-white rounded-[clamp(0.25rem,min(1vw,1vh),0.5rem)] text-[clamp(0.875rem,min(2vw,2vh),1.125rem)] font-semibold transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// -------- VARIANTS ANIMASI --------
const containerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

const gridContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

// -------- KOMPONEN KARTU FUNGSI (DENGAN FLIP IKON MENGGUNAKAN FRAMER MOTION) --------
interface FunctionCardProps {
    func: JfpmFunction
    onClick: () => void
}

const FunctionCard: React.FC<FunctionCardProps> = ({ func, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = func.icon

    const colorMap = {
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/40',
            border: 'border-blue-200 dark:border-blue-700',
            hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
            text: 'text-blue-700 dark:text-blue-200',
            iconColor: 'text-blue-600 dark:text-blue-300',
            iconBg: 'bg-blue-100 dark:bg-blue-800/50',
        },
        indigo: {
            bg: 'bg-indigo-50 dark:bg-indigo-900/40',
            border: 'border-indigo-200 dark:border-indigo-700',
            hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-500',
            text: 'text-indigo-700 dark:text-indigo-200',
            iconColor: 'text-indigo-600 dark:text-indigo-300',
            iconBg: 'bg-indigo-100 dark:bg-indigo-800/50',
        },
        green: {
            bg: 'bg-emerald-50 dark:bg-emerald-900/40',
            border: 'border-emerald-200 dark:border-emerald-700',
            hoverBorder:
                'hover:border-emerald-400 dark:hover:border-emerald-500',
            text: 'text-emerald-700 dark:text-emerald-200',
            iconColor: 'text-emerald-600 dark:text-emerald-300',
            iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
        },
        orange: {
            bg: 'bg-orange-50 dark:bg-orange-900/40',
            border: 'border-orange-200 dark:border-orange-700',
            hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500',
            text: 'text-orange-700 dark:text-orange-200',
            iconColor: 'text-orange-600 dark:text-orange-300',
            iconBg: 'bg-orange-100 dark:bg-orange-800/50',
        },
    }[func.color] || {
        bg: 'bg-gray-50 dark:bg-gray-800',
        border: 'border-gray-200 dark:border-gray-700',
        hoverBorder: 'hover:border-gray-400',
        text: 'text-gray-700',
        iconColor: 'text-gray-600',
        iconBg: 'bg-gray-100 dark:bg-gray-700',
    }

    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group flex flex-col items-center text-center p-[clamp(0.75rem,min(3vw,3vh),2rem)] ${colorMap.bg} rounded-[clamp(0.5rem,min(2vw,2vh),1rem)] border-2 ${colorMap.border} ${colorMap.hoverBorder} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg`}
            style={{ perspective: '800px' }}
        >
            {/* Icon wrapper dengan animasi flip menggunakan framer-motion */}
            <motion.div
                className={`mb-[clamp(0.75rem,min(2vw,2vh),1.5rem)] w-[clamp(3rem,min(8vw,8vh),5rem)] h-[clamp(3rem,min(8vw,8vh),5rem)] rounded-full ${colorMap.iconBg} flex items-center justify-center`}
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <IconComponent
                    className={`w-[clamp(1.5rem,min(4vw,4vh),2.5rem)] h-[clamp(1.5rem,min(4vw,4vh),2.5rem)] ${colorMap.iconColor}`}
                />
            </motion.div>

            <h3
                className={`text-[clamp(1rem,min(3vw,3vh),1.5rem)] font-bold ${colorMap.text} mb-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)]`}
            >
                {func.title}
            </h3>
            <p className="text-[clamp(0.75rem,min(2vw,2vh),1rem)] text-gray-600 dark:text-gray-300 font-medium mb-[clamp(0.5rem,min(1vw,1vh),1rem)]">
                {func.subtitle}
            </p>
            <p className="text-[clamp(0.75rem,min(2vw,2vh),1rem)] text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
                {func.description}
            </p>
            <div className="mt-[clamp(0.75rem,min(2vw,2vh),1.5rem)] inline-flex items-center gap-2 text-[clamp(0.75rem,min(2vw,2vh),1rem)] font-semibold text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span className="text-[clamp(1rem,min(3vw,3vh),1.5rem)]">
                    📋
                </span>
                <span>Lihat Detail</span>
            </div>
        </motion.div>
    )
}

// -------- PROPS SLIDE 2 --------
interface Slide2Props {
    onComplete?: () => void
}

// -------- KOMPONEN SLIDE 2 --------
const Slide2: React.FC<Slide2Props> = ({ onComplete }) => {
    const [selectedFunction, setSelectedFunction] =
        useState<JfpmFunction | null>(null)
    const [showPdfModal, setShowPdfModal] = useState(false)
    const { handleClick } = useInteraction()

    const openDetail = (func: JfpmFunction) => setSelectedFunction(func)
    const closeDetail = () => setSelectedFunction(null)
    const openPdf = () => setShowPdfModal(true)
    const closePdf = () => setShowPdfModal(false)

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 relative z-10">
            <FloatingIcons />
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <span className="text-[clamp(1.5rem,min(4vw,4vh),4rem)] font-bold text-gray-800 dark:text-white select-none opacity-80">
                    #2
                </span>
            </div>

            {/* Panel utama dengan tinggi yang lebih ringkas */}
            <motion.div
                className="w-full max-w-[1400px] max-h-full overflow-y-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[clamp(0.75rem,min(3vw,3vh),1.5rem)] shadow-2xl p-[clamp(1rem,min(3vw,3vh),2rem)] border border-white/30 dark:border-gray-800/50 flex flex-col gap-[clamp(0.75rem,min(2vw,2vh),1.5rem)] relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div
                    className="text-center"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-[clamp(2rem,min(6vw,6vh),4rem)] font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text mb-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)] tracking-tight">
                        Fungsi Pusbin JFPM
                    </h1>
                    <p className="text-[clamp(1rem,min(3vw,3vh),1.5rem)] text-gray-700 dark:text-gray-200 font-medium max-w-7xl mx-auto mb-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)] px-2">
                        Perumusan kebijakan dan pengelolaan tes serta pemberian
                        dukungan asesmen kompetensi di lingkungan Kementerian
                    </p>
                    <p className="text-[clamp(0.875rem,min(2vw,2vh),1.125rem)] text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto px-2">
                        Berdasarkan <strong>PMK 124 Tahun 2024</strong>, Pusbin
                        JFPM melaksanakan:
                    </p>
                </motion.div>

                {/* Grid Kartu */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(0.75rem,min(2vw,2vh),1.5rem)] mt-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)]"
                    variants={gridContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {jfpmFunctions.map((func, idx) => (
                        <FunctionCard
                            key={idx}
                            func={func}
                            onClick={handleClick(() => openDetail(func))}
                        />
                    ))}
                </motion.div>

                {/* Tombol aksi: PDF dan Lanjut ke Kuis */}
                <motion.div
                    className="flex flex-wrap justify-center gap-[clamp(0.5rem,min(1vw,1vh),1rem)] mt-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)] mb-[clamp(0.5rem,min(1vw,1vh),1rem)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <button
                        onClick={handleClick(openPdf)}
                        className="inline-flex items-center gap-[clamp(0.5rem,min(1vw,1vh),1rem)] px-[clamp(1rem,min(2vw,2vh),2rem)] py-[clamp(0.5rem,min(1vw,1vh),1rem)] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-[clamp(0.25rem,min(1vw,1vh),0.75rem)] shadow-lg transition cursor-pointer text-[clamp(0.75rem,min(2vw,2vh),1rem)]"
                    >
                        <FaFilePdf className="w-[clamp(1rem,min(3vw,3vh),1.5rem)] h-[clamp(1rem,min(3vw,3vh),1.5rem)]" />
                        Lihat PMK 124 Tahun 2024
                    </button>

                    {onComplete && (
                        <button
                            onClick={handleClick(onComplete)}
                            className="inline-flex items-center gap-[clamp(0.5rem,min(1vw,1vh),1rem)] px-[clamp(1rem,min(2vw,2vh),2rem)] py-[clamp(0.5rem,min(1vw,1vh),1rem)] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-[clamp(0.25rem,min(1vw,1vh),0.75rem)] shadow-lg transition cursor-pointer text-[clamp(0.75rem,min(2vw,2vh),1rem)]"
                        >
                            Lanjut ke Kuis
                            <FaArrowRight className="w-[clamp(1rem,min(3vw,3vh),1.5rem)] h-[clamp(1rem,min(3vw,3vh),1.5rem)]" />
                        </button>
                    )}
                </motion.div>
            </motion.div>

            {/* Modals */}
            {selectedFunction && (
                <InfoModal
                    onClose={closeDetail}
                    title={selectedFunction.title}
                    subtitle={selectedFunction.subtitle}
                    detail={selectedFunction.detail}
                />
            )}
            {showPdfModal && (
                <PdfModal
                    onClose={closePdf}
                    title="PMK 124 Tahun 2024"
                    subtitle="Peraturan Menteri Keuangan tentang Organisasi dan Tata Kerja Kementerian Keuangan"
                    pdfPath="./slides-data/group-1/2/pmk-124-tahun-2024.pdf"
                />
            )}
        </div>
    )
}

export const searchText =
    'Pusbin JFPM uji kompetensi sertifikasi profesi pengelolaan tes PMK 124 tahun 2024'

export default Slide2
