<template>
  <view class="panel">
    <view
      v-if="title"
      class="panel__title"
    >{{ title }}</view>
    <slot name="controller" />
    <view
      :class="contentClass"
      :style="contentStyle"
    >
      <slot />
    </view>
    <slot />
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'

export default defineComponent({
  name: "Panel",

  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    noPadding: Boolean
  },

  setup(props, { slots, attrs }) {
    const contentClass = computed(() => ({
      'panel__content': true,
      'no-padding': props.noPadding
    }))

    const contentStyle = computed(() => attrs.style)

    return {
      title: toRef(props, 'title'),
      contentClass,
      contentStyle
    }
  }
})
</script>

<style>
</style>