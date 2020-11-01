<template>
  <view :class="rootClasses">
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent, computed, h } from 'vue'
import { AtModalHeaderProps } from 'types/modal'


export default defineComponent({
  name: "AtModalHeader",



  setup(props: AtModalHeaderProps, { slots }) {
    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-modal__header': true,
    }))

    return {
      rootClasses
    }
  }
})
</script>
