/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'palier-navy':  '#0B1520',
        'palier-deep':  '#111D2C',
        'palier-card':  '#162233',
        'palier-abyss': '#04090F',
        'palier-cyan':  '#00C9B1',
        'palier-teal':  '#5FBFAE',
        'palier-coral': '#E8845A',
        'palier-ivory': '#F0EDE8',
        'palier-muted': '#6B7D8E',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        body:    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
