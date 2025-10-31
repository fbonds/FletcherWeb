/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0f',
          darker: '#050508',
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          green: '#10b981',
          'neon-purple': '#a855f7',
          'neon-pink': '#f472b6',
          'neon-blue': '#60a5fa',
          'neon-cyan': '#22d3ee',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #8b5cf6, 0 0 10px #8b5cf6' },
          '100%': { boxShadow: '0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '0.95' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
