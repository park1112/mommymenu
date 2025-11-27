const designSystem = require('./src/lib/design-system')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Primary colors
        primary: {
          50: '#E8F2FF',
          100: '#D4E7FF',
          200: '#A8CDFF',
          300: '#7DB1FF',
          400: '#5195FF',
          500: '#3373BA',
          600: '#2A5F9E',
          700: '#214B82',
          800: '#193766',
          900: '#10234A',
        },
        // Neutral colors optimized for dark mode
        neutral: {
          0: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F5F7FA',
          200: '#E8ECF0',
          300: '#D1D8E0',
          400: '#A8B3C1',
          500: '#7F8FA4',
          600: '#5E6C84',
          700: '#3E4C63',
          800: '#2C3E50',
          900: '#1A2332',
          950: '#0F1419',
        },
        // Semantic colors
        success: {
          DEFAULT: '#10B981',
          dark: '#34D399',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#FCD34D',
        },
        error: {
          DEFAULT: '#EF4444',
          dark: '#F87171',
        },
        info: {
          DEFAULT: '#3B82F6',
          dark: '#60A5FA',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { 
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          from: { 
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}