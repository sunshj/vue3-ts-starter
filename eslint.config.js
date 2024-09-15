import { defineConfig } from '@sunshj/eslint-config'

export default defineConfig([
  {
    rules: {
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false }
      ]
    }
  },
  {
    files: ['**/i18n/**/*.json'],
    rules: {
      'unicorn/filename-case': 'off'
    }
  },
  {
    ignores: ['types/**/*.d.ts']
  }
])
