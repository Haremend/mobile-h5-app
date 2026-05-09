<template>
  <van-nav-bar
    :title="title"
    :left-arrow="showLeftArrow"
    :right-text="rightText"
    :fixed="fixed"
    :placeholder="placeholder"
    :border="border"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template v-if="$slots.left" #left>
      <slot name="left"></slot>
    </template>
    <template v-if="$slots.right" #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title?: string
  showLeftArrow?: boolean
  rightText?: string
  fixed?: boolean
  placeholder?: boolean
  border?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  showLeftArrow: true,
  rightText: '',
  fixed: true,
  placeholder: true,
  border: true
})

const emit = defineEmits<{
  'click-left': []
  'click-right': []
}>()
const router = useRouter()

const onClickLeft = () => {
  emit('click-left')
  // 默认返回上一页
  router.back()
}

const onClickRight = () => {
  emit('click-right')
}
</script>
