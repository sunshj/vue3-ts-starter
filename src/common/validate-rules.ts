export const validateName = (_rule: any, value: string, callback: Function) => {
  if (value.trim() === '') return callback(new Error('请输入用户名'))
  const regName = /^[\dA-Z_-\u4E00\u9FA5-]{3,10}$/
  if (regName.test(value)) {
    return callback()
  }
  callback(new Error('长度为3到10字，且不得包含特殊字符'))
}

export const validatePass = (_rule: any, value: string, callback: Function) => {
  if (value.trim() === '') return callback(new Error('请输入密码'))
  const regPass = /^[\dA-Za-z]{6,15}$/
  if (regPass.test(value)) {
    return callback()
  }
  callback(new Error('长度为6到15字，且不得包含特殊字符'))
}

export const validateEmail = (_rule: any, value: string, callback: Function) => {
  if (value.trim() === '') return callback(new Error('请输入邮箱'))
  const regEmail = /^[\dA-Za-z\u4E00-\u9FA5]+@[\w-]+(\.[\w-]+)+$/
  if (regEmail.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的邮箱地址'))
}
