import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '../utils/auth'
Vue.use(Vuex);

const state = {
  token: getToken()
};

const store = new Vuex.Store({
  state,
})

export default store;