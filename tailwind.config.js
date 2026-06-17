/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0C0C0C',
        primary: '#B600A8',
        secondary: '#7621B0',
        textMain: '#D7E2EA',
        textMuted: '#646973'
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}