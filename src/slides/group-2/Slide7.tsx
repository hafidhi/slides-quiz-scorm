// src/slides/group-2/Slide7.tsx

import React, { useState } from 'react'
import {
    FaChartBar,
    FaUsers,
    FaClipboardCheck,
    FaArrowRight,
    FaArrowDown,
    FaUniversity,
    FaTimes,
    FaUserCheck,
    FaShare,
} from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

// -------- TYPE DATA LANGKAH UKOM SEDERHANA --------
interface UkomStepInfo {
    id: number
    icon: React.ComponentType<{ className?: string }>
    color: 'blue' | 'teal' | 'violet'
    title: string
    summary: string
    detail: string
}

// -------- DATA 3 LANGKAH UKOM SEDERHANA --------
const ukomSteps: UkomStepInfo[] = [
    {
        id: 1,
        icon: FaUsers,
        color: 'blue',
        title: 'Penentuan Ukom untuk Perpindahan dalam JF',
        summary:
            'Perpindahan dalam jabatan fungsional di bidang keuangan negara',
        detail: `Langkah awal Ukom Sederhana adalah menentukan skenario perpindahan antar Jabatan Fungsional (JF) di bidang keuangan negara, yaitu:

1. Dalam bidang tugas yang sama
   Perpindahan antar jabatan fungsional Analis Keuangan Negara, Pengawas Keuangan Negara, Penilai, atau Pelelang dengan ruang lingkup tugas yang masih sama.

2. Dalam bidang tugas yang berbeda
   Perpindahan antar jabatan fungsional tersebut namun dengan ruang lingkup tugas yang berbeda.

Proses penentuan ini dilakukan oleh Instansi Pengguna berdasarkan kebutuhan organisasi dan formasi yang tersedia.`,
    },
    {
        id: 2,
        icon: FaClipboardCheck,
        color: 'teal',
        title: 'Pelaksanaan Ukom Teknis JF',
        summary:
            'Dilaksanakan paling sedikit melalui penilaian portofolio oleh instansi pengguna',
        detail: `Tahap Pelaksanaan Ukom Teknis JF dilakukan secara sederhana oleh instansi pengguna dengan metode yang profesional namun tidak terlalu kompleks.

Mekanisme Penilaian:
• Dilaksanakan minimal melalui penilaian portofolio.
• Penilaian portofolio mencakup evaluasi terhadap kompetensi, pengalaman kerja, dan diklat yang pernah diikuti oleh peserta.
• Pelaksanaan dilakukan dengan mempertimbangkan kebutuhan organisasi, formasi, serta peta jabatan fungsional yang ada.

Proses ini dikelola sepenuhnya oleh unit pengguna (tidak melibatkan BPPK secara langsung).`,
    },
    {
        id: 3,
        icon: FaShare,
        color: 'violet',
        title: 'Pemutakhiran Informasi JFKN',
        summary:
            'Instansi pengguna menyampaikan pemutakhiran informasi jabatan fungsional',
        detail: `Setelah ukom selesai dilaksanakan, instansi pengguna wajib melakukan pemutakhiran data terhadap sistem data kepegawaian.

Data yang wajib diperbaharui paling kurang mencakup:
• Perubahan bidang tugas dan/atau ruang lingkup jabatan fungsional.
• Jenjang jabatan fungsional yang diduduki oleh pegawai.
• Unit kerja jabatan fungsional yang baru.

Informasi ini kemudian disampaikan kepada unit pengelola ukum teknis JF di bidang keuangan negara untuk keperluan pembinaan dan administrasi kepegawaian.`,
    },
]

// -------- KOMPONEN MODAL DETAIL LANGKAH UKOM --------
interface UkomStepDetailModalProps {
    onClose: () => void
    step: UkomStepInfo
}

const UkomStepDetailModal: React.FC<UkomStepDetailModalProps> = ({
    onClose,
    step,
}) => {
    const IconComponent = step.icon

    const colorMap = {
        blue: {
            border: 'border-blue-400 dark:border-blue-600',
            iconBg: 'bg-blue-100 dark:bg-blue-800/50',
            iconColor: 'text-blue-600 dark:text-blue-300',
            badge: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200',
            btn: 'bg-blue-600 hover:bg-blue-700',
        },
        teal: {
            border: 'border-teal-400 dark:border-teal-600',
            iconBg: 'bg-teal-100 dark:bg-teal-800/50',
            iconColor: 'text-teal-600 dark:text-teal-300',
            badge: 'bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-200',
            btn: 'bg-teal-600 hover:bg-teal-700',
        },
        violet: {
            border: 'border-violet-400 dark:border-violet-600',
            iconBg: 'bg-violet-100 dark:bg-violet-800/50',
            iconColor: 'text-violet-600 dark:text-violet-300',
            badge: 'bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200',
            btn: 'bg-violet-600 hover:bg-violet-700',
        },
    }[step.color]

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${colorMap.iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                            <IconComponent
                                className={`w-6 h-6 sm:w-7 sm:h-7 ${colorMap.iconColor}`}
                            />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                    {step.id}
                                </span>
                                {step.title}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer ml-4"
                    >
                        <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                    {step.detail}
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 p-2 sm:p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 ${colorMap.btn} text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer`}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// -------- KOMPONEN KARTU LANGKAH UKOM --------
interface UkomStepCardProps {
    step: UkomStepInfo
    onClick: () => void
}

const UkomStepCard: React.FC<UkomStepCardProps> = ({ step, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = step.icon

    const colorMap = {
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/40',
            border: 'border-blue-200 dark:border-blue-700',
            hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
            text: 'text-blue-700 dark:text-blue-200',
            iconColor: 'text-blue-600 dark:text-blue-300',
            iconBg: 'bg-blue-100 dark:bg-blue-800/50',
            glow: 'group-hover:shadow-blue-300/50 dark:group-hover:shadow-blue-500/30',
        },
        teal: {
            bg: 'bg-teal-50 dark:bg-teal-900/40',
            border: 'border-teal-200 dark:border-teal-700',
            hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-500',
            text: 'text-teal-700 dark:text-teal-200',
            iconColor: 'text-teal-600 dark:text-teal-300',
            iconBg: 'bg-teal-100 dark:bg-teal-800/50',
            glow: 'group-hover:shadow-teal-300/50 dark:group-hover:shadow-teal-500/30',
        },
        violet: {
            bg: 'bg-violet-50 dark:bg-violet-900/40',
            border: 'border-violet-200 dark:border-violet-700',
            hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-500',
            text: 'text-violet-700 dark:text-violet-200',
            iconColor: 'text-violet-600 dark:text-violet-300',
            iconBg: 'bg-violet-100 dark:bg-violet-800/50',
            glow: 'group-hover:shadow-violet-300/50 dark:group-hover:shadow-violet-500/30',
        },
    }[step.color]

    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group flex flex-col items-center text-center p-5 md:p-6 ${colorMap.bg} rounded-2xl border-2 ${colorMap.border} ${colorMap.hoverBorder} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${colorMap.glow} shadow-lg flex-grow`}
            style={{ perspective: '800px' }}
        >
            <div className="w-full flex justify-start mb-1">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-black/30 px-2 py-0.5 rounded-full">
                    Langkah {step.id}
                </span>
            </div>
            <motion.div
                className={`mb-3 w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colorMap.iconBg} flex items-center justify-center`}
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <IconComponent
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${colorMap.iconColor}`}
                />
            </motion.div>

            <h3
                className={`text-sm sm:text-base font-bold ${colorMap.text} mb-2 leading-tight`}
            >
                {step.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-grow line-clamp-2">
                {step.summary}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>📋</span>
                <span>Lihat Detail</span>
            </div>
        </motion.div>
    )
}

// -------- KOMPONEN DESTINATION CARD (KOTAK DISAMPAIKAN KEPADA) --------
const UkomDestinationCard: React.FC = () => {
    return (
        <motion.div
            variants={cardVariants}
            className="flex flex-row items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-md max-w-2xl w-full"
        >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                <FaUniversity className="w-5 h-5" />
            </div>
            <div className="text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Disampaikan kepada
                </p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                    Unit Pengelola Ukom Teknis JF <br className="sm:hidden" />{' '}
                    di Bidang Keuangan Negara
                </p>
            </div>
        </motion.div>
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
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

// -------- MODAL DAFTAR LANGKAH UKOM --------
interface UkomListModalProps {
    onClose: () => void
    onSelectStep: (step: UkomStepInfo) => void
}

const UkomListModal: React.FC<UkomListModalProps> = ({
    onClose,
    onSelectStep,
}) => {
    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-6xl w-full max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaChartBar className="text-blue-600 dark:text-blue-400" />
                        Alur Pelaksanaan Ukom Sederhana
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer"
                    >
                        <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <motion.div
                        className="flex flex-col items-center gap-6 sm:gap-8 w-full"
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* 3 Langkah Ukom dengan Panah Penghubung */}
                        <div className="flex flex-col sm:flex-row items-stretch justify-center w-full gap-3 sm:gap-2">
                            {ukomSteps.map((step, idx) => (
                                <React.Fragment key={step.id}>
                                    <UkomStepCard
                                        step={step}
                                        onClick={() => onSelectStep(step)}
                                    />
                                    {idx < ukomSteps.length - 1 && (
                                        <div className="hidden sm:flex items-center justify-center text-3xl text-gray-300 dark:text-gray-600 px-1">
                                            <FaArrowRight />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Bagian Output / Disampaikan Ke */}
                        <div className="mt-2 sm:mt-4 flex flex-col items-center gap-2 w-full">
                            <div className="hidden sm:block text-gray-300 dark:text-gray-600">
                                <FaArrowDown className="text-3xl" />
                            </div>
                            <UkomDestinationCard />
                        </div>
                    </motion.div>
                </div>

                <div className="flex-shrink-0 p-2 sm:p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// -------- PROPS SLIDE 7 --------
interface Slide7Props {
    onComplete?: () => void
}

// -------- KOMPONEN SLIDE 7 (UKOM SEDERHANA) --------
const Slide7: React.FC<Slide7Props> = ({}) => {
    const [selectedStep, setSelectedStep] = useState<UkomStepInfo | null>(null)
    const [showUkomList, setShowUkomList] = useState(false)
    const { handleClick } = useInteraction()

    const openUkomList = () => setShowUkomList(true)
    const closeUkomList = () => setShowUkomList(false)

    const handleSelectStep = (step: UkomStepInfo) => {
        setSelectedStep(step)
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            <FloatingIcons />
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <span className="text-[clamp(1rem,4vw,3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #7
                </span>
            </div>

            {/* Card utama */}
            <motion.div
                className="w-full max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/30 dark:border-gray-800/50 flex flex-col gap-6 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* HEADER */}
                <motion.div
                    className="text-center"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-[clamp(1.50rem,4vw,2.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mb-3 tracking-tight">
                        Ukom Sederhana yang dilaksanakan oleh Unit Pengguna
                    </h1>
                    <p className="text-[clamp(0.6rem,1.6vw,1.15rem)] text-gray-700 dark:text-gray-200 font-semibold max-w-7xl mx-auto mb-1 px-2">
                        Pelaksanaan Uji Kompetensi untuk perpindahan dalam
                        Jabatan Fungsional di Bidang Keuangan Negara melalui
                        penilaian portofolio oleh{' '}
                        <strong className="text-indigo-600 dark:text-indigo-400">
                            Instansi Pengguna
                        </strong>
                    </p>
                </motion.div>

                {/* Card Besar Aksi (Tombol Lihat Alur) */}
                <motion.div
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
                    onClick={handleClick(openUkomList)}
                    variants={cardVariants}
                >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center mb-4">
                        <FaUserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-200 mb-2">
                        Lihat Alur Pelaksanaan Ukom Sederhana 3 Langkah
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 max-w-5xl">
                        Pelajari secara mendalam mengenai Penentuan Ukom,
                        Pelaksanaan melalui portofolio, hingga Pemutakhiran data
                        JFKN yang disampaikan kepada Unit Pengelola Ukom Teknis
                        JF.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 group-hover:underline">
                        <span>📋</span>
                        <span>Klik untuk melihat alur proses</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* ----- MODALS ----- */}
            {showUkomList && (
                <UkomListModal
                    onClose={closeUkomList}
                    onSelectStep={handleSelectStep}
                />
            )}
            {selectedStep && (
                <UkomStepDetailModal
                    onClose={() => setSelectedStep(null)}
                    step={selectedStep}
                />
            )}
        </div>
    )
}

export const searchText =
    'Ukom Sederhana Unit Pengguna Instansi Pengguna Perpindahan JF Bidang Keuangan Negara AKN PKN Penilai Pelelang Penilaian Portofolio Pusbin JFPM Pemutakhiran JFKN'

export default Slide7
