/**
 * 应用全局状态管理
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 全局 loading 状态
  const loading = ref(false)

  // 当前页面标题
  const pageTitle = ref('')

  // 显示 loading
  const showLoading = () => {
    loading.value = true
  }

  // 隐藏 loading
  const hideLoading = () => {
    loading.value = false
  }

  // 设置页面标题
  const setPageTitle = title => {
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
