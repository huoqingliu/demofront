import axios from '@/libs/api.request'
let base = ''

//登录
export const login = (userName, password, verify) => {
  const data = {
    userName,
    password,
    verify
  }
  return axios.request({
    url: `${base}/login?timeStamp=` + Date.parse(new Date()) / 1000,
    method: 'post',
    data
  })
}

//退出登录
export const logout = (token) => {
  return axios.request({
    url: `${base}/logout?timeStamp=` + Date.parse(new Date()) / 1000,
    method: 'post',
  })
}

//获取用户信息
export const getUserInfo = () => {
  return axios.request({
    url: `${base}/getUserInfo?timeStamp=` + Date.parse(new Date()) / 1000,
    method: 'post',
  })
}

//获取用户信息
export const getRouters = () => {
  return axios.request({
    url: `${base}/getRouters?timeStamp=` + Date.parse(new Date()) / 1000,
    method: 'get',
  })
}

