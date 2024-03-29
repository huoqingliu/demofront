import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import store from '@/store'
import iView from 'iview' 
import { setToken, getToken, setTitle } from '@/libs/utils'
import Cookies from 'js-cookie'
import config from '@/config'
const {TOKEN_TIME,homeName } = config

Vue.use(Router)
const router = new Router({
  mode: 'hash', // 带#模式
  scrollBehavior: () => ({
      y: 0
  }), // 切换路由自动滑动到顶部
  routes: routers
})
const LOAGIN_PAGE_NAME = 'login'

// const LOAGIN_PAGE_NAME = '系统菜单'
const toNext = (name, from, next) => {
  console.log(name, from,'toNext');
  if (from.name === name) {
    window.location.reload()
  } else {
    next({
      name: name,
      query: {
        t:Date.parse(new Date()) / 1000
      }
      
    })
  }
}


router.beforeEach(( to,from,next)=>{
  iView.LoadingBar.start()
  const token = getToken()
  // console.log('路由守卫',token,to.name);
  if (!token) {
    Cookies.remove(TOKEN_TIME)
  }
  if (!token && to.name !== LOAGIN_PAGE_NAME) {
      //未登录且要跳转的不是登录页面
      next({
        name:LOAGIN_PAGE_NAME//跳转到首页
      })
  } else if(!token && to.name == LOAGIN_PAGE_NAME){
    //未登录且要跳转的是登录页面
    next()//跳转
  }else if(token && to.name == LOAGIN_PAGE_NAME){
    //已登录且要跳转的是登录页面
    next({
      name:homeName//跳转到首页
    })
  } else {
    //校验用户信息，如果获取不到用户信息，就跳转到登录页面
    if (store.state.user.hasGetInfo) {
      store.dispatch('getUserInfo').then(user => {
        if (user.userId ==null) {
          setToken('')
          next({name:LOAGIN_PAGE_NAME})
        } else {
          next()
        }
      }).catch (() => {
        setToken('')
        next({name:LOAGIN_PAGE_NAME})
      })
    } else {
      store.dispatch('getUserInfo').then(user => {
        if (user.userId ==null) {
          setToken('')
          next({name:LOAGIN_PAGE_NAME})
        } else {
          next({name:homeName})
        }
      }).catch (() => {
        setToken('')
        next({name:LOAGIN_PAGE_NAME})
      })
    }
  }
})


router.afterEach(to=>{
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0,0)
})

export default router