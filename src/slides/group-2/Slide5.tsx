// src/slides/group-2/Slide5.tsx
import React, { useState } from 'react'
import {
    FaFileAlt,
    FaChartPie,
    FaClipboardCheck,
    FaEye,
    FaFilePdf,
    FaExclamationTriangle,
    FaLaptopCode,
    FaTimes,
} from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

// ----------------------------------------------------------------------
// Tipe data untuk setiap tahapan
// ----------------------------------------------------------------------
interface TahapanInfo {
    icon: React.ComponentType<{ className?: string }>
    color: string
    title: string
    nodeId: string
    phase: string
}

interface DetailInfo {
    title: string
    description: string
    detailSteps: string[]
}

// ----------------------------------------------------------------------
// Dua kelompok tahapan: Monitoring & Evaluasi (A-E) dan IT & Force Majeure (F-G)
// ----------------------------------------------------------------------
const tahapanMonitoring: TahapanInfo[] = [
    {
        icon: FaFileAlt,
        color: 'blue',
        title: 'Rekapitulasi Penyelenggaraan',
        nodeId: 'A',
        phase: 'Tahapan Evaluasi',
    },
    {
        icon: FaChartPie,
        color: 'emerald',
        title: 'Pengolahan Data Hasil Evaluasi',
        nodeId: 'B',
        phase: 'Tahapan Evaluasi',
    },
    {
        icon: FaClipboardCheck,
        color: 'amber',
        title: 'Matriks Rekomendasi & Tindak Lanjut',
        nodeId: 'C',
        phase: 'Tahapan Evaluasi',
    },
    {
        icon: FaEye,
        color: 'orange',
        title: 'Pemantauan Pelaksanaan Tindak Lanjut',
        nodeId: 'D',
        phase: 'Tahapan Evaluasi',
    },
    {
        icon: FaFilePdf,
        color: 'rose',
        title: 'Penyusunan & Penyampaian Laporan',
        nodeId: 'E',
        phase: 'Tahapan Evaluasi',
    },
]

const tahapanIT: TahapanInfo[] = [
    {
        icon: FaExclamationTriangle,
        color: 'purple',
        title: 'Penanganan Force Majeure',
        nodeId: 'F',
        phase: 'Business Continuity',
    },
    {
        icon: FaLaptopCode,
        color: 'teal',
        title: 'Aplikasi Manajemen Pembelajaran',
        nodeId: 'G',
        phase: 'Sistem Normal',
    },
]

// ----------------------------------------------------------------------
// Data detail setiap node
// ----------------------------------------------------------------------
const detailMap: Record<string, DetailInfo> = {
    A: {
        title: 'Rekapitulasi Penyelenggaraan',
        description:
            'Mengumpulkan dan mencatat seluruh data yang terkait dengan proses penyelenggaraan Ukom yang telah selesai.',
        detailSteps: [
            'Mengumpulkan data pelaksanaan ukom dari berbagai sumber.',
            'Melakukan pencatatan dan penyusunan data secara sistematis sebagai bahan evaluasi awal.',
        ],
    },
    B: {
        title: 'Pengolahan Data Hasil Evaluasi',
        description:
            'Data yang sudah direkap diolah secara mendalam untuk melihat kelemahan, kelebihan, dan efektivitas pelaksanaan ujian.',
        detailSteps: [
            'Melakukan analisis mendalam terhadap data penyelenggaraan.',
            'Mengidentifikasi kekurangan dan kelebihan sistem pelaksanaan ujian.',
            'Mengukur efektivitas metode dan standar uji kompetensi yang digunakan.',
        ],
    },
    C: {
        title: 'Matriks Rekomendasi & Tindak Lanjut',
        description:
            'Hasil pengolahan data dituangkan ke dalam matriks rekomendasi yang berisi perbaikan dan tindak lanjut nyata.',
        detailSteps: [
            'Menyusun poin-poin rekomendasi perbaikan berdasarkan hasil analisis data.',
            'Menentukan tindak lanjut (action plan) yang harus dilaksanakan untuk perbaikan ke depannya.',
        ],
    },
    D: {
        title: 'Pemantauan Pelaksanaan Tindak Lanjut',
        description:
            'Tidak berhenti di rekomendasi tertulis, tim memantau secara aktif apakah rekomendasi benar-benar dijalankan.',
        detailSteps: [
            'Melakukan monitoring berkala terhadap implementasi rekomendasi.',
            'Memastikan setiap tindakan perbaikan benar-benar berdampak positif untuk ujian berikutnya.',
        ],
    },
    E: {
        title: 'Penyusunan & Penyampaian Laporan',
        description:
            'Semua proses monitoring didokumentasikan dalam laporan akhir dan disampaikan kepada pihak terkait.',
        detailSteps: [
            'Menyusun laporan komprehensif mengenai hasil monitoring dan evaluasi.',
            'Menyampaikan laporan kepada unit-unit terkait sebagai bahan evaluasi tingkat tinggi.',
            '💡 Catatan: Proses Monitoring & Evaluasi ini wajib dilaksanakan minimal 1 kali dalam 1 tahun.',
        ],
    },
    F: {
        title: 'Penanganan Force Majeure & Business Continuity',
        description:
            'Antisipasi saat sistem utama mengalami gangguan atau terjadi kondisi kahar (force majeure).',
        detailSteps: [
            'Jika terjadi gangguan pada Sistem Informasi dan Aplikasi Manajemen Pembelajaran BPPK.',
            'Aktifkan mekanisme Business Continuity Management (Manajemen Keberlangsungan Bisnis).',
            'Pelaksanaan ukom akan dialihkan ke aplikasi cadangan yang disediakan oleh Kementerian Keuangan.',
            'Atau dilakukan melalui proses lainnya yang dikoordinasikan langsung oleh BPPK c.q. Pusbin JFPM.',
        ],
    },
    G: {
        title: 'Aplikasi Manajemen Pembelajaran BPPK (Sistem Informasi)',
        description:
            'Saat sistem berjalan normal, Aplikasi Manajemen Pembelajaran BPPK mendukung 4 fungsi vital penyelenggaraan ujian.',
        detailSteps: [
            '1. Pengelolaan Peserta: Mengatur dan mengelola data seluruh peserta ujian.',
            '2. Validasi Data: Memastikan data peserta sah, valid, dan memenuhi syarat administrasi.',
            '3. Pelaksanaan Ujikom: Menjadi media/interface tempat peserta mengerjakan soal ujian.',
            '4. Pemutakhiran data kepegawaian JFKN: Otomatis memperbarui status kompetensi peserta ke dalam database kepegawaian.',
        ],
    },
}

// ----------------------------------------------------------------------
// Variant animasi
// ----------------------------------------------------------------------
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

// ----------------------------------------------------------------------
// Kartu tahapan (modal list)
// ----------------------------------------------------------------------
interface TahapanCardProps {
    info: TahapanInfo
    onClick: () => void
}

const TahapanCard: React.FC<TahapanCardProps> = ({ info, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = info.icon

    const colorMap: Record<
        string,
        {
            bg: string
            border: string
            hoverBorder: string
            text: string
            iconColor: string
            iconBg: string
            badge: string
            glow: string
        }
    > = {
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/40',
            border: 'border-blue-200 dark:border-blue-700',
            hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
            text: 'text-blue-700 dark:text-blue-200',
            iconColor: 'text-blue-600 dark:text-blue-300',
            iconBg: 'bg-blue-100 dark:bg-blue-800/50',
            badge: 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200',
            glow: 'group-hover:shadow-blue-300/50 dark:group-hover:shadow-blue-500/30',
        },
        emerald: {
            bg: 'bg-emerald-50 dark:bg-emerald-900/40',
            border: 'border-emerald-200 dark:border-emerald-700',
            hoverBorder:
                'hover:border-emerald-400 dark:hover:border-emerald-500',
            text: 'text-emerald-700 dark:text-emerald-200',
            iconColor: 'text-emerald-600 dark:text-emerald-300',
            iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
            badge: 'bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-200',
            glow: 'group-hover:shadow-emerald-300/50 dark:group-hover:shadow-emerald-500/30',
        },
        orange: {
            bg: 'bg-orange-50 dark:bg-orange-900/40',
            border: 'border-orange-200 dark:border-orange-700',
            hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500',
            text: 'text-orange-700 dark:text-orange-200',
            iconColor: 'text-orange-600 dark:text-orange-300',
            iconBg: 'bg-orange-100 dark:bg-orange-800/50',
            badge: 'bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200',
            glow: 'group-hover:shadow-orange-300/50 dark:group-hover:shadow-orange-500/30',
        },
        rose: {
            bg: 'bg-rose-50 dark:bg-rose-900/40',
            border: 'border-rose-200 dark:border-rose-700',
            hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-500',
            text: 'text-rose-700 dark:text-rose-200',
            iconColor: 'text-rose-600 dark:text-rose-300',
            iconBg: 'bg-rose-100 dark:bg-rose-800/50',
            badge: 'bg-rose-200 dark:bg-rose-700 text-rose-800 dark:text-rose-200',
            glow: 'group-hover:shadow-rose-300/50 dark:group-hover:shadow-rose-500/30',
        },
        amber: {
            bg: 'bg-amber-50 dark:bg-amber-900/40',
            border: 'border-amber-200 dark:border-amber-700',
            hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-500',
            text: 'text-amber-700 dark:text-amber-200',
            iconColor: 'text-amber-600 dark:text-amber-300',
            iconBg: 'bg-amber-100 dark:bg-amber-800/50',
            badge: 'bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200',
            glow: 'group-hover:shadow-amber-300/50 dark:group-hover:shadow-amber-500/30',
        },
        teal: {
            bg: 'bg-teal-50 dark:bg-teal-900/40',
            border: 'border-teal-200 dark:border-teal-700',
            hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-500',
            text: 'text-teal-700 dark:text-teal-200',
            iconColor: 'text-teal-600 dark:text-teal-300',
            iconBg: 'bg-teal-100 dark:bg-teal-800/50',
            badge: 'bg-teal-200 dark:bg-teal-700 text-teal-800 dark:text-teal-200',
            glow: 'group-hover:shadow-teal-300/50 dark:group-hover:shadow-teal-500/30',
        },
        purple: {
            bg: 'bg-purple-50 dark:bg-purple-900/40',
            border: 'border-purple-200 dark:border-purple-700',
            hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
            text: 'text-purple-700 dark:text-purple-200',
            iconColor: 'text-purple-600 dark:text-purple-300',
            iconBg: 'bg-purple-100 dark:bg-purple-800/50',
            badge: 'bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200',
            glow: 'group-hover:shadow-purple-300/50 dark:group-hover:shadow-purple-500/30',
        },
    }

    const c = colorMap[info.color] || colorMap.blue

    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group flex flex-col items-center text-center p-5 md:p-6 ${c.bg} rounded-2xl border-2 ${c.border} ${c.hoverBorder} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${c.glow} shadow-lg`}
            style={{ perspective: '800px' }}
        >
            <motion.div
                className={`mb-3 w-14 h-14 sm:w-16 sm:h-16 rounded-full ${c.iconBg} flex items-center justify-center`}
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <IconComponent
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${c.iconColor}`}
                />
            </motion.div>

            <span
                className={`text-xs font-bold ${c.badge} px-2 py-0.5 rounded-full mb-1.5`}
            >
                {info.phase}
            </span>
            <h3
                className={`text-sm sm:text-base font-bold ${c.text} mb-2 leading-tight`}
            >
                {info.title}
            </h3>

            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>📋</span>
                <span>Lihat Detail</span>
            </div>
        </motion.div>
    )
}

// ----------------------------------------------------------------------
// Modal daftar tahapan
// ----------------------------------------------------------------------
interface TahapanListModalProps {
    title: string
    icon: React.ComponentType<{ className?: string }>
    data: TahapanInfo[]
    onClose: () => void
    onSelect: (info: TahapanInfo) => void
}

const TahapanListModal: React.FC<TahapanListModalProps> = ({
    title,
    icon: IconComp,
    data,
    onClose,
    onSelect,
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
                        <IconComp className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                        {title}
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
                        className={`grid gap-4 md:gap-5 ${
                            data.length <= 2
                                ? 'grid-cols-1 sm:grid-cols-2'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        }`}
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {data.map((item, idx) => (
                            <TahapanCard
                                key={idx}
                                info={item}
                                onClick={() => onSelect(item)}
                            />
                        ))}
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

// ----------------------------------------------------------------------
// Modal detail spesifik
// ----------------------------------------------------------------------
interface DetailModalProps {
    isOpen: boolean
    onClose: () => void
    info: DetailInfo
    color: string
}

const DetailModal: React.FC<DetailModalProps> = ({
    isOpen,
    onClose,
    info,
    color,
}) => {
    if (!isOpen) return null

    const colorMap: Record<string, { border: string; btn: string }> = {
        blue: {
            border: 'border-blue-400',
            btn: 'bg-blue-600 hover:bg-blue-700',
        },
        emerald: {
            border: 'border-emerald-400',
            btn: 'bg-emerald-600 hover:bg-emerald-700',
        },
        orange: {
            border: 'border-orange-400',
            btn: 'bg-orange-600 hover:bg-orange-700',
        },
        rose: {
            border: 'border-rose-400',
            btn: 'bg-rose-600 hover:bg-rose-700',
        },
        amber: {
            border: 'border-amber-400',
            btn: 'bg-amber-600 hover:bg-amber-700',
        },
        teal: {
            border: 'border-teal-400',
            btn: 'bg-teal-600 hover:bg-teal-700',
        },
        purple: {
            border: 'border-purple-400',
            btn: 'bg-purple-600 hover:bg-purple-700',
        },
    }

    const c = colorMap[color] || {
        border: 'border-gray-400',
        btn: 'bg-gray-600 hover:bg-gray-700',
    }

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4"
            onClick={onClose}
        >
            <div
                className={`bg-white dark:bg-gray-800 max-w-lg w-full max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden border-t-4 ${c.border}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                        {info.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer ml-4"
                    >
                        <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    <p className="mb-4">{info.description}</p>
                    <ul className="space-y-3">
                        {info.detailSteps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-gray-600 dark:text-gray-300">
                                    {idx + 1}
                                </div>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-shrink-0 p-2 sm:p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 ${c.btn} text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer`}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// ----------------------------------------------------------------------
// KOMPONEN UTAMA SLIDE 5 (Tampilan disamakan dengan Slide1)
// ----------------------------------------------------------------------
interface Slide5Props {
    onComplete?: () => void
}

const Slide5: React.FC<Slide5Props> = () => {
    const { handleClick } = useInteraction()
    const [selectedDetail, setSelectedDetail] = useState<DetailInfo | null>(
        null,
    )
    const [detailColor, setDetailColor] = useState<string>('blue')
    const [listModal, setListModal] = useState<'monitoring' | 'it' | null>(null)

    const openMonitoringList = () => setListModal('monitoring')
    const openITList = () => setListModal('it')
    const closeList = () => setListModal(null)

    const handleSelectTahapan = (info: TahapanInfo) => {
        const detail = detailMap[info.nodeId]
        if (detail) {
            setSelectedDetail(detail)
            setDetailColor(info.color)
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 relative z-10">
            <FloatingIcons />
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <span className="text-[clamp(1rem,4vw,3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #5
                </span>
            </div>

            {/* Card utama dengan max-h-full overflow-y-auto (sama seperti Slide1) */}
            <motion.div
                className="w-full max-w-[1400px] max-h-full overflow-y-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/30 dark:border-gray-800/50 flex flex-col gap-4 sm:gap-6 lg:gap-8 relative z-10"
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
                    <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mb-3 tracking-tight">
                        Monitoring, Evaluasi & IT Support Ukom
                    </h1>
                    <p className="text-[clamp(1rem,2vw,1.35rem)] text-gray-700 dark:text-gray-200 font-semibold max-w-7xl mx-auto mb-1 px-2">
                        Alur Monitoring & Evaluasi serta Sistem Informasi
                    </p>
                    <p className="text-[clamp(0.85rem,1.6vw,1.05rem)] text-gray-500 dark:text-gray-400 font-light max-w-7xl mx-auto px-2">
                        Klik salah satu fase untuk melihat tahapan detail •{' '}
                        <span className="italic">
                            Klik kartu untuk melihat detail
                        </span>
                    </p>
                </motion.div>

                {/* INFO BANNER */}
                <motion.div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-2xl p-4 sm:p-5 text-center"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaClipboardCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm sm:text-base font-bold text-blue-800 dark:text-blue-200">
                            Kewajiban Monitoring & Evaluasi
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Proses Monitoring & Evaluasi wajib dilaksanakan{' '}
                        <strong>minimal 1 kali dalam 1 tahun</strong>. Sistem
                        Informasi digunakan untuk pengelolaan peserta, validasi
                        data, pelaksanaan ujikom, dan pemutakhiran data
                        kepegawaian.
                    </p>
                </motion.div>

                {/* DUA CARD BESAR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                    {/* Monitoring & Evaluasi */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 dark:from-blue-500/20 dark:to-emerald-500/20 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
                        onClick={handleClick(openMonitoringList)}
                        variants={cardVariants}
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center mb-4">
                            <FaClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-200 mb-2">
                            Monitoring & Evaluasi Ukom
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl">
                            Meliputi rekapitulasi, evaluasi, rekomendasi,
                            pemantauan, hingga pelaporan akhir
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 5 tahapan (Min. 1x/tahun)</span>
                        </div>
                    </motion.div>

                    {/* IT Support & Force Majeure */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 dark:from-purple-500/20 dark:to-teal-500/20 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
                        onClick={handleClick(openITList)}
                        variants={cardVariants}
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center mb-4">
                            <FaLaptopCode className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-purple-700 dark:text-purple-200 mb-2">
                            Force Majeure & Sistem Informasi
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl">
                            Manajemen keberlangsungan bisnis, penanganan
                            darurat, dan fungsi aplikasi BPPK
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-500 dark:text-purple-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 2 tahapan</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ----- MODALS ----- */}
            {listModal === 'monitoring' && (
                <TahapanListModal
                    title="Tahapan Monitoring & Evaluasi Ukom"
                    icon={FaClipboardCheck}
                    data={tahapanMonitoring}
                    onClose={closeList}
                    onSelect={handleSelectTahapan}
                />
            )}
            {listModal === 'it' && (
                <TahapanListModal
                    title="Force Majeure & Sistem Informasi"
                    icon={FaLaptopCode}
                    data={tahapanIT}
                    onClose={closeList}
                    onSelect={handleSelectTahapan}
                />
            )}
            {selectedDetail && (
                <DetailModal
                    isOpen={true}
                    onClose={() => setSelectedDetail(null)}
                    info={selectedDetail}
                    color={detailColor}
                />
            )}
        </div>
    )
}

// ----------------------------------------------------------------------
// Teks pencarian (sesuai konten slide5)
// ----------------------------------------------------------------------
export const searchText =
    'Monitoring Evaluasi Ukom JFKN Rekapitulasi Pengolahan Data Matriks Rekomendasi Tindak Lanjut Pemantauan Pelaksanaan Laporan Minimal 1 Kali dalam 1 Tahun Force Majeure IT Support Business Continuity Management BPPK Pusbin JFPM Aplikasi Manajemen Pembelajaran Pengelolaan Peserta Validasi Data Pelaksanaan Ujikom Pemutakhiran Data Kepegawaian'

export default Slide5
