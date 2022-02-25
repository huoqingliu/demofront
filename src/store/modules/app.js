import Router from '@/router'
import Routers from '@/router/routers'
import to404 from '@/components/404'

import {loadMenu} from '@/libs/router-util'
const state = {
  errorList: [],
  menuList: [],
  routes:[...loadMenu()]
}

const mutations = {
  reset_state: (state) => {
    state.errorList=[]
    state.menuList= []
    state.routes=[...loadMenu()]
  },
  updateRouters(state, list) {
    list.forEach(item => {
      Router.addRoute(item)
    });
    
    state.menuList = list
    Router.addRoute({ 
      path: '*', 
      name: '/404', 
      hidden: true,
      component:to404,
    })
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