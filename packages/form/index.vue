<template>
  <form
    v-bind="$attrs"
    class="at-form"
    :report-submit="this.reportSubmit"
    @submit="(e) => $emit('submit', e)"
    @reset="(e) => $emit('reset', e)"
  >
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { CommonEvent } from "@tarojs/components/types/common"

const AtForm = defineComponent({
  name: "AtForm",

  emits: {
    'submit'(e: CommonEvent) {
      return !!(e && typeof e === 'object')
    },
    'reset'(e: CommonEvent) {
      return !!(e && typeof e === 'object')
    }
  },

  props: {
    reportSubmit: Boolean
  }
})

export default AtForm
</script>

