/*global module*/
/*global require*/

const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      blue: colors.sky,
      current: 'currentColor',
      gray: colors.blueGray,
      green: colors.green,
      red: colors.red,
      teal: colors.teal,
      transparent: 'transparent',
      yellow: colors.yellow,
      white: 'white',
    },
    fontFamily: {
      sans: 'Montserrat, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: colors.indigo[400],
              fontWeight: 'bold',
            },
            code: {
              color: colors.blueGray[700],
              fontWeight: 'normal',
              padding: '0.2em 0.4em',
              backgroundColor: colors.blueGray[100],
              borderRadius: '5px',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              color: colors.blueGray[700],
              backgroundColor: colors.blueGray[100],
            },
          },
        },
        blue: {
          css: {
            color: colors.sky[800],
            a: { color: colors.sky[800] },
            strong: { color: colors.sky[900] },
            b: { color: colors.sky[800] },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backdropDropShadow: ['hover', 'group-hover'],
      backgroundColor: ['active'],
      border: ['group-hover'],
      display: ['group-hover'],
      filter: ['group-hover', 'hover'],
      fontStyle: ['group-hover'],
      scale: ['group-hover'],
      space: ['group-hover', 'hover'], // Used for blowing up spacing on hover
      translate: ['group-hover'],
      width: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
