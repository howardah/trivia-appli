const { arrowParens } = require('./.prettierrc');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    semi: ['error', 'never'],
    curly: ['error', 'multi-line'],
    'arrow-parens': ['error', 'avoid'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/script-setup-uses-vars': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['default']
      }
    ]
  }
}
