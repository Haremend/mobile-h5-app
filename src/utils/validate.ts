/**
 * 常用校验函数
 */

/**
 * 手机号校验
 * @param phone 手机号
 * @returns 是否为有效手机号
 */
export const isPhone = (phone: string): boolean => {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 邮箱校验
 * @param email 邮箱
 * @returns 是否为有效邮箱
 */
export const isEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

/**
 * 身份证号校验
 * @param idCard 身份证号
 * @returns 是否为有效身份证号
 */
export const isIdCard = (idCard: string): boolean => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
}

/**
 * 密码强度校验（至少8位，包含数字和字母）
 * @param password 密码
 * @returns 是否为强密码
 */
export const isStrongPassword = (password: string): boolean => {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-={}\[\];':",./<>?|]{8,}$/.test(
    password
  )
}

/**
 * URL校验
 * @param url URL地址
 * @returns 是否为有效URL
 */
export const isUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 金额校验（最多两位小数）
 * @param amount 金额
 * @returns 是否为有效金额格式
 */
export const isAmount = (amount: string): boolean => {
  return /^\d+(\.\d{1,2})?$/.test(amount)
}
