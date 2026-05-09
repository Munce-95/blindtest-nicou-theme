import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // AJOUTE CETTE LIGNE : le nom de ton dépôt GitHub entre deux slashs
  base: '/blindtest-nicou-theme/', 
  plugins: [react()],
})
