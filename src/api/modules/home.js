/**
 * 首页相关接口
 */
import { get } from '@/utils/request'

/**
 * 获取首页轮播图
 * @returns {Promise}
 */
export const getBannerList = () => get('/home/banner')

/**
 * 获取首页推荐商品
 * @param {Object} params 查询参数
 * @returns {Promise}
 */
export const getRecommendList = params => get('/home/recommend', params)

/**
 * 获取商品分类
 * @returns {Promise}
 */
export const getCategoryList = () => get('/home/category')

/**
 * 获取商品列表
 * @param {Object} params 查询参数 { page, size, categoryId }
 * @returns {Promise}
 */
export const getProductList = params => get('/product/list', params)

/**
 * 获取商品详情
 * @param {string} id 商品ID
 * @returns {Promise}
 */
export const getProductDetail = id => get(`/product/${id}`)
