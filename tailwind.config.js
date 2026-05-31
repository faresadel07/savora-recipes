/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFFFF',
          100: '#F5F4F1',
          200: '#EAE7E0',
          300: '#D8D3C7',
        },
        ink: {
          50: '#F5F3F0',
          100: '#E8E4DD',
          200: '#D4CEC4',
          300: '#A09A93',
          400: '#86807A',
          500: '#56524D',
          600: '#3F3B36',
          700: '#28251F',
          800: '#1F1C18',
          900: '#13110F',
        },
        terracotta: {
          50: '#FBEFEC',
          100: '#F4D6CC',
          400: '#D87760',
          500: '#B83D2E',
          600: '#992B1F',
          700: '#7E2820',
        },
        sage: {
          50: '#F1F4EE',
          100: '#DCE5D3',
          400: '#9DB386',
          500: '#7A9362',
          600: '#5E7549',
        },
        gold: {
          400: '#E2BC85',
          500: '#C99860',
          600: '#A8763E',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          'system-ui',
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Inter"',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
        tight: '-0.022em',
        snug: '-0.014em',
        normal: '-0.005em',
        wide: '0.01em',
        wider: '0.05em',
        widest: '0.16em',
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7.5vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.045em', fontWeight: '600' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.08', letterSpacing: '-0.028em', fontWeight: '600' }],
        'display-sm': ['clamp(1.35rem, 2vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.022em', fontWeight: '600' }],
      },
      maxWidth: {
        'prose-wide': '72ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.55s ease-out',
        'slow-zoom': 'slowZoom 22s ease-in-out infinite alternate',
        'shimmer': 'shimmer 1.6s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.07)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-300% 0' },
          '100%': { backgroundPosition: '300% 0' },
        },
      },
    },
  },
  plugins: [],
};
