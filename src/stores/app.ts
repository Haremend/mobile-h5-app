/**
 * 应用全局状态管理
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 全局 loading 状态
  const loading = ref<boolean>(false)

  // 当前页面标题
  const pageTitle = ref<string>('')

  // 显示 loading
  const showLoading = (): void => {
    loading.value = true
  }

  // 隐藏 loading
  const hideLoading = (): void => {
    loading.value = false
  }

  // 设置页面标题
  const setPageTitle = (title: string): void => {
    pageTitle.value = title
  }

  return {
    loading,
    pageTitle,
    showLoading,
    hideLoading,
    setPageTitle
  }
})
