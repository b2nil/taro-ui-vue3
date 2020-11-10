<template>
  <view
    v-bind="$attrs"
    class="at-divider"
    :style="rootStyle"
  >
    <view
      class="at-divider__content"
      :style="fontStyle"
    >
      <view v-if="content">{{ content }}</view>
      <slot v-else />
    </view>
    <view
      class="at-divider__line"
      :style="lineStyle"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from "vue"
import { AtDividerProps } from "@taro-ui-vue3/types/divider"
import { pxTransform } from "@taro-ui-vue3/utils/common"

export default defineComponent({
  name: "AtDivider",

  props: {
    // 参数
    content: {
      type: String as PropType<AtDividerProps['content']>,
      default: '',
    },
    height: {
      type: [Number, String] as PropType<AtDividerProps['height']>,
      default: 0,
    },
    fontColor: {
      type: String as PropType<AtDividerProps['fontColor']>,
      default: '',
    },
    fontSize: {
      type: [Number, String] as PropType<AtDividerProps['fontSize']>,
      default: 0,
    },
    lineColor: {
      type: String as PropType<AtDividerProps['lineColor']>,
      default: '',
    }
  },

  setup(props: AtDividerProps) {
    const rootStyle = computed(() => ({
      height: props.height ? `${pxTransform(Number(props.height))}` : ''
    }))

    const fontStyle = computed(() => ({
      color: props.fontColor,
      fontSize: props.fontSize ? `${pxTransform(Number(props.fontSize))}` : ''
    }))

    const lineStyle = computed(() => ({
      backgroundColor: props.lineColor
    }))

    return {
      content: toRef(props, 'content'),
      rootStyle,
      fontStyle,
      lineStyle
    }
  }

})
</script>

