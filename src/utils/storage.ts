/**
 * localStorage 封装
 */

/**
 * 获取存储数据
 * @param key 键名
 * @param defaultValue 默认值
 */
export const getStorage = <T = any>(
  key: string,
  defaultValue: T | null = null
): T | null => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('getStorage error:', error)
    return defaultValue
  }
}

/**
 * 设置存储数据
 * @param key 键名
 * @param value 值
 */
export const setStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('setStorage error:', error)
  }
}

/**
 * 移除存储数据
 * @param key 键名
 */
export const removeStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('removeStorage error:', error)
  }
}

/**
 * 清空所有存储数据
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('clearStorage error:', error)
  }
}
