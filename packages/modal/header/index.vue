<template>
  <view
    v-bind="$attrs"
    class="at-modal__header"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "AtModalHeader"
})
</script>
