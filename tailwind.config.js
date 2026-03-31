/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#F0EDFE',
          100: '#DCD6FD',
          200: '#BCB0FB',
          300: '#9B8AF9',
          400: '#8577F0',
          500: '#7B68EE',
          600: '#6A57DD',
          700: '#5946CC',
          800: '#4A3AAD',
          900: '#3B2E8E',
        },
        loa: {
          bg: '#121214',
          surface: '#1C1C20',
          card: '#242429',
          border: '#2E2E34',
          hover: '#32323A',
          muted: '#A0A0A8',
        },
      },
    },
  },
  plugins: [],
};
