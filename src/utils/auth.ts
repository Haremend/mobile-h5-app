const TOKEN_KEY = 'h5_app_token'
const USER_KEY = 'h5_app_user'

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY)
export const setToken = (token: string): void =>
  localStorage.setItem(TOKEN_KEY, token)
export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY)
export const isLoggedIn = (): boolean => !!getToken()

export const getUser = (): any => {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}
export const setUser = (user: any): void =>
  localStorage.setItem(USER_KEY, JSON.stringify(user))
export const removeUser = (): void => localStorage.removeItem(USER_KEY)

export const clearAuth = (): void => {
  removeToken()
  removeUser()
}
