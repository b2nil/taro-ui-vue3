<template>
  <view
    v-bind="$attrs"
    class="at-action-sheet__body"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AtActionSheetBody"
})

</script>