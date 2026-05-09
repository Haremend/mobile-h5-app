<template>
  <div class="page-login">
    <!-- 顶部导航 -->
    <AppNavBar title="登录" :show-left-arrow="false" />

    <!-- 登录表单 -->
    <div class="login-container">
      <!-- Logo 区域 -->
      <div class="logo-section">
        <div class="logo-placeholder"></div>
        <h1 class="app-name">{{ appTitle }}</h1>
      </div>

      <!-- 登录表单 -->
      <div class="form-section">
        <van-form ref="formRef" @submit="onSubmit">
          <!-- 手机号输入 -->
          <van-field
            v-model="form.phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
              { required: true, message: '请输入手机号' },
              { pattern: phonePattern, message: '手机号格式不正确' }
            ]"
            maxlength="11"
          />

          <!-- 密码输入 -->
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />

          <!-- 登录按钮 -->
          <div class="submit-section">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              :loading="loading"
              :disabled="loading"
            >
              登录
            </van-button>
          </div>
        </van-form>

        <!-- 其他操作 -->
        <div class="other-actions">
          <van-button
            plain
            hairline
            type="primary"
            size="small"
            @click="goToRegister"
          >
            注册账号
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 登录页
 * 用户登录表单
 */
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { login } from '@/api/modules/user'
import { useAuth } from '@/composables/useAuth'
// import { isPhone } from '@/utils/validate'

const router = useRouter()
const route = useRoute()
const { login: userLogin } = useAuth()

// 应用标题
const appTitle = import.meta.env.VITE_APP_TITLE

// 表单数据
const form = ref({
  phone: '',
  password: ''
})

// 手机号校验规则
const phonePattern = /^1[3-9]\d{9}$/

// 表单引用
const formRef = ref(null)

// 加载状态
const loading = ref(false)

// 提交表单
const onSubmit = async values => {
  try {
    loading.value = true

    // 调用登录接口
    const res = await login(values)

    // 登录成功，保存用户信息
    userLogin({
      token: res.token,
      user: res.user
    })

    showToast('登录成功')

    // 跳转页面
    const redirect = route.query.redirect || '/'
    router.replace(redirect)
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}

// 跳转到注册页
const goToRegister = () => {
  // 这里可以跳转到注册页面，暂时显示提示
  showToast('注册功能开发中')
}
</script>

<style scoped>
.page-login {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}

.login-container {
  padding: var(--spacing-xl) var(--spacing-lg);
}

.logo-section {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.logo-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-primary), #40a9ff);
  border-radius: 50%;
  margin: 0 auto var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: bold;
}

.app-name {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.form-section {
  background-color: var(--color-bg-card);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl) var(--spacing-lg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.submit-section {
  margin-top: var(--spacing-xl);
}

.other-actions {
  margin-top: var(--spacing-lg);
  text-align: center;
}
</style>
