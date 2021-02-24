import VueRouter from 'vue-router';
import Vue from 'vue';
import store from '../store';
import { getToken } from '../utils/auth'


Vue.use(VueRouter)
const Index = () => import('../views/welcome/Index')
const Login = () => import('../views/welcome/Login')
const Register = () => import('../views/welcome/Register')
const UserHome = () => import('../views/userhome/UserHome')
const AdminHome = () => import('../views/adminhome/AdminHome')

const router = new VueRouter({
  routes:[
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userhome',
      name: 'userhome',
      component: UserHome,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/adminhome',
      name: 'adminhome',
      component: AdminHome,
      meta: {
        requireAuth: true
      }
    }
  ],
  mode: 'history'
});

/* 路由拦截器 路由跳转前的操作 */
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){ //判断该路由是否需要登录权限
    if(getToken()){ //判断当前token是否存在
      next()
    }
    else{ //不存在token，要重新验证
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  else{
    next();
  }
})

export default router;