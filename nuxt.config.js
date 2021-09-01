import colors from 'tailwindcss/colors';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nyt-movie-reviews',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
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
        }
      },
      plugins: [require('@tailwindcss/aspect-ratio')]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
