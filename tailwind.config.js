/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif']
      },
      colors: {
        insta: {
          primary: '#E1306C',
          purple: '#833AB4',
          orange: '#F77737',
          yellow: '#FCAF45',
          blue: '#405DE6'
        }
      },
      backgroundImage: {
        'insta-gradient': 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
        'soft-gradient': 'linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)'
      },
      animation: {
        blob: "blob 7s infinite",
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        }
      }
    },
  },
  plugins: [],
}