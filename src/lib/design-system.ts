/**
 * 중앙집중식 디자인 시스템
 * 모든 컴포넌트에서 사용할 수 있는 통합 디자인 토큰
 */

// 색상 시스템 - BabyBilly 스타일 with 다크모드 최적화
export const colors = {
  // 브랜드 색상
  primary: {
    50: '#E8F2FF',
    100: '#D4E7FF',
    200: '#A8CDFF',
    300: '#7DB1FF',
    400: '#5195FF',
    500: '#3373BA', // Main brand color
    600: '#2A5F9E',
    700: '#214B82',
    800: '#193766',
    900: '#10234A',
  },
  
  // 중립 색상 - 다크모드에 최적화
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
  
  // 다크모드 전용 색상
  dark: {
    bg: {
      primary: '#0F1419',     // 메인 배경
      secondary: '#1A2332',   // 카드 배경
      tertiary: '#2C3E50',    // 호버 배경
      elevated: '#3E4C63',    // 팝업, 드롭다운
    },
    text: {
      primary: '#F5F7FA',     // 메인 텍스트
      secondary: '#D1D8E0',   // 보조 텍스트
      tertiary: '#A8B3C1',    // 비활성 텍스트
      muted: '#7F8FA4',       // 매우 연한 텍스트
    },
    border: {
      primary: '#3E4C63',     // 메인 보더
      secondary: '#2C3E50',   // 보조 보더
      tertiary: '#1A2332',    // 연한 보더
    }
  },
  
  // 라이트모드 전용 색상
  light: {
    bg: {
      primary: '#FFFFFF',     // 메인 배경
      secondary: '#FAFBFC',   // 카드 배경
      tertiary: '#F5F7FA',    // 호버 배경
      elevated: '#FFFFFF',    // 팝업, 드롭다운
    },
    text: {
      primary: '#1A2332',     // 메인 텍스트
      secondary: '#3E4C63',   // 보조 텍스트
      tertiary: '#5E6C84',    // 비활성 텍스트
      muted: '#7F8FA4',       // 매우 연한 텍스트
    },
    border: {
      primary: '#E8ECF0',     // 메인 보더
      secondary: '#D1D8E0',   // 보조 보더
      tertiary: '#F5F7FA',    // 연한 보더
    }
  },
  
  // 시맨틱 색상
  semantic: {
    success: {
      light: '#10B981',
      dark: '#34D399',
      bg: {
        light: '#D1FAE5',
        dark: '#064E3B',
      }
    },
    warning: {
      light: '#F59E0B',
      dark: '#FCD34D',
      bg: {
        light: '#FEF3C7',
        dark: '#78350F',
      }
    },
    error: {
      light: '#EF4444',
      dark: '#F87171',
      bg: {
        light: '#FEE2E2',
        dark: '#7F1D1D',
      }
    },
    info: {
      light: '#3B82F6',
      dark: '#60A5FA',
      bg: {
        light: '#DBEAFE',
        dark: '#1E3A8A',
      }
    },
  }
}

// 타이포그래피 시스템
export const typography = {
  fontFamily: {
    sans: '"Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
    '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
  },
  
  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  }
}

// 간격 시스템
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
}

// 반경 시스템
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}

// 그림자 시스템
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // 다크모드 그림자
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  }
}

// 애니메이션 시스템
export const animations = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
}

// 브레이크포인트 시스템
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// z-index 시스템
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}

// 컴포넌트별 스타일 프리셋
export const componentPresets = {
  button: {
    sizes: {
      xs: {
        height: '28px',
        padding: '0 10px',
        fontSize: typography.fontSize.xs[0],
        gap: spacing[1.5],
      },
      sm: {
        height: '36px',
        padding: '0 16px',
        fontSize: typography.fontSize.sm[0],
        gap: spacing[2],
      },
      md: {
        height: '40px',
        padding: '0 20px',
        fontSize: typography.fontSize.sm[0],
        gap: spacing[2],
      },
      lg: {
        height: '44px',
        padding: '0 24px',
        fontSize: typography.fontSize.base[0],
        gap: spacing[2.5],
      },
      xl: {
        height: '48px',
        padding: '0 32px',
        fontSize: typography.fontSize.lg[0],
        gap: spacing[3],
      },
    },
    
    variants: {
      primary: {
        light: {
          bg: colors.primary[500],
          text: '#FFFFFF',
          hover: colors.primary[600],
          border: 'transparent',
        },
        dark: {
          bg: colors.primary[500],
          text: '#FFFFFF',
          hover: colors.primary[400],
          border: 'transparent',
        }
      },
      secondary: {
        light: {
          bg: colors.light.bg.secondary,
          text: colors.light.text.primary,
          hover: colors.light.bg.tertiary,
          border: colors.light.border.primary,
        },
        dark: {
          bg: colors.dark.bg.secondary,
          text: colors.dark.text.primary,
          hover: colors.dark.bg.tertiary,
          border: colors.dark.border.primary,
        }
      },
      outline: {
        light: {
          bg: 'transparent',
          text: colors.light.text.secondary,
          hover: colors.light.bg.tertiary,
          border: colors.light.border.primary,
        },
        dark: {
          bg: 'transparent',
          text: colors.dark.text.secondary,
          hover: colors.dark.bg.tertiary,
          border: colors.dark.border.primary,
        }
      },
      ghost: {
        light: {
          bg: 'transparent',
          text: colors.light.text.secondary,
          hover: colors.light.bg.tertiary,
          border: 'transparent',
        },
        dark: {
          bg: 'transparent',
          text: colors.dark.text.secondary,
          hover: colors.dark.bg.tertiary,
          border: 'transparent',
        }
      },
    }
  },
  
  input: {
    sizes: {
      sm: {
        height: '36px',
        padding: '0 12px',
        fontSize: typography.fontSize.sm[0],
      },
      md: {
        height: '40px',
        padding: '0 16px',
        fontSize: typography.fontSize.sm[0],
      },
      lg: {
        height: '44px',
        padding: '0 16px',
        fontSize: typography.fontSize.base[0],
      },
    },
    
    variants: {
      default: {
        light: {
          bg: colors.light.bg.primary,
          text: colors.light.text.primary,
          border: colors.light.border.primary,
          placeholder: colors.light.text.muted,
        },
        dark: {
          bg: colors.dark.bg.secondary,
          text: colors.dark.text.primary,
          border: colors.dark.border.primary,
          placeholder: colors.dark.text.muted,
        }
      },
      filled: {
        light: {
          bg: colors.light.bg.tertiary,
          text: colors.light.text.primary,
          border: 'transparent',
          placeholder: colors.light.text.muted,
        },
        dark: {
          bg: colors.dark.bg.tertiary,
          text: colors.dark.text.primary,
          border: 'transparent',
          placeholder: colors.dark.text.muted,
        }
      },
    }
  },
  
  card: {
    variants: {
      default: {
        light: {
          bg: colors.light.bg.primary,
          border: colors.light.border.primary,
          text: colors.light.text.primary,
        },
        dark: {
          bg: colors.dark.bg.secondary,
          border: colors.dark.border.primary,
          text: colors.dark.text.primary,
        }
      },
      elevated: {
        light: {
          bg: colors.light.bg.primary,
          border: 'transparent',
          text: colors.light.text.primary,
          shadow: shadows.md,
        },
        dark: {
          bg: colors.dark.bg.secondary,
          border: 'transparent',
          text: colors.dark.text.primary,
          shadow: shadows.dark.md,
        }
      },
    }
  }
}

// 유틸리티 함수
export const utils = {
  // 다크모드 색상 선택
  getColor: (lightColor: string, darkColor: string, isDark: boolean) => {
    return isDark ? darkColor : lightColor
  },
  
  // 반응형 값 생성
  responsive: (values: { xs?: any, sm?: any, md?: any, lg?: any, xl?: any }) => {
    return values
  },
  
  // 클래스 조합
  cn: (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ')
  }
}

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  breakpoints,
  zIndex,
  componentPresets,
  utils,
}