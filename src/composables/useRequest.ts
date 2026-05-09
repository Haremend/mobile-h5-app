/**
 * 请求状态管理 Hook
 * 提供 loading / error / data 三态管理
 */
import { ref, Ref } from 'vue'

export function useRequest<T = any>(
  requestFn: (...args: any[]) => Promise<T>,
  options: {
    defaultData?: T
    immediate?: boolean
  } = {}
) {
  const data: Ref<T | null> = ref(options.defaultData ?? null) as Ref<T | null>
  const loading = ref(false)
  const error: Ref<Error | null> = ref(null)

  const run = async (...args: any[]): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      data.value = await requestFn(...args)
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) run()

  return { data, loading, error, run }
}
