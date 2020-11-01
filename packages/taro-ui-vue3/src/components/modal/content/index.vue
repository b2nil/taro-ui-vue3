
<template>
  <scroll-view
    :class="rootClasses"
    scroll-y
  >
    <slot />
  </scroll-view>
</template>

<script lang="ts">
import { defineComponent, computed, h } from 'vue'

import { AtModalContentProps } from 'types/modal'


export default defineComponent({

  name: "AtModalContent",



  setup(props: AtModalContentProps, { slots }) {
    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-modal__content': true,
    }))

    return () => {
      rootClasses
    }
  }

})
</script>
