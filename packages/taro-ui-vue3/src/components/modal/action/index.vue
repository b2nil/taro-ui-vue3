<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <view class="at-modal__action">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AtModalActionProps } from "types/modal"

export default defineComponent({
  name: "AtModalAction",

  props: {
    isSimple: { type: Boolean, default: false, required: true }
  },

  setup(props: AtModalActionProps) {

    const rootClasses = computed(() => ({
      'at-modal__footer': true,
      'at-modal__footer--simple': props.isSimple
    }))

    return {
      rootClasses
    }
  }
})
</script>

