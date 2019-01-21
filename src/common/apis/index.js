import axios from 'axios'
import { message } from 'antd'
import * as Cookies from 'js-cookie'
import login from './login'
import counter from './counter'
import { changeStyle, history } from 'fun'
import { alertModal } from '@@/handleCommon'
import hostConfig from './hostConfig'
import market from './market'
import trade from './trade'
import listsl from './list'
import czqk from './czqk'
import contact from './contact'
import verify from './verify'
import report from './report'
const baseURL = hostConfig.baseURL
const reqArr = []
// 实例化 ajax请求对象
const xhr = url => {
  const ajaxinstance = axios.create({
    baseURL: url || baseURL,
    timeout: 30000,
    headers: {
      responseType: 'json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  // 添加拦截器，处理 公用请求参数，和通用请求头部
  ajaxinstance
    .interceptors
    .request
    .use((config) => {
      reqArr.push('小美女')
      const { url } = config
      const reqUrl = url.replace(/.*\//, '')
      const token = (sessionStorage.getItem('token') || '').replace(/"/g, '')

      token && (config.headers['X-Access-Token'] = token)
      // 在这儿做一些请求头的设置
      return config
    }, (error) => {
      reqArr.length = 0
      changeStyle()
      alertModal.error('加载超时')
      return Promise.reject(error)
    })

  // 请求响应拦截器
  ajaxinstance
    .interceptors
    .response
    .use((response) => {
      reqArr.shift()
      !reqArr.length && changeStyle()
      const data = response.data
      // TODO
      data.headers = response.headers

      const { status } = data
      const msg = data.message
      if (+status === 401) {
        history.push('/login')
      } else if (+status !== 1) {
        message.error(msg)
      }
      return data
    }, (error) => {
      // const { response } = error
      // const { data, status } = response
      // reqArr.length = 0
      // changeStyle()
      // if (+status === 401) {
      //   alertModal.error(`用户未登录`)
      //   Promise.resolve().then(() => Cookies.remove('token'))
      //     .then(() => Cookies.remove('userInfor'))
      //     .then(() => history.push('/login'))
      //   return Promise.reject(error)
      // }
      // alertModal.error(data.error)
      return Promise.reject(error)
    })
  return ajaxinstance
}

/**
 * [API api接口封装]
 * @type {Object}
 */
const API = {
  ...login(xhr()),
  ...listsl(xhr()),
  ...counter(xhr()),
  ...market(xhr),
  ...trade(xhr),
  ...czqk(xhr),
  ...contact(xhr()),
  ...verify(xhr()),
  ...report(xhr())
}
window.ar = xhr()
export default API
