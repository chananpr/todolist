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
        night: '#07111f',
        storm: '#12233b',
        ember: '#ff8153',
        mint: '#63f2d5',
        sand: '#f6efe5'
      },
      boxShadow: {
        panel: '0 30px 80px rgba(2, 12, 27, 0.35)'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' }
        },
        pulseGrid: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.55' }
        }
      },
      animation: {
        drift: 'drift 9s ease-in-out infinite',
        pulseGrid: 'pulseGrid 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config;
