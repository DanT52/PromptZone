/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Helvetica', 'sans-serif'],
        inter: ['Verdana', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#9422ff',
      }
    },
  },
  plugins: [],
}