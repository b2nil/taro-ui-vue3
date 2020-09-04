<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent, computed, h } from 'vue'
import { AtModalHeaderProps } from 'types/modal'
import AtComponentWithDefaultProps from '../../mixins'

export default defineComponent({
  name: "AtModalHeader",

  mixins: [AtComponentWithDefaultProps],

  setup(props: AtModalHeaderProps, { slots }) {
    const rootClass = computed(() => ({
      [props.className]: true,
      'at-modal__header': true,
    }))

    return {
      rootClass
    }
  }
})
</script>
