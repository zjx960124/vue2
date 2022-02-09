import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth'
import {
  login
} from '@/utils/index.js'
import { logint } from '@/api/user'
import store from '@/store'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Cookie'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '200') {
      if (res.code === '302') {
        login();
        return
      }
      if (res.code === '500') {
        // logint({userName: 'bee', password: 'hy1234'}).then((res) => {
        //   store.dispatch('info/setDept');
        // })
        // return res
        // this.$router.push('/login')
        return 
      }
      Message({
        message: res.msg || '请求失败,请重试',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || '请求失败,请重试'))
    } else {
      return res
    }
  },
  error => {
    /* 请求错误时*/
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
      Message({
        message: '请求超时',
        type: 'error',
        duration: 5 * 1000
      })
      var config = error.config
      config.__retryCount = config.__retryCount || 0

      if (config.__retryCount >= config.retry) {
        return Promise.reject(error)
      }
      config.__retryCount += 1
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve()
        }, config.retryDelay || 1)
      })

      return backoff.then(function () {
        return axios(config)
      })
    } else {
      if (error.message === 'Network Error') {
        error.message = '请求失败,请重试'
      }
      Message({
        message: error.message || '请求失败,请重试',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
