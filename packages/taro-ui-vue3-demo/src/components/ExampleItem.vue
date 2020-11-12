<template>
  <view
    class="example-item"
    v-bind="$attrs"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ExampleItem"
})
</script>