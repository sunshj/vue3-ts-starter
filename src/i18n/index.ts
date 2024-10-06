import { createI18n } from 'vue-i18n'
import enUS from './en-US.json'
import zhCN from './zh-CN.json'

export const languages = [
  {
    label: '简体中文',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
] as const

export type Locale = (typeof languages)[number]['value']

export type MessageSchema = typeof enUS

export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  globalInjection: true,

  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})
