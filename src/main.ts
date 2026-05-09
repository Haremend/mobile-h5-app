/**
 * 应用入口文件
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 移动端适配
import 'amfe-flexible'

// 全局样式
import '@/assets/styles/reset.css'
import '@/assets/styles/variables.css'
import '@/assets/styles/common.css'

// Vant 样式（组件按需引入，但基础样式全量）
import 'vant/lib/index.css'

// 创建应用实例
const app = createApp(App)
const pinia = createPinia()

// 使用插件
app.use(router)
app.use(pinia)

// 挂载应用
app.mount('#app')
