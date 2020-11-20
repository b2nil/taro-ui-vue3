<template>
  <form
    v-bind="$attrs"
    class="at-form"
    :report-submit="reportSubmit"
    @submit="(e) => $emit('submit', e)"
    @reset="(e) => $emit('reset', e)"
  >
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent, toRef } from "vue"
import { CommonEvent } from "@tarojs/components/types/common"
import { AtFormProps } from "types/form"

export default defineComponent({
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
  },

  setup(props: AtFormProps) {
    return {
      reportSubmit: toRef(props, 'reportSubmit')
    }
  }
})
</script>

