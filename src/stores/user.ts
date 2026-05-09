/**
 * 用户状态管理
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser
} from '@/utils/auth'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref<User | null>(getUser())
  const token = ref<string | null>(getToken())

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)

  // 登录
  const login = (data: { token: string; user: User }) => {
    const { token: newToken, user } = data
    token.value = newToken
    userInfo.value = user
    setToken(newToken)
    setUser(user)
  }

  // 退出登录
  const logout = () => {
    token.value = null
    userInfo.value = null
    removeToken()
    removeUser()
    router.push('/login')
  }

  // 更新用户信息
  const updateUserInfo = (data: Partial<User>) => {
    userInfo.value = { ...userInfo.value, ...data } as User
    setUser(userInfo.value)
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    login,
    logout,
    updateUserInfo
  }
})
