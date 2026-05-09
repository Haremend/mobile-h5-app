const TOKEN_KEY = 'h5_app_token'
const USER_KEY = 'h5_app_user'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = token => localStorage.setItem(TOKEN_KEY, token)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)
export const isLoggedIn = () => !!getToken()

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}
export const setUser = user =>
  localStorage.setItem(USER_KEY, JSON.stringify(user))
export const removeUser = () => localStorage.removeItem(USER_KEY)

export const clearAuth = () => {
  removeToken()
  removeUser()
}
