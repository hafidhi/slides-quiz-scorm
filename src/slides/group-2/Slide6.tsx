// src/slides/group-2/Slide6.tsx
import React, { useState, type ReactNode } from 'react'
import { FaUserTie, FaBuilding, FaChartLine, FaTimes } from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import FloatingIcons from '../../components/FloatingIcons'
import { useInteraction } from '../../hooks/useInteraction'

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

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

// ----------------------------------------------------------------------
// Data detail untuk modal
// ----------------------------------------------------------------------
const detailManajerial = `Uji Kompetensi Manajerial mengukur kemampuan peserta dalam aspek kepemimpinan dan manajemen organisasi.

Ruang lingkup yang dinilai:
• Kemampuan memimpin dan mengelola tim
• Kemampuan merencanakan dan mengorganisasi pekerjaan
• Kemampuan mengambil keputusan secara efektif
• Kemampuan mengelola sumber daya organisasi secara efisien

Uji ini bertujuan memastikan pejabat fungsional memiliki kompetensi manajerial yang memadai sesuai jenjang jabatannya.`

const detailSosialKultural = `Uji Kompetensi Sosial Kultural mengukur kemampuan peserta dalam berinteraksi dan beradaptasi dengan lingkungan sosial budaya yang beragam.

Ruang lingkup yang dinilai:
• Kemampuan berkomunikasi secara efektif
• Kemampuan berkolaborasi dan membangun jejaring
• Kemampuan beradaptasi dengan budaya organisasi
• Integritas, etika, dan empati dalam pelaksanaan tugas

Kompetensi ini penting untuk menciptakan lingkungan kerja yang harmonis dan mendukung pencapaian tujuan organisasi.`

const detailKoordinasi: ReactNode = (
    <>
        <p>
            Pelaksanaan Uji Kompetensi Manajerial dan Sosial Kultural tidak
            dapat dilakukan secara mandiri oleh Pusbin JFPM.
        </p>

        <p className="mt-3 font-semibold">Ketentuan koordinasi:</p>

        <ol className="list-decimal pl-5 mt-2 space-y-1 text-justify">
            <li>
                Pelaksanaan harus berkoordinasi dengan Sekretariat Jenderal c.q.
                Biro Sumber Daya Manusia (SDM).
            </li>
            <li>
                Biro SDM berperan selaku{' '}
                <span className="italic">
                    "Unit Pengelola Penilaian Kompetensi Pusat"
                </span>
                .
            </li>
            <li>
                Koordinasi ini bertujuan untuk menjamin standarisasi, akurasi,
                dan validitas hasil penilaian kompetensi secara nasional.
            </li>
        </ol>

        <p className="mt-3">
            Dengan koordinasi tersebut, uji kompetensi dapat diselenggarakan
            secara profesional dan sesuai ketentuan perundang-undangan.
        </p>
    </>
)

// ----------------------------------------------------------------------
// Komponen Modal Detail
// ----------------------------------------------------------------------
interface DetailModalProps {
    title: string
    icon: React.ComponentType<{ className?: string }>
    color: 'blue' | 'emerald' | 'amber'
    content: ReactNode
    onClose: () => void
}

const DetailModal: React.FC<DetailModalProps> = ({
    title,
    icon: Icon,
    color,
    content,
    onClose,
}) => {
    const colorMap = {
        blue: {
            border: 'border-blue-400 dark:border-blue-600',
            iconBg: 'bg-blue-100 dark:bg-blue-800/50',
            iconColor: 'text-blue-600 dark:text-blue-300',
            badge: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200',
            btn: 'bg-blue-600 hover:bg-blue-700',
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
    }[color]

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
                            <Icon
                                className={`w-6 h-6 sm:w-7 sm:h-7 ${colorMap.iconColor}`}
                            />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                {title}
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
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {content}
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

// ----------------------------------------------------------------------
// KOMPONEN UTAMA SLIDE 6
// ----------------------------------------------------------------------
interface Slide6Props {
    onComplete?: () => void
}

const Slide6: React.FC<Slide6Props> = () => {
    const [modal, setModal] = useState<
        'manajerial' | 'sosial' | 'koordinasi' | null
    >(null)
    const { handleClick } = useInteraction()

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 relative z-10">
            <FloatingIcons />
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <span className="text-[clamp(1rem,4vw,3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #6
                </span>
            </div>

            <motion.div
                className="w-full max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border border-white/30 dark:border-gray-800/50 flex flex-col gap-6 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* HEADER */}
                <motion.div
                    className="text-center mb-1"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mb-3 tracking-tight">
                        Penyelenggaraan Uji Kompetensi JFKN
                    </h1>
                    <p className="text-[clamp(0.8rem,1.8vw,1.15rem)] text-gray-700 dark:text-gray-200 font-semibold max-w-7xl mx-auto mb-1 px-2">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            Pusbin JFPM
                        </span>{' '}
                        dapat menyelenggarakan uji kompetensi bagi jabatan
                        fungsional di bidang keuangan negara untuk:
                    </p>
                </motion.div>

                {/* DUA KARTU BESAR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Uji Kompetensi Manajerial */}
                    <motion.div
                        className="group relative rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border-2 border-blue-300 dark:border-blue-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-5 sm:p-6 flex items-start gap-4 cursor-pointer"
                        variants={cardVariants}
                        onClick={handleClick(() => setModal('manajerial'))}
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center flex-shrink-0">
                            <FaUserTie className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-200 mb-1">
                                Uji Kompetensi Manajerial
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                                Mengukur kemampuan memimpin, merencanakan,
                                mengambil keputusan, dan mengelola sumber daya
                                organisasi.
                            </p>
                            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 group-hover:underline">
                                <span>📋</span>
                                <span>Klik untuk detail</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Uji Kompetensi Sosial Kultural */}
                    <motion.div
                        className="group relative rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 border-2 border-emerald-300 dark:border-emerald-600 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-5 sm:p-6 flex items-start gap-4 cursor-pointer"
                        variants={cardVariants}
                        onClick={handleClick(() => setModal('sosial'))}
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center flex-shrink-0">
                            <FaChartLine className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-300" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-200 mb-1">
                                Uji Kompetensi Sosial Kultural
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                                Mengukur kemampuan berkomunikasi, berkolaborasi,
                                beradaptasi dengan budaya, serta integritas dan
                                empati.
                            </p>
                            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 dark:text-emerald-400 group-hover:underline">
                                <span>📋</span>
                                <span>Klik untuk detail</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* KARTU KOORDINASI */}
                <motion.div
                    className="group relative rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-500/10 dark:from-amber-400/30 dark:to-yellow-500/20 border-2 border-amber-400 dark:border-amber-500 hover:border-amber-500 dark:hover:border-amber-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg p-5 sm:p-6 mx-auto max-w-3xl w-full cursor-pointer"
                    variants={cardVariants}
                    onClick={handleClick(() => setModal('koordinasi'))}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center flex-shrink-0">
                            <FaBuilding className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-300" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-200 mb-1">
                                Keduanya Wajib Berkoordinasi
                            </h3>
                            <p className="text-sm text-amber-800/80 dark:text-amber-200/80 font-medium leading-snug">
                                dengan{' '}
                                <span className="font-bold">
                                    Sekretariat Jenderal c.q. Biro Sumber Daya
                                    Manusia
                                </span>{' '}
                                selaku{' '}
                                <span className="italic">
                                    unit pengelola penilaian kompetensi pusat
                                </span>
                                .
                            </p>
                            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 dark:text-amber-400 group-hover:underline">
                                <span>📋</span>
                                <span>Klik untuk detail</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* MODALS */}
            {modal === 'manajerial' && (
                <DetailModal
                    title="Uji Kompetensi Manajerial"
                    icon={FaUserTie}
                    color="blue"
                    content={detailManajerial}
                    onClose={() => setModal(null)}
                />
            )}
            {modal === 'sosial' && (
                <DetailModal
                    title="Uji Kompetensi Sosial Kultural"
                    icon={FaChartLine}
                    color="emerald"
                    content={detailSosialKultural}
                    onClose={() => setModal(null)}
                />
            )}
            {modal === 'koordinasi' && (
                <DetailModal
                    title="Koordinasi dengan Sekretariat Jenderal"
                    icon={FaBuilding}
                    color="amber"
                    content={detailKoordinasi}
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    )
}

// ----------------------------------------------------------------------
// Teks pencarian
// ----------------------------------------------------------------------
export const searchText =
    'Pusbin JFPM Uji Kompetensi Jabatan Fungsional Bidang Keuangan Negara JFKN Manajerial Sosial Kultural Sekretariat Jenderal Biro Sumber Daya Manusia Unit Pengelola Penilaian Kompetensi Pusat Koordinasi'

export default Slide6
