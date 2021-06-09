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
import { pxTransform } from "@taro-ui-vue3/utils"

const AtIcon = defineComponent({
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
      required: true
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

    function handleClick(e: CommonEvent) {
      emit('click', e)
    }

    return {
      rootClasses,
      rootStyle,
      handleClick
    }
  }
})

export default AtIcon
</script>

