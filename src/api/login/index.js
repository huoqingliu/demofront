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
    url: `${base}/Login` + Date.parse(new Date()) / 1000,
    method: 'post',
    data
  })
}

//退出登录
export const logout = (token) => {
  return axios.request({
    url: `${base}/logout` + Date.parse(new Date()) / 1000,
    method: 'post',
  })
}