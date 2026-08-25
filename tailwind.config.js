/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0b',
          900: '#0d0d0f',
          850: '#111114',
          800: '#16161a',
          700: '#1d1d22',
          600: '#27272e',
          500: '#3a3a44',
        },
        bone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#cfcfcd',
          400: '#a8a8a6',
          500: '#8a8a88',
          600: '#6b6b69',
        },
        accent: {
          DEFAULT: '#d4b483',
          soft: '#c9a76a',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.35em',
        wider2: '0.18em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.12) translate3d(-1.5%, -2%, 0)' },
        },
        scrollhint: {
          '0%,100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      animation: {
        kenburns: 'kenburns 18s ease-out forwards',
        scrollhint: 'scrollhint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
