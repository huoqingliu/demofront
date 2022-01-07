import Router from '@/router'
import Routers from '@/router/routers'
import {loadMenu} from '@/libs/router-util'
const state = {
  errorList: [],
  menuList: [],
  routes:[...loadMenu()]
}

const mutations = {
  updateRouters(state, list) {
    Router.addRoutes(list)
    state.menuList = list
  },
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