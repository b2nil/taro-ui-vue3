<template>
  <view
    v-bind="$attrs"
    class="at-action-sheet__header"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AtActionSheetHeader"
})
</script>