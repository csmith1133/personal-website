/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Ethereal Ivory palette
        ivory: {
          50: '#F4F4EE',    // Lighter than base
          100: '#EEEEE8',
          200: '#E8E8E2',
          300: '#E4E4DE',   // Base ethereal ivory
          400: '#DEDDD7',
          500: '#D8D7D1',
          600: '#D2D1CB',
          700: '#CCCBC5',
          800: '#C6C5BF',
          900: '#C0BFB9',
        },
        // Sophisticated Sage palette  
        sage: {
          50: '#D4D5CA',
          100: '#CECFBC',
          200: '#C8C9C0',
          300: '#C4C5BA',   // Base sophisticated sage
          400: '#BDBEB3',
          500: '#B6B7AC',
          600: '#AFB0A5',
          700: '#A8A99E',
          800: '#A1A297',
          900: '#9A9B90',
        },
        // Timeless Noir palette
        noir: {
          50: '#F0F0F0',
          100: '#E0E0E0',
          200: '#C0C0C0',
          300: '#A0A0A0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#303030',
          800: '#262626',
          900: '#1B1B1B',   // Base timeless noir
        },
        // Muted Moss palette (for accents)
        moss: {
          50: '#F0F1EC',
          100: '#E5E7DC',
          200: '#D0D3C2',
          300: '#BABFA8',
          400: '#A5AB8E',
          500: '#909774',
          600: '#7B835A',
          700: '#6B7350',
          800: '#595F39',   // Base muted moss
          900: '#474B2E',
        },
        success: {
          50: '#F0FDF4',
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'serif': ['Playfair Display', 'serif'],
        'display': ['Playfair Display', 'serif'],
        'script': ['Dancing Script', 'cursive'],
        'brush': ['Caveat', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
