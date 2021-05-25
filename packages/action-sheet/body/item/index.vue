<template>
  <view
    v-bind="$attrs"
    class="at-action-sheet__item"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { CommonEvent } from "@tarojs/components/types/common"

const AtActionSheetItem = defineComponent({
  name: "AtActionSheetItem",

  emits: ['click'],

  setup(_, { emit }) {

    function handleClick(e: CommonEvent) {
      emit('click', e)
    }

    return {
      handleClick
    }
  }
})

export default AtActionSheetItem
</script>