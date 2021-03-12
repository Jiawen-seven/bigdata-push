import {request} from './request'

//注册用户信息
export function getUserInfo(){
  return request({
    url: '/system/user/getAllRegisteredUser'
  })
}