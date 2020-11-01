<template>
  <text
    :class="rootClasses"
    :style="rootStyle"
    @tap="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, computed, h, PropType } from "../../api"
import { AtIconProps } from "types/icon"
import { pxTransform, mergeStyle } from "../../utils/common"


export default defineComponent({
  name: "AtIcon",



  props: {
    prefixclass: {
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
    },
    onClick: {
      type: Function as PropType<AtIconProps['onClick']>,
      default: () => () => { }
    }
  },

  setup(props: AtIconProps) {

    const iconName = computed(() => props.value
      ? `${props.prefixClass}-${props.value}`
      : ''
    )

    const rootClasses = computed(() => ({
      [props.prefixClass]: true,
      [props.className]: true,
      [iconName.value]: true,
    }))

    const rootStyle = computed(() => mergeStyle(props.customStyle as object, {
      fontSize: `${pxTransform(parseInt(String(props.size)) * 2)}`,
      color: props.color
    }))

    function handleClick() {
      props.onClick && props.onClick(arguments as any)
    }

    return {
      rootClasses,
      rootStyle,
      handleClick
    }
  }
})
</script>

