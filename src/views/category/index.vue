<template>
  <div class="page-category">
    <!-- 顶部导航 -->
    <AppNavBar title="商品分类" :show-left-arrow="false" />

    <!-- 页面内容 -->
    <div class="page-content">
      <div class="category-container">
        <!-- 左侧分类列表 -->
        <div class="sidebar-section">
          <van-sidebar v-model="activeCategory" @change="onCategoryChange">
            <van-sidebar-item
              v-for="category in categoryList"
              :key="category.id"
              :title="category.name"
            />
          </van-sidebar>
        </div>

        <!-- 右侧商品列表 -->
        <div class="content-section">
          <div class="category-products">
            <div class="category-title">
              {{ currentCategory?.name || '全部商品' }}
            </div>
            <van-grid :column-num="2" :gutter="10">
              <van-grid-item
                v-for="product in productList"
                :key="product.id"
                class="product-item"
              >
                <div class="product-card" @click="goToDetail(product.id)">
                  <img
                    :src="
                      product.image ||
                      'https://picsum.photos/120/120?random=' + product.id
                    "
                    class="product-image"
                  />
                  <div class="product-info">
                    <div class="product-title text-ellipsis">
                      {{ product.title || '商品标题' }}
                    </div>
                    <div class="product-price text-primary-color">
                      ¥{{ product.price || '99.00' }}
                    </div>
                  </div>
                </div>
              </van-grid-item>
            </van-grid>

            <!-- 空状态 -->
            <EmptyState
              v-if="productList.length === 0"
              description="该分类暂无商品"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <AppTabBar />
  </div>
</template>

<script setup>
/**
 * 分类页
 * 左侧分类列表，右侧商品展示
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { getCategoryList, getProductList } from '@/api/modules/home'
import EmptyState from '@/components/EmptyState.vue'

const router = useRouter()

// 分类列表
const categoryList = ref([
  { id: 1, name: '推荐' },
  { id: 2, name: '手机数码' },
  { id: 3, name: '服装鞋帽' },
  { id: 4, name: '家居生活' },
  { id: 5, name: '美妆护肤' },
  { id: 6, name: '运动户外' },
  { id: 7, name: '图书音像' },
  { id: 8, name: '食品饮料' }
])

// 当前选中的分类索引
const activeCategory = ref(0)

// 当前分类
const currentCategory = computed(() => categoryList.value[activeCategory.value])

// 商品列表
const productList = ref([])

// 加载商品数据
const loadProducts = async () => {
  try {
    const categoryId = currentCategory.value?.id
    // const params = {
    //   categoryId,
    //   page: 1,
    //   size: 20
    // }

    // 模拟商品数据
    const mockData = Array.from({ length: 8 }, (_, i) => ({
      id: categoryId * 100 + i + 1,
      title: `${currentCategory.value?.name || '商品'} ${i + 1}`,
      price: (Math.random() * 200 + 20).toFixed(2),
      image: `https://picsum.photos/120/120?random=${categoryId * 100 + i + 1}`
    }))

    productList.value = mockData
  } catch (error) {
    console.error('加载商品失败:', error)
  }
}

// 分类切换
const onCategoryChange = () => {
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
.page-category {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}

.category-container {
  display: flex;
  height: 100%;
}

.sidebar-section {
  width: 85px;
  background-color: var(--color-bg-card);
  border-right: 1px solid var(--color-border);
}

.content-section {
  flex: 1;
  padding: var(--spacing-md);
  background-color: var(--color-bg-page);
}

.category-products {
  min-height: 100%;
}

.category-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.product-item {
  margin-bottom: var(--spacing-md);
}

.product-card {
  background-color: var(--color-bg-card);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.product-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.product-info {
  padding: var(--spacing-sm);
}

.product-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  height: 18px;
}

.product-price {
  font-size: var(--font-size-md);
  font-weight: 600;
}
</style>
