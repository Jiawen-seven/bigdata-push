import VueRouter from 'vue-router';
import Vue from 'vue';

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
      // meta: {
      //   requiresAuth: true
      // }
    }
  ],
  mode: 'history'
});

export default router;