<template>
  <view class="at-action-sheet__header">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const AtActionSheetHeader = defineComponent({
  name: "AtActionSheetHeader"
})

export default AtActionSheetHeader
</script>