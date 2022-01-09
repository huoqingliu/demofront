import {
  login,
  logout,
  getUserInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/libs/utils'
// 动态路由菜单
import router from '@/router'

const state = {
  token: getToken(), // 登陆用户的token, 初始值从cookie中读取
  userId: '', //用户id
  name: '', // 用户名
  avatar: '', // 用户头像图片地址
  hasGetInfo: false,
  roles: [] // 当前用户所拥有角色的数组
}

const mutations = {
  reset_state: (state) => {
    state.token = getToken() // 登陆用户的token, 初始值从cookie中读取
    state.userId = '' //用户id
    state.name = '' // 用户名
    state.avatar = '' // 用户头像图片地址
    state.hasGetInfo = false
    state.roles = [] // 当前用户所拥有角色的数组
  },
  set_token: (state, token) => {
    state.token = token
    setToken(token)
  },
  set_name: (state, name) => {
    state.name = name
  },
  set_userId: (state, userId) => {
    state.userId = userId
  },
  set_avatar: (state, avatar) => {
    state.avatar = avatar
  },
  set_hasGetInfo: (state, hasGetInfo) => {
    state.hasGetInfo = hasGetInfo
  },
  set_roles: (state, roles) => {
    state.roles = roles
  }

}

const getters = {

}

const actions = {
  /* 
  异步登陆
  */
  handleLogin({
    commit
  }, userInfo) {
    const {
      userName,
      password,
      verify
    } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const {
          data
        } = res
        if (res.data.success) {
          commit('set_token', data.token)
          resolve(data)
        } else {
          resolve(data)
          return false
        }

      }).catch(error => {
        reject(error)
      })
    })
  },

  /* 
  异步获取用户信息
  */
  getUserInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      try {
        getUserInfo().then(res => {
          const {
            data
          } = res.data

          if (data.userId == null) {
            commit('set_token', '')
          } else {
            const {
              name,
              userId,
              avatar,
              roles,
            } = data
            commit('set_hasGetInfo', true)

            commit('set_name', name)
            commit('set_userId', userId)

            commit('set_avatar', avatar)

            if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('set_roles', roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            resolve(data)
          }
        }).catch(error => {
          reject(error)
        })
      } catch (error) {
        reject(error)
      }
    })
  },

  /* 
  退出登陆
  */
  logout({
    commit
  }) {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        removeToken() // must remove  token  first
        localStorage.removeItem('route')
        commit('reset_state')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /* 
  删除token与重置状态
  */
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('reset_state')
      resolve()
    })
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  getters,
  actions
}