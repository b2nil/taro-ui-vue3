<template>
  <view :class="rootClass">
    <view class="at-modal__action">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AtModalActionProps } from 'types/modal'
import AtComponentWithDefaultProps from '../../mixins'

export default defineComponent({
  name: "AtModalAction",

  mixins: [AtComponentWithDefaultProps],

  props: {
    isSimple: { type: Boolean, default: false, required: true }
  },

  setup(props: AtModalActionProps, { slots }) {

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-modal__footer--simple': props.isSimple,
      'at-modal__footer': true,
    }))

    return {
      rootClass
    }
  }
})
</script>

