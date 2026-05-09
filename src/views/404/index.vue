<template>
  <div class="page-404">
    <!-- 空状态组件 -->
    <div class="empty-container">
      <van-empty image="error" image-size="120" description="页面不存在">
        <div class="error-message">
          <p class="error-title">404 Not Found</p>
          <p class="error-desc">抱歉，您访问的页面不存在</p>
        </div>

        <div class="action-buttons">
          <van-button type="primary" plain hairline @click="goHome">
            返回首页
          </van-button>
          <van-button type="default" plain hairline @click="goBack">
            返回上一页
          </van-button>
        </div>
      </van-empty>
    </div>
  </div>
</template>

<script setup>
/**
 * 404 页面
 * 页面不存在时的兜底页面
 */
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.replace('/')
}

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.page-404 {
  min-height: 100vh;
  background-color: var(--color-bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-container {
  text-align: center;
  padding: var(--spacing-xl);
}

.error-message {
  margin: var(--spacing-lg) 0;
}

.error-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.error-desc {
  font-size: var(--font-size-md);
  color: var(--color-text-regular);
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-xl);
}
</style>
