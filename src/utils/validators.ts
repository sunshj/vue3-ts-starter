import { i18n } from '@/i18n'
import type { FormItemRule } from 'element-plus'

const { t } = i18n.global

export function createAsyncValidator(validator: FormItemRule['validator']) {
  return validator
}

export const isUserName = createAsyncValidator((_rule, value, callback) => {
  if (!value.trim()) return callback(new Error(t('validator.username_required')))
  const regName = /^[\w\u4E00-\u9FA5-]{2,10}$/
  if (regName.test(value)) {
    return callback()
  }
  callback(new Error(t('validator.username_regex')))
})

export const isPassword = createAsyncValidator((_rule, value, callback) => {
  if (value.trim() === '') return callback(new Error(t('validator.password_required')))
  const regPass = /^[\dA-Z]{6,15}$/i
  if (regPass.test(value)) {
    return callback()
  }
  callback(new Error(t('validator.password_regex')))
})

export const isEmail = createAsyncValidator((_rule, value, callback) => {
  if (value.trim() === '') return callback(new Error(t('validator.email_required')))
  const regEmail = /^[\dA-Z\u4E00-\u9FA5]+@[\w-]+(?:\.[\w-]+)+$/i
  if (regEmail.test(value)) {
    return callback()
  }
  callback(new Error(t('validator.email_regex')))
})
