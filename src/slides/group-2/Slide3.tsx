// src/slides/group-2/Slide3.tsx
import React, { useState } from 'react'
import {
    FaSearch,
    FaCalendarAlt,
    FaPencilRuler,
    FaUsers,
    FaBookOpen,
    FaTimes,
} from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

// ----------------------------------------------------------------------
// Tipe data untuk setiap tahapan (menggabungkan informasi node & detail)
// ----------------------------------------------------------------------
interface TahapanInfo {
    icon: React.ComponentType<{ className?: string }>
    color: 'blue' | 'emerald' | 'orange' | 'rose' | 'red'
    title: string
    executor: string
    nodeId: string
    phase: string
}

// ----------------------------------------------------------------------
// Detail yang muncul di modal (sama seperti sebelumnya)
// ----------------------------------------------------------------------
interface DetailInfo {
    title: string
    description: string
    detailSteps: string[]
}

// ----------------------------------------------------------------------
// Dua kelompok tahapan: Persiapan Awal dan Desain & Materi
// ----------------------------------------------------------------------
const tahapanPra: TahapanInfo[] = [
    {
        icon: FaSearch,
        color: 'blue',
        title: 'Identifikasi & Analisis Kebutuhan',
        executor: 'Unit Pengguna, Pusbin JFPM',
        nodeId: '1',
        phase: 'Tahun Anggaran Sebelum Penyelenggaraan',
    },
    {
        icon: FaCalendarAlt,
        color: 'emerald',
        title: 'Kalender Ukom Teknis',
        executor: 'Pusbin JFPM',
        nodeId: '2',
        phase: 'Tahun Anggaran Sebelum Penyelenggaraan',
    },
]

const tahapanPasca: TahapanInfo[] = [
    {
        icon: FaPencilRuler,
        color: 'orange',
        title: 'Desain Uji Kompetensi',
        executor: 'Pusbin JFPM, SME, Widyaiswara',
        nodeId: '3',
        phase: 'Tahun Anggaran Penyelenggaraan',
    },
    {
        icon: FaUsers,
        color: 'rose',
        title: 'Tim Penyusun Materi, Alat Ukur & Pemeriksa Hasil',
        executor: 'Widyaiswara, UPS JF/SME, Asesor Tersertifikasi',
        nodeId: '4',
        phase: 'Tahun Anggaran Penyelenggaraan',
    },
    {
        icon: FaBookOpen,
        color: 'red',
        title: 'Materi Uji Kompetensi',
        executor: 'Pusbin JFPM, UPSJF',
        nodeId: '5',
        phase: 'Tahun Anggaran Penyelenggaraan',
    },
]

// ----------------------------------------------------------------------
// Data detail (sama dengan nodeDetailMap sebelumnya)
// ----------------------------------------------------------------------
const detailMap: Record<string, DetailInfo> = {
    '1': {
        title: 'Identifikasi & Analisis Kebutuhan Uji Kompetensi',
        description:
            'Mengidentifikasi dan menganalisis kebutuhan uji kompetensi teknis sebagai langkah awal perencanaan.',
        detailSteps: [
            'Dimulai pada bulan Juli (Tahun Anggaran Sebelum Penyelenggaraan)',
            'Data kebutuhan dari Unit Pengguna (Instansi/Calon Peserta)',
            'Data kebutuhan dari Basis Data Pusbin JFPM',
            'Analisis kebutuhan teknis untuk mendukung pelaksanaan Ukom',
        ],
    },
    '2': {
        title: 'Kalender Ukom Teknis',
        description:
            'Menetapkan jadwal pelaksanaan uji kompetensi teknis secara nasional.',
        detailSteps: [
            'Kalender ditetapkan paling lambat 31 Desember',
            'Pemutakhiran kebutuhan tahun berjalan',
            'Pemutakhiran perubahan jadwal ukom teknis',
            'Hasil penetapan kalender diumumkan di halaman resmi',
        ],
    },
    '3': {
        title: 'Desain Uji Kompetensi',
        description:
            'Menyusun desain, metode, dan standar pelaksanaan uji kompetensi teknis.',
        detailSteps: [
            'Menentukan jenis dan jenjang JFKN (Jabatan Fungsional Keahlian Nasional)',
            'Menentukan metode ukom yang akan dipakai',
            'Berpedoman pada standar kompetensi teknis jabatan',
            'Penyusunan desain maksimal 1 bulan setelah penetapan kalender',
        ],
    },
    '4': {
        title: 'Tim Penyusun Materi, Alat Ukur, dan Pemeriksa Hasil',
        description:
            'Membentuk tim yang kompeten untuk menyusun instrumen dan melakukan penilaian ujian.',
        detailSteps: [
            'Pembentukan Tim yang terdiri dari Ketua, Sekretaris, dan Anggota',
            'Penyusun & Validator Materi: Widyaiswara & UPS JF / SME',
            'Pemeriksa Hasil Ukom: Diutamakan Asesor Teknis Tersertifikasi',
        ],
    },
    '5': {
        title: 'Materi Uji Kompetensi',
        description:
            'Pengelolaan, pengembangan, dan pemeliharaan bank materi uji kompetensi secara berkelanjutan.',
        detailSteps: [
            'Mempertimbangkan masukan dari UPS JF dalam penyempurnaan materi',
            'Materi dikelola dan disimpan dalam basis data terpusat',
            'Dilakukan evaluasi secara periodik untuk menjaga kualitas/keaktualan soal',
        ],
    },
}

// ----------------------------------------------------------------------
// Variant animasi (sama dengan Slide1)
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
// Kartu tahapan (digunakan di dalam modal list)
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

            {/* Tooltip pelaksana ala Slide3 */}
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
                <span className="font-semibold">Pelaksana:</span>{' '}
                {info.executor}
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>📋</span>
                <span>Lihat Detail</span>
            </div>
        </motion.div>
    )
}

// ----------------------------------------------------------------------
// Modal daftar tahapan (muncul setelah klik kartu besar)
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
                {/* Header */}
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

                {/* Body – grid kartu */}
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

                {/* Footer */}
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
// Modal detail (sama persis dengan DetailModal sebelumnya)
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
// KOMPONEN UTAMA SLIDE 3
// ----------------------------------------------------------------------
interface Slide3Props {
    onComplete?: () => void
}

const Slide3: React.FC<Slide3Props> = () => {
    const { handleClick } = useInteraction()
    const [selectedDetail, setSelectedDetail] = useState<DetailInfo | null>(
        null,
    )
    const [detailColor, setDetailColor] = useState<string>('blue')
    const [listModal, setListModal] = useState<'pra' | 'pasca' | null>(null)

    const openPraList = () => setListModal('pra')
    const openPascaList = () => setListModal('pasca')
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
                    #3
                </span>
            </div>

            {/* Card utama – disamakan dengan Slide1 */}
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
                    <h1 className="text-[clamp(1.50rem,4vw,2.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mb-3 tracking-tight">
                        Perencanaan, Penyusunan, dan Pengembangan Ukom
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
                        Klik salah satu fase untuk melihat tahapan detail •{' '}
                        <span className="italic">
                            Hover kartu untuk pelaksana
                        </span>
                    </p>
                </motion.div>

                {/* DUA KARTU BESAR (mirip Slide1) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                    {/* Persiapan Awal */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 dark:from-blue-500/20 dark:to-emerald-500/20 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
                        onClick={handleClick(openPraList)}
                        variants={cardVariants}
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center mb-4">
                            <FaCalendarAlt className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-200 mb-2">
                            Persiapan Awal
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            Identifikasi kebutuhan dan penetapan kalender{' '}
                            <br></br> (Sebelum tahun berjalan)
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 2 tahapan</span>
                        </div>
                    </motion.div>

                    {/* Desain & Materi */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-rose-500/10 dark:from-orange-500/20 dark:to-rose-500/20 border-2 border-orange-200 dark:border-orange-700 hover:border-orange-400 dark:hover:border-orange-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
                        onClick={handleClick(openPascaList)}
                        variants={cardVariants}
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-100 dark:bg-orange-800/50 flex items-center justify-center mb-4">
                            <FaPencilRuler className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600 dark:text-orange-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-orange-700 dark:text-orange-200 mb-2">
                            Desain, Tim & Materi
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            Desain uji, pembentukan tim, dan penyiapan materi
                            (Tahun berjalan)
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 dark:text-orange-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 3 tahapan</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ----- MODALS ----- */}
            {listModal === 'pra' && (
                <TahapanListModal
                    title="Persiapan Awal (Tahun Anggaran Sebelum Penyelenggaraan)"
                    icon={FaCalendarAlt}
                    data={tahapanPra}
                    onClose={closeList}
                    onSelect={handleSelectTahapan}
                />
            )}
            {listModal === 'pasca' && (
                <TahapanListModal
                    title="Desain, Tim & Materi (Tahun Anggaran Penyelenggaraan)"
                    icon={FaPencilRuler}
                    data={tahapanPasca}
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
// Teks pencarian (disesuaikan)
// ----------------------------------------------------------------------
export const searchText =
    'Perencanaan Penyusunan Pengembangan Ukom Teknis Pusbin JFPM Identifikasi Analisis Kebutuhan Kalender Desain Uji Kompetensi Tim Penyusun Materi Alat Ukur Pemeriksa Hasil Asesor Teknis Tersertifikasi Widyaiswara UPS JF SME Tahun Anggaran Sebelum Penyelenggaraan Penyelenggaraan'

export default Slide3
