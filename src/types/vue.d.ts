// Vue 组件类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// CSS 模块类型声明
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// 图片类型声明
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff' {
  const content: string
  export default content
}
