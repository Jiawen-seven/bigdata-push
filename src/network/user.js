import {request} from './request'

//注册用户信息
export function getUserInfo(){
  return request({
    url: '/system/user/getAllRegisteredUser'
  })
}

//获取管理员/用户个人信息
export function getPersonInfo(){
  return request({
    url: 'system/user/getRegisteredUser/'+`${localStorage.getItem('name')}`
  })
}