<template>
  <view
    :class="rootClass"
    :style="rootStyle"
  >
    <view
      class="at-divider__content"
      :style="fontStyle"
    >
      <slot v-if="content === ''" />
      <view v-else>{{ content }}</view>
    </view>
    <view
      class="at-divider__line"
      :style="lineStyle"
    />
  </view>
</template>
<script lang="ts">
import { defineComponent, computed, CSSProperties } from "vue"
import { AtDividerProps } from 'types/divider'

import AtComponentWithDefaultProps from '../mixins'
import { pxTransform, mergeStyle } from "../../utils/common"

export default defineComponent({
  name: "AtDivider",

  mixins: [AtComponentWithDefaultProps],

  props: {
    // 参数
    content: {
      type: String as () => AtDividerProps['content'],
      default: '',
    },
    height: {
      type: Number as () => AtDividerProps['height'],
      default: 0,
    },
    fontColor: {
      type: String as () => AtDividerProps['fontColor'],
      default: '',
    },
    fontSize: {
      type: Number as () => AtDividerProps['fontSize'],
      default: 0,
    },
    lineColor: {
      type: String as () => AtDividerProps['lineColor'],
      default: '',
    }
  },

  setup(props: AtDividerProps, { slots }) {
    return () => {
      const rootClass = computed(() => ({
        [props.className]: true,
        'at-divider': true
      }))

      const rootStyle = computed(() => (mergeStyle(props.customStyle, {
        height: props.height ? `${pxTransform(Number(props.height))}` : ''
      })))

      const fontStyle = computed(() => ({
        color: props.fontColor,
        fontSize: props.fontSize ? `${pxTransform(Number(props.fontSize))}` : ''
      }))

      const lineStyle = computed<CSSProperties>(() => ({
        backgroundColor: props.lineColor
      }))

      return {
        rootClass,
        rootStyle,
        fontStyle,
        lineStyle
      }
    }
  }

})
</script>

