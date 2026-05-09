<template>
  <div class="page-detail">
    <!-- 顶部导航 -->
    <AppNavBar title="商品详情" />

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 商品图片轮播 -->
      <div class="image-section">
        <van-swipe class="image-swipe" :autoplay="0" indicator-color="white">
          <van-swipe-item v-for="(image, index) in product.images" :key="index">
            <img :src="image" class="product-image" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 商品信息 -->
      <div class="info-section">
        <div class="price-section">
          <span class="current-price text-primary-color"
            >¥{{ product.price }}</span
          >
          <span class="original-price text-secondary"
            >¥{{ product.originalPrice }}</span
          >
        </div>

        <div class="title-section">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-subtitle">{{ product.subtitle }}</p>
        </div>

        <div class="stats-section">
          <div class="stat-item">
            <span class="stat-label">销量</span>
            <span class="stat-value">{{ product.sales || 0 }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">库存</span>
            <span class="stat-value">{{ product.stock || 0 }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">评分</span>
            <span class="stat-value">{{ product.rating || 5.0 }}</span>
          </div>
        </div>
      </div>

      <!-- 商品详情 -->
      <div class="detail-section">
        <div class="section-title">商品详情</div>
        <div class="detail-content" v-html="product.description"></div>
      </div>

      <!-- 推荐商品 -->
      <div class="recommend-section">
        <div class="section-title">相关推荐</div>
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item
            v-for="item in recommendList"
            :key="item.id"
            class="recommend-item"
          >
            <div class="recommend-card" @click="goToDetail(item.id)">
              <img
                :src="
                  item.image ||
                  'https://picsum.photos/120/120?random=' + item.id
                "
                class="recommend-image"
              />
              <div class="recommend-info">
                <div class="recommend-title text-ellipsis">
                  {{ item.title }}
                </div>
                <div class="recommend-price text-primary-color">
                  ¥{{ item.price }}
                </div>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="action-bar">
      <div class="action-left">
        <div class="action-btn" @click="goToCart">
          <van-icon name="shopping-cart-o" size="20" />
          <span class="action-text">购物车</span>
          <van-badge
            v-if="cartCount > 0"
            :content="String(cartCount)"
            class="cart-badge"
          />
        </div>
        <div class="action-btn" @click="addToFavorites">
          <van-icon name="star-o" size="20" />
          <span class="action-text">收藏</span>
        </div>
      </div>

      <div class="action-right">
        <van-button
          type="primary"
          round
          size="small"
          class="add-cart-btn"
          @click="addToCart"
        >
          加入购物车
        </van-button>
        <van-button
          type="danger"
          round
          size="small"
          class="buy-now-btn"
          @click="buyNow"
        >
          立即购买
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">n/**
 * 商品详情页
 * 展示商品图片、信息、详情、相关推荐
 */
import type { Product } from '@/types'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
// import { getProductDetail } from '@/api/modules/home'

const router = useRouter()

// 商品ID
const route = useRoute()
const productId = Number(route.params.id)

// 商品信息
const product = ref<Product & {
  subtitle?: string
  images?: string[]
  description?: string
}>({
  id: Number(productId),
  title: '商品标题',
  subtitle: '商品副标题描述',
  price: '199.90',
  originalPrice: '299.90',
  images: [
    `https://picsum.photos/375/375?random=${productId}`,
    `https://picsum.photos/375/375?random=${productId}a`,
    `https://picsum.photos/375/375?random=${productId}b`
  ],
  description: `
    <p>这是商品详细描述内容。</p>
    <p>商品特点：</p>
    <ul>
      <li>高品质材料</li>
      <li>精湛工艺</li>
      <li>人性化设计</li>
      <li>优质售后服务</li>
    </ul>
    <p>规格参数：</p>
    <p>尺寸：长 × 宽 × 高</p>
    <p>重量：约 500g</p>
    <p>材质：优质材料</p>
  `,
  sales: 1024,
  stock: 999,
  rating: 4.8
})

// 推荐商品列表
const recommendList = ref<Product[]>([
  {
    id: 1,
    title: '推荐商品1',
    price: '99.90'
  },
  {
    id: 2,
    title: '推荐商品2',
    price: '149.90'
  },
  {
    id: 3,
    title: '推荐商品3',
    price: '199.90'
  },
  {
    id: 4,
    title: '推荐商品4',
    price: '249.90'
  }
])

// 购物车数量
const cartCount = ref(3)

// 加载商品详情
const loadProductDetail = async () => {
  try {
    // 实际项目中调用接口
    // const res = await getProductDetail(productId)
    // product.value = res
  } catch (error) {
    console.error('加载商品详情失败:', error)
  }
}

// 跳转到购物车
const goToCart = () => {
  router.push('/cart')
}

// 跳转到其他商品详情
const goToDetail = (id: number) => {
  if (id !== productId) {
    router.push(`/detail/${id}`)
  }
}

// 添加到收藏
const addToFavorites = () => {
  showToast('收藏成功')
}

// 添加到购物车
const addToCart = () => {
  showToast('已添加到购物车')
  cartCount.value++
}

// 立即购买
const buyNow = () => {
  showToast('立即购买功能开发中')
}

onMounted(() => {
  loadProductDetail()
})
</script>

<style scoped>
.page-detail {
  min-height: 100vh;
  background-color: var(--color-bg-page);
  padding-bottom: 60px; /* 为底部操作栏留空间 */
}

.image-section {
  background-color: var(--color-bg-card);
  margin-bottom: var(--spacing-sm);
}

.image-swipe {
  height: 300px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-section {
  background-color: var(--color-bg-card);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.price-section {
  display: flex;
  align-items: baseline;
  margin-bottom: var(--spacing-md);
}

.current-price {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-right: var(--spacing-sm);
}

.original-price {
  font-size: var(--font-size-md);
  text-decoration: line-through;
}

.title-section {
  margin-bottom: var(--spacing-md);
}

.product-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
  line-height: 1.4;
}

.product-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-regular);
  margin: 0;
  line-height: 1.4;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.stat-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.detail-section {
  background-color: var(--color-bg-card);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.detail-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-regular);
  line-height: 1.6;
}

.recommend-section {
  background-color: var(--color-bg-card);
  padding: var(--spacing-md);
}

.recommend-item {
  margin-bottom: var(--spacing-md);
}

.recommend-card {
  background-color: var(--color-bg-primary);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.recommend-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.recommend-info {
  padding: var(--spacing-sm);
}

.recommend-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  height: 18px;
}

.recommend-price {
  font-size: var(--font-size-md);
  font-weight: 600;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.action-left {
  display: flex;
  align-items: center;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: var(--spacing-lg);
  position: relative;
}

.action-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-regular);
  margin-top: var(--spacing-xs);
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
}

.action-right {
  display: flex;
  gap: var(--spacing-sm);
}

.add-cart-btn {
  min-width: 80px;
}

.buy-now-btn {
  min-width: 80px;
}
</style>