/**
 * BabyBilly 스타일 디자인 시스템 토큰
 * Clean, Modern, Minimalist Design
 */

export const colors = {
  // Primary - Soft Blue Palette
  primary: {
    50: '#EBF4FF',
    100: '#D6E9FF',
    200: '#AED3FF',
    300: '#7AB5FF',
    400: '#3D8FFF',
    500: '#3373BA', // Main brand color
    600: '#2A5F9E',
    700: '#204B7D',
    800: '#1A3D66',
    900: '#152F4F',
  },
  
  // Neutral - Clean Gray Scale
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
  
  // Accent Colors
  accent: {
    peach: '#F6D5C3',
    yellow: '#FFD93D',
    mint: '#6BCB77',
    lavender: '#B8B5FF',
    coral: '#FF6B6B',
  },
  
  // Semantic colors
  success: {
    light: '#D4EDDA',
    DEFAULT: '#28A745',
    dark: '#155724',
  },
  
  warning: {
    light: '#FFF3CD',
    DEFAULT: '#FFC107',
    dark: '#856404',
  },
  
  error: {
    light: '#F8D7DA',
    DEFAULT: '#DC3545',
    dark: '#721C24',
  },
  
  info: {
    light: '#D1ECF1',
    DEFAULT: '#17A2B8',
    dark: '#0C5460',
  },
}

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '2.5rem', // 40px
  '4xl': '3rem',   // 48px
  '5xl': '4rem',   // 64px
}

export const typography = {
  fontFamily: {
    sans: '"Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

export const borderRadius = {
  none: '0',
  sm: '0.375rem',    // 6px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.25rem',  // 20px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
}

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
  sm: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  md: '0 4px 8px 0 rgba(0, 0, 0, 0.06)',
  lg: '0 8px 16px 0 rgba(0, 0, 0, 0.08)',
  xl: '0 12px 24px 0 rgba(0, 0, 0, 0.10)',
  '2xl': '0 16px 32px 0 rgba(0, 0, 0, 0.12)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  soft: '0 2px 8px 0 rgba(51, 115, 186, 0.08)',
}

export const transitions = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
}

export const effects = {
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  darkGlassmorphism: {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
}