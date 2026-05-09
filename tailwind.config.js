/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // C'est cette ligne qui dit à Tailwind de lire ton App.jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}