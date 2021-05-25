<template>
  <view class="at-action-sheet__body">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const AtActionSheetBody = defineComponent({
  name: "AtActionSheetBody"
})

export default AtActionSheetBody
</script>