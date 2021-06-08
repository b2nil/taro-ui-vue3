<template>
  <view
    v-bind="$attrs"
    :class="['at-list', {
      'at-list--no-border': !hasBorder
    }]"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { AtListProps } from "@taro-ui-vue3/types/list"

const AtList = defineComponent({
  name: "AtList",

  props: {
    hasBorder: { type: Boolean, default: true },
  },

  setup(props: AtListProps) {
    return {
      ...toRefs(props)
    }
  }
})

export default AtList
</script>

