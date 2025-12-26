/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-navy': '#0D2137',
        'deep-teal': '#1B4965',
        'ocean-blue': '#2D6A8A',
        'sky-teal': '#4A9EBF',
        'kuwait-gold': '#D4A853',
        'warm-sand': '#E8D5B5',
        'off-white': '#FAFAF8',
        'light-gray': '#E5E5E3',
        'medium-gray': '#6B7280',
        'charcoal': '#374151',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
