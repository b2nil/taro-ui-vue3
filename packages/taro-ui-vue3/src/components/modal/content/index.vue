
<template>
  <scroll-view
    :class="rootClass"
    scroll-y
  >
    <slot />
  </scroll-view>
</template>

<script lang="ts">
import { defineComponent, computed, h } from 'vue'

import { AtModalContentProps } from 'types/modal'
import AtComponentWithDefaultProps from '../../mixins'

export default defineComponent({

  name: "AtModalContent",

  mixins: [AtComponentWithDefaultProps],

  setup(props: AtModalContentProps, { slots }) {
    const rootClass = computed(() => ({
      [props.className]: true,
      'at-modal__content': true,
    }))

    return () => {
      rootClass
    }
  }

})
</script>
