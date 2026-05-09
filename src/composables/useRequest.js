/**
 * 请求状态管理 Hook
 * 提供 loading / error / data 三态管理
 */
import { ref } from 'vue'

export function useRequest(requestFn, options = {}) {
  const data = ref(options.defaultData ?? null)
  const loading = ref(false)
  const error = ref(null)

  const run = async (...args) => {
    loading.value = true
    error.value = null
    try {
      data.value = await requestFn(...args)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) run()

  return { data, loading, error, run }
}
