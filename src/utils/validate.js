/**
 * 常用校验函数
 */

/**
 * 手机号校验
 * @param {string} phone 手机号
 * @returns {boolean}
 */
export const isPhone = phone => {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 邮箱校验
 * @param {string} email 邮箱
 * @returns {boolean}
 */
export const isEmail = email => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

/**
 * 身份证号校验
 * @param {string} idCard 身份证号
 * @returns {boolean}
 */
export const isIdCard = idCard => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
}

/**
 * 密码强度校验（至少8位，包含数字和字母）
 * @param {string} password 密码
 * @returns {boolean}
 */
export const isStrongPassword = password => {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-={}\[\];':",./<>?|]{8,}$/.test(
    password
  )
}

/**
 * URL校验
 * @param {string} url URL地址
 * @returns {boolean}
 */
export const isUrl = url => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 金额校验（最多两位小数）
 * @param {string} amount 金额
 * @returns {boolean}
 */
export const isAmount = amount => {
  return /^\d+(\.\d{1,2})?$/.test(amount)
}
