<template>
  <view :class="pageClass">
    <view class="doc-header">
      <view class="doc-header__title">{{ headerTitle }}</view>
    </view>

    <view
      class="doc-body"
      :style="bodyStyle"
    >
      <slot />
    </view>

    <slot name="extra" />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue"
import "./index.scss"

export default defineComponent({
  name: 'Page',

  props: {
    headerTitle: {
      type: String,
      default: '标题',
      required: true
    }
  },

  setup(props, { attrs }) {

    const pageClass = computed(() => ({
      'page': true,
      [`${attrs.class}`]: attrs.class,
    }))

    const bodyStyle = computed(() => attrs.style)

    return {
      ...toRefs(props),
      pageClass,
      bodyStyle
    }
  }
})

</script>

<style>
</style>