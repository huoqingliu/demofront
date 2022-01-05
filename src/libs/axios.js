import axios from 'axios'
import store from '@/store'
import {
  setToken,
  getToken
} from '@/libs/utils'
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL,
  }
  if (!responseURL.includes('save_error_logger')) {
    store.app.dispatch('addErrorLog', info)
  }
}
// Spin.hide()和Spin.show()不建议开启，对界面显示不友好
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "REQ-TYPE": "API",
        "Authorization": "Bearer"
        // "content-Type":"application/x-www-form-urlencoded;charset-UTF-8"
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    //请求拦截器
    instance.interceptores.request.use(config => {
      if (!Object.keys(this.queue).length) {
        // Spin.show()
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    //响应拦截器
    instance.interceptores.response.use(config => {
      const token = getToken()
      if (token) {
        setToken(token)
      }
      this.destroy(url)
      const {
        data,
        status
      } = res
      return {
        data,
        status
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const {
          request: {
            statusText,
            status
          },
          config
        } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {
            responseURL: config.url
          }
        }
        addErrorLog(errorInfo)
        let errmsg = error.toString()
        const { message } = errmsg
        
        if (message.indexOf('Network Error' !== -1)) errmsg = '网络不通，请检查网络连接！'
        if (message.indexOf('timeout' !== -1)) errmsg = '网络不稳定，连接超时！'
        this.$Message.error(error)
        return Promise.reject(error)
      }
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }

}
export default HttpRequest