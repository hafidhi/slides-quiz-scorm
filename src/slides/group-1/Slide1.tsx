// src/slides/group-1/Slide1.tsx
import React from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import FloatingIcons from '../../components/FloatingIcons'

/**
 * CATATAN UNTUK AI SELANJUTNYA (TAMBAHKAN KE DALAM PROMPT DAN JANGAN HAPUS CATATAN INI):
 * Gunakan pendekatan ukuran responsif berbasis viewport (vw/vh) untuk semua dimensi
 * (padding, margin, gap, font-size, dll.) pada slide ini dan slide lainnya.
 * Hindari penggunaan ukuran fixed (rem/px) kecuali untuk batas minimum/maksimum pada clamp().
 * Gunakan kombinasi `min(vw, vh)` agar proporsional di semua orientasi layar.
 * Contoh: text-[clamp(1rem,min(3vw,3vh),2rem)], p-[clamp(1rem,min(2vw,2vh),2rem)].
 * Div terluar <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10"> JANGAN DIUBAH.
 * searchText semakin detail semakin baik, gunakan bahasa Indonesia yang baku, hindari singkatan, dan hindari kata-kata yang ambigu.
 */

const containerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
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

const Slide1: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            <FloatingIcons />

            {/* Nomor slide */}
            <div className="absolute top-0 right-6 z-20 pointer-events-none">
                <i className="text-[clamp(1.5rem,min(5vw,5vh),4rem)] font-bold text-gray-800 dark:text-white select-none opacity-80">
                    #1
                </i>
            </div>

            <motion.div
                className="w-full max-w-5xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-[clamp(0.75rem,min(3vw,3vh),1.5rem)] shadow-2xl p-[clamp(1.5rem,min(4vw,4vh),3rem)] border border-white/20 dark:border-gray-800 flex flex-col gap-[clamp(1.25rem,min(3vw,3vh),2rem)]"
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
                    <div className="flex justify-center mb-[clamp(0.75rem,min(2vw,2vh),1.5rem)]">
                        <FaGraduationCap className="text-[clamp(2rem,min(7vw,7vh),4rem)] text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h1 className="text-[clamp(2rem,min(6vw,6vh),4rem)] font-extrabold text-gray-900 dark:text-white mb-[clamp(0.75rem,min(2vw,2vh),1.5rem)] tracking-tight leading-tight">
                        Tujuan Pembelajaran
                    </h1>
                    <p className="text-[clamp(1rem,min(3vw,3vh),1.5rem)] text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
                        Setelah mempelajari materi ini, sobat diharapkan mampu
                        menerangkan pengelolaan uji kompetensi dan sertifikasi
                        bidang keuangan negara di BPPK dengan baik.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}

// Teks untuk pencarian slide
export const searchText =
    'Tujuan Pembelajaran pengelolaan uji kompetensi sertifikasi bidang keuangan negara BPPK'

export default Slide1
