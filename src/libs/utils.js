/* 
操作登陆用户的token cookie的工具函数
*/
import Cookies from 'js-cookie'
import config from '@/config'

const {title,cookieExpires,useI18n,TokenKey} = config

// 定义token和tokenTime
export const TOKEN_KEY = TokenKey
export const TOKEN_TIME = TOKEN_KEY + 'Time'


//获取token和tokenTime
export function getToken() {
  const token = Cookies.get(TOKEN_KEY)
  const time = Cookies.get(TOKEN_TIME)
  if (token && (time > (new Date().getTime()) || time == '')) return token
  else return false
}

//设置token和tokenTime
export function setToken(token) {
  let millisecond = (new Date().getTime())
  // 获取当前并加上token失效的时间,设置为token的过期时间
  let expiresTime = millisecond + 60 * 1000 * cookieExpires
console.log(TOKEN_KEY,TOKEN_TIME);
  console.log('setToken',token,expiresTime);
  Cookies.set(TOKEN_KEY,token)
  // if (token) {
    Cookies.set(TOKEN_TIME,expiresTime)
  // } else {
  //   Cookies.remove(TOKEN_TIME)
  // }
}

//删除token和tokenTime
export function removeToken() {
  Cookies.remove(TOKEN_TIME)
  Cookies.remove(TOKEN_KEY)
}


//根据当前路由 设置浏览器标签的title
export function  setTitle(routeItem,vm){
  const resTitle = title
  window.document.title = resTitle
}
