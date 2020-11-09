<template>
  <view
    v-bind="$attrs"
    class="at-action-sheet__footer"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AtActionSheetFooter",

  emits: ['click'],

  setup(_, { emit }) {

    function handleClick(...args: any[]) {
      emit('click', ...args)
    }

    return {
      handleClick
    }
  }
})
</script>