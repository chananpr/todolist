import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        brand: {
          blue: '#2563eb',
          navy: '#1e3a8a',
          sky: '#eff6ff',
          mist: '#f8fbff',
          ink: '#0f172a'
        }
      },
      boxShadow: {
        'soft': '0 12px 30px -18px rgba(37, 99, 235, 0.28), 0 8px 18px -16px rgba(148, 163, 184, 0.35)',
        'panel': '0 32px 80px -38px rgba(30, 64, 175, 0.28)',
        'hover': '0 26px 60px -26px rgba(37, 99, 235, 0.32)',
        'shell': '0 18px 50px -30px rgba(15, 23, 42, 0.22)'
      }
    }
  },
  plugins: []
} satisfies Config;
