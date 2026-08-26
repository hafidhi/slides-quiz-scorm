// src/utils/screenshotManager.ts

type ScreenshotEntry = {
    slideIndex: number
    dataUrl: string
}

const STORAGE_KEY = `screenshots_${window.location.pathname}`

let screenshots: ScreenshotEntry[] = []

function loadFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            screenshots = JSON.parse(saved)
            console.log(
                `[screenshotManager] loaded ${screenshots.length} entries`,
            )
        }
    } catch (err) {
        console.error('Gagal memuat screenshot dari localStorage:', err)
    }
}

function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(screenshots))
        console.log(`[screenshotManager] saved ${screenshots.length} entries`)
    } catch (err) {
        console.error('Gagal menyimpan screenshot ke localStorage:', err)
        // Jika kuota penuh, hapus 1 screenshot terlama sebagai fallback
        if (screenshots.length > 0) {
            screenshots.shift()
            saveToStorage()
        }
    }
}

loadFromStorage()

export function saveScreenshot(slideIndex: number, dataUrl: string) {
    const existingIndex = screenshots.findIndex(
        (s) => s.slideIndex === slideIndex,
    )
    if (existingIndex !== -1) {
        screenshots[existingIndex].dataUrl = dataUrl
    } else {
        screenshots.push({ slideIndex, dataUrl })
    }
    screenshots.sort((a, b) => a.slideIndex - b.slideIndex)
    saveToStorage()
}

export function getAllScreenshots(): ScreenshotEntry[] {
    return [...screenshots]
}

export function clearScreenshots() {
    screenshots = []
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch {}
}

// ========== BAGIAN MODAL ==========

const MODAL_STORAGE_KEY = `modal_screenshots_${window.location.pathname}`

let modalScreenshots: { [key: string]: string } = {}

function loadModalFromStorage() {
    try {
        const saved = localStorage.getItem(MODAL_STORAGE_KEY)
        if (saved) {
            modalScreenshots = JSON.parse(saved)
        }
    } catch (err) {
        console.error('Gagal memuat modal screenshots:', err)
    }
}

function saveModalToStorage() {
    try {
        localStorage.setItem(
            MODAL_STORAGE_KEY,
            JSON.stringify(modalScreenshots),
        )
    } catch (err) {
        console.error('Gagal menyimpan modal screenshots:', err)
        // Fallback: hapus 3 entri terlama jika kuota penuh, lalu coba lagi
        const keys = Object.keys(modalScreenshots)
        if (keys.length > 0) {
            const sortedKeys = keys.sort() // urutkan, hapus yang pertama
            const toDelete = sortedKeys.slice(0, 3)
            toDelete.forEach((key) => delete modalScreenshots[key])
            saveModalToStorage()
        } else {
            // Jika tidak ada yang bisa dihapus, kosongkan semua dan beri tahu
            modalScreenshots = {}
            alert('Penyimpanan penuh. Screenshot modal dihapus.')
        }
    }
}

loadModalFromStorage()

export function clearModalScreenshots(slideIndex: number, modalId: string) {
    const prefix = `Slide ${slideIndex} - Modal ${modalId} -`
    Object.keys(modalScreenshots).forEach((key) => {
        if (key.startsWith(prefix)) {
            delete modalScreenshots[key]
        }
    })
    saveModalToStorage()
}

export function saveModalScreenshot(
    slideIndex: number,
    modalId: string,
    dataUrl: string,
) {
    const prefix = `Slide ${slideIndex} - Modal ${modalId} -`
    const existingNumbers = Object.keys(modalScreenshots)
        .filter((key) => key.startsWith(prefix))
        .map((key) => {
            const suffix = key.slice(prefix.length)
            const num = parseInt(suffix, 10)
            return isNaN(num) ? 0 : num
        })

    const maxNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0
    const nextCounter = maxNum + 1
    const key = `${prefix}${nextCounter}`
    modalScreenshots[key] = dataUrl
    saveModalToStorage()
}

// Fungsi baru untuk mendapatkan semua screenshot modal (diurutkan)
export function getAllModalScreenshots(): { key: string; dataUrl: string }[] {
    const sortedKeys = Object.keys(modalScreenshots).sort()
    return sortedKeys.map((key) => ({
        key,
        dataUrl: modalScreenshots[key],
    }))
}
