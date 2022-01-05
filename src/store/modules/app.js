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
}

const getters = {

}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}