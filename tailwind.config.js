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
        apple: {
          blue: '#0071E3',
          'blue-60': '#2997FF',
          'blue-70': '#0066CC',
          ink: '#1D1D1F',
          muted: '#6E6E73',
          gray: '#F5F5F7',
          border: '#E5E7EB',
          error: '#D92D20',
          'dark-bg': '#000000',
          'dark-surface': '#161617',
          'dark-muted': '#1D1D1F',
          'dark-border': '#2C2C2E',
          'dark-text': '#F5F5F7',
          'dark-subtext': '#86868B',
        },
        background: '#09090b',
        surface: {
          DEFAULT: '#121217',
          hover: '#18181f',
          glass: 'rgba(255, 255, 255, 0.03)',
        },
        accent: {
          DEFAULT: '#0071E3',
          hover: '#2997FF',
          glow: 'rgba(0, 113, 227, 0.15)',
        }
      },
      fontFamily: {
        display: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'sans-serif'
        ],
        sans: [
          'SF Pro Text',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Icons',
          'Helvetica Neue',
          'sans-serif'
        ],
        mono: [
          'SF Mono',
          'Menlo',
          'Monaco',
          'Courier New',
          'monospace'
        ]
      },
      spacing: {
        'apple-xs': '8px',
        'apple-sm': '16px',
        'apple-md': '24px',
        'apple-lg': '54px',
        'apple-xl': '70px',
      },
      borderRadius: {
        'apple-sm': '4px',
        'apple-md': '8px',
        'apple-lg': '16px',
        'apple-xl': '24px',
      },
      boxShadow: {
        'apple-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'apple-card': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'apple-dropdown': '0 12px 32px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
