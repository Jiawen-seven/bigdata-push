import VueRouter from 'vue-router';
import Vue from 'vue';
import { getToken } from 'utils/auth';

Vue.use(VueRouter)
const Index = () => import('../views/welcome/Index')
const Login = () => import('../views/welcome/Login')
const Register = () => import('../views/welcome/Register')
const UserHome = () => import('../views/userhome/UserHome')
const AdminHome = () => import('../views/adminhome/AdminHome')
const AdminCenter = () => import('../views/adminhome/AdminCenter')
// const AdminIndex = () => import('../views/adminhome/AdminIndex.vue')
const UserManage = () => import('../views/adminhome/UserManage.vue')
// const AdminManage = () => import('../views/adminhome/AdminManage.vue')
const AdminData = () => import('../views/adminhome/AdminData.vue')

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
      children: [
        { 
          path: 'center',
          component: AdminCenter
        },
        // { 
        //   path: 'index',
        //   component: AdminIndex
        // },
        { 
          path: 'user',
          component: UserManage
        },
        // { 
        //   path: 'admin',
        //   component: AdminManage
        // },
        { 
          path: 'data',
          component: AdminData
        }
      ],
      meta: {
        requireAuth: true
      }
    }
  ],
  mode: 'history'
});

/* 路由拦截器 路由跳转前的操作 */
router.beforeEach((to, from, next) => {
  let flag = localStorage.getItem('flag')
  if(to.meta.requireAuth){ //判断该路由是否需要登录权限
    if(getToken()){ //判断当前token是否存在
      if(to.path == '/adminhome' && flag == 'user'){
        alert('抱歉，您没有管理权限！')
        next({ path: '/userhome' })
      }
      else if(to.path == '/userhome' && flag == 'system'){
        alert('抱歉，您不是用户！')
        next({ path: '/adminhome' })
      }
      else {
        next()
      }
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
    if(getToken() && to.path == '/login'){ //如果携带token，还想去登录页面是不行的，这里直接跳到主页面，用户/管理员可从主页面进回到对应的首页，这样就不用去判断到底要跳转到用户/管理员的首页。
      next({ path:'/index' })
    }
    else{
      next();
    }
  }
})

export default router;