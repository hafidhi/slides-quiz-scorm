// src/slides/group-2/Slide2.tsx

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

import React, { useCallback, useMemo, useState } from 'react'
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    Handle,
    Position,
    MarkerType,
} from '@xyflow/react'
import type { Node, Edge, NodeProps } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { FaArrowRight, FaTimes } from 'react-icons/fa'
import { motion, type Variants } from 'framer-motion'
import { useInteraction } from '../../hooks/useInteraction'
import FloatingIcons from '../../components/FloatingIcons'

// -------- TYPE DATA UNTUK MODAL DETAIL --------
interface DetailInfo {
    title: string
    description: string
    detailSteps: string[]
}

// -------- DATA PELAKSANA UNTUK SETIAP NODE (memenuhi Record<string, unknown>) --------
interface NodeData extends Record<string, unknown> {
    label: string
    executor: string
    nodeId: string
}

// -------- VARIANT ANIMASI --------
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

// -------- CUSTOM NODE DENGAN TOOLTIP PELAKSANA --------
const CustomNode: React.FC<NodeProps> = ({ data }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const nodeData = data as unknown as NodeData

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Handle type="target" position={Position.Left} />
            <div className="px-[clamp(0.5rem,min(2vw,2vh),1rem)] py-[clamp(0.25rem,min(1vw,1vh),0.5rem)] bg-white dark:bg-gray-800 shadow-md rounded-[clamp(0.375rem,min(1.5vw,1.5vh),0.5rem)] border-[clamp(1px,min(0.5vw,0.5vh),2px)] border-gray-200 dark:border-gray-600 text-[clamp(0.75rem,min(2vw,2vh),0.875rem)] font-semibold text-center text-gray-800 dark:text-gray-200 min-w-[clamp(120px,min(25vw,25vh),220px)] whitespace-pre-line">
                {nodeData.label}
            </div>
            <Handle type="source" position={Position.Right} />
            {showTooltip && (
                <div className="absolute top-full mt-[clamp(0.25rem,min(1vw,1vh),0.5rem)] left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-[clamp(0.65rem,min(1.8vw,1.8vh),0.75rem)] rounded-[clamp(0.25rem,min(1vw,1vh),0.375rem)] py-[clamp(0.125rem,min(0.5vw,0.5vh),0.375rem)] px-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] whitespace-nowrap z-50 shadow-lg">
                    <span className="font-bold">Pelaksana:</span>{' '}
                    {nodeData.executor}
                </div>
            )}
        </div>
    )
}

const nodeTypes = { custom: CustomNode }

// -------- MAPPING DETAIL UNTUK MODAL (SESUAI ALUR BARU) --------
const nodeDetailMap: Record<string, DetailInfo> = {
    '1': {
        title: 'Identifikasi & Analisis Kebutuhan Uji Kompetensi',
        description:
            'Mengidentifikasi kebutuhan uji kompetensi reguler dan insidental sebagai dasar perencanaan.',
        detailSteps: [
            'Identifikasi kebutuhan berdasarkan formasi',
            'Analisis kebutuhan reguler & insidental',
            'Penetapan prioritas uji kompetensi',
        ],
    },
    '2': {
        title: 'Kalender Uji Kompetensi',
        description: 'Menetapkan kalender tahunan pelaksanaan uji kompetensi.',
        detailSteps: [
            'Penetapan kalender Ukom',
            'Sinkronisasi jadwal dengan unit terkait',
        ],
    },
    '3': {
        title: 'Penyusunan & Pengembangan Desain Uji Kompetensi',
        description:
            'Menyusun desain uji kompetensi dan metode penilaian yang sesuai standar.',
        detailSteps: [
            'Penyusunan desain uji kompetensi',
            'Pengembangan metode penilaian',
        ],
    },
    '4': {
        title: 'Penyusunan Alat Uji Ukom',
        description:
            'Menyusun instrumen ujian (bank soal, perangkat ujian) sebagai alat ukur kompetensi.',
        detailSteps: [
            'Penyusunan Alat Uji Ukom (Bank Soal & Instrumen)',
            'Validasi dan review instrumen',
        ],
    },
    '5': {
        title: 'Pembentukan Tim Kerja dan Persiapan Ukom',
        description:
            'Menyiapkan sumber daya manusia dan teknis sebelum pelaksanaan ujian.',
        detailSteps: [
            'Pembentukan Tim Kerja',
            'Persiapan tempat uji',
            'Persiapan sistem/aplikasi ujian',
        ],
    },
    '6': {
        title: 'Pengumuman Ukom',
        description:
            'Informasi resmi kepada calon peserta mengenai jadwal dan persyaratan.',
        detailSteps: [
            'Menyusun pengumuman resmi',
            'Menyebarluaskan informasi Ukom',
        ],
    },
    '7': {
        title: 'Pengusulan Peserta',
        description:
            'Proses pengajuan calon peserta oleh unit pengusul disertai pengesahan dan verifikasi syarat.',
        detailSteps: [
            'Pengesahan oleh Eselon 2 bidang Kepegawaian',
            'Verifikasi Syarat Administrasi Peserta',
        ],
    },
    '8': {
        title: 'Validasi Administrasi',
        description:
            'Memeriksa kelengkapan dan kebenaran syarat administratif peserta.',
        detailSteps: [
            'Pemeriksaan dokumen persyaratan',
            'Verifikasi data peserta',
        ],
    },
    '9': {
        title: 'Penetapan dan Pemanggilan Peserta',
        description:
            'Menetapkan peserta yang lolos validasi dan melakukan pemanggilan resmi.',
        detailSteps: [
            'Menetapkan peserta lolos validasi',
            'Melakukan pemanggilan resmi',
        ],
    },
    return: {
        title: 'Dikembalikan kepada Instansi Pengusul',
        description:
            'Berkas dikembalikan karena tidak memenuhi syarat untuk diperbaiki dan diajukan ulang (proses berhenti di sini).',
        detailSteps: [
            'Pemberitahuan ke instansi pengusul',
            'Pengembalian berkas untuk perbaikan',
            'Proses selesai (tidak ada ajuan ulang otomatis)',
        ],
    },
    '10': {
        title: 'Uji Kompetensi',
        description:
            'Pelaksanaan teknis ujian untuk mengukur kompetensi peserta.',
        detailSteps: ['Pelaksanaan ujian tertulis/praktik', 'Pengawasan ujian'],
    },
    '11': {
        title: 'Pemeriksaan Hasil Ukom dan Rapat Penetapan Hasil',
        description:
            'Penilaian hasil ujian dan rapat untuk menentukan kelulusan.',
        detailSteps: ['Pemeriksaan Hasil Ukom', 'Rapat Penetapan Hasil'],
    },
    '12': {
        title: 'Berita Acara Penetapan Hasil Ukom',
        description: 'Dokumen resmi yang menetapkan hasil uji kompetensi.',
        detailSteps: ['Pembuatan Berita Acara', 'Pengesahan hasil uji'],
    },
    '13': {
        title: 'Hasil LULUS',
        description:
            'Peserta dinyatakan lulus dan mendapatkan surat rekomendasi serta sertifikat.',
        detailSteps: [
            'Surat Penyampaian & Rekomendasi ke Unit Pengusul',
            'Sertifikat Ukom (masa berlaku 2 tahun) ke Peserta',
        ],
    },
    '14': {
        title: 'Hasil GAGAL',
        description:
            'Peserta berhak mengulang dengan ketentuan waktu tertentu (tidak ada alur kembali otomatis ke pengusulan).',
        detailSteps: [
            'Ulang pertama: paling cepat 3 bulan',
            'Ulang kedua dst: paling cepat 6 bulan',
        ],
    },
    monev: {
        title: 'Monitoring dan Evaluasi',
        description:
            'Rekap, evaluasi, tindak lanjut, dan pelaporan penyelenggaraan uji kompetensi.',
        detailSteps: [
            'Rekap Penyelenggaraan Ukom',
            'Evaluasi Penyelenggaraan Ukom',
            'Pelaksanaan Rekomendasi Tindak Lanjut Hasil Evaluasi',
            'Penyusunan dan Penyampaian Laporan',
        ],
    },
}

// -------- MODAL DETAIL --------
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

    const colorMap = {
        blue: {
            border: 'border-blue-400',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            btn: 'bg-blue-600 hover:bg-blue-700',
        },
        violet: {
            border: 'border-violet-400',
            iconBg: 'bg-violet-100',
            iconColor: 'text-violet-600',
            btn: 'bg-violet-600 hover:bg-violet-700',
        },
        rose: {
            border: 'border-rose-400',
            iconBg: 'bg-rose-100',
            iconColor: 'text-rose-600',
            btn: 'bg-rose-600 hover:bg-rose-700',
        },
    }[color] || {
        border: 'border-gray-400',
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-600',
        btn: 'bg-gray-600 hover:bg-gray-700',
    }

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-[clamp(0.5rem,min(2vw,2vh),1rem)]"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 max-w-[clamp(20rem,min(90vw,90vh),36rem)] w-full max-h-[90vh] rounded-[clamp(0.75rem,min(3vw,3vh),1rem)] shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center p-[clamp(1rem,min(3vw,3vh),1.5rem)] border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-[clamp(1.125rem,min(3vw,3vh),1.25rem)] font-bold text-gray-900 dark:text-white">
                        {info.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-[clamp(0.5rem,min(1.5vw,1.5vh),0.75rem)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors cursor-pointer ml-[clamp(1rem,min(2vw,2vh),1.5rem)]"
                    >
                        <FaTimes className="w-[clamp(1.25rem,min(3vw,3vh),1.5rem)] h-[clamp(1.25rem,min(3vw,3vh),1.5rem)]" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-[clamp(1rem,min(3vw,3vh),1.5rem)] text-gray-700 dark:text-gray-300 leading-relaxed text-[clamp(0.8rem,min(2.2vw,2.2vh),1rem)]">
                    <p className="mb-[clamp(0.75rem,min(2vw,2vh),1rem)]">
                        {info.description}
                    </p>
                    <ul className="space-y-[clamp(0.75rem,min(2vw,2vh),1rem)]">
                        {info.detailSteps.map((step, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-[clamp(0.75rem,min(2vw,2vh),1rem)]"
                            >
                                <div className="w-[clamp(1.25rem,min(3vw,3vh),1.5rem)] h-[clamp(1.25rem,min(3vw,3vh),1.5rem)] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-[clamp(0.125rem,min(0.5vw,0.5vh),0.25rem)] text-[clamp(0.6rem,min(1.8vw,1.8vh),0.7rem)] font-bold text-gray-600 dark:text-gray-300">
                                    {idx + 1}
                                </div>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
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

// -------- KOMPONEN SLIDE 2 --------
interface Slide2Props {
    onComplete?: () => void
}

const Slide2: React.FC<Slide2Props> = ({ onComplete }) => {
    const { handleClick } = useInteraction()
    const [modalInfo, setModalInfo] = useState<DetailInfo | null>(null)
    const [modalColor, setModalColor] = useState<string>('blue')

    // -------- DATA NODE & EDGE (POSISI DIPERBAIKI) --------
    const initialNodes: Node<NodeData>[] = useMemo(
        () => [
            {
                id: '1',
                type: 'custom',
                data: {
                    label: 'Identifikasi & Analisis Kebutuhan\nUji Kompetensi',
                    executor: 'Pusbin JFPM, Biro Organta, UPK',
                    nodeId: '1',
                },
                position: { x: 10, y: 50 },
            },
            {
                id: '2',
                type: 'custom',
                data: {
                    label: 'Kalender Uji Kompetensi',
                    executor: 'Pusbin JFPM, Biro Organta, UPK',
                    nodeId: '2',
                },
                position: { x: 10, y: 160 },
            },
            {
                id: '3',
                type: 'custom',
                data: {
                    label: 'Penyusunan & Pengembangan\nDesain Uji Kompetensi',
                    executor:
                        'Pusbin JFPM, SME (UPSJF), WI (Pusdiklat Tematik)',
                    nodeId: '3',
                },
                position: { x: 10, y: 270 },
            },
            {
                id: '4',
                type: 'custom',
                data: {
                    label: 'Penyusunan Alat Uji Ukom',
                    executor:
                        'Pusbin JFPM, SME (UPSJF), WI (Pusdiklat Tematik)',
                    nodeId: '4',
                },
                position: { x: 10, y: 380 },
            },
            {
                id: '5',
                type: 'custom',
                data: {
                    label: 'Pembentukan Tim Kerja\ndan Persiapan Ukom',
                    executor: 'Pusbin JFPM',
                    nodeId: '5',
                },
                position: { x: 400, y: 50 },
            },
            {
                id: '6',
                type: 'custom',
                data: {
                    label: 'Pengumuman Ukom',
                    executor: 'Pusbin JFPM',
                    nodeId: '6',
                },
                position: { x: 400, y: 160 },
            },
            {
                id: '7',
                type: 'custom',
                data: {
                    label: 'Pengusulan Peserta',
                    executor: 'UPK, Calon/JFKN',
                    nodeId: '7',
                },
                position: { x: 400, y: 270 },
            },
            {
                id: '8',
                type: 'custom',
                data: {
                    label: 'Validasi Administrasi',
                    executor: 'Pusbin JFPM',
                    nodeId: '8',
                },
                position: { x: 400, y: 380 },
            },
            {
                id: 'return',
                type: 'custom',
                data: {
                    label: 'Dikembalikan kepada\nInstansi Pengusul',
                    executor: 'UPK, Calon/JFKN',
                    nodeId: 'return',
                },
                position: { x: 400, y: 490 },
            },
            {
                id: '9',
                type: 'custom',
                data: {
                    label: 'Penetapan dan\nPemanggilan Peserta',
                    executor: 'Pusbin JFPM',
                    nodeId: '9',
                },
                position: { x: 800, y: 30 },
            },
            {
                id: '10',
                type: 'custom',
                data: {
                    label: 'Uji Kompetensi',
                    executor: 'Pusbin JFPM',
                    nodeId: '10',
                },
                position: { x: 800, y: 140 },
            },
            {
                id: '11',
                type: 'custom',
                data: {
                    label: 'Pemeriksaan Hasil Ukom\ndan Rapat Penetapan Hasil',
                    executor:
                        'Pusbin JFPM, SME (UPSJF), WI (Pusdiklat Tematik)',
                    nodeId: '11',
                },
                position: { x: 800, y: 250 },
            },
            {
                id: '12',
                type: 'custom',
                data: {
                    label: 'Berita Acara Penetapan\nHasil Ukom',
                    executor: 'Pusbin JFPM',
                    nodeId: '12',
                },
                position: { x: 800, y: 360 },
            },
            {
                id: '13',
                type: 'custom',
                data: {
                    label: 'LULUS',
                    executor: 'Pusbin JFPM: Surat & Sertifikat',
                    nodeId: '13',
                },
                position: { x: 1200, y: 170 },
            },
            {
                id: '14',
                type: 'custom',
                data: {
                    label: 'GAGAL\n(Mengulang)',
                    executor: 'UPK, Calon/JFKN',
                    nodeId: '14',
                },
                position: { x: 800, y: 470 },
            },
            {
                id: 'monev',
                type: 'custom',
                data: {
                    label: 'Monitoring dan Evaluasi\n(Rekap, Evaluasi, Tindak Lanjut, Laporan)',
                    executor: 'Pusbin JFPM',
                    nodeId: 'monev',
                },
                position: { x: 1200, y: 440 },
            },
        ],
        [],
    )

    const initialEdges: Edge[] = useMemo(
        () => [
            {
                id: 'e1-2',
                source: '1',
                target: '2',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e2-3',
                source: '2',
                target: '3',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e3-4',
                source: '3',
                target: '4',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e4-5',
                source: '4',
                target: '5',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e5-6',
                source: '5',
                target: '6',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e6-7',
                source: '6',
                target: '7',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e7-8',
                source: '7',
                target: '8',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e8-9',
                source: '8',
                target: '9',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
                label: 'Ya',
                labelStyle: { fontWeight: 700, fill: '#059669' },
                labelBgStyle: { fill: '#d1fae5' },
            },
            {
                id: 'e8-return',
                source: '8',
                target: 'return',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
                label: 'Tidak',
                labelStyle: { fontWeight: 700, fill: '#dc2626' },
                labelBgStyle: { fill: '#fee2e2' },
            },
            {
                id: 'e9-10',
                source: '9',
                target: '10',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e10-11',
                source: '10',
                target: '11',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e11-12',
                source: '11',
                target: '12',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e12-13',
                source: '12',
                target: '13',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
                label: 'LULUS',
                labelStyle: { fontWeight: 700, fill: '#16a34a' },
            },
            {
                id: 'e12-14',
                source: '12',
                target: '14',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
                label: 'GAGAL',
                labelStyle: { fontWeight: 700, fill: '#dc2626' },
            },
            {
                id: 'e13-monev',
                source: '13',
                target: 'monev',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
            {
                id: 'e14-monev',
                source: '14',
                target: 'monev',
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            },
        ],
        [],
    )

    const [nodes, , onNodesChange] = useNodesState(initialNodes)
    const [edges, , onEdgesChange] = useEdgesState(initialEdges)

    const onNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
            const data = node.data as NodeData
            const nodeId = data.nodeId
            const detail = nodeDetailMap[nodeId]
            if (!detail) return

            let color = 'violet'
            if (['1', '2', '3', '4'].includes(nodeId)) color = 'blue'
            else if (['monev'].includes(nodeId)) color = 'rose'

            setModalInfo(detail)
            setModalColor(color)
            handleClick(() => {})(null as any)
        },
        [handleClick],
    )

    const closeModal = () => setModalInfo(null)

    // ---------- CSS KUSTOM UNTUK REACT FLOW (DARK/LIGHT MODE) ----------
    const flowStyles = `
        /* Tombol kontrol (Controls) */
        .react-flow__controls-button {
            background-color: white !important;
            border: 1px solid #d1d5db !important;
            color: #374151 !important;
        }
        .dark .react-flow__controls-button {
            background-color: #1f2937 !important;
            border-color: #4b5563 !important;
            color: #e5e7eb !important;
        }
        .react-flow__controls-button:hover {
            background-color: #f3f4f6 !important;
        }
        .dark .react-flow__controls-button:hover {
            background-color: #374151 !important;
        }
        .react-flow__controls-button svg {
            fill: currentColor;
        }

        /* Minimap */
        .react-flow__minimap {
            background-color: rgba(255,255,255,0.85) !important;
            border: 1px solid #e5e7eb !important;
        }
        .dark .react-flow__minimap {
            background-color: rgba(31,41,55,0.9) !important;
            border-color: #4b5563 !important;
        }
        .react-flow__minimap-mask {
            fill: rgba(240,240,240,0.6) !important;
        }
        .dark .react-flow__minimap-mask {
            fill: rgba(17,24,39,0.8) !important;
        }
        .react-flow__minimap-node {
            stroke: #9ca3af !important;
            fill: #e5e7eb !important;
        }
        .dark .react-flow__minimap-node {
            stroke: #6b7280 !important;
            fill: #374151 !important;
        }

        /* Background dots agar kontras */
        .react-flow__background {
            fill: #d1d5db !important;
        }
        .dark .react-flow__background {
            fill: #4b5563 !important;
        }
    `

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            {/* Inline style untuk React Flow dark/light mode */}
            <style>{flowStyles}</style>

            <FloatingIcons />
            <div className="absolute top-0 right-[clamp(1rem,min(4vw,4vh),2.5rem)] z-20 pointer-events-none">
                <span className="text-[clamp(1.5rem,min(5vw,5vh),3rem)] font-bold text-white dark:text-gray-800 select-none opacity-80">
                    #2
                </span>
            </div>

            {/* Card utama: width diperlebar, padding dikurangi, diagram fleksibel */}
            <motion.div
                className="w-full max-w-[min(95vw,1600px)] h-[80vh] max-h-[calc(100vh-4rem)] overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[clamp(1rem,min(4vw,4vh),1.5rem)] shadow-2xl p-[clamp(0.75rem,min(3vw,3vh),1rem)] border border-white/30 dark:border-gray-800/50 flex flex-col gap-[clamp(0.5rem,min(2vw,2vh),1rem)] relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="text-center flex-shrink-0"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-[clamp(1.5rem,min(5vw,5vh),2.5rem)] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mb-[clamp(0.25rem,min(1vw,1vh),0.5rem)] tracking-tight">
                        Alur Proses Bisnis Uji Kompetensi Teknis - Kompleks
                    </h1>
                    <p className="text-[clamp(0.75rem,min(2vw,2vh),0.875rem)] text-gray-500 dark:text-gray-400 mt-[clamp(0.25rem,min(0.8vw,0.8vh),0.5rem)]">
                        Klik node untuk detail • Hover untuk melihat pelaksana
                    </p>
                </motion.div>

                {/* Diagram dengan tinggi fleksibel mengambil sisa ruang */}
                <div className="flex-1 min-h-0 w-full border border-gray-200 dark:border-gray-700 rounded-[clamp(0.5rem,min(2vw,2vh),0.75rem)] overflow-hidden">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Controls />
                        <Background
                            variant={BackgroundVariant.Dots}
                            gap={20}
                            size={1}
                        />
                        <MiniMap
                            nodeStrokeWidth={3}
                            pannable
                            zoomable
                            style={{ width: 150, height: 100 }}
                        />
                    </ReactFlow>
                </div>

                {/* Tombol aksi: PDF dan Lanjut ke Kuis */}
                <motion.div
                    className="flex flex-wrap justify-center gap-[clamp(0.5rem,min(1vw,1vh),1rem)] mt-[clamp(0.25rem,min(0.5vw,0.5vh),0.5rem)] mb-[clamp(0.5rem,min(1vw,1vh),1rem)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
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

            {modalInfo && (
                <DetailModal
                    isOpen={true}
                    onClose={closeModal}
                    info={modalInfo}
                    color={modalColor}
                />
            )}
        </div>
    )
}

export const searchText =
    'Alur Proses Bisnis Uji Kompetensi Teknis Kompleks Pusbin JFPM BPPK Perencanaan Pelaksanaan MONEV Diagram Flowchart Validasi Administrasi Sertifikat 2 tahun Pengulangan 3 bulan 6 bulan Unit Kerja UPK Calon JFKN Identifikasi Kalender Desain Alat Uji'

export default Slide2
