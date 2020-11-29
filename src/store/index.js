import Vue from 'vue'
import Vuex from 'vuex'
import {getToken, setToken} from '@/js/auth' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkLogin:getToken()
  },
  mutations: {
    SET_CHECK_LOGIN: (state, check) => {
      state.checkLogin=check
    },
  },
  actions: {
    setCheckLogin({ commit }, data){
      commit('SET_CHECK_LOGIN', data)
      setToken(data)
    }
  },
  getters:{
    checkLogin(state){
      return state.checkLogin
    }
  },
  modules: {
  }
})
