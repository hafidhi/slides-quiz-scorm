// src/utils/screenshotCapture.ts
import { captureScreen } from './captureScreen'
import { saveScreenshot } from './screenshotManager'

async function compressImage(dataUrl: string, quality = 0.9): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            // Gunakan ukuran natural, jangan diperkecil lagi agar tetap tajam
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            const ctx = canvas.getContext('2d')
            if (!ctx) return reject(new Error('Canvas context unavailable'))
            ctx.drawImage(img, 0, 0)
            const compressed = canvas.toDataURL('image/jpeg', quality)
            resolve(compressed)
        }
        img.onerror = reject
        img.src = dataUrl
    })
}

export async function captureAndSave(slideIndex: number) {
    console.log(`[captureAndSave] dipanggil untuk slideIndex=${slideIndex}`)
    try {
        const rawDataUrl = await captureScreen()
        console.log(
            `[captureAndSave] capture berhasil, ukuran mentah=${rawDataUrl.length}`,
        )
        const compressed = await compressImage(rawDataUrl, 0.9)
        console.log(
            `[captureAndSave] setelah kompresi JPEG 90%, ukuran=${compressed.length}`,
        )
        saveScreenshot(slideIndex, compressed)
    } catch (err) {
        console.error('Gagal capture/simpan screenshot:', err)
    }
}
