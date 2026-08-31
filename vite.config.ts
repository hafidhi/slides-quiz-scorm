// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    define: {
        __BUILD_ID__: JSON.stringify(`build_${Date.now()}`),
    },
    base: '/slides-quiz-scorm/', // Menggunakan relative path
})
