/**
 * 用户相关接口
 */
import { post, get } from '@/utils/request'

/**
 * 用户登录
 * @param {Object} data 登录数据 { phone, password }
 * @returns {Promise}
 */
export const login = data => post('/user/login', data)

/**
 * 用户注册
 * @param {Object} data 注册数据 { phone, password, code }
 * @returns {Promise}
 */
export const register = data => post('/user/register', data)

/**
 * 获取验证码
 * @param {string} phone 手机号
 * @returns {Promise}
 */
export const getSmsCode = phone => post('/user/sms-code', { phone })

/**
 * 获取用户信息
 * @returns {Promise}
 */
export const getUserInfo = () => get('/user/info')

/**
 * 更新用户信息
 * @param {Object} data 用户信息
 * @returns {Promise}
 */
export const updateUserInfo = data => post('/user/update', data)

/**
 * 退出登录
 * @returns {Promise}
 */
export const logout = () => post('/user/logout')
