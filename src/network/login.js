import {request} from './request'

//获取登录验证码
export function getLoginCore(){
  return request({
    url: '/captchaImage'
  })
}
//登录
export function postLoginData(username,password,code,uuid){
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}
//退出
export function getLoginOut(){
  return request({
    url:'/logout'
  })
}

//忘记密码/修改密码
export function getPassword(phonenumber,password){
  return request({
    url: '/system/user/forgetPwd',
    method: 'post',
    data: {
      phonenumber,
      password
    }
  })
}