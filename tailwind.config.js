/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: {
          DEFAULT: '#121217',
          hover: '#18181f',
          glass: 'rgba(255, 255, 255, 0.03)',
        },
        accent: {
          DEFAULT: '#38bdf8',
          hover: '#0ea5e9',
          glow: 'rgba(56, 189, 248, 0.15)',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'SF Pro Icons',
          'Inter',
          'Helvetica Neue',
          'sans-serif'
        ]
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: 0.4 },
          '100%': { opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
}
