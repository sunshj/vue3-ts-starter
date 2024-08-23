export const isUserName = (_rule: any, value: string, callback: Function) => {
  if (value.trim() === '') return callback(new Error('请输入用户名'))
  const regName = /^[·\u4E00-\u9FA5]{2,16}$/
  if (regName.test(value)) {
    return callback()
  }
  callback(new Error('长度为2到10字，且不得包含特殊字符'))
}

export const isPassword = (_rule: any, value: string, callback: Function) => {
  if (value.trim() === '') return callback(new Error('请输入密码'))
  const regPass = /^[\dA-Z]{6,15}$/i
  if (regPass.test(value)) {
    return callback()
  }
  callback(new Error('长度为6到15字，且不得包含特殊字符'))
}

export const isEmail = (_rule: any, value: string, callback: Function) => {
  if (value.trim() === '') return callback(new Error('请输入邮箱'))
  const regEmail = /^[\dA-Z\u4E00-\u9FA5]+@[\w-]+(?:\.[\w-]+)+$/i
  if (regEmail.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的邮箱地址'))
}
