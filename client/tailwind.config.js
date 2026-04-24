/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        unt: {
          green: '#00853E',
          lime: '#BBF056',
          dark: '#006B32',
        },
        surface: {
          DEFAULT: '#FAFAFA',
          card: '#FFFFFF',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'sans': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
