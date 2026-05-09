/**
 * 用户相关接口
 */
import type { User } from '@/types'
import { post, get } from '@/utils/request'

/**
 * 用户登录
 * @param data 登录数据 { phone, password }
 */
export const login = (data: { phone: string; password: string }) =>
  post('/user/login', data)

/**
 * 用户注册
 * @param data 注册数据 { phone, password, code }
 */
export const register = (data: {
  phone: string
  password: string
  code: string
}) => post('/user/register', data)

/**
 * 获取验证码
 * @param phone 手机号
 */
export const getSmsCode = (phone: string) => post('/user/sms-code', { phone })

/**
 * 获取用户信息
 */
export const getUserInfo = () => get('/user/info')

/**
 * 更新用户信息
 * @param data 用户信息
 */
export const updateUserInfo = (data: Partial<User>) =>
  post('/user/update', data)

/**
 * 退出登录
 */
export const logout = () => post('/user/logout')
