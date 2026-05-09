<template>
  <div id="app">
    <!-- 全局加载遮罩 -->
    <LoadingOverlay v-if="appStore.loading" />

    <!-- 路由缓存：对 meta.keepAlive 的页面进行缓存 -->
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
/**
 * 根组件
 * 负责全局 loading 和路由视图
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { useAppStore } from '@/stores/app'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const currentRoute = useRoute()
const appStore = useAppStore()

// 需要缓存的页面列表
const cachedViews = computed(() => {
  // 这里可以根据需要动态获取需要缓存的页面
  // 目前先返回空数组，实际使用中可以通过路由 meta 配置
  return [] as string[]
})
</script>

<style>
/* 全局样式 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}

#app {
  height: 100%;
  overflow: hidden;
  position: relative;
}

/* 通用样式类 */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
