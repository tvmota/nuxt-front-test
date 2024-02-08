module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
  plugins: [],
};
