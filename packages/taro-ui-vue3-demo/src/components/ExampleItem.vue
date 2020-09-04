<template>
  <view
    :class="rootClass"
    :style="rootStyle"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: "ExampleItem",

  setup(props, { attrs }) {

    const rootClass = computed(() => ({
      'example-item': true,
      [`${attrs.class}`]: attrs.class
    }))

    const rootStyle = computed(() => attrs.style)

    return {
      rootClass,
      rootStyle
    }
  }
})
</script>

<style>
</style>