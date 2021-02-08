import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  //初始化用window.sessionStorage.getItem('token')，刷新页面的时候无需重新登录
  token: window.sessionStorage.getItem('token'),
  username: ''
};

const mutations = {
  LOGIN: (state, data) => {
    //更改token的值
    state.token = data;
    window.sessionStorage.setItem('token', data);
  },
  LOGOUT: (state) => {
    //登出的时候要清楚token
    state.token = null;
    window.sessionStorage.removeItem('token');
  },
  USERNAME: (state, data) => {
    //保存用户名
    state.username = data;
    window.sessionStorage.setItem('username');
  }
};

const actions = {
  UserLogin({commit}, data){
    commit('LOGIN', data);
  },
  UserLogout({commit}){
    commit('LOGOUT');
  },
  UserName({commit}, data){
    commit('USERNAME', data);
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;