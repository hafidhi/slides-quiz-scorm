// src/utils/captureScreen.ts
import { toPng } from 'html-to-image'

export async function captureScreen(): Promise<string> {
    const element = document.body

    // Cari semua elemen dengan class backdrop-blur-lg
    const blurredElements = document.querySelectorAll('.backdrop-blur-lg')

    // Hapus class sementara dari DOM asli
    blurredElements.forEach((el) => el.classList.remove('backdrop-blur-lg'))

    try {
        const dataUrl = await toPng(element, {
            cacheBust: true,
            pixelRatio: 1,
        })
        return dataUrl
    } finally {
        // Kembalikan class backdrop-blur-lg seperti semula
        blurredElements.forEach((el) => el.classList.add('backdrop-blur-lg'))
    }
}
