<template>
  <view :class="rootClasses">
    <view class="at-modal__action">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AtModalActionProps } from 'types/modal'


export default defineComponent({
  name: "AtModalAction",



  props: {
    isSimple: { type: Boolean, default: false, required: true }
  },

  setup(props: AtModalActionProps, { slots }) {

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-modal__footer--simple': props.isSimple,
      'at-modal__footer': true,
    }))

    return {
      rootClasses
    }
  }
})
</script>

