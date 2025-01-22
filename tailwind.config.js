/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          400: '#3ECF8E',
          500: '#2EBD80',
          600: '#1EA672',
        },
        dark: {
          900: '#1C1C1C',
          800: '#2A2A2A',
          700: '#323232',
        },
      },
    },
  },
  plugins: [],
};