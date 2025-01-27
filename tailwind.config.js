/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: {
      light: '#F3F4F6',
      dark: '#121212',
    },},
  },
  plugins: [require('tailwind-scrollbar')],}