import {request} from './request'

export function getLoginCore(){
  return request({
    url: '/captchaImage'
  })
}

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
export function getLoginOut(){
  return request({
    url:'/logout'
  })
}