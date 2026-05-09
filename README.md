# Vue3 移动端 H5 基础框架

一个基于 Vue 3 + Vite + Pinia 的移动端 H5 应用基础框架，专为手机端 Web 应用开发而设计。

## 🚀 技术栈

- **框架**: Vue 3.4+
- **构建工具**: Vite 5.0+
- **状态管理**: Pinia
- **路由**: Vue Router 4（HTML5 History 模式，无 # 号路由）
- **UI 组件库**: Vant 4（移动端专用）
- **HTTP 请求**: Axios
- **移动端适配**: amfe-flexible + postcss-pxtorem
- **代码规范**: ESLint + Prettier

## 📱 特性

- ✅ **移动端优先**：专为手机 H5 开发设计
- ✅ **自动适配**：px 自动转 rem，完美适配各种屏幕
- ✅ **按需引入**：Vant 组件自动按需加载，减小打包体积
- ✅ **完整路由**：包含登录守卫、页面缓存等企业级功能
- ✅ **状态管理**：Pinia 管理用户和应用状态
- ✅ **HTTP 封装**：Axios 统一封装，含拦截器和错误处理
- ✅ **代码规范**：ESLint + Prettier 保证代码质量

## 🏗️ 项目结构

```
mobile-h5-app/
├── src/
│   ├── api/              # API 接口管理
│   │   ├── index.js      # API 统一导出
│   │   └── modules/      # 模块接口
│   ├── assets/          # 静态资源
│   │   └── styles/       # 全局样式
│   ├── components/      # 公共组件
│   │   ├── AppTabBar.vue # 底部导航
│   │   ├── AppNavBar.vue # 顶部导航
│   │   ├── LoadingOverlay.vue # 加载遮罩
│   │   └── EmptyState.vue    # 空状态
│   ├── composables/     # 组合式函数
│   │   ├── useRequest.js # 请求 Hook
│   │   └── useAuth.js    # 认证 Hook
│   ├── router/          # 路由配置
│   │   └── index.js      # 路由表
│   ├── stores/          # 状态管理
│   │   ├── user.js       # 用户状态
│   │   └── app.js        # 应用状态
│   ├── utils/           # 工具函数
│   │   ├── request.js    # HTTP 请求封装
│   │   ├── auth.js       # 认证工具
│   │   ├── storage.js    # 本地存储
│   │   └── validate.js   # 校验函数
│   ├── views/           # 页面组件
│   │   ├── home/         # 首页
│   │   ├── category/     # 分类页
│   │   ├── cart/         # 购物车
│   │   ├── profile/      # 个人中心
│   │   ├── login/        # 登录页
│   │   ├── detail/       # 详情页
│   │   └── 404/          # 404 页面
│   ├── App.vue          # 根组件
│   └── main.js          # 应用入口
├── .env                 # 环境变量
├── .env.development     # 开发环境变量
├── .env.production      # 生产环境变量
├── .env.staging         # 预发环境变量
├── .eslintrc.js         # ESLint 配置
├── .prettierrc          # Prettier 配置
├── vite.config.js       # Vite 配置
└── postcss.config.js   # PostCSS 配置
```

## 📦 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发环境启动

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 🎨 页面预览

- **首页**: 轮播图 + 功能入口 + 商品推荐
- **分类页**: 左侧分类 + 右侧商品列表
- **购物车**: 商品列表 + 数量调整 + 结算功能
- **个人中心**: 用户信息 + 功能菜单
- **登录页**: 手机号密码登录
- **详情页**: 商品详情 + 相关推荐

## 🔧 配置说明

### 移动端适配

框架已集成 `amfe-flexible` 和 `postcss-pxtorem`，设计稿按 375px 宽度设计，开发时直接写 px 单位即可。

```css
/* 自动转换为 rem */
.example {
  width: 100px;  /* 自动转换为 2.66667rem */
  font-size: 14px; /* 自动转换为 0.37333rem */
}
```

### 环境变量

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080

# .env.production
VITE_API_BASE_URL=https://api.your-domain.com
```

### API 代理

开发环境支持接口代理，解决跨域问题：

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

## 📚 开发指南

### 新增页面

1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/index.js` 中配置路由
3. 在 `src/api/modules/` 下创建对应接口
4. 如需全局状态，在 `src/stores/` 下新增 store

### 接口规范

```javascript
// src/api/modules/xxx.js
import { get, post } from '@/utils/request'

export const getXxxList = (params) => get('/xxx/list', params)
export const createXxx = (data) => post('/xxx/create', data)
```

### 组件开发

```vue
<template>
  <div class="page-xxx">
    <AppNavBar title="页面标题" />
    <div class="page-content">
      <!-- 页面内容 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRequest } from '@/composables/useRequest'

// 使用 useRequest Hook 管理请求状态
const { data, loading, run } = useRequest(getData, { immediate: true })

onMounted(() => {
  // 页面初始化
})
</script>

<style scoped>
.page-xxx {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}
</style>
```

## 🚀 部署

### 生产环境部署

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

构建后的文件在 `dist/` 目录下，可部署到任何静态服务器。

### 环境配置

- **开发环境**: `npm run dev`
- **预发环境**: `npm run build:staging`
- **生产环境**: `npm run build`

## 📚 模板使用指南

详细的模板使用指南和二次开发说明，请查看：
- **[模板使用指南](TEMPLATE_USAGE_GUIDE.md)** - 如何将此购物 App 模板转换为其他类型的 H5 应用

## 🔄 升级到 TypeScript

虽然当前版本使用 JavaScript，但你可以轻松升级到 TypeScript：

### 快速升级步骤：

```bash
# 1. 安装 TypeScript 依赖
npm install -D typescript @types/node @vitejs/plugin-vue @vue/eslint-config-typescript

# 2. 创建 tsconfig.json
echo '{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}' > tsconfig.json

# 3. 创建 tsconfig.node.json
echo '{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.js"]
}' > tsconfig.node.json

# 4. 更新 vite.config.js 支持 TypeScript
# 将文件重命名为 vite.config.ts
mv vite.config.js vite.config.ts

# 5. 逐步转换文件
# 将 .js 文件改为 .ts 文件
# 在 .vue 文件中添加 lang="ts"
```

### 文件转换示例：

```vue
<!-- 转换前 -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<!-- 转换后 -->
<script setup lang="ts">
import { ref } from 'vue'
const count = ref<number>(0)
</script>
```

### TypeScript 配置文件示例：

```typescript
// src/types/index.ts
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}
```

### 渐进式迁移策略：

1. **第一阶段**: 只转换工具函数和配置文件
2. **第二阶段**: 转换 Store 和 API 模块
3. **第三阶段**: 转换组件和页面
4. **第四阶段**: 添加全局类型定义

> 💡 **建议**: 如果是新项目，建议直接使用 TypeScript 模板。如果是现有项目升级，建议采用渐进式迁移策略。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🔗 相关链接

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vant 官方文档](https://vant-ui.github.io/vant/)