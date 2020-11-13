<template>
  <text
    v-bind="$attrs"
    :class="rootClasses"
    :style="rootStyle"
    @tap="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { CommonEvent } from "@tarojs/components/types/common"
import { AtIconProps } from "@taro-ui-vue3/types/icon"
import { pxTransform } from "@taro-ui-vue3/utils/common"

export default defineComponent({
  name: "AtIcon",

  emits: {
    'click'(e: CommonEvent) {
      return !!(e && typeof e === 'object')
    }
  },

  props: {
    prefixClass: {
      type: String as PropType<AtIconProps['prefixClass']>,
      default: 'at-icon'
    },
    value: {
      type: String as PropType<AtIconProps['value']>,
      default: ''
    },
    color: {
      type: String as PropType<AtIconProps['color']>,
      default: ''
    },
    size: {
      type: [String, Number] as PropType<AtIconProps['size']>,
      default: 24
    }
  },

  setup(props: AtIconProps, { emit }) {

    const rootStyle = computed(() => ({
      color: props.color,
      fontSize: `${pxTransform(parseInt(String(props.size)) * 2)}`
    }))

    const rootClasses = computed(() => ({
      [`${props.prefixClass}`]: true,
      [`${props.prefixClass}-${props.value}`]: Boolean(props.value),
    }))

    function handleClick() {
      emit('click', arguments as any)
    }

    return {
      rootClasses,
      rootStyle,
      handleClick
    }
  }
})
</script>

