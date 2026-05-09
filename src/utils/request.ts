import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { showToast } from 'vant'
import { getToken, removeToken } from './auth'
import router from '@/router'

const service: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { code, data, message } = response.data

    // 假设成功状态码为 200
    if (code === 200) {
      return data
    }

    // 处理业务错误
    if (code === 401) {
      // 未授权，清除 token 并跳转登录页
      removeToken()
      router.push('/login')
      showToast('登录已过期，请重新登录')
    } else {
      // 其他业务错误显示提示
      showToast(message || '操作失败')
    }

    return Promise.reject(new Error(message || '操作失败'))
  },
  error => {
    // 网络错误处理
    if (error.response) {
      switch (error.response.status) {
        case 500:
          showToast('服务器错误')
          break
        case 404:
          showToast('请求地址不存在')
          break
        default:
          showToast('网络异常，请稍后重试')
      }
    } else {
      showToast('网络异常，请稍后重试')
    }

    return Promise.reject(error)
  }
)

// 快捷方法
export const get = (url: string, params: Record<string, any> = {}) =>
  service.get(url, { params })
export const post = (url: string, data: Record<string, any> = {}) =>
  service.post(url, data)
export const put = (url: string, data: Record<string, any> = {}) =>
  service.put(url, data)
export const del = (url: string) => service.delete(url)

export default service
