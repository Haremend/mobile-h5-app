<template>
  <div class="page-home">
    <!-- 顶部导航 -->
    <AppNavBar title="移动H5应用" :show-left-arrow="false" />

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 轮播图 -->
      <div class="banner-section">
        <van-swipe
          class="banner-swipe"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item v-for="i in 3" :key="i">
            <img
              :src="`https://picsum.photos/375/150?random=${i}`"
              class="banner-image"
            />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 功能入口 -->
      <div class="quick-entry-section">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            icon="shopping-cart-o"
            text="购物车"
            @click="router.push('/cart')"
          />
          <van-grid-item icon="coupon-o" text="优惠券" />
          <van-grid-item icon="gift-o" text="礼品卡" />
          <van-grid-item icon="service-o" text="客服" />
        </van-grid>
      </div>

      <!-- 推荐商品 -->
      <div class="recommend-section">
        <div class="section-title">推荐商品</div>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-grid :column-num="2" :gutter="10">
            <van-grid-item
              v-for="item in productList"
              :key="item.id"
              class="product-item"
            >
              <div class="product-card" @click="goToDetail(item.id)">
                <img
                  :src="
                    item.image ||
                    'https://picsum.photos/160/160?random=' + item.id
                  "
                  class="product-image"
                />
                <div class="product-info">
                  <div class="product-title text-ellipsis-2">
                    {{ item.title || '商品标题' }}
                  </div>
                  <div class="product-price text-primary-color">
                    ¥{{ item.price || '99.00' }}
                  </div>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
      </div>
    </div>

    <!-- 底部导航 -->
    <AppTabBar />
  </div>
</template>

<script setup lang="ts">
/**
 * 首页
 * 展示轮播图、功能入口、商品推荐列表
 */
import type { Product } from '@/types'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { getRecommendList } from '@/api/modules/home'

const router = useRouter()

// 商品列表
const productList = ref<Product[]>([])
const loading = ref(false)
const finished = ref(false)
const page = ref(1)
const pageSize = ref(10)

// 加载商品数据
const loadProducts = async () => {
  try {
    loading.value = true
    // const params = {
    //   page: page.value,
    //   size: pageSize.value
    // }

    // 模拟数据，实际项目中调用接口
    // const res = await getRecommendList(params)

    // 模拟商品数据
    const mockData: Product[] = Array.from(
      { length: pageSize.value },
      (_, i) => ({
        id: page.value * pageSize.value + i + 1,
        title: `商品 ${page.value * pageSize.value + i + 1}`,
        price: (Math.random() * 100 + 10).toFixed(2),
        image: `https://picsum.photos/160/160?random=${page.value * pageSize.value + i + 1}`
      })
    )

    if (page.value === 1) {
      productList.value = mockData
    } else {
      productList.value = [...productList.value, ...mockData]
    }

    // 模拟加载完成
    if (page.value >= 3) {
      finished.value = true
    }
  } catch (error) {
    console.error('加载商品失败:', error)
  } finally {
    loading.value = false
  }
}

// 上拉加载
const onLoad = () => {
  page.value++
  loadProducts()
}

// 跳转到详情页
const goToDetail = id => {
  router.push(`/detail/${id}`)
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.page-home {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}

.banner-section {
  margin-bottom: var(--spacing-md);
}

.banner-swipe {
  height: 150px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quick-entry-section {
  margin-bottom: var(--spacing-lg);
  background-color: var(--color-bg-card);
  padding: var(--spacing-md) 0;
}

.recommend-section {
  background-color: var(--color-bg-card);
  padding: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.product-item {
  background-color: var(--color-bg-card);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.product-card {
  background-color: var(--color-bg-primary);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.product-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.product-info {
  padding: var(--spacing-sm);
}

.product-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  height: 34px;
}

.product-price {
  font-size: var(--font-size-md);
  font-weight: 600;
}
</style>
