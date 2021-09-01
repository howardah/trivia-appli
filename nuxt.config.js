import colors from 'tailwindcss/colors';

export default {
  head: {
    title: 'Trivia! Trivia!',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  modules: ['@nuxtjs/axios'],
  axios: {},

  tailwindcss: {
    config: {
      theme: {
        colors: {
          white: colors.white,
          rose: colors.rose,
          fuchsia: colors.fuchsia,
          indigo: colors.indigo,
          purple: colors.purple,
          lime: colors.lime,
          emerald: colors.emerald,
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
          red: colors.red,
          teal: colors.teal,
          amber: colors.amber,
          orange: colors.orange,
          gray: colors.blueGray
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
            'Source Sans Pro',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif'
          ]
        }
      },
      plugins: [require('@tailwindcss/aspect-ratio')]
    }
  },

  googleFonts: {
    families: {
      'Source+Sans+Pro': [300, 400, 600, 700],
      'Press+Start+2P': true
    }
  },
  build: {}
};
