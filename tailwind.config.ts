/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BFA14A', // doré
        dark: '#1A1A1A', // noir profond
        light: '#F7F2EB', // beige doux
        accent: '#3F3F3F', // gris foncé
      },
      fontFamily: {
        brand: ['var(--font-playfair)', 'serif'], // logo & titres
        base: ['var(--font-inter)', 'sans-serif'], // texte & boutons
      },
    },
  },
  plugins: [],
};
