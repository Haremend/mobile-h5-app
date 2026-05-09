/**
 * localStorage 封装
 */

/**
 * 获取存储数据
 * @param {string} key 键名
 * @param {any} defaultValue 默认值
 */
export const getStorage = (key, defaultValue = null) => {
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
 * @param {string} key 键名
 * @param {any} value 值
 */
export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('setStorage error:', error)
  }
}

/**
 * 移除存储数据
 * @param {string} key 键名
 */
export const removeStorage = key => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('removeStorage error:', error)
  }
}

/**
 * 清空所有存储数据
 */
export const clearStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('clearStorage error:', error)
  }
}
