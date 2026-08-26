// src/components/SlideContainerModalSearch.tsx
import { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useInteraction } from '../hooks/useInteraction'

export interface SlideItem {
    component: React.ComponentType<any>
    topicIndex: number
    slideIndex: number
    searchText: string
}

interface SlideContainerModalSearchProps {
    isOpen: boolean
    onClose: () => void
    filteredSlides: SlideItem[]
    onNavigate: (slide: SlideItem) => void
}

const SlideContainerModalSearch: React.FC<SlideContainerModalSearchProps> = ({
    isOpen,
    onClose,
    filteredSlides,
    onNavigate,
}) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const { handleClick } = useInteraction()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className="relative bg-gray-900 dark:bg-gray-100 rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClick(onClose)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 dark:bg-gray-200/80 dark:hover:bg-gray-300 transition cursor-pointer"
                    aria-label="Tutup"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 custom-scrollbar">
                    {filteredSlides.length > 0 ? (
                        filteredSlides.map((slide) => (
                            <div
                                key={`${slide.topicIndex}-${slide.slideIndex}`}
                                onClick={handleClick(() => onNavigate(slide))}
                                className="group cursor-pointer h-[30vh] rounded-lg overflow-hidden border border-gray-700 dark:border-gray-300 bg-gray-800 dark:bg-gray-200 hover:border-blue-400 transition-all shadow-lg hover:shadow-xl relative"
                            >
                                <div className="w-full h-full overflow-hidden">
                                    <div
                                        className="pointer-events-none select-none"
                                        style={{
                                            width: '335%',
                                            height: '335%',
                                            transform: 'scale(0.3)',
                                            transformOrigin: '0 0',
                                        }}
                                    >
                                        <slide.component />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    Slide {slide.slideIndex + 1}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            Tidak ada slide yang cocok.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SlideContainerModalSearch
