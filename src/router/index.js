import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
const Index = () => import('../views/welcome/Index')
const Login = () => import('../views/welcome/Login')
const Register = () => import('../views/welcome/Register')
const Home = () => import('../views/home/Home')

const router = new VueRouter({
  routes:[
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home
    }
  ],
  mode: 'history'
})

export default router