/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        300: ['Inter_300Light'],
        400: ['Inter_400Regular'],
        500: ['Inter_500Medium'],
        600: ['Inter_600SemiBold'],
        700: ['Inter_700Bold'],
      },
      backgroundColor: {
        red: {
          550: '#c32c28',
        },
        main: '#305A96',
      },
    },
  },
  plugins: [],
}
