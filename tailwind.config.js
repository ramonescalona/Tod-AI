/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#085041',
        'primary-light': '#0a6b55',
        accent: '#5DCAA5',
        'status-green': '#1D9E75',
        'status-amber': '#BA7517',
        'status-coral': '#D85A30',
        'over-budget': '#A32D2D',
      },
    },
  },
  plugins: [],
}
