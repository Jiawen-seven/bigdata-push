import {request} from './request'

//注册
export function postRegisterData(registerForm){
  return request({
    url:'/registered',
    method: 'post',
    data: registerForm  //这里不要有花括号，不然会给registerForm再封一个对象
  })
}