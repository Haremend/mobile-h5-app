/**
 * 登录态管理 Hook
 */
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export function useAuth() {
  const userStore = useUserStore()

  // 是否已登录
  const isLoggedIn = computed(() => userStore.isLoggedIn)

  // 用户信息
  const userInfo = computed(() => userStore.userInfo)

  // 用户token
  const token = computed(() => userStore.token)

  // 登录
  const login = data => {
    userStore.login(data)
  }

  // 退出登录
  const logout = () => {
    userStore.logout()
  }

  // 更新用户信息
  const updateUserInfo = data => {
    userStore.updateUserInfo(data)
  }

  return {
    isLoggedIn,
    userInfo,
    token,
    login,
    logout,
    updateUserInfo
  }
}
