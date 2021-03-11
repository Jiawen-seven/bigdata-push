import {request} from './request'

export function getUserInfo(){
  return request({
    url: '/system/user/getAllRegisteredUser'
  })
}