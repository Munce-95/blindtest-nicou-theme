import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/blindtest-nicou-theme/', // <-- Très important : slash au début ET à la fin
  plugins: [react()],
})