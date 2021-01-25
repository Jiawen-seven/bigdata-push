import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
const Home = () => import('../view/home/Home')

const router = new VueRouter({
  routes:[
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    }
  ],
  mode: 'history'
})

export default router