<template>
  <div class="page-cart">
    <!-- 顶部导航 -->
    <AppNavBar title="购物车" :show-left-arrow="false" />

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 购物车商品列表 -->
      <div class="cart-section">
        <van-checkbox-group ref="checkboxGroup" v-model="checkedList">
          <!-- 全选按钮 -->
          <div class="select-all-section">
            <van-checkbox name="all" shape="square" @click="toggleAll">
              <span class="select-text">全选</span>
            </van-checkbox>
          </div>

          <!-- 商品列表 -->
          <div class="cart-list">
            <van-swipe-cell
              v-for="item in cartList"
              :key="item.id"
              class="cart-item"
            >
              <div class="cart-item-content">
                <van-checkbox
                  :name="item.id"
                  shape="square"
                  class="item-checkbox"
                />
                <div class="item-info" @click="goToDetail(item.id)">
                  <img
                    :src="
                      item.image ||
                      'https://picsum.photos/80/80?random=' + item.id
                    "
                    class="item-image"
                  />
                  <div class="item-details">
                    <div class="item-title text-ellipsis-2">
                      {{ item.title }}
                    </div>
                    <div class="item-price text-primary-color">
                      ¥{{ item.price }}
                    </div>
                  </div>
                </div>
                <div class="item-actions">
                  <van-stepper
                    v-model="item.quantity"
                    theme="round"
                    button-size="22"
                    disable-input
                    @change="onQuantityChange(item)"
                  />
                </div>
              </div>

              <!-- 左滑删除 -->
              <template #right>
                <van-button square type="danger" @click="removeItem(item)"
                  >删除</van-button
                >
              </template>
            </van-swipe-cell>
          </div>
        </van-checkbox-group>

        <!-- 空状态 -->
        <EmptyState v-if="cartList.length === 0" description="购物车是空的" />
      </div>

      <!-- 底部结算栏 -->
      <div v-if="cartList.length > 0" class="checkout-section">
        <div class="price-info">
          <span class="price-label">合计:</span>
          <span class="total-price text-primary-color">¥{{ totalPrice }}</span>
        </div>
        <van-button
          type="primary"
          round
          :disabled="checkedList.length === 0"
          @click="handleCheckout"
        >
          结算({{ checkedList.length }})
        </van-button>
      </div>
    </div>

    <!-- 底部导航 -->
    <AppTabBar />
  </div>
</template>

<script setup lang="ts">
/**
 * 购物车页
 * 商品列表、数量调整、结算功能
 */
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showDialog } from 'vant'
import EmptyState from '@/components/EmptyState.vue'

interface CartItem {
  id: number
  title: string
  price: string
  quantity: number
  image?: string
}

const router = useRouter()

// 购物车商品列表
const cartList = ref<CartItem[]>([
  {
    id: 1,
    title: '商品标题1 - 这是一个很长的商品标题用于测试显示效果',
    price: '99.90',
    quantity: 1,
    image: 'https://picsum.photos/80/80?random=1'
  },
  {
    id: 2,
    title: '商品标题2',
    price: '199.90',
    quantity: 2,
    image: 'https://picsum.photos/80/80?random=2'
  },
  {
    id: 3,
    title: '商品标题3',
    price: '299.90',
    quantity: 1,
    image: 'https://picsum.photos/80/80?random=3'
  }
])

// 已选择的商品ID列表
const checkedList = ref<number[]>([])

// 复选框组引用
const checkboxGroup = ref<Ref | null>(null)

// 计算总价
const totalPrice = computed(() => {
  return cartList.value
    .filter(item => checkedList.value.includes(item.id))
    .reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity
    }, 0)
    .toFixed(2)
})

// 全选/反选
const toggleAll = () => {
  if (checkedList.value.length === cartList.value.length) {
    checkedList.value = []
  } else {
    checkedList.value = cartList.value.map(item => item.id)
  }
}

// 数量变更
const onQuantityChange = item => {
  if (item.quantity <= 0) {
    removeItem(item)
  }
}

// 删除商品
const removeItem = (item: CartItem) => {
  showDialog({
    title: '确认删除',
    message: `确定要删除商品「${item.title}」吗？`,
    showCancelButton: true,
    confirmButtonText: '删除',
    cancelButtonText: '取消'
  })
    .then(() => {
      const index = cartList.value.findIndex(cart => cart.id === item.id)
      if (index > -1) {
        cartList.value.splice(index, 1)
        // 从已选择列表中移除
        const checkedIndex = checkedList.value.indexOf(item.id)
        if (checkedIndex > -1) {
          checkedList.value.splice(checkedIndex, 1)
        }
      }
      showToast('删除成功')
    })
    .catch(() => {
      // 取消操作
    })
}

// 跳转到详情页
const goToDetail = id => {
  router.push(`/detail/${id}`)
}

// 结算
const handleCheckout = () => {
  if (checkedList.value.length === 0) {
    showToast('请选择商品')
    return
  }
  showToast('结算功能开发中')
}
</script>

<style scoped>
.page-cart {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}

.cart-section {
  flex: 1;
}

.select-all-section {
  background-color: var(--color-bg-card);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.select-text {
  margin-left: var(--spacing-sm);
  color: var(--color-text-primary);
}

.cart-list {
  background-color: var(--color-bg-card);
}

.cart-item {
  border-bottom: 1px solid var(--color-border);
}

.cart-item-content {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
}

.item-checkbox {
  margin-right: var(--spacing-md);
}

.item-info {
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
  margin-right: var(--spacing-md);
}

.item-details {
  flex: 1;
  margin-right: var(--spacing-md);
}

.item-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  height: 36px;
}

.item-price {
  font-size: var(--font-size-md);
  font-weight: 600;
}

.item-actions {
  margin-left: var(--spacing-md);
}

.checkout-section {
  background-color: var(--color-bg-card);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.price-info {
  display: flex;
  align-items: center;
}

.price-label {
  font-size: var(--font-size-md);
  color: var(--color-text-regular);
  margin-right: var(--spacing-sm);
}

.total-price {
  font-size: var(--font-size-lg);
  font-weight: 600;
}
</style>
