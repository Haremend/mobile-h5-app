/**
 * 登录态管理 Hook
 */
import { computed, ComputedRef } from 'vue'
import type { User } from '@/types'
import { useUserStore } from '@/stores/user'

export function useAuth() {
  const userStore = useUserStore()

  // 是否已登录
  const isLoggedIn: ComputedRef<boolean> = computed(() => userStore.isLoggedIn)

  // 用户信息
  const userInfo: ComputedRef<User | null> = computed(() => userStore.userInfo)

  // 用户token
  const token: ComputedRef<string | null> = computed(() => userStore.token)

  // 登录
  const login = (data: { token: string; user: User }) => {
    userStore.login(data)
  }

  // 退出登录
  const logout = (): void => {
    userStore.logout()
  }

  // 更新用户信息
  const updateUserInfo = (data: Partial<User>): void => {
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
