import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Primary: City Blue (Official City Palette)
        primary: {
          50: '#e6f9ff',
          100: '#ccf3ff',
          200: '#99e7ff',
          300: '#66daff',
          400: '#33ceff',
          500: '#00B6E3',  // Main primary - Official City Blue (PMS 306 U)
          600: '#0092b6',
          700: '#006d88',
          800: '#00495b',
          900: '#00242e',
          950: '#001217',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        // Secondary: City Green (Official City Palette)
        secondary: {
          50: '#f0fdf4',
          100: '#e1fbe8',
          200: '#c3f7d1',
          300: '#a5f3ba',
          400: '#93e8a4',
          500: '#81D07A',  // Main secondary - Official City Green (PMS 359 U)
          600: '#67a661',
          700: '#4d7d49',
          800: '#345331',
          900: '#1a2a18',
          950: '#0d150c',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        // Purple: City Purple (Official City Palette)
        purple: {
          50: '#faf5fa',
          100: '#f5ebf5',
          200: '#ead6ea',
          300: '#e0c2df',
          400: '#d5add4',
          500: '#B455B3',  // Official City Purple (PMS 253 U)
          600: '#90448f',
          700: '#6c336b',
          800: '#482248',
          900: '#241124',
          950: '#120912',
        },

        // Accent: City Yellow (Official City Palette)
        accent: {
          50: '#fffef5',
          100: '#fffceb',
          200: '#fff9d6',
          300: '#fff6c2',
          400: '#fff3ad',
          500: '#FFEA64',  // Main accent - Official City Yellow (PMS 107 U)
          600: '#f4d91a',
          700: '#ccb315',
          800: '#998610',
          900: '#665908',
          950: '#332d04',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        // Red Accent: City Red (Official City Palette)
        red: {
          50: '#fff5f7',
          100: '#ffebee',
          200: '#ffd6dd',
          300: '#ffc2cc',
          400: '#ffadbb',
          500: '#F35562',  // Official City Red (PMS RED 032 U)
          600: '#e5293a',
          700: '#b8202e',
          800: '#8a1822',
          900: '#5d1017',
          950: '#2f080b',
        },

        // Orange Accent: City Orange (Official City Palette)
        orange: {
          50: '#fff8f0',
          100: '#fff1e1',
          200: '#ffe3c3',
          300: '#ffd5a5',
          400: '#ffc788',
          500: '#F7B446',  // Official City Orange (PMS 129 U)
          600: '#e89615',
          700: '#b87511',
          800: '#88570d',
          900: '#5c3a08',
          950: '#2e1d04',
        },

        // Semantic Colors
        success: {
          DEFAULT: '#81D07A',  // City Green
          light: '#e1fbe8',
          dark: '#345331',
        },
        warning: {
          DEFAULT: '#FFEA64',  // City Yellow
          light: '#fffceb',
          dark: '#665908',
        },
        error: {
          DEFAULT: '#F35562',  // City Red
          light: '#ffebee',
          dark: '#8a1822',
        },
        info: {
          DEFAULT: '#00B6E3',  // City Blue
          light: '#ccf3ff',
          dark: '#00495b',
        },

        // Neutrals (Warm Grays - Stone)
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },

        // Interactive States
        interactive: {
          hover: '#0092b6',      // primary-600 (darker blue)
          active: '#006d88',     // primary-700 (even darker blue)
          disabled: '#d6d3d1',   // neutral-300
          focus: '#fff6c2',      // accent-300 (light yellow for focus rings)
        },

        // Shadcn UI compatibility
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      fontSize: {
        // Display Sizes (for large hero text)
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],

        // Heading Sizes (improved hierarchy with 1.5x+ scaling)
        'heading-xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '600' }],
        'heading-xs': ['1rem', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '600' }],

        // Body Sizes (16px minimum base size, improved line heights)
        'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],  // 16px base
        'body-sm': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],   // Changed from 0.875rem to meet 16px minimum
        'body-xs': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],   // Changed from 0.75rem to meet 16px minimum

        // Label Sizes (16px minimum)
        'label-lg': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],  // Changed from 0.875rem
        'label-md': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],  // Changed from 0.75rem
        'label-sm': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],  // Changed from 0.6875rem
      },

      boxShadow: {
        'card': '0 2px 8px rgb(0 0 0 / 0.08)',
        'card-hover': '0 8px 24px rgb(0 0 0 / 0.12)',
        'dropdown': '0 4px 16px rgb(0 0 0 / 0.12)',
        'modal': '0 20px 40px rgb(0 0 0 / 0.2)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      maxWidth: {
        'prose': '65ch',
        'content': '80ch',
        'container': '1280px',
      },

      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'notification': '1080',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
