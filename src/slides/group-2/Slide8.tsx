// src/slides/group-2/Slide8.tsx
import React, { useState } from 'react'
import {
    FaFileContract,
    FaGavel,
    FaUsers,
    FaSitemap,
    FaShip,
    FaGlobe,
    FaCalendarAlt,
    FaBan,
    FaPenFancy,
    FaTimes,
    FaClipboardCheck,
} from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

// ----------------------------------------------------------------------
// Tipe data untuk setiap tahapan (Properti executor dihapus)
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
// Dua kelompok data: Konsultan Pajak & Ahli Kepabeanan
// ----------------------------------------------------------------------
const taxConsultantData: TahapanInfo[] = [
    {
        icon: FaGavel,
        color: 'amber',
        title: 'Dasar Hukum',
        nodeId: 'A',
        phase: 'Regulasi',
    },
    {
        icon: FaFileContract,
        color: 'blue',
        title: 'Definisi Sertifikasi',
        nodeId: 'B',
        phase: 'Pengertian',
    },
    {
        icon: FaUsers,
        color: 'emerald',
        title: 'Komite Pengarah',
        nodeId: 'C',
        phase: 'Struktur Panitia',
    },
    {
        icon: FaSitemap,
        color: 'orange',
        title: 'Komite Pelaksana',
        nodeId: 'D',
        phase: 'Struktur Panitia',
    },
]

const customsExpertData: TahapanInfo[] = [
    {
        icon: FaShip,
        color: 'blue',
        title: 'Definisi & PPJK',
        nodeId: 'E',
        phase: 'Pengertian',
    },
    {
        icon: FaGlobe,
        color: 'purple',
        title: 'Dasar Hukum & Sistem',
        nodeId: 'F',
        phase: 'Regulasi & Web',
    },
    {
        icon: FaCalendarAlt,
        color: 'orange',
        title: 'Penyelenggaraan Ujian',
        nodeId: 'G',
        phase: 'Jadwal & Lokasi',
    },
    {
        icon: FaBan,
        color: 'rose',
        title: 'Larangan Penggunaan',
        nodeId: 'H',
        phase: 'Ketentuan Sertifikat',
    },
    {
        icon: FaPenFancy,
        color: 'teal',
        title: 'Layanan Pasca Ujian',
        nodeId: 'I',
        phase: 'Pelayanan',
    },
]

// ----------------------------------------------------------------------
// Data detail setiap node
// ----------------------------------------------------------------------
const detailMap: Record<string, DetailInfo> = {
    A: {
        title: 'Dasar Hukum Sertifikasi Konsultan Pajak',
        description:
            'Pelaksanaan ujian sertifikasi konsultan pajak didasarkan pada peraturan perundang-undangan berikut:',
        detailSteps: [
            'Peraturan Menteri Keuangan Nomor 111/PMK.03/2014 tentang Konsultan Pajak.',
            'Peraturan Menteri Keuangan 175/PMK.01/2022 tentang Perubahan atas PMK Nomor 111/PMK.03/2014.',
            'KMK Nomor 196 Tahun 2023 tentang Pembentukan Panitia Penyelenggara Sertifikasi Konsultan Pajak Periode 2023-2026.',
            'Keputusan Komite Pengarah 03/PPSKP/VIII/2025 tentang Komite Pelaksana Panitia Penyelenggara Sertifikasi Konsultan Pajak Tahun Anggaran 2025.',
        ],
    },
    B: {
        title: 'Definisi Sertifikasi Konsultan Pajak',
        description:
            'Ujian Sertifikasi Konsultan Pajak adalah kegiatan yang dilaksanakan secara resmi untuk memperoleh Sertifikat Konsultan Pajak.',
        detailSteps: [
            'Pelaksanaan ujian ini diawasi dan diselenggarakan oleh panitia yang dibentuk langsung oleh Menteri Keuangan.',
        ],
    },
    C: {
        title: 'Komite Pengarah',
        description:
            'Panitia penyelenggara terdiri dari Komite Pengarah dan Komite Pelaksana. Berikut adalah struktur Komite Pengarah:',
        detailSteps: [
            'Ketua (merangkap anggota)',
            'Wakil Ketua (merangkap anggota)',
            'Sekretaris (merangkap anggota)',
            'Anggota',
        ],
    },
    D: {
        title: 'Komite Pelaksana dan Struktur Organisasi Ujian',
        description:
            'Struktur kepanitiaan pelaksana ujian dibentuk dengan sangat terorganisir dengan pembagian tugas sebagai berikut:',
        detailSteps: [
            'Ketua: Dijabat oleh Kepala Pusat Pembinaan JFPM.',
            'Penasehat: Dijabat oleh pihak Asosiasi Konsultan Pajak.',
            'Kelompok Kerja: Menangani Pendaftaran & Dokumen, Penyusunan Soal & Validasi, Pelaksanaan Ujian, dan Evaluasi Hasil & Sertifikat.',
            'Sekretaris & Tim Sekretariat: Meliputi Administrasi, Keuangan, Perlengkapan & Sarpras, Humas & Publikasi, serta Manajemen Risiko.',
            'Tim TI: Dijabat oleh SK/ST BATII (Badan Teknologi Informasi dan Intelijen).',
            'Koordinator Lokasi (Pusat & Daerah) serta Petugas Hari H di berbagai lokasi ujian.',
            'Unit Eselon I (UE I) Kementerian Keuangan Pusat dan Daerah yang terlibat meliputi: BPPK, Setjen Kemenkeu, DJKN, DJPB, DJBC, DJP, dan DJPPR.',
        ],
    },
    E: {
        title: 'Definisi Ahli Kepabeanan & Kewajiban PPJK',
        description:
            'Pengertian profesi dan kewajiban pengguna jasa kepabeanan:',
        detailSteps: [
            'Ahli Kepabeanan: Seseorang yang memiliki pengetahuan dan pemahaman tentang kepabeanan, serta memiliki Sertifikat Ahli Kepabeanan yang dikeluarkan secara resmi oleh BPPK Kementerian Keuangan.',
            'Kewajiban PPJK: Pengguna Jasa Kepabeanan yang bertindak sebagai Pengusaha Pengurusan Jasa Kepabeanan (PPJK) wajib memiliki pegawai yang memiliki kualifikasi dan bersertifikat Ahli Kepabeanan.',
        ],
    },
    F: {
        title: 'Dasar Hukum & Sistem Terintegrasi',
        description:
            'Regulasi yang mengatur dan layanan digital yang tersedia untuk sertifikasi ini:',
        detailSteps: [
            'PMK 210/PMK.04/2019 tentang Perubahan atas Peraturan Menteri Keuangan Nomor 147/PMK.04/2011 tentang Registrasi Kepabeanan.',
            'Pedoman Ujian: Peraturan Kepala BPPK Nomor PER-8/PP/2020.',
            'Sistem Terintegrasi (SAK): Layanan terkait Sertifikasi Ahli Kepabeanan terintegrasi pada laman resmi: klc2.kemenkeu.go.id/sak/dashboard.',
            'Di situs ini, peserta dapat: mencari informasi, mendaftar ujian, mengerjakan soal, mengecek hasil, mengunduh sertifikat, dan mendapatkan layanan terkait.',
        ],
    },
    G: {
        title: 'Penyelenggaraan Ujian',
        description:
            'Jadwal, biaya, dan lokasi pelaksanaan ujian Ahli Kepabeanan:',
        detailSteps: [
            'Frekuensi: Ujian dilaksanakan paling sedikit 3 (tiga) kali dalam setahun, yaitu pada bulan Februari, Juni, dan Oktober.',
            'Biaya: Ujian ini diselenggarakan oleh BPPK dan tidak dipungut biaya alias GRATIS bagi peserta.',
            'Lokasi: Dilaksanakan di Kantor Pusat dan/atau di Lingkungan BPPK, Balai Diklat Keuangan (BDK), dan/atau lokasi lainnya yang telah ditentukan oleh Tim Penguji.',
        ],
    },
    H: {
        title: 'Ketentuan Sertifikat Tidak Boleh Dipergunakan',
        description:
            'Sertifikat Ahli Kepabeanan tidak dapat dipergunakan dalam kondisi sebagai berikut:',
        detailSteps: [
            'Ahli Kepabeanan menggunakan sertifikatnya pada lebih dari 1 (satu) PPJK.',
            'Ahli Kepabeanan meminjamkan sertifikatnya kepada PPJK, sedangkan Ahli Kepabeanan tersebut tidak bekerja di PPJK yang meminjam sertifikatnya.',
            'Ahli Kepabeanan melakukan tindak pidana di bidang kepabeanan.',
        ],
    },
    I: {
        title: 'Layanan Pasca Ujian Ahli Kepabeanan',
        description:
            'Layanan yang tersedia bagi peserta setelah mengikuti ujian sertifikasi:',
        detailSteps: [
            'Legalisasi Sertifikat',
            'Pengurusan Sertifikat Hilang',
            'Pengurusan Sertifikat Rusak',
            'Pengurusan Ralat Data Sertifikat',
            'Pengurusan Rekam Database Sertifikat',
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
                className={`bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden border-t-4 ${c.border}`}
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
                    <p className="mb-4 font-medium">{info.description}</p>
                    <ul className="space-y-3">
                        {info.detailSteps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-gray-600 dark:text-gray-300">
                                    {idx + 1}
                                </div>
                                <span className="whitespace-pre-line">
                                    {step}
                                </span>
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
// KOMPONEN UTAMA SLIDE 8
// ----------------------------------------------------------------------
interface Slide8Props {
    onComplete?: () => void
}

const Slide8: React.FC<Slide8Props> = () => {
    const { handleClick } = useInteraction()
    const [selectedDetail, setSelectedDetail] = useState<DetailInfo | null>(
        null,
    )
    const [detailColor, setDetailColor] = useState<string>('blue')
    const [listModal, setListModal] = useState<'tax' | 'customs' | null>(null)

    const openTaxList = () => setListModal('tax')
    const openCustomsList = () => setListModal('customs')
    const closeList = () => setListModal(null)

    const handleSelectTahapan = (info: TahapanInfo) => {
        const detail = detailMap[info.nodeId]
        if (detail) {
            setSelectedDetail(detail)
            setDetailColor(info.color)
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            <FloatingIcons />
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <span className="text-[clamp(1rem,4vw,3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #8
                </span>
            </div>

            <motion.div
                className="w-full max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/30 dark:border-gray-800/50 flex flex-col gap-6 relative z-10 max-h-[80vh] overflow-y-auto"
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
                    <h1 className="text-[clamp(1.50rem,4vw,2.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-emerald-500 to-purple-600 dark:from-blue-400 dark:via-emerald-400 dark:to-purple-400 text-transparent bg-clip-text mb-3 tracking-tight">
                        Sertifikasi Profesi Konsultan Pajak & Ahli Kepabeanan
                    </h1>
                    <p className="text-[clamp(0.6rem,1.6vw,1.15rem)] text-gray-700 dark:text-gray-200 font-semibold max-w-7xl mx-auto mb-1 px-2">
                        Klik salah satu bidang profesi untuk melihat penjelasan
                        lengkap terkait ujian sertifikasi masing-masing{' '}
                        <br></br>
                        <span className="italic font-normal">
                            Klik kartu untuk melihat detail
                        </span>
                    </p>
                </motion.div>

                {/* DUA KARTU BESAR (PROFESI) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sertifikasi Konsultan Pajak */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-amber-500/10 dark:from-blue-500/20 dark:to-amber-500/20 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
                        onClick={handleClick(openTaxList)}
                        variants={cardVariants}
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center mb-4">
                            <FaClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-200 mb-2">
                            Sertifikasi Konsultan Pajak
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            Dasar hukum, definisi, dan struktur komite pengarah
                            serta pelaksana ujian sertifikasi.
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 4 tahapan</span>
                        </div>
                    </motion.div>

                    {/* Sertifikasi Ahli Kepabeanan */}
                    <motion.div
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 dark:from-purple-500/20 dark:to-teal-500/20 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
                        onClick={handleClick(openCustomsList)}
                        variants={cardVariants}
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center mb-4">
                            <FaShip className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-purple-700 dark:text-purple-200 mb-2">
                            Sertifikasi Ahli Kepabeanan
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            Definisi PPJK, dasar hukum, jadwal ujian, larangan,
                            hingga layanan pasca ujian.
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-500 dark:text-purple-400 group-hover:underline">
                            <span>📋</span>
                            <span>Lihat 5 tahapan</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ----- MODALS ----- */}
            {listModal === 'tax' && (
                <TahapanListModal
                    title="Tahapan Ujian Sertifikasi Konsultan Pajak"
                    icon={FaClipboardCheck}
                    data={taxConsultantData}
                    onClose={closeList}
                    onSelect={handleSelectTahapan}
                />
            )}
            {listModal === 'customs' && (
                <TahapanListModal
                    title="Tahapan Ujian Sertifikasi Ahli Kepabeanan"
                    icon={FaShip}
                    data={customsExpertData}
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
// Teks pencarian (sesuai konten slide8)
// ----------------------------------------------------------------------
export const searchText =
    'Sertifikasi Konsultan Pajak Ahli Kepabeanan BPPK Pusbin JFPM Dasar Hukum PMK 111/PMK.03/2014 KMK 196 Tahun 2023 Komite Pengarah Komite Pelaksana Struktur Panitia UE I Kementerian Keuangan PPJK PMK 210/PMK.04/2019 PER-8/PP/2020 KLC2 Jadwal Ujian Gratis Larangan Sertifikat Layanan Pasca Ujian Legalisasi Sertifikat'

export default Slide8
