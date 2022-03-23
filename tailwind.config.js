const colors = require('tailwindcss/colors');

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#F2F0EE',
          100: '#EDDFCE',
          200: '#E1C39A',
          300: '#D6AB74',
          400: '#BF9469',
          500: '#AF8358',
          600: '#936642',
          700: '#6D4B24',
          800: '#634219',
          900: '#473516'
        },
        lightGray: {
          50: colors.white[100],
          100: colors.white[100],
          200: colors.white[100],
          300: colors.white[100],
          400: colors.slate[100],
          500: colors.slate[200],
          600: colors.slate[200],
          700: colors.slate[300],
          800: colors.slate[400],
          900: colors.slate[500]
        }
      },
      fontFamily: {
        'press-start': [
          '"Press Start 2P"',
          'Source Sans Pro',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        sans: [
          'Source Sans 3',
          'Source Sans Pro',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ]
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
};
