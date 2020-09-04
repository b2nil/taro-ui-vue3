<template>
  <text
    :class="rootClass"
    :style="rootStyle"
    @tap="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent, computed, h } from "vue"
import { AtIconProps } from "types/icon"
import { pxTransform, mergeStyle } from "../../utils/common"
import AtComponentWithDefaultProps from "../mixins"

export default defineComponent({
  name: "AtIcon",

  mixins: [AtComponentWithDefaultProps],

  props: {
    prefixclass: {
      type: String as () => AtIconProps['prefixClass'],
      default: 'at-icon'
    },
    value: {
      type: String as () => AtIconProps['value'],
      default: ''
    },
    color: {
      type: String as () => AtIconProps['color'],
      default: ''
    },
    size: {
      type: [String, Number] as unknown as () => AtIconProps['size'],
      default: 24
    },
    onClick: {
      type: Function as unknown as () => AtIconProps['onClick'],
      default: () => () => { }
    }
  },

  setup(props: AtIconProps) {

    const iconName = computed(() => props.value
      ? `${props.prefixClass}-${props.value}`
      : ''
    )

    const rootClass = computed(() => ({
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
      rootClass,
      rootStyle,
      handleClick
    }
  }
})
</script>

