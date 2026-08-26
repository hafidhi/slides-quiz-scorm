// src/slides/group-2/Slide9.tsx
import React, { useState, useEffect, useCallback } from 'react'
import {
    FaGlobe,
    FaBrain,
    FaPuzzlePiece,
    FaUserGraduate,
    FaUniversity,
    FaTimes,
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

// ----------------------------------------------------------------------
// Tipe data untuk setiap jenis tes / sertifikasi non-JF
// ----------------------------------------------------------------------
interface TestInfo {
    id: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    title: string
    shortDesc: string
    university?: string
    detail: string[]
}

const testData: TestInfo[] = [
    {
        id: 'english',
        icon: FaGlobe,
        color: 'blue',
        title: 'Tes Bahasa Inggris',
        shortDesc:
            'Mengukur kemampuan Bahasa Inggris pegawai Kementerian Keuangan.',
        university: 'Universitas Indonesia',
        detail: [
            'Diselenggarakan untuk mengukur kemampuan Bahasa Inggris (listening, structure, reading) pegawai Kemenkeu.',
            'BPPK c.q. Pusbin JFPM bekerja sama dengan Universitas Indonesia (UI) dalam penyusunan dan pelaksanaan tes.',
            'Hasil tes digunakan untuk pengembangan kompetensi, syarat kenaikan jabatan, dan keperluan mutasi.',
        ],
    },
    {
        id: 'psychology',
        icon: FaBrain,
        color: 'purple',
        title: 'Tes Psikologi',
        shortDesc:
            'Asesmen psikologis untuk menilai potensi dan kepribadian pegawai.',
        university: 'Universitas Padjadjaran',
        detail: [
            'Tes Psikologi menilai aspek inteligensi, kepribadian, dan minat pegawai Kementerian Keuangan.',
            'BPPK c.q. Pusbin JFPM bekerja sama dengan Universitas Padjadjaran (Unpad) dalam penyelenggaraannya.',
            'Hasil tes menjadi bahan pertimbangan penempatan, pengembangan karier, dan konseling pegawai.',
        ],
    },
    {
        id: 'academic',
        icon: FaPuzzlePiece,
        color: 'orange',
        title: 'Tes Potensi Akademik',
        shortDesc:
            'Mengukur kemampuan kognitif dan potensi akademik pegawai Kemenkeu.',
        university: 'Universitas Airlangga',
        detail: [
            'Tes Potensi Akademik (TPA) mengukur kemampuan verbal, numerik, dan penalaran logis.',
            'BPPK c.q. Pusbin JFPM bekerja sama dengan Universitas Airlangga (Unair) sebagai mitra penyelenggara.',
            'Digunakan untuk mendukung proses seleksi, penempatan, dan pengembangan kompetensi pegawai.',
        ],
    },
    {
        id: 'ud-upkp',
        icon: FaUserGraduate,
        color: 'emerald',
        title: 'UD dan UPKP',
        shortDesc:
            'Ujian Dinas dan Ujian Penyesuaian Kenaikan Pangkat bagi pegawai Kemenkeu.',
        detail: [
            'UD (Ujian Dinas) dan UPKP (Ujian Penyesuaian Kenaikan Pangkat) merupakan ujian wajib bagi pegawai untuk memenuhi syarat kenaikan pangkat.',
            'Pusbin JFPM berkoordinasi dengan Pusdiklat KM terkait materi dan penyediaan e-learning.',
            'Penyusunan soal UD dan UPKP dilakukan secara internal di lingkungan Pusbin JFPM.',
            'Ujian dilaksanakan secara berkala dan hasilnya menjadi dasar pertimbangan kenaikan pangkat.',
        ],
    },
    {
        id: 'spmb-stan',
        icon: FaUniversity,
        color: 'rose',
        title: 'SPMB-PT PKN STAN',
        shortDesc:
            'Seleksi Penerimaan Mahasiswa Baru Politeknik Keuangan Negara STAN.',
        detail: [
            'SPMB-PT PKN STAN adalah seleksi masuk calon mahasiswa Politeknik Keuangan Negara STAN, dikelola oleh BPPK.',
            'Materi ujian meliputi Tes Potensi Akademik, Tes Bahasa Inggris, dan Tes Karakteristik Pribadi.',
            'Lulusan PKN STAN akan diangkat menjadi Aparatur Sipil Negara (ASN) di lingkungan Kementerian Keuangan.',
            'Informasi lengkap dapat diakses melalui laman resmi PKN STAN.',
        ],
    },
]

// ----------------------------------------------------------------------
// Variant animasi
// ----------------------------------------------------------------------
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
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

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

// Variants untuk transisi halaman carousel (masuk dari kanan/kiri)
const pageVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
}

// ----------------------------------------------------------------------
// Pemetaan warna untuk kartu dan modal
// ----------------------------------------------------------------------
interface ColorSet {
    bg: string
    border: string
    hoverBorder: string
    text: string
    iconColor: string
    iconBg: string
    badge: string
    glow: string
    btn: string
    borderTop: string
}

const colorMap: Record<string, ColorSet> = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/40',
        border: 'border-blue-200 dark:border-blue-700',
        hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
        text: 'text-blue-700 dark:text-blue-200',
        iconColor: 'text-blue-600 dark:text-blue-300',
        iconBg: 'bg-blue-100 dark:bg-blue-800/50',
        badge: 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200',
        glow: 'group-hover:shadow-blue-300/50 dark:group-hover:shadow-blue-500/30',
        btn: 'bg-blue-600 hover:bg-blue-700',
        borderTop: 'border-blue-400',
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
        btn: 'bg-purple-600 hover:bg-purple-700',
        borderTop: 'border-purple-400',
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
        btn: 'bg-orange-600 hover:bg-orange-700',
        borderTop: 'border-orange-400',
    },
    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/40',
        border: 'border-emerald-200 dark:border-emerald-700',
        hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500',
        text: 'text-emerald-700 dark:text-emerald-200',
        iconColor: 'text-emerald-600 dark:text-emerald-300',
        iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
        badge: 'bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-200',
        glow: 'group-hover:shadow-emerald-300/50 dark:group-hover:shadow-emerald-500/30',
        btn: 'bg-emerald-600 hover:bg-emerald-700',
        borderTop: 'border-emerald-400',
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
        btn: 'bg-rose-600 hover:bg-rose-700',
        borderTop: 'border-rose-400',
    },
}

// ----------------------------------------------------------------------
// Komponen Kartu Tes
// ----------------------------------------------------------------------
interface TestCardProps {
    info: TestInfo
    onClick: () => void
}

const TestCard: React.FC<TestCardProps> = ({ info, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = info.icon
    const c = colorMap[info.color] || colorMap.blue

    return (
        <motion.div
            variants={cardVariants}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group flex flex-col items-center text-center p-3 sm:p-4 lg:p-5 ${c.bg} rounded-2xl border-2 ${c.border} ${c.hoverBorder} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${c.glow} shadow-lg`}
            style={{ perspective: '800px' }}
        >
            <motion.div
                className={`mb-2 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full ${c.iconBg} flex items-center justify-center`}
                animate={{ rotateY: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <IconComponent
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${c.iconColor}`}
                />
            </motion.div>

            {info.university && (
                <span
                    className={`text-xs font-bold ${c.badge} px-2 py-0.5 rounded-full mb-1.5`}
                >
                    🤝 {info.university}
                </span>
            )}
            <h3
                className={`text-sm sm:text-sm lg:text-base font-bold ${c.text} mb-1.5 leading-tight`}
            >
                {info.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 leading-relaxed line-clamp-2">
                {info.shortDesc}
            </p>

            <div className="mt-auto inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>📋</span>
                <span>Detail</span>
            </div>
        </motion.div>
    )
}

// ----------------------------------------------------------------------
// Modal Detail Tes
// ----------------------------------------------------------------------
interface DetailModalProps {
    info: TestInfo
    onClose: () => void
}

const DetailModal: React.FC<DetailModalProps> = ({ info, onClose }) => {
    const c = colorMap[info.color] || colorMap.blue
    const IconComponent = info.icon

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4"
            onClick={onClose}
        >
            <div
                className={`bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden border-t-4 ${c.borderTop}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <IconComponent className={`w-6 h-6 ${c.iconColor}`} />
                        {info.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer"
                    >
                        <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    {info.university && (
                        <p className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                            Mitra Universitas: {info.university}
                        </p>
                    )}
                    <ul className="space-y-3">
                        {info.detail.map((step, idx) => (
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

                {/* Footer */}
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
// Hook untuk mendeteksi jumlah item per halaman berdasarkan lebar layar
// ----------------------------------------------------------------------
const useItemsPerPage = () => {
    const [itemsPerPage, setItemsPerPage] = useState(1)

    const update = useCallback(() => {
        const width = window.innerWidth
        if (width >= 1024)
            setItemsPerPage(3) // lg
        else if (width >= 640)
            setItemsPerPage(2) // sm
        else setItemsPerPage(1)
    }, [])

    useEffect(() => {
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [update])

    return itemsPerPage
}

// ----------------------------------------------------------------------
// Komponen Utama Slide9
// ----------------------------------------------------------------------
interface Slide9Props {
    onComplete?: () => void
}

const Slide9: React.FC<Slide9Props> = ({ onComplete }) => {
    const { handleClick } = useInteraction()
    const [selectedTest, setSelectedTest] = useState<TestInfo | null>(null)
    const itemsPerPage = useItemsPerPage()
    const totalPages = Math.ceil(testData.length / itemsPerPage)

    const [[currentPage, direction], setCurrentPage] = useState<
        [number, number]
    >([0, 0])

    // Navigasi halaman
    const goToPage = (page: number) => {
        const newDirection = page > currentPage ? 1 : -1
        setCurrentPage([page, newDirection])
    }

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            goToPage(currentPage - 1)
        }
    }

    // Data yang ditampilkan pada halaman saat ini
    const startIdx = currentPage * itemsPerPage
    const currentItems = testData.slice(startIdx, startIdx + itemsPerPage)

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            <FloatingIcons />
            {/* Nomor Slide */}
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <span className="text-[clamp(1rem,4vw,3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #9
                </span>
            </div>

            <motion.div
                className="w-full max-w-7xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-5 lg:p-6 border border-white/30 dark:border-gray-800/50 flex flex-col gap-3 sm:gap-4 lg:gap-5 relative z-10 max-h-[85vh] overflow-y-auto"
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
                    <h1 className="text-[clamp(1.25rem,3.5vw,2.25rem)] font-extrabold bg-gradient-to-r from-blue-600 via-emerald-500 to-rose-500 dark:from-blue-400 dark:via-emerald-400 dark:to-rose-400 text-transparent bg-clip-text mb-1 tracking-tight">
                        Tes dan Sertifikasi untuk Non-JF
                    </h1>
                    <p className="text-[clamp(0.6rem,1.6vw,1.05rem)] text-gray-700 dark:text-gray-200 font-semibold max-w-7xl mx-auto mb-0 px-2">
                        Berbagai tes yang diselenggarakan oleh BPPK c.q. Pusbin
                        JFPM untuk pegawai Kementerian Keuangan dan calon
                        mahasiswa PKN STAN.
                        <br />
                        <span className="italic font-normal">
                            Klik kartu untuk melihat informasi lengkap
                        </span>
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative flex items-center">
                    {/* Tombol Prev */}
                    {totalPages > 1 && (
                        <button
                            onClick={handleClick(prevPage)}
                            disabled={currentPage === 0}
                            className="absolute left-0 z-10 -ml-2 sm:-ml-3 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                            aria-label="Previous"
                        >
                            <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    )}

                    {/* Container halaman dengan animasi */}
                    <div className="overflow-hidden w-full">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentPage}
                                custom={direction}
                                variants={pageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 0.4,
                                    ease: 'easeInOut',
                                }}
                                className={`grid gap-3 sm:gap-4 lg:gap-5 ${
                                    itemsPerPage === 1
                                        ? 'grid-cols-1'
                                        : itemsPerPage === 2
                                          ? 'grid-cols-2'
                                          : 'grid-cols-3'
                                }`}
                            >
                                {currentItems.map((item) => (
                                    <TestCard
                                        key={item.id}
                                        info={item}
                                        onClick={handleClick(() =>
                                            setSelectedTest(item),
                                        )}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Tombol Next */}
                    {totalPages > 1 && (
                        <button
                            onClick={handleClick(nextPage)}
                            disabled={currentPage === totalPages - 1}
                            className="absolute right-0 z-10 -mr-2 sm:-mr-3 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                            aria-label="Next"
                        >
                            <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    )}
                </div>

                {/* Indikator halaman (dots) */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={handleClick(() => goToPage(i))}
                                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                    i === currentPage
                                        ? 'bg-blue-600 dark:bg-blue-400 w-5'
                                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                                aria-label={`Go to page ${i + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Tombol Lanjut ke Kuis */}
                {onComplete && (
                    <motion.div
                        className="flex justify-center mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <button
                            onClick={handleClick(onComplete)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition cursor-pointer text-sm"
                        >
                            Lanjut ke Kuis
                            <FaArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                <motion.p
                    className="text-[10px] sm:text-xs text-center text-gray-400 dark:text-gray-500 mt-1"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Geser atau klik panah untuk melihat tes lainnya
                </motion.p>
            </motion.div>

            {/* Modal Detail */}
            {selectedTest && (
                <DetailModal
                    info={selectedTest}
                    onClose={() => setSelectedTest(null)}
                />
            )}
        </div>
    )
}

// ----------------------------------------------------------------------
// Teks pencarian untuk fitur navigasi / search
// ----------------------------------------------------------------------
export const searchText =
    'Tes Bahasa Inggris Tes Psikologi Tes Potensi Akademik UD UPKP SPMB PKN STAN Universitas Indonesia Universitas Padjadjaran Universitas Airlangga Pusdiklat KM Pusbin JFPM BPPK Kementerian Keuangan kenaikan pangkat ujian dinas penyesuaian kenaikan pangkat seleksi masuk STAN'

export default Slide9
