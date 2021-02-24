import VueRouter from 'vue-router';
import Vue from 'vue';

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
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/adminhome',
      name: 'adminhome',
      component: AdminHome,
      // meta: {
      //   requiresAuth: true
      // }
    },
  ],
  mode: 'history'
});

export default router;