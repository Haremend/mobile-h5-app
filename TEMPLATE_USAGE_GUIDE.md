# Vue3 H5 框架模板使用指南

本文档指导如何将现有的购物 App 模板转换为其他类型的移动端 H5 应用。

## ❓ Q1: 如何将购物 App 模板转换为其他类型的 App（如文旅中心）？

### 📝 回答：

这是一个完整的模板重构流程，分为以下几个步骤：

> 💡 **路由模式说明**：本模板默认使用 HTML5 History 模式（无 # 号路由），URL 更美观，适合现代 H5 应用开发。

## 🚦 第零步：了解路由模式

### 0.1 当前路由配置

本模板默认使用 **HTML5 History 模式**（无 # 号路由）：

```javascript
// src/router/index.js
const router = createRouter({
  history: createWebHistory(), // 无 # 号路由
  routes
})
```

### 0.2 URL 格式对比

| 路由模式 | 示例 URL | 特点 |
|---------|---------|------|
| Hash 模式 | `https://domain.com/#/path` | 兼容性好，但 URL 不够美观 |
| History 模式 | `https://domain.com/path` | URL 简洁，现代 H5 应用推荐 |

### 0.3 服务器配置要求

使用 History 模式需要服务器支持，确保所有路由都指向 `index.html`：

```nginx
# Nginx 配置示例
location / {
  try_files $uri $uri/ /index.html;
}
```

## 🔄 第一步：基础配置修改

### 1.1 修改项目基本信息
```bash
# 修改 package.json
{
  "name": "cultural-tourism-app",  # 改为你的项目名称
  "version": "1.0.0",
  "description": "文旅中心 H5 应用",  # 修改描述
}
```

### 1.2 修改环境变量
```bash
# .env 文件
VITE_APP_TITLE=文旅中心
VITE_APP_VERSION=1.0.0

# .env.development
VITE_API_BASE_URL=http://localhost:8080

# .env.production
VITE_API_BASE_URL=https://your-api-domain.com
```

### 1.3 修改全局样式变量
```css
/* src/assets/styles/variables.css */
:root {
  /* 修改主题色 */
  --color-primary: #2e8b57; /* 文旅绿色主题 */
  --color-primary-light: #e8f5e8;
}
```

## 🎨 第二步：页面内容重构

### 2.1 删除不需要的页面
```bash
# 删除购物相关页面
rm src/views/cart/index.vue
rm src/views/category/index.vue
rm src/views/detail/index.vue

# 删除相关 API
rm src/api/modules/home.js  # 如果是购物相关
```

### 2.2 修改首页内容
```vue
<!-- src/views/home/index.vue -->
<template>
  <div class="page-home">
    <AppNavBar title="文旅中心" :show-left-arrow="false" />
    <div class="page-content">
      <!-- 文旅 banner -->
      <div class="banner-section">
        <!-- 替换为文旅相关轮播图 -->
      </div>

      <!-- 文旅功能板块 -->
      <div class="cultural-sections">
        <van-grid :column-num="2">
          <van-grid-item icon="location-o" text="景点介绍" @click="goToAttractions" />
          <van-grid-item icon="notes-o" text="文化历史" @click="goToCulture" />
          <van-grid-item icon="photo-o" text="图片展示" @click="goToGallery" />
          <van-grid-item icon="phone-o" text="联系我们" @click="goToContact" />
        </van-grid>
      </div>
    </div>
    <AppTabBar />
  </div>
</template>
```

### 2.3 创建新的业务页面
```bash
# 创建新的页面目录
mkdir -p src/views/attractions
mkdir -p src/views/culture
mkdir -p src/views/gallery
mkdir -p src/views/contact

# 创建对应的页面文件
touch src/views/attractions/index.vue
touch src/views/culture/index.vue
touch src/views/gallery/index.vue
touch src/views/contact/index.vue
```

## 🛣️ 第三步：路由配置更新

### 3.1 更新路由表
```javascript
// src/router/index.js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '文旅中心',
      showTabBar: true
    }
  },
  {
    path: '/attractions',
    name: 'Attractions',
    component: () => import('@/views/attractions/index.vue'),
    meta: {
      title: '景点介绍',
      showTabBar: true
    }
  },
  {
    path: '/culture',
    name: 'Culture',
    component: () => import('@/views/culture/index.vue'),
    meta: {
      title: '文化历史',
      showTabBar: true
    }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('@/views/gallery/index.vue'),
    meta: {
      title: '图片展示',
      showTabBar: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/contact/index.vue'),
    meta: {
      title: '联系我们',
      showTabBar: true
    }
  },
  // ... 404 页面保持不变
]
```

### 3.2 更新底部导航
```vue
<!-- src/components/AppTabBar.vue -->
<template>
  <van-tabbar v-if="showTabBar" v-model="active" fixed>
    <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="attractions" icon="location-o">景点</van-tabbar-item>
    <van-tabbar-item name="culture" icon="notes-o">文化</van-tabbar-item>
    <van-tabbar-item name="gallery" icon="photo-o">相册</van-tabbar-item>
  </van-tabbar>
</template>
```

## 🔗 第四步：支持外部链接访问

> 💡 **路由模式优势**：使用 HTML5 History 模式（无 # 号），URL 更简洁美观，适合嵌入到微信小程序等外部应用中。

### 4.1 创建独立页面（用于外部嵌入）
```bash
# 创建可在外部访问的独立页面
mkdir -p src/views/external
mkdir -p src/views/attraction-detail
touch src/views/external/attraction.vue
touch src/views/attraction-detail/index.vue
```

### 4.2 配置独立路由
```javascript
// src/router/index.js 添加
{
  path: '/external/attraction/:id',
  name: 'ExternalAttraction',
  component: () => import('@/views/external/attraction.vue'),
  meta: {
    title: '景点详情',
    showTabBar: false,  // 外部访问时不显示底部导航
    requiresAuth: false
  }
},
{
  path: '/attraction/:id',
  name: 'AttractionDetail',
  component: () => import('@/views/attraction-detail/index.vue'),
  meta: {
    title: '景点详情',
    showTabBar: true
  }
}
```

### 4.3 创建无导航的独立页面模板
```vue
<!-- src/views/external/attraction.vue -->
<template>
  <div class="page-external">
    <!-- 无顶部导航栏，适合嵌入其他应用 -->
    <div class="page-content">
      <div class="attraction-detail">
        <h1>{{ attraction.name }}</h1>
        <div class="image-gallery">
          <!-- 图片展示 -->
        </div>
        <div class="description">
          {{ attraction.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-external {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}
/* 无底部安全区域留白，适合嵌入 */
.page-content {
  padding-bottom: 0;
}
</style>
```

## 🎯 第五步：API 接口适配

### 5.1 删除不需要的 API
```bash
# 删除购物相关 API
rm src/api/modules/home.js
rm src/api/modules/user.js  # 如果不需要用户系统
```

### 5.2 创建新的 API 模块
```bash
mkdir -p src/api/modules
touch src/api/modules/attractions.js
touch src/api/modules/culture.js
touch src/api/modules/gallery.js
```

```javascript
// src/api/modules/attractions.js
import { get } from '@/utils/request'

export const getAttractions = () => get('/attractions')
export const getAttractionDetail = (id) => get(`/attractions/${id}`)

// src/api/modules/culture.js
export const getCultureArticles = () => get('/culture/articles')
export const getCultureDetail = (id) => get(`/culture/articles/${id}`)

// src/api/modules/gallery.js
export const getGalleryImages = (category) => get('/gallery', { category })
```

## 📱 第六步：适配外部应用调用

### 6.1 URL 设计规范
```
# 内部页面访问（无 # 号路由）
https://your-domain.com/attractions
https://your-domain.com/attraction/123

# 外部嵌入页面（无导航，无 # 号路由）
https://your-domain.com/external/attraction/123
https://your-domain.com/external/culture/456
```

### 6.2 添加页面参数支持
```javascript
// 在页面中支持 URL 参数
import { useRoute } from 'vue-router'

const route = useRoute()
const attractionId = route.params.id
const category = route.query.category
```

## 🎨 第七步：UI 主题定制

### 7.1 修改全局样式
```css
/* src/assets/styles/variables.css */
:root {
  /* 文旅主题色 */
  --color-primary: #2e8b57;
  --color-primary-light: #e8f5e8;

  /* 页面背景 */
  --color-bg-page: #f8f9fa;
  --color-bg-card: #ffffff;

  /* 文字颜色 */
  --color-text-primary: #2c3e50;
  --color-text-regular: #5a6b7c;
}
```

### 7.2 创建文旅专用组件
```vue
<!-- src/components/CulturalCard.vue -->
<template>
  <div class="cultural-card">
    <div class="card-image">
      <img :src="item.image" :alt="item.title" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ item.title }}</h3>
      <p class="card-description">{{ item.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.cultural-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
```

## 🧹 第八步：清理不需要的文件

### 8.1 删除购物相关资源
```bash
# 删除模拟数据
rm -f src/utils/mock-data.js

# 删除购物车相关 store
rm src/stores/cart.js  # 如果存在

# 删除商品相关的 composable
rm -f src/composables/useCart.js
```

### 8.2 更新 README.md
```markdown
# 文旅中心 H5 应用

## 修改说明
- 基于 Vue3 H5 框架模板重构
- 适配文旅业务场景
- 支持外部应用嵌入
```

## 🚀 第九步：测试和部署

### 9.1 本地测试
```bash
# 安装依赖
npm install

# 启动开发环境
npm run dev

# 测试外部链接（无 # 号路由）
http://localhost:3000/external/attraction/1
```

### 9.2 生产构建
```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📋 第十步：提供给外部应用

### 10.1 生成外部访问链接
```
# 微信小程序或其他应用调用（无 # 号路由）
https://your-domain.com/external/attraction/123
https://your-domain.com/external/culture/456

# 带参数传递
https://your-domain.com/external/attraction/123?source=wechat&theme=dark
```

### 10.2 配置 CORS（如果需要）
```javascript
// vite.config.js
server: {
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  }
}
```

## 🔄 总结

通过以上 10 个步骤，你可以将购物 App 模板完全转换为其他类型的 H5 应用：

1. ✅ **基础配置** - 修改项目名称、主题色等
2. ✅ **页面重构** - 删除不需要的页面，创建新的业务页面
3. ✅ **路由更新** - 配置新的路由表和导航
4. ✅ **外部链接** - 支持外部应用嵌入访问
5. ✅ **API 适配** - 创建新的业务接口
6. ✅ **外部调用** - 设计外部访问 URL
7. ✅ **UI 定制** - 适配新的业务主题
8. ✅ **清理文件** - 删除不需要的资源
9. ✅ **测试部署** - 验证功能完整性
10. ✅ **外部提供** - 生成外部访问链接

这个模板提供了完整的基础架构，你只需要按照业务需求进行内容替换和功能扩展即可。