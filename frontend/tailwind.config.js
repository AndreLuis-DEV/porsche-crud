// porsche-crud/frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'porsche': {
          DEFAULT: '#E2001A',
          '50': '#FFEBEE',
          '100': '#FFCDD2',
          '200': '#EF9A9A',
          '300': '#E57373',
          '400': '#EF5350',
          '500': '#E2001A',
          '600': '#E53935',
          '700': '#D32F2F',
          '800': '#C62828',
          '900': '#B71C1C',
          'gold': '#FFB800',
          'dark': '#B80015',
          'light': '#FFEAED',
        },
        'black': {
          DEFAULT: '#000000',
          '50': '#F2F2F2',
          '100': '#E6E6E6',
          '200': '#CCCCCC',
          '300': '#B3B3B3',
          '400': '#999999',
          '500': '#808080',
          '600': '#666666',
          '700': '#4D4D4D',
          '800': '#333333',
          '900': '#1A1A1A'
        }
      },
      fontFamily: {
        'porsche': ['"Porsche Next"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};