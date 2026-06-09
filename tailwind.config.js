/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'palier-navy':  '#0D1B2A',
        'palier-cyan':  '#00D4FF',
        'palier-coral': '#FF6B6B',
        'palier-ivory': '#F5F0E8',
        'palier-muted': '#8A9BB0',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
