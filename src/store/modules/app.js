import {login,logout} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/libs/utils'
import {
  resetRouter
} from '@/router'

const state = {
  errorList: [],
  menuList: [],
  routes:[]
}

const mutations = {
  addError(state,error) {
    state.errorList.push(error)
  }
}

const getters = {

}

const actions = {
  addErrorLog({commit},info) {
    commit('addError',info)
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  getters,
  actions
}