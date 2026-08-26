// src/slides/groupConfig.ts

import type { ComponentType } from 'react'
// --- Group 1 Slides ---
import Slide1_G1, { searchText as st1_g1 } from './group-1/Slide1'
import Slide2_G1, { searchText as st2_g1 } from './group-1/Slide2'
// --- Group 2 Slides ---
import Slide1_G2, { searchText as st1_g2 } from './group-2/Slide1'
import Slide2_G2, { searchText as st2_g2 } from './group-2/Slide2'
// --- Quiz Components ---
import QuizScreenGroup1 from '../quiz/group-1/QuizScreen'
import QuizScreenGroup2 from '../quiz/group-2/QuizScreen'

export interface SlideConfigItem {
    component: ComponentType<any>
    groupIndex: number
    slideIndex: number
    searchText: string
    topicIndex: number // <-- untuk kompatibilitas dengan SlideItem
}

export interface GroupConfig {
    slides: SlideConfigItem[]
    quizComponent: ComponentType<any>
}

export const groups: GroupConfig[] = [
    {
        slides: [
            {
                component: Slide1_G1,
                groupIndex: 0,
                slideIndex: 0,
                searchText: st1_g1,
                topicIndex: 0,
            },
            {
                component: Slide2_G1,
                groupIndex: 0,
                slideIndex: 1,
                searchText: st2_g1,
                topicIndex: 0,
            },
        ],
        quizComponent: QuizScreenGroup1,
    },
    {
        slides: [
            {
                component: Slide1_G2,
                groupIndex: 1,
                slideIndex: 0,
                searchText: st1_g2,
                topicIndex: 1,
            },
            {
                component: Slide2_G2,
                groupIndex: 1,
                slideIndex: 1,
                searchText: st2_g2,
                topicIndex: 1,
            },
        ],
        quizComponent: QuizScreenGroup2,
    },
]
