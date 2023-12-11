import { sxzz } from '@sxzz/eslint-config'

export default sxzz({
  files: ['src/**/*.{js,ts,vue}'],
  rules: {
    'import/no-default-export': 'off',
    'unicorn/prefer-query-selector': 'off',
    'vue/block-order': 'off'
  }
})
