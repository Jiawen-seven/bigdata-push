const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    if (!/^1[23456789]\d{9}$/.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }
}
const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else {
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  }
}
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const validatePasswordAgain = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== this.loginForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

export {
  validateName,
  validatePhone,
  validateEmail,
  validatePassword,
  validatePasswordAgain
}
