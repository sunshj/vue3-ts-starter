export const validateName = (_rule: any, value: string, callback: Function) => {
  if (value === '') return callback(new Error('请输入用户名'))
  const regName = /^[A-Za-z0-9_-\u4e00-\u9fa5]{3,10}$/
  if (regName.test(value)) {
    return callback()
  }
  callback(new Error('长度为3到10字，且不得包含特殊字符'))
}

export const validatePass = (_rule: any, value: string, callback: Function) => {
  if (value === '') return callback(new Error('请输入密码'))
  const regPass = /^[a-zA-Z0-9]{6,15}$/
  if (regPass.test(value)) {
    return callback()
  }
  callback(new Error('长度为6到15字，且不得包含特殊字符'))
}

export const validateEmail = (_rule: any, value: string, callback: Function) => {
  if (value === '') return callback(new Error('请输入邮箱'))
  const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (regEmail.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的邮箱地址'))
}
