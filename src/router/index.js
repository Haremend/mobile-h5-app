/**
 * 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '@/utils/auth'

// 路由懒加载
const Home = () => import('@/views/home/index.vue')
const Category = () => import('@/views/category/index.vue')
const Cart = () => import('@/views/cart/index.vue')
const Profile = () => import('@/views/profile/index.vue')
const Login = () => import('@/views/login/index.vue')
const Detail = () => import('@/views/detail/index.vue')
const NotFound = () => import('@/views/404/index.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      requiresAuth: false,
      keepAlive: true,
      showTabBar: true
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: '分类',
      requiresAuth: false,
      keepAlive: true,
      showTabBar: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      title: '购物车',
      requiresAuth: true,
      keepAlive: false,
      showTabBar: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '个人中心',
      requiresAuth: true,
      keepAlive: true,
      showTabBar: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false,
      keepAlive: false,
      showTabBar: false
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '详情',
      requiresAuth: false,
      keepAlive: false,
      showTabBar: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面不存在',
      requiresAuth: false,
      keepAlive: false,
      showTabBar: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || import.meta.env.VITE_APP_TITLE

  // 需要登录但未登录 -> 跳转登录页，记录 redirect
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录访问登录页 -> 跳转首页
  if (to.path === '/login' && isLoggedIn()) {
    next('/')
    return
  }

  next()
})

export default router
