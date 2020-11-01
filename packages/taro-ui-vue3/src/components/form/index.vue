<template>
  <form
    :class="rootClasses"
    :style="customStyle"
    :report-submit="reportSubmit"
    @submit="onSubmit"
    @reset="onReset"
  >
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, PropType } from "../../api"
import { AtFormProps } from "types/form"

export default defineComponent({
  name: "AtForm",

  props: {
    reportSubmit: Boolean
  },

  setup(props: AtFormProps, { slots }) {

    function onSubmit() {
      if (typeof props.onSubmit === 'function') {
        props.onSubmit(arguments as any)
      }
    }

    function onReset() {
      if (typeof props.onReset === 'function') {
        props.onReset(arguments as any)
      }
    }

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-form': true,
    }))

    return {
      ...toRefs(props),
      rootClasses,
      onSubmit,
      onReset,
    }
  }
})
</script>

