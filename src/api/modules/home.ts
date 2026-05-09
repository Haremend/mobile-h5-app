/**
 * 首页相关接口
 */
import type { PageParams } from '@/types'
import { get } from '@/utils/request'

/**
 * 获取首页轮播图
 */
export const getBannerList = () => get('/home/banner')

/**
 * 获取首页推荐商品
 * @param params 查询参数
 */
export const getRecommendList = (params?: PageParams) =>
  get('/home/recommend', params)

/**
 * 获取商品分类
 */
export const getCategoryList = () => get('/home/category')

/**
 * 获取商品列表
 * @param params 查询参数 { page, size, categoryId }
 */
export const getProductList = (params?: PageParams & { categoryId?: number }) =>
  get('/product/list', params)

/**
 * 获取商品详情
 * @param id 商品ID
 */
export const getProductDetail = (id: string | number) => get(`/product/${id}`)
