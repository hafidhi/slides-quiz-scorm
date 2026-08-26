// src/slides/group-2/Slide4.tsx
import React, { useState } from 'react'
import {
    FaUsers,
    FaClipboardList,
    FaBullhorn,
    FaUserCog,
    FaPenFancy,
    FaFileSignature,
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
    color: string // Diperluas untuk mengakomodasi 'amber', 'teal', 'indigo'
    title: string
    executor: string
    nodeId: string
    phase: string
}

interface DetailInfo {
    title: string
    description: string
    detailSteps: string[]
}

// ----------------------------------------------------------------------
// Dua kelompok tahapan: Persiapan & Pengumuman (A-C) dan Pelaksanaan & Hasil (D-F)
// ----------------------------------------------------------------------
const tahapanPersiapan: TahapanInfo[] = [
    {
        icon: FaUsers,
        color: 'rose',
        title: 'A. Pembentukan Tim Pelaksana',
        executor: 'Kementerian Keuangan & Instansi Pemerintah Luar',
        nodeId: 'A',
        phase: 'Fase Pra-Pelaksanaan',
    },
    {
        icon: FaClipboardList,
        color: 'orange',
        title: 'B. Persiapan Pelaksanaan',
        executor: 'Tim Pelaksana',
        nodeId: 'B',
        phase: 'Fase Pra-Pelaksanaan',
    },
    {
        icon: FaBullhorn,
        color: 'amber',
        title: 'C. Pengumuman Pelaksanaan Ukom',
        executor: 'Penyelenggara Ukom',
        nodeId: 'C',
        phase: 'Fase Pra-Pelaksanaan',
    },
]

const tahapanPelaksanaan: TahapanInfo[] = [
    {
        icon: FaUserCog,
        color: 'teal',
        title: 'D. Pengelolaan Peserta',
        executor: 'Instansi Pengusul & Tim Pelaksana',
        nodeId: 'D',
        phase: 'Fase Pelaksanaan Ujian',
    },
    {
        icon: FaPenFancy,
        color: 'blue',
        title: 'E. Uji Kompetensi Teknis',
        executor: 'Tim Penilai Kompetensi',
        nodeId: 'E',
        phase: 'Fase Pelaksanaan Ujian',
    },
    {
        icon: FaFileSignature,
        color: 'indigo',
        title: 'F. Pemeriksaan dan Penetapan Hasil',
        executor: 'Tim Penyusun & Pengembang Materi',
        nodeId: 'F',
        phase: 'Fase Akhir / Pasca-Ujian',
    },
]

// ----------------------------------------------------------------------
// Data detail setiap node (mencakup seluruh materi dari gambar)
// ----------------------------------------------------------------------
const detailMap: Record<string, DetailInfo> = {
    A: {
        title: 'A. Pembentukan Tim Pelaksana',
        description:
            'Menyusun struktur dan pembagian peran tim penyelenggara uji kompetensi.',
        detailSteps: [
            'Struktur Tim terdiri dari: Ketua Tim, Sekretaris Tim, Pengamat, dan Pengawas.',
            'Penyelenggara dari Kementerian Keuangan bertindak sebagai Koordinator Lokasi.',
            'Penyelenggara dari Instansi Pemerintah di Luar Kementerian Keuangan bertindak sebagai Validator Calon Peserta.',
        ],
    },
    B: {
        title: 'B. Persiapan Pelaksanaan',
        description:
            'Persiapan teknis, administratif, dan mitigasi risiko sebelum ujian dilaksanakan.',
        detailSteps: [
            'Jadwal uji kompetensi',
            'Persyaratan peserta',
            'Panduan dan tata tertib ujian',
            'Lokasi ujikom',
            'Metode Ujian',
            'Sistem / Aplikasi / Media ujikom',
            'Sarana dan prasarana ujikom',
            'Risiko dan rencana mitigasi',
            'Standar kompetensi yang diuji',
            'Perangkat ujian (pengawas, pengamat, dan asesor)',
        ],
    },
    C: {
        title: 'C. Pengumuman Pelaksanaan Ukom',
        description:
            'Daftar informasi yang wajib diumumkan kepada calon peserta dan publik.',
        detailSteps: [
            'Jenis, jenjang, dan bidang tugas JFKN',
            'Persyaratan administrasi peserta',
            'Jadwal, media, dan lokasi pelaksanaan',
            'Metode ujian yang digunakan',
            'Kompetensi yang diujikan',
            'Mekanisme pendaftaran Ukom',
            'Sarpras (Sarana Prasarana) dan Pembiayaan',
        ],
    },
    D: {
        title: 'D. Pengelolaan Peserta',
        description:
            'Proses verifikasi dan validasi data calon peserta hingga penetapan peserta sah.',
        detailSteps: [
            'Instansi Pengusul (Unit Pembina Kepegawaian): Melakukan Verifikasi Peserta dan Proses Uji Kelayakan Usulan Peserta.',
            'Tim Penilai Kompetensi: Melakukan Validasi Syarat Administrasi.',
            'Jika lolos verifikasi, dilanjutkan dengan Penetapan & Pemanggilan Peserta sah untuk mengikuti ujian.',
        ],
    },
    E: {
        title: 'E. Uji Kompetensi Teknis',
        description:
            'Tahapan pelaksanaan ujian yang dibedakan berdasarkan jenjang jabatan.',
        detailSteps: [
            'Untuk Jenjang Madya dan Utama: Wajib mengikuti Ujian Tertulis dan Wawancara.',
            'Untuk Jenjang Lainnya (di bawah Madya): Minimal mengikuti Ujian Tertulis.',
        ],
    },
    F: {
        title: 'F. Pemeriksaan dan Penetapan Hasil',
        description:
            'Pemeriksaan hasil ujian dan penerbitan sertifikat kelulusan.',
        detailSteps: [
            'Pemeriksaan dilakukan oleh Tim penyusun dan pengembang materi Ukom Teknis JFKN.',
            'Hasil ujian akan ditetapkan dalam Surat penyampaian hasil dan rekomendasi untuk unit pengusul (instansi asal peserta).',
            'Peserta yang mengikuti ujian akan mendapatkan Sertifikat Hasil Ukom.',
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

    // Menambahkan warna baru (amber, teal, indigo) untuk mengakomodasi 6 fase dari gambar
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
        red: {
            bg: 'bg-red-50 dark:bg-red-900/40',
            border: 'border-red-200 dark:border-red-700',
            hoverBorder: 'hover:border-red-400 dark:hover:border-red-500',
            text: 'text-red-700 dark:text-red-200',
            iconColor: 'text-red-600 dark:text-red-300',
            iconBg: 'bg-red-100 dark:bg-red-800/50',
            badge: 'bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200',
            glow: 'group-hover:shadow-red-300/50 dark:group-hover:shadow-red-500/30',
        },
        // Tambahan warna baru untuk Fase C, D, dan F
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
        indigo: {
            bg: 'bg-indigo-50 dark:bg-indigo-900/40',
            border: 'border-indigo-200 dark:border-indigo-700',
            hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-500',
            text: 'text-indigo-700 dark:text-indigo-200',
            iconColor: 'text-indigo-600 dark:text-indigo-300',
            iconBg: 'bg-indigo-100 dark:bg-indigo-800/50',
            badge: 'bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200',
            glow: 'group-hover:shadow-indigo-300/50 dark:group-hover:shadow-indigo-500/30',
        },
    }

    const c = colorMap[info.color] || colorMap.blue

    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group flex flex-col items-center text-center p-4 md:p-5 ${c.bg} rounded-2xl border-2 ${c.border} ${c.hoverBorder} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${c.glow} shadow-lg`}
            style={{ perspective: '800px' }}
        >
            <motion.div
                className={`mb-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full ${c.iconBg} flex items-center justify-center`}
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <IconComponent
                    className={`w-6 h-6 sm:w-7 sm:h-7 ${c.iconColor}`}
                />
            </motion.div>

            <span
                className={`text-xs font-bold ${c.badge} px-2 py-0.5 rounded-full mb-1`}
            >
                {info.phase}
            </span>
            <h3
                className={`text-sm sm:text-base font-bold ${c.text} mb-1.5 leading-tight`}
            >
                {info.title}
            </h3>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
                <span className="font-semibold">Pelaksana:</span>{' '}
                {info.executor}
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
        red: { border: 'border-red-400', btn: 'bg-red-600 hover:bg-red-700' },
        amber: {
            border: 'border-amber-400',
            btn: 'bg-amber-600 hover:bg-amber-700',
        },
        teal: {
            border: 'border-teal-400',
            btn: 'bg-teal-600 hover:bg-teal-700',
        },
        indigo: {
            border: 'border-indigo-400',
            btn: 'bg-indigo-600 hover:bg-indigo-700',
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
// KOMPONEN UTAMA SLIDE 4
// ----------------------------------------------------------------------
interface Slide4Props {
    onComplete?: () => void
}

const Slide4: React.FC<Slide4Props> = () => {
    const { handleClick } = useInteraction()
    const [selectedDetail, setSelectedDetail] = useState<DetailInfo | null>(
        null,
    )
    const [detailColor, setDetailColor] = useState<string>('blue')
    const [listModal, setListModal] = useState<
        'persiapan' | 'pelaksanaan' | null
    >(null)

    const openPersiapanList = () => setListModal('persiapan')
    const openPelaksanaanList = () => setListModal('pelaksanaan')
    const closeList = () => setListModal(null)

    const handleSelectTahapan = (info: TahapanInfo) => {
        const detail = detailMap[info.nodeId]
        if (detail) {
            setSelectedDetail(detail)
            setDetailColor(info.color)
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 relative z-10">
            <FloatingIcons />
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <span className="text-[clamp(1rem,4vw,3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #4
                </span>
            </div>

            <motion.div
                className="w-full max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6 border border-white/30 dark:border-gray-800/50 flex flex-col gap-3 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="text-center"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mb-3 tracking-tight">
                        Penyelenggaraan Ukom Teknis JFKN
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
                        Klik salah satu fase untuk melihat tahapan detail •{' '}
                        <span className="italic">
                            Hover kartu untuk pelaksana
                        </span>
                    </p>
                </motion.div>

                {/* DUA KARTU BESAR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4">
                    {/* Fase A, B, C */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 to-amber-500/10 dark:from-rose-500/20 dark:to-amber-500/20 border-2 border-rose-200 dark:border-rose-700 hover:border-rose-400 dark:hover:border-rose-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-4 sm:p-5 flex flex-col items-center text-center"
                        onClick={handleClick(openPersiapanList)}
                        variants={cardVariants}
                    >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-100 dark:bg-rose-800/50 flex items-center justify-center mb-2">
                            <FaBullhorn className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600 dark:text-rose-300" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-rose-700 dark:text-rose-200 mb-1">
                            Tahap Persiapan & Pengumuman
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            Pembentukan tim, penyiapan perlengkapan ujian, dan
                            publikasi kepada publik (Fase A - C)
                        </p>
                        <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 dark:text-rose-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 3 tahapan</span>
                        </div>
                    </motion.div>

                    {/* Fase D, E, F */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/10 to-indigo-500/10 dark:from-teal-500/20 dark:to-indigo-500/20 border-2 border-teal-200 dark:border-teal-700 hover:border-teal-400 dark:hover:border-teal-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-4 sm:p-5 flex flex-col items-center text-center"
                        onClick={handleClick(openPelaksanaanList)}
                        variants={cardVariants}
                    >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-100 dark:bg-teal-800/50 flex items-center justify-center mb-2">
                            <FaPenFancy className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 dark:text-teal-300" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-teal-700 dark:text-teal-200 mb-1">
                            Tahap Pelaksanaan & Penetapan Hasil
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            Pengelolaan peserta, pelaksanaan ujian teknis,
                            hingga penerbitan sertifikat hasil (Fase D - F)
                        </p>
                        <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-500 dark:text-teal-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 3 tahapan</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ----- MODALS ----- */}
            {listModal === 'persiapan' && (
                <TahapanListModal
                    title="Tahap Persiapan & Pengumuman Ukom (Fase A - C)"
                    icon={FaBullhorn}
                    data={tahapanPersiapan}
                    onClose={closeList}
                    onSelect={handleSelectTahapan}
                />
            )}
            {listModal === 'pelaksanaan' && (
                <TahapanListModal
                    title="Tahap Pelaksanaan & Penetapan Hasil (Fase D - F)"
                    icon={FaPenFancy}
                    data={tahapanPelaksanaan}
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
// Teks pencarian (sesuai konten slide4)
// ----------------------------------------------------------------------
export const searchText =
    'Penyelenggaraan Ukom Teknis JFKN Pembentukan Tim Pelaksana Tim Penilai Kompetensi Ketua Sekretaris Pengamat Pengawas Kementerian Keuangan Koordinator Lokasi Instansi Pemerintah Validator Calon Peserta Persiapan Pelaksanaan Jadwal Persyaratan Panduan Tata Tertib Lokasi Metode Aplikasi Sarpras Risiko Mitigasi Standar Kompetensi Perangkat Ujian Pengumuman Jenis Jenjang Bidang Tugas Administrasi Mekanisme Pendaftaran Pembiayaan Pengelolaan Peserta Verifikasi Validasi Penetapan Pemanggilan Uji Kompetensi Teknis Jenjang Madya Utama Tertulis Wawancara Pemeriksaan Penetapan Hasil Sertifikat Rekomendasi'

export default Slide4
