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

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showLeftArrow: {
    type: Boolean,
    default: true
  },
  rightText: {
    type: String,
    default: ''
  },
  fixed: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click-left', 'click-right'])
const router = useRouter()

const onClickLeft = () => {
  emit('click-left')
  // 默认返回上一页
  if (!event.defaultPrevented) {
    router.back()
  }
}

const onClickRight = () => {
  emit('click-right')
}
</script>
