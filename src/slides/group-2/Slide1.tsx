// src/slides/group-2/Slide1.tsx

/**
 * CATATAN UNTUK AI SELANJUTNYA (JANGAN HAPUS CATATAN INI):
 * Gunakan pendekatan ukuran responsif berbasis viewport (vw/vh) untuk semua dimensi
 * (padding, margin, gap, font-size, dll.) pada slide ini dan slide lainnya.
 * Hindari penggunaan ukuran fixed (rem/px) kecuali untuk batas minimum/maksimum pada clamp().
 * Gunakan kombinasi `min(vw, vh)` agar proporsional di semua orientasi layar.
 * Contoh: text-[clamp(1rem,min(3vw,3vh),2rem)], p-[clamp(1rem,min(2vw,2vh),2rem)].
 * Div terluar <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10"> JANGAN DIUBAH.
 * searchText semakin detail semakin baik, gunakan bahasa Indonesia yang baku, hindari singkatan, dan hindari kata-kata yang ambigu.
 */

import React, { useState } from 'react'
import {
    FaChartBar,
    FaSearch,
    FaBalanceScale,
    FaGavel,
    FaClipboardList,
    FaCogs,
    FaChartLine,
    FaTimes,
    FaUniversity,
} from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

// -------- TYPE DATA JF YANG DITANGANI PUSBIN JFPM --------
interface JFInfo {
    icon: React.ComponentType<{ className?: string }>
    color: 'blue' | 'indigo' | 'emerald' | 'amber'
    title: string
    singkatan: string
    description: string
    detail: string
}

// -------- TYPE DATA TATA KELOLA UKOM --------
interface TataKelolaInfo {
    icon: React.ComponentType<{ className?: string }>
    color: 'teal' | 'violet' | 'rose'
    title: string
    subtitle: string
    description: string
    detail: string
}

// -------- DATA JF YANG DITANGANI PUSBIN JFPM --------
const jfInfos: JFInfo[] = [
    {
        icon: FaChartBar,
        color: 'blue',
        title: 'Analis Keuangan Negara',
        singkatan: 'AKN',
        description:
            'Melakukan analisis di bidang keuangan negara, mencakup analisis kebijakan, penganggaran, serta pelaporan dan pertanggungjawaban keuangan negara.',
        detail: `Analis Keuangan Negara (AKN) bertugas melakukan analisis dan kajian di bidang keuangan negara. Ruang lingkup tugasnya meliputi:
• Analisis kebijakan fiskal dan sektoral
• Analisis penganggaran (DJA)
• Analisis perbendaharaan dan pelaksanaan anggaran (DJPPB)
• Analisis pelaporan dan pertanggungjawaban keuangan negara

Uji Kompetensi Kompleks untuk AKN diselenggarakan oleh BPPK c.q. Pusbin JFPM sebagai Unit Pembina Teknis.`,
    },
    {
        icon: FaSearch,
        color: 'indigo',
        title: 'Pengawas Keuangan Negara',
        singkatan: 'PKN',
        description:
            'Melakukan pengawasan terhadap pengelolaan keuangan negara melalui audit, reviu, evaluasi, dan pemantauan kepatuhan.',
        detail: `Pengawas Keuangan Negara (PKN) bertugas mengawasi pengelolaan keuangan negara. Ruang lingkup tugasnya meliputi:
• Audit laporan keuangan dan kinerja
• Reviu atas pengelolaan keuangan
• Evaluasi sistem pengendalian internal
• Pemantauan kepatuhan terhadap regulasi

Uji Kompetensi Kompleks untuk PKN diselenggarakan oleh BPPK c.q. Pusbin JFPM sebagai Unit Pembina Teknis.`,
    },
    {
        icon: FaBalanceScale,
        color: 'emerald',
        title: 'Penilai',
        singkatan: 'PNL',
        description:
            'Melakukan penilaian aset negara, termasuk appraisal, valuasi properti, dan penilaian bisnis untuk kepentingan negara.',
        detail: `Penilai (PNL) bertugas melakukan penilaian aset milik negara. Ruang lingkup tugasnya meliputi:
• Appraisal dan valuasi properti negara
• Penilaian aset tetap dan aset tidak berwujud
• Penilaian bisnis dan kepentingan ekonomi negara
• Penyusunan laporan penilaian sesuai standar

Uji Kompetensi Kompleks untuk Penilai diselenggarakan oleh BPPK c.q. Pusbin JFPM sebagai Unit Pembina Teknis.`,
    },
    {
        icon: FaGavel,
        color: 'amber',
        title: 'Pelelang',
        singkatan: 'PLL',
        description:
            'Melaksanakan proses lelang barang/jasa negara, mengelola prosedur dan administrasi lelang sesuai ketentuan yang berlaku.',
        detail: `Pelelang (PLL) bertugas melaksanakan proses lelang barang/jasa milik negara. Ruang lingkup tugasnya meliputi:
• Persiapan dan perencanaan lelang
• Pelaksanaan proses lelang secara transparan
• Administrasi dan dokumentasi lelang
• Pelaporan hasil lelang sesuai ketentuan

Uji Kompetensi Kompleks untuk Pelelang diselenggarakan oleh BPPK c.q. Pusbin JFPM sebagai Unit Pembina Teknis.`,
    },
]

// -------- DATA TATA KELOLA UKOM TEKNIS JF --------
const tataKelolaInfos: TataKelolaInfo[] = [
    {
        icon: FaClipboardList,
        color: 'teal',
        title: 'Perencanaan, Penyusunan, dan Pengembangan',
        subtitle: 'Tahap Persiapan Ukom',
        description:
            'Meliputi perencanaan kebutuhan uji kompetensi, penyusunan materi dan instrumen uji, serta pengembangan bank soal dan metode penilaian.',
        detail: `Tahap ini mencakup tiga kegiatan utama:

1. Perencanaan Ukom:
• Identifikasi kebutuhan uji kompetensi berdasarkan formasi JF
• Penjadwalan dan alokasi sumber daya
• Koordinasi dengan Unit Pengguna (UE1/K/L/D)

2. Penyusunan Ukom:
• Penyusunan kisi-kisi dan materi uji
• Perancangan instrumen penilaian
• Penyiapan bank soal sesuai standar kompetensi

3. Pengembangan Ukom:
• Pengembangan metode dan teknik penilaian
• Validasi dan kalibrasi instrumen uji
• Pembaruan berkala sesuai perkembangan regulasi`,
    },
    {
        icon: FaCogs,
        color: 'violet',
        title: 'Penyelenggaraan Ukom',
        subtitle: 'Tahap Pelaksanaan',
        description:
            'Meliputi pelaksanaan uji kompetensi secara terstruktur, mulai dari persiapan teknis, pelaksanaan ujian, hingga pengolahan hasil.',
        detail: `Tahap penyelenggaraan mencakup:

• Persiapan teknis pelaksanaan ujian (tempat, sistem, pengawas)
• Pelaksanaan uji kompetensi (tertulis, praktik, wawancara)
• Pengolahan dan verifikasi hasil ujian
• Penetapan kelulusan peserta
• Penerbitan sertifikat kompetensi

Seluruh proses diselenggarakan secara profesional dan transparan oleh BPPK c.q. Pusbin JFPM.`,
    },
    {
        icon: FaChartLine,
        color: 'rose',
        title: 'Monitoring dan Evaluasi',
        subtitle: 'Tahap Pengawasan & Perbaikan',
        description:
            'Meliputi pemantauan berkelanjutan terhadap pelaksanaan Ukom dan evaluasi untuk perbaikan sistem uji kompetensi secara menyeluruh.',
        detail: `Tahap monitoring dan evaluasi mencakup:

• Pemantauan pelaksanaan Ukom secara berkala
• Evaluasi efektivitas instrumen penilaian
• Analisis tingkat kelulusan dan kendala yang dihadapi
• Rekomendasi perbaikan sistem uji kompetensi
• Pelaporan hasil monitoring kepada pemangku kepentingan

Hasil evaluasi digunakan sebagai dasar pengembangan Ukom periode berikutnya.`,
    },
]

// -------- KOMPONEN MODAL DETAIL JF --------
interface JFDetailModalProps {
    onClose: () => void
    jf: JFInfo
}

const JFDetailModal: React.FC<JFDetailModalProps> = ({ onClose, jf }) => {
    const IconComponent = jf.icon

    const colorMap = {
        blue: {
            border: 'border-blue-400 dark:border-blue-600',
            iconBg: 'bg-blue-100 dark:bg-blue-800/50',
            iconColor: 'text-blue-600 dark:text-blue-300',
            badge: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200',
            btn: 'bg-blue-600 hover:bg-blue-700',
        },
        indigo: {
            border: 'border-indigo-400 dark:border-indigo-600',
            iconBg: 'bg-indigo-100 dark:bg-indigo-800/50',
            iconColor: 'text-indigo-600 dark:text-indigo-300',
            badge: 'bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200',
            btn: 'bg-indigo-600 hover:bg-indigo-700',
        },
        emerald: {
            border: 'border-emerald-400 dark:border-emerald-600',
            iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
            iconColor: 'text-emerald-600 dark:text-emerald-300',
            badge: 'bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200',
            btn: 'bg-emerald-600 hover:bg-emerald-700',
        },
        amber: {
            border: 'border-amber-400 dark:border-amber-600',
            iconBg: 'bg-amber-100 dark:bg-amber-800/50',
            iconColor: 'text-amber-600 dark:text-amber-300',
            badge: 'bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200',
            btn: 'bg-amber-600 hover:bg-amber-700',
        },
    }[jf.color]

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-[clamp(0.5rem,min(2vw,2vh),1rem)]"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-[clamp(20rem,min(90vw,90vh),42rem)] w-full max-h-[90vh] rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-[clamp(1rem,min(3vw,3vh),1.5rem)] border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-[clamp(0.75rem,min(2vw,2vh),1rem)]">
                        <div
                            className={`w-[clamp(3rem,min(8vw,8vh),3.5rem)] h-[clamp(3rem,min(8vw,8vh),3.5rem)] rounded-full ${colorMap.iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                            <IconComponent
                                className={`w-[clamp(1.5rem,min(4vw,4vh),1.75rem)] h-[clamp(1.5rem,min(4vw,4vh),1.75rem)] ${colorMap.iconColor}`}
                            />
                        </div>
                        <div>
                            <h3 className="text-[clamp(1.125rem,min(3vw,3vh),1.25rem)] font-bold text-gray-900 dark:text-white">
                                {jf.title}
                            </h3>
                            <span
                                className={`inline-block ${colorMap.badge} text-[clamp(0.65rem,min(1.8vw,1.8vh),0.75rem)] font-bold px-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] py-[clamp(0.125rem,min(0.5vw,0.5vh),0.25rem)] rounded-full mt-[clamp(0.25rem,min(0.8vw,0.8vh),0.5rem)]`}
                            >
                                {jf.singkatan}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer ml-[clamp(1rem,min(2vw,2vh),1.5rem)]"
                    >
                        <FaTimes className="w-[clamp(1.25rem,min(3vw,3vh),1.5rem)] h-[clamp(1.25rem,min(3vw,3vh),1.5rem)]" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-[clamp(1rem,min(3vw,3vh),1.5rem)] text-gray-700 dark:text-gray-300 leading-relaxed text-[clamp(0.8rem,min(2.2vw,2.2vh),1rem)] whitespace-pre-wrap">
                    {jf.detail}
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 p-[clamp(0.5rem,min(1.5vw,1.5vh),1rem)] border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className={`px-[clamp(1rem,min(3vw,3vh),1.5rem)] py-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] ${colorMap.btn} text-white rounded-[clamp(0.375rem,min(1.5vw,1.5vh),0.5rem)] text-[clamp(0.8rem,min(2.2vw,2.2vh),0.875rem)] font-semibold transition-colors cursor-pointer`}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// -------- KOMPONEN MODAL DETAIL TATA KELOLA --------
interface TataKelolaDetailModalProps {
    onClose: () => void
    info: TataKelolaInfo
}

const TataKelolaDetailModal: React.FC<TataKelolaDetailModalProps> = ({
    onClose,
    info,
}) => {
    const IconComponent = info.icon

    const colorMap = {
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
        rose: {
            border: 'border-rose-400 dark:border-rose-600',
            iconBg: 'bg-rose-100 dark:bg-rose-800/50',
            iconColor: 'text-rose-600 dark:text-rose-300',
            badge: 'bg-rose-100 dark:bg-rose-800 text-rose-800 dark:text-rose-200',
            btn: 'bg-rose-600 hover:bg-rose-700',
        },
    }[info.color]

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-[clamp(0.5rem,min(2vw,2vh),1rem)]"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-[clamp(20rem,min(90vw,90vh),42rem)] w-full max-h-[90vh] rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-[clamp(1rem,min(3vw,3vh),1.5rem)] border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-[clamp(0.75rem,min(2vw,2vh),1rem)]">
                        <div
                            className={`w-[clamp(3rem,min(8vw,8vh),3.5rem)] h-[clamp(3rem,min(8vw,8vh),3.5rem)] rounded-full ${colorMap.iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                            <IconComponent
                                className={`w-[clamp(1.5rem,min(4vw,4vh),1.75rem)] h-[clamp(1.5rem,min(4vw,4vh),1.75rem)] ${colorMap.iconColor}`}
                            />
                        </div>
                        <div>
                            <h3 className="text-[clamp(1.125rem,min(3vw,3vh),1.25rem)] font-bold text-gray-900 dark:text-white">
                                {info.title}
                            </h3>
                            <p className="text-[clamp(0.8rem,min(2vw,2vh),0.875rem)] text-gray-500 dark:text-gray-400 mt-[clamp(0.125rem,min(0.5vw,0.5vh),0.25rem)]">
                                {info.subtitle}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer ml-[clamp(1rem,min(2vw,2vh),1.5rem)]"
                    >
                        <FaTimes className="w-[clamp(1.25rem,min(3vw,3vh),1.5rem)] h-[clamp(1.25rem,min(3vw,3vh),1.5rem)]" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-[clamp(1rem,min(3vw,3vh),1.5rem)] text-gray-700 dark:text-gray-300 leading-relaxed text-[clamp(0.8rem,min(2.2vw,2.2vh),1rem)] whitespace-pre-wrap">
                    {info.detail}
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 p-[clamp(0.5rem,min(1.5vw,1.5vh),1rem)] border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className={`px-[clamp(1rem,min(3vw,3vh),1.5rem)] py-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] ${colorMap.btn} text-white rounded-[clamp(0.375rem,min(1.5vw,1.5vh),0.5rem)] text-[clamp(0.8rem,min(2.2vw,2.2vh),0.875rem)] font-semibold transition-colors cursor-pointer`}
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

// -------- KOMPONEN KARTU JF (digunakan di dalam modal list) --------
interface JFCardProps {
    jf: JFInfo
    onClick: () => void
}

const JFCard: React.FC<JFCardProps> = ({ jf, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = jf.icon

    const colorMap = {
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
    }[jf.color] || {
        bg: 'bg-gray-50 dark:bg-gray-800',
        border: 'border-gray-200 dark:border-gray-700',
        hoverBorder: 'hover:border-gray-400',
        text: 'text-gray-700',
        iconColor: 'text-gray-600',
        iconBg: 'bg-gray-100 dark:bg-gray-700',
        badge: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200',
        glow: '',
    }

    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group flex flex-col items-center text-center p-[clamp(1rem,min(4vw,4vh),1.5rem)] ${colorMap.bg} rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] border-[clamp(1px,min(0.5vw,0.5vh),2px)] ${colorMap.border} ${colorMap.hoverBorder} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${colorMap.glow} shadow-lg`}
            style={{ perspective: '800px' }}
        >
            <motion.div
                className={`mb-[clamp(0.75rem,min(2vw,2vh),1rem)] w-[clamp(3rem,min(8vw,8vh),4rem)] h-[clamp(3rem,min(8vw,8vh),4rem)] rounded-full ${colorMap.iconBg} flex items-center justify-center`}
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <IconComponent
                    className={`w-[clamp(1.5rem,min(5vw,5vh),2rem)] h-[clamp(1.5rem,min(5vw,5vh),2rem)] ${colorMap.iconColor}`}
                />
            </motion.div>

            <span
                className={`text-[clamp(0.65rem,min(1.8vw,1.8vh),0.75rem)] font-bold ${colorMap.badge} px-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] py-[clamp(0.125rem,min(0.5vw,0.5vh),0.25rem)] rounded-full mb-[clamp(0.375rem,min(1.2vw,1.2vh),0.5rem)]`}
            >
                {jf.singkatan}
            </span>
            <h3
                className={`text-[clamp(0.875rem,min(2.5vw,2.5vh),1rem)] font-bold ${colorMap.text} mb-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] leading-tight`}
            >
                {jf.title}
            </h3>
            <p className="text-[clamp(0.7rem,min(2vw,2vh),0.75rem)] text-gray-500 dark:text-gray-400 leading-relaxed flex-grow line-clamp-3">
                {jf.description}
            </p>
            <div className="mt-[clamp(0.75rem,min(2vw,2vh),1rem)] inline-flex items-center gap-[clamp(0.375rem,min(1vw,1vh),0.5rem)] text-[clamp(0.65rem,min(1.8vw,1.8vh),0.75rem)] font-semibold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>📋</span>
                <span>Lihat Detail</span>
            </div>
        </motion.div>
    )
}

// -------- KOMPONEN KARTU TATA KELOLA (digunakan di dalam modal list) --------
interface TataKelolaCardProps {
    info: TataKelolaInfo
    onClick: () => void
}

const TataKelolaCard: React.FC<TataKelolaCardProps> = ({ info, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = info.icon

    const colorMap = {
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
        rose: {
            bg: 'bg-rose-50 dark:bg-rose-900/40',
            border: 'border-rose-200 dark:border-rose-700',
            hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-500',
            text: 'text-rose-700 dark:text-rose-200',
            iconColor: 'text-rose-600 dark:text-rose-300',
            iconBg: 'bg-rose-100 dark:bg-rose-800/50',
            glow: 'group-hover:shadow-rose-300/50 dark:group-hover:shadow-rose-500/30',
        },
    }[info.color] || {
        bg: 'bg-gray-50 dark:bg-gray-800',
        border: 'border-gray-200 dark:border-gray-700',
        hoverBorder: 'hover:border-gray-400',
        text: 'text-gray-700',
        iconColor: 'text-gray-600',
        iconBg: 'bg-gray-100 dark:bg-gray-700',
        glow: '',
    }

    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group flex flex-col items-center text-center p-[clamp(1rem,min(4vw,4vh),1.5rem)] ${colorMap.bg} rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] border-[clamp(1px,min(0.5vw,0.5vh),2px)] ${colorMap.border} ${colorMap.hoverBorder} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${colorMap.glow} shadow-lg`}
            style={{ perspective: '800px' }}
        >
            <motion.div
                className={`mb-[clamp(0.75rem,min(2vw,2vh),1rem)] w-[clamp(3rem,min(8vw,8vh),4rem)] h-[clamp(3rem,min(8vw,8vh),4rem)] rounded-full ${colorMap.iconBg} flex items-center justify-center`}
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <IconComponent
                    className={`w-[clamp(1.5rem,min(5vw,5vh),2rem)] h-[clamp(1.5rem,min(5vw,5vh),2rem)] ${colorMap.iconColor}`}
                />
            </motion.div>

            <h3
                className={`text-[clamp(0.875rem,min(2.5vw,2.5vh),1rem)] font-bold ${colorMap.text} mb-[clamp(0.25rem,min(0.8vw,0.8vh),0.5rem)] leading-tight`}
            >
                {info.title}
            </h3>
            <p className="text-[clamp(0.7rem,min(2vw,2vh),0.75rem)] text-gray-500 dark:text-gray-400 mb-[clamp(0.25rem,min(0.8vw,0.8vh),0.5rem)] italic">
                {info.subtitle}
            </p>
            <p className="text-[clamp(0.7rem,min(2vw,2vh),0.75rem)] text-gray-500 dark:text-gray-400 leading-relaxed flex-grow line-clamp-2">
                {info.description}
            </p>
            <div className="mt-[clamp(0.75rem,min(2vw,2vh),1rem)] inline-flex items-center gap-[clamp(0.375rem,min(1vw,1vh),0.5rem)] text-[clamp(0.65rem,min(1.8vw,1.8vh),0.75rem)] font-semibold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>📋</span>
                <span>Lihat Detail</span>
            </div>
        </motion.div>
    )
}

// -------- MODAL DAFTAR JF --------
interface JFListModalProps {
    onClose: () => void
    onSelectJF: (jf: JFInfo) => void
}

const JFListModal: React.FC<JFListModalProps> = ({ onClose, onSelectJF }) => {
    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-[clamp(0.5rem,min(2vw,2vh),1rem)]"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-[clamp(20rem,min(95vw,95vh),72rem)] w-full max-h-[90vh] rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center p-[clamp(1rem,min(3vw,3vh),1.5rem)] border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-[clamp(1.1rem,min(4vw,4vh),1.5rem)] font-bold text-gray-900 dark:text-white flex items-center gap-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)]">
                        <FaChartBar className="text-blue-600 dark:text-blue-400" />
                        Jabatan Fungsional yang Ditangani
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer"
                    >
                        <FaTimes className="w-[clamp(1.25rem,min(3vw,3vh),1.5rem)] h-[clamp(1.25rem,min(3vw,3vh),1.5rem)]" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-[clamp(1rem,min(3vw,3vh),1.5rem)]">
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-[clamp(1rem,min(4vw,4vh),1.25rem)]"
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {jfInfos.map((jf, idx) => (
                            <JFCard
                                key={idx}
                                jf={jf}
                                onClick={() => onSelectJF(jf)}
                            />
                        ))}
                    </motion.div>
                </div>
                <div className="flex-shrink-0 p-[clamp(0.5rem,min(1.5vw,1.5vh),1rem)] border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-[clamp(1rem,min(3vw,3vh),1.5rem)] py-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] bg-gray-600 hover:bg-gray-700 text-white rounded-[clamp(0.375rem,min(1.5vw,1.5vh),0.5rem)] text-[clamp(0.8rem,min(2.2vw,2.2vh),0.875rem)] font-semibold transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// -------- MODAL DAFTAR TATA KELOLA --------
interface TataKelolaListModalProps {
    onClose: () => void
    onSelectTataKelola: (info: TataKelolaInfo) => void
}

const TataKelolaListModal: React.FC<TataKelolaListModalProps> = ({
    onClose,
    onSelectTataKelola,
}) => {
    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-[clamp(0.5rem,min(2vw,2vh),1rem)]"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-[clamp(20rem,min(95vw,95vh),72rem)] w-full max-h-[90vh] rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center p-[clamp(1rem,min(3vw,3vh),1.5rem)] border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-[clamp(1.1rem,min(4vw,4vh),1.5rem)] font-bold text-gray-900 dark:text-white flex items-center gap-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)]">
                        <FaClipboardList className="text-teal-600 dark:text-teal-400" />
                        Tata Kelola Ukom Teknis JF
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer"
                    >
                        <FaTimes className="w-[clamp(1.25rem,min(3vw,3vh),1.5rem)] h-[clamp(1.25rem,min(3vw,3vh),1.5rem)]" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-[clamp(1rem,min(3vw,3vh),1.5rem)]">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(1rem,min(4vw,4vh),1.25rem)]"
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {tataKelolaInfos.map((info, idx) => (
                            <TataKelolaCard
                                key={idx}
                                info={info}
                                onClick={() => onSelectTataKelola(info)}
                            />
                        ))}
                    </motion.div>
                </div>
                <div className="flex-shrink-0 p-[clamp(0.5rem,min(1.5vw,1.5vh),1rem)] border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-[clamp(1rem,min(3vw,3vh),1.5rem)] py-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] bg-gray-600 hover:bg-gray-700 text-white rounded-[clamp(0.375rem,min(1.5vw,1.5vh),0.5rem)] text-[clamp(0.8rem,min(2.2vw,2.2vh),0.875rem)] font-semibold transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

// -------- PROPS SLIDE 1 GROUP 2 --------
interface Slide1Props {
    onComplete?: () => void
}

// -------- KOMPONEN SLIDE 1 GROUP 2 (REDESIGN) --------
const Slide1: React.FC<Slide1Props> = ({}) => {
    const [selectedJF, setSelectedJF] = useState<JFInfo | null>(null)
    const [selectedTataKelola, setSelectedTataKelola] =
        useState<TataKelolaInfo | null>(null)
    const [showJFList, setShowJFList] = useState(false)
    const [showTataKelolaList, setShowTataKelolaList] = useState(false)
    const { handleClick } = useInteraction()

    const openJFList = () => setShowJFList(true)
    const closeJFList = () => setShowJFList(false)
    const openTataKelolaList = () => setShowTataKelolaList(true)
    const closeTataKelolaList = () => setShowTataKelolaList(false)

    const handleSelectJF = (jf: JFInfo) => {
        setSelectedJF(jf)
    }

    const handleSelectTataKelola = (info: TataKelolaInfo) => {
        setSelectedTataKelola(info)
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            <FloatingIcons />
            <div className="absolute top-0 right-[clamp(1rem,min(4vw,4vh),2.5rem)] z-20 pointer-events-none">
                <span className="text-[clamp(1.5rem,min(5vw,5vh),3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #1
                </span>
            </div>

            {/* Card utama - width diperlebar dan padding/gap dikurangi agar lebih ramping */}
            <motion.div
                className="w-full max-w-[min(95vw,1600px)] max-h-[calc(100vh-4rem)] overflow-y-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[clamp(1rem,min(4vw,4vh),1.5rem)] shadow-2xl p-[clamp(0.75rem,min(3vw,3vh),1rem)] border border-white/30 dark:border-gray-800/50 flex flex-col gap-[clamp(0.5rem,min(2vw,2vh),1rem)] relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* HEADER - ukuran font sedikit diperbesar */}
                <motion.div
                    className="text-center"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-[clamp(1.75rem,min(6vw,6vh),3.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mb-[clamp(0.25rem,min(1vw,1vh),0.5rem)] tracking-tight">
                        Uji Kompetensi Jabatan Fungsional
                    </h1>
                    <p className="text-[clamp(1rem,min(3vw,3vh),1.25rem)] text-gray-700 dark:text-gray-200 font-semibold max-w-7xl mx-auto mb-[clamp(0.25rem,min(0.8vw,0.8vh),0.5rem)] px-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)]">
                        Bidang Keuangan Negara
                    </p>
                    <p className="text-[clamp(0.8rem,min(2.5vw,2.5vh),1rem)] text-gray-500 dark:text-gray-400 font-light max-w-7xl mx-auto px-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)]">
                        Penilaian/Uji Kompetensi yang dilakukan oleh{' '}
                        <strong className="text-indigo-600 dark:text-indigo-400">
                            Pusbin JFPM
                        </strong>{' '}
                        (BPPK) terhadap 4 Jabatan Fungsional di lingkungan
                        Kemenkeu
                    </p>
                </motion.div>

                {/* INFO BANNER BPPK / PUSBIN JFPM - dikurangi padding */}
                <motion.div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] p-[clamp(0.5rem,min(2vw,2vh),0.75rem)] text-center"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex items-center justify-center gap-[clamp(0.375rem,min(1vw,1vh),0.5rem)] mb-[clamp(0.125rem,min(0.5vw,0.5vh),0.25rem)]">
                        <FaUniversity className="w-[clamp(1rem,min(3vw,3vh),1.25rem)] h-[clamp(1rem,min(3vw,3vh),1.25rem)] text-blue-600 dark:text-blue-400" />
                        <span className="text-[clamp(0.875rem,min(2.5vw,2.5vh),1rem)] font-bold text-blue-800 dark:text-blue-200">
                            BPPK c.q. Pusbin JFPM
                        </span>
                    </div>
                    <p className="text-[clamp(0.75rem,min(2vw,2vh),0.875rem)] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Bertanggung jawab melaksanakan{' '}
                        <strong>Uji Kompetensi Kompleks</strong> untuk
                        perpindahan JF Eksternal / Jabatan Non-JF ke dalam
                        Jabatan Fungsional di lingkungan Kemenkeu, sesuai
                        mekanisme perpindahan JF Bidang Keuangan Negara.
                    </p>
                </motion.div>

                {/* DUA CARD BESAR - gap dikurangi, font sedikit diperbesar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,min(3vw,3vh),1rem)]">
                    {/* Card Jabatan Fungsional */}
                    <motion.div
                        className="group relative overflow-hidden rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 border-[clamp(1px,min(0.5vw,0.5vh),2px)] border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-[clamp(0.75rem,min(3vw,3vh),1rem)] flex flex-col items-center text-center"
                        onClick={handleClick(openJFList)}
                        variants={cardVariants}
                    >
                        <div className="w-[clamp(3rem,min(8vw,8vh),3.5rem)] h-[clamp(3rem,min(8vw,8vh),3.5rem)] rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center mb-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)]">
                            <FaChartBar className="w-[clamp(1.5rem,min(4vw,4vh),1.75rem)] h-[clamp(1.5rem,min(4vw,4vh),1.75rem)] text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="text-[clamp(0.9rem,min(3vw,3vh),1.125rem)] font-bold text-blue-700 dark:text-blue-200 mb-[clamp(0.25rem,min(0.8vw,0.8vh),0.5rem)]">
                            Jabatan Fungsional yang Ditangani
                        </h3>
                        <p className="text-[clamp(0.75rem,min(2vw,2vh),0.875rem)] text-gray-600 dark:text-gray-300 max-w-3xl">
                            Lihat 4 Jabatan Fungsional (AKN, PKN, Penilai,
                            Pelelang) yang diuji kompetensinya oleh Pusbin JFPM.
                        </p>
                        <div className="mt-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] inline-flex items-center gap-[clamp(0.375rem,min(1vw,1vh),0.5rem)] text-[clamp(0.65rem,min(1.8vw,1.8vh),0.75rem)] font-semibold text-blue-500 dark:text-blue-400 group-hover:underline">
                            <span>📋</span>
                            <span>Klik untuk melihat daftar</span>
                        </div>
                    </motion.div>

                    {/* Card Tata Kelola */}
                    <motion.div
                        className="group relative overflow-hidden rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] bg-gradient-to-br from-teal-500/10 to-violet-500/10 dark:from-teal-500/20 dark:to-violet-500/20 border-[clamp(1px,min(0.5vw,0.5vh),2px)] border-teal-200 dark:border-teal-700 hover:border-teal-400 dark:hover:border-teal-500 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-[clamp(0.75rem,min(3vw,3vh),1rem)] flex flex-col items-center text-center"
                        onClick={handleClick(openTataKelolaList)}
                        variants={cardVariants}
                    >
                        <div className="w-[clamp(3rem,min(8vw,8vh),3.5rem)] h-[clamp(3rem,min(8vw,8vh),3.5rem)] rounded-full bg-teal-100 dark:bg-teal-800/50 flex items-center justify-center mb-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)]">
                            <FaClipboardList className="w-[clamp(1.5rem,min(4vw,4vh),1.75rem)] h-[clamp(1.5rem,min(4vw,4vh),1.75rem)] text-teal-600 dark:text-teal-300" />
                        </div>
                        <h3 className="text-[clamp(0.9rem,min(3vw,3vh),1.125rem)] font-bold text-teal-700 dark:text-teal-200 mb-[clamp(0.25rem,min(0.8vw,0.8vh),0.5rem)]">
                            Tata Kelola Ukom Teknis JF
                        </h3>
                        <p className="text-[clamp(0.75rem,min(2vw,2vh),0.875rem)] text-gray-600 dark:text-gray-300 max-w-3xl">
                            Pahami 3 kegiatan utama: Perencanaan,
                            Penyelenggaraan, serta Monitoring & Evaluasi Uji
                            Kompetensi.
                        </p>
                        <div className="mt-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] inline-flex items-center gap-[clamp(0.375rem,min(1vw,1vh),0.5rem)] text-[clamp(0.65rem,min(1.8vw,1.8vh),0.75rem)] font-semibold text-teal-500 dark:text-teal-400 group-hover:underline">
                            <span>📋</span>
                            <span>Klik untuk melihat daftar</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ----- MODALS ----- */}
            {showJFList && (
                <JFListModal
                    onClose={closeJFList}
                    onSelectJF={handleSelectJF}
                />
            )}
            {showTataKelolaList && (
                <TataKelolaListModal
                    onClose={closeTataKelolaList}
                    onSelectTataKelola={handleSelectTataKelola}
                />
            )}
            {selectedJF && (
                <JFDetailModal
                    onClose={() => setSelectedJF(null)}
                    jf={selectedJF}
                />
            )}
            {selectedTataKelola && (
                <TataKelolaDetailModal
                    onClose={() => setSelectedTataKelola(null)}
                    info={selectedTataKelola}
                />
            )}
        </div>
    )
}

export const searchText =
    'Uji Kompetensi JF Bidang Keuangan Negara AKN PKN Penilai Pelelang Pusbin JFPM BPPK Tata Kelola Ukom Teknis Alur Proses Bisnis'

export default Slide1
