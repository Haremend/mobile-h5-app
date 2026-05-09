<template>
  <div class="page-profile">
    <!-- 顶部导航 -->
    <AppNavBar title="个人中心" :show-left-arrow="false" />

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 用户信息卡片 -->
      <div class="user-card">
        <div class="user-avatar">
          <img :src="userInfo?.avatar || defaultAvatar" class="avatar-image" />
        </div>
        <div class="user-info">
          <div class="user-name">{{ userInfo?.nickname || '用户' }}</div>
          <div class="user-id">ID: {{ userInfo?.id || '10001' }}</div>
        </div>
        <div class="user-actions">
          <van-button plain hairline size="small" @click="goToEdit"
            >编辑</van-button
          >
        </div>
      </div>

      <!-- 功能菜单 -->
      <div class="menu-section">
        <van-cell-group inset>
          <van-cell
            title="我的订单"
            icon="orders-o"
            is-link
            @click="goToOrders"
          />
          <van-cell
            title="收货地址"
            icon="location-o"
            is-link
            @click="goToAddress"
          />
          <van-cell
            title="设置"
            icon="setting-o"
            is-link
            @click="goToSettings"
          />
          <van-cell title="关于我们" icon="info-o" is-link @click="goToAbout" />
        </van-cell-group>
      </div>

      <!-- 退出登录按钮 -->
      <div class="logout-section">
        <van-button block type="danger" plain hairline @click="handleLogout">
          退出登录
        </van-button>
      </div>
    </div>

    <!-- 底部导航 -->
    <AppTabBar />
  </div>
</template>

<script setup>
/**
 * 个人中心页
 * 展示用户信息和功能菜单
 */
// import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showDialog, showToast } from 'vant'
import { useAuth } from '@/composables/useAuth'

const { userInfo, logout } = useAuth()

// 默认头像
const defaultAvatar = 'https://picsum.photos/80/80?random=avatar'

// 跳转到订单页
const goToOrders = () => {
  showToast('订单功能开发中')
}

// 跳转到地址管理
const goToAddress = () => {
  showToast('地址管理功能开发中')
}

// 跳转到设置页
const goToSettings = () => {
  showToast('设置功能开发中')
}

// 跳转到关于页
const goToAbout = () => {
  showToast('关于我们功能开发中')
}

// 跳转到编辑页面
const goToEdit = () => {
  showToast('编辑功能开发中')
}

// 退出登录
const handleLogout = () => {
  showDialog({
    title: '确认退出',
    message: '确定要退出登录吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      logout()
      showToast('已退出登录')
    })
    .catch(() => {
      // 取消操作
    })
}
</script>

<style scoped>
.page-profile {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}

.user-card {
  background: linear-gradient(135deg, var(--color-primary), #40a9ff);
  border-radius: var(--border-radius-lg);
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  color: white;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: var(--spacing-md);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.user-id {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.user-actions {
  margin-left: var(--spacing-md);
}

.menu-section {
  margin: var(--spacing-md);
}

.logout-section {
  margin: var(--spacing-md);
  margin-top: var(--spacing-xl);
}
</style>
