// 全局类型定义

export interface User {
  id: number
  nickname?: string
  phone?: string
  email?: string
  avatar?: string
}

export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

export interface PageParams {
  page?: number
  size?: number
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  size: number
}

// 商品相关类型（保留用于参考）
export interface Product {
  id: number
  title: string
  price: string
  originalPrice?: string
  image?: string
  description?: string
  sales?: number
  stock?: number
  rating?: number
}

// 路由元信息类型
export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  keepAlive?: boolean
  showTabBar?: boolean
}
