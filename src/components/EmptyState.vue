<template>
  <div class="empty-state">
    <van-empty
      :image="image"
      :image-size="imageSize"
      :description="description"
    >
      <slot name="extra"></slot>
    </van-empty>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: 'default'
  },
  imageSize: {
    type: [Number, String, Array],
    default: 120
  },
  description: {
    type: String,
    default: '暂无数据'
  }
})
</script>

<style scoped>
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
</style>
