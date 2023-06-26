module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:import/recommended',
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-undef': 0,
    'vue/multi-word-component-names': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        variables: false
      }
    ]
  }
}
