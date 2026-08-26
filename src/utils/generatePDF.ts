// src/utils/generatePDF.ts
import jsPDF from 'jspdf'
import { getAllScreenshots, getAllModalScreenshots } from './screenshotManager'

interface SlideEntry {
    type: 'slide'
    slideIndex: number
    dataUrl: string
}

interface ModalEntry {
    type: 'modal'
    slideIndex: number
    modalId: string
    counter: number
    dataUrl: string
}

type CombinedEntry = SlideEntry | ModalEntry

export async function generatePDF() {
    const slideScreenshots = getAllScreenshots()
    let modalScreenshots = getAllModalScreenshots()

    console.log('=== DEBUG generatePDF ===')
    console.log('Slide screenshots:', slideScreenshots)
    console.log('Modal screenshots from manager:', modalScreenshots)

    // FALLBACK: Jika array kosong, coba baca langsung dari localStorage
    if (modalScreenshots.length === 0) {
        const raw = localStorage.getItem(
            `modal_screenshots_${window.location.pathname}`,
        )
        if (raw) {
            try {
                const parsed = JSON.parse(raw)
                // Ubah objek ke array {key, dataUrl}
                modalScreenshots = Object.keys(parsed).map((key) => ({
                    key,
                    dataUrl: parsed[key],
                }))
                console.log(
                    'Fallback: modal screenshots dari localStorage langsung:',
                    modalScreenshots,
                )
            } catch (e) {
                console.error('Gagal parse modal screenshots localStorage:', e)
            }
        }
    }

    // Bangun Map untuk slide
    const slideMap = new Map<number, string>()
    for (const s of slideScreenshots) {
        slideMap.set(s.slideIndex, s.dataUrl)
        console.log(`Slide map set: ${s.slideIndex}`)
    }

    // Bangun Map untuk modal
    const modalMap = new Map<
        number,
        { modalId: string; counter: number; dataUrl: string }[]
    >()
    for (const m of modalScreenshots) {
        console.log(`Parsing modal key: "${m.key}"`)
        const match = m.key.match(/^Slide (-?\d+) - Modal (.+?) - (\d+)$/)
        if (match) {
            const slideIdx = parseInt(match[1], 10)
            const modalId = match[2]
            const counter = parseInt(match[3], 10)
            const arr = modalMap.get(slideIdx) || []
            arr.push({ modalId, counter, dataUrl: m.dataUrl })
            modalMap.set(slideIdx, arr)
            console.log(
                `  -> slideIdx=${slideIdx}, modalId=${modalId}, counter=${counter}`,
            )
        } else {
            console.warn(`  -> Format tidak cocok, dilewatkan`)
        }
    }

    // Indeks unik
    const allIndices = new Set<number>()
    for (const idx of slideMap.keys()) allIndices.add(idx)
    for (const idx of modalMap.keys()) allIndices.add(idx)
    const sortedIndices = Array.from(allIndices).sort((a, b) => a - b)
    console.log('Sorted indices:', sortedIndices)

    // Susun halaman
    const pages: CombinedEntry[] = []
    for (const idx of sortedIndices) {
        console.log(`-- Proses slideIndex: ${idx} --`)
        const slideData = slideMap.get(idx)
        if (slideData) {
            pages.push({ type: 'slide', slideIndex: idx, dataUrl: slideData })
            console.log(`  Tambah slide (idx=${idx})`)
        }
        const modals = modalMap.get(idx)
        if (modals && modals.length > 0) {
            modals.sort((a, b) => {
                if (a.modalId !== b.modalId)
                    return a.modalId.localeCompare(b.modalId)
                return a.counter - b.counter
            })
            console.log(
                `  Modal diurutkan:`,
                modals.map((m) => `${m.modalId}-${m.counter}`),
            )
            for (const m of modals) {
                pages.push({
                    type: 'modal',
                    slideIndex: idx,
                    modalId: m.modalId,
                    counter: m.counter,
                    dataUrl: m.dataUrl,
                })
            }
        }
    }

    console.log('Urutan halaman final:')
    pages.forEach((p, i) => {
        if (p.type === 'slide') console.log(`  ${i + 1}. Slide ${p.slideIndex}`)
        else
            console.log(
                `  ${i + 1}. Slide ${p.slideIndex} - Modal ${p.modalId} - ${p.counter}`,
            )
    })

    if (pages.length === 0) {
        alert('Belum ada tangkapan layar untuk dimasukkan ke PDF.')
        return
    }

    const pxToMm = (px: number) => (px * 25.4) / 96
    const firstImg = await loadImage(pages[0].dataUrl)
    const firstW = pxToMm(firstImg.naturalWidth)
    const firstH = pxToMm(firstImg.naturalHeight)
    const orientation = firstW > firstH ? 'l' : 'p'
    const pdf = new jsPDF({ unit: 'mm', format: [firstW, firstH], orientation })
    pdf.addImage(pages[0].dataUrl, 'JPEG', 0, 0, firstW, firstH)

    for (let i = 1; i < pages.length; i++) {
        const img = await loadImage(pages[i].dataUrl)
        const w = pxToMm(img.naturalWidth)
        const h = pxToMm(img.naturalHeight)
        const orient = w > h ? 'l' : 'p'
        pdf.addPage([w, h], orient)
        pdf.addImage(pages[i].dataUrl, 'JPEG', 0, 0, w, h)
    }

    pdf.save('materi-penegakan-disiplin.pdf')
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = dataUrl
    })
}
