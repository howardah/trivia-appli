module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    curly: ['error', 'multi-line'],
    'vue/script-setup-uses-vars': 'error'
  }
};
