import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '../utils/auth'
Vue.use(Vuex);

const state = {
  token: getToken(),
  name: 'who are you?',
  flag: ''
};

const store = new Vuex.Store({
  state,
  mutations: {
    setName(state, name){
      localStorage.setItem('name',name)
    },
    setFlag(state, flag){
      localStorage.setItem('flag',flag)
    }
  },
})

export default store;