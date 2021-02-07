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
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: 'history'
});

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
    if(token){
      next();
    } else{
      next({
        path: '/login',
        query: { redirect: to.fullPath } //将刚刚要去的path作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;