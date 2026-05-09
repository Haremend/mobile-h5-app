<template>
  <van-tabbar
    v-if="showTabBar"
    v-model="active"
    fixed
    safe-area-inset-bottom
    placeholder
    @change="onTabChange"
  >
    <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item name="cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item name="profile" icon="contact-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 当前激活的标签
const active = ref('home')

// 是否显示底部导航
const showTabBar = computed(() => route.meta.showTabBar)

// 监听路由变化，更新激活状态
watch(
  () => route.path,
  path => {
    if (path === '/') active.value = 'home'
    else if (path === '/category') active.value = 'category'
    else if (path === '/cart') active.value = 'cart'
    else if (path === '/profile') active.value = 'profile'
  },
  { immediate: true }
)

// 标签切换
const onTabChange = name => {
  const pathMap = {
    home: '/',
    category: '/category',
    cart: '/cart',
    profile: '/profile'
  }

  router.push(pathMap[name])
}
</script>
