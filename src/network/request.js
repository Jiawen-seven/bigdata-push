import axios from 'axios'
import store from '../store'

//axios的拦截器的使用
export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://8.129.87.22:8080',
    timeout: 5000
  })
  //2.axios的请求拦截
  instance.interceptors.request.use(config => {
    if(store.state.token){
      config.headers['Authorization'] = store.state.token/*请求头*/
    }
    return config //拦截之后要记得返回
  },err => {
    return Promise.reject(err)
  })
  //3.axios的响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data  //返回有用信息data即可，其他可以不返回~
  },err => {
    return Promise.reject(err)
  })

  //4.发送真正的网络请求
  return instance(config) //instance本身返回值就是promise
}