<template>
  <scroll-view
    v-bind="$attrs"
    :scrollY="true"
    class="at-modal__content"
  >
    <slot />
  </scroll-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "AtModalContent"
})
</script>
