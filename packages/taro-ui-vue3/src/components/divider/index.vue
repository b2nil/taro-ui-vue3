<template>
  <view
    :class="rootClasses"
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
import { defineComponent, computed, CSSProperties, PropType } from "../../api"
import { AtDividerProps } from 'types/divider'


import { pxTransform, mergeStyle } from "../../utils/common"

export default defineComponent({
  name: "AtDivider",



  props: {
    // 参数
    content: {
      type: String as PropType<AtDividerProps['content']>,
      default: '',
    },
    height: {
      type: Number as PropType<AtDividerProps['height']>,
      default: 0,
    },
    fontColor: {
      type: String as PropType<AtDividerProps['fontColor']>,
      default: '',
    },
    fontSize: {
      type: Number as PropType<AtDividerProps['fontSize']>,
      default: 0,
    },
    lineColor: {
      type: String as PropType<AtDividerProps['lineColor']>,
      default: '',
    }
  },

  setup(props: AtDividerProps, { slots }) {
    return () => {
      const rootClasses = computed(() => ({
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
        rootClasses,
        rootStyle,
        fontStyle,
        lineStyle
      }
    }
  }

})
</script>

