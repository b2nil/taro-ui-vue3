<template>
  <view class="at-countdown__item">
    <!-- countdown time-box -->
    <view class="at-countdown__time-box">
      <text class="at-countdown__time">{{ formatNum(num) }}</text>
    </view>

    <!-- separator -->
    <text class="at-countdown__separator">{{ separator }}</text>
  </view>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from "vue"
import { AtCountdownItemProps } from "@taro-ui-vue3/types/countdown"

const AtCountdownItem = defineComponent({
  name: "AtCountdownItem",

  props: {
    num: {
      type: Number as PropType<AtCountdownItemProps['num']>,
      default: 0
    },
    separator: {
      type: String as PropType<AtCountdownItemProps['separator']>,
      default: ':'
    },
  },

  setup(props: AtCountdownItemProps) {

    function formatNum(num: number): string {
      return num <= 9 ? `0${num}` : `${num}`
    }

    return {
      ...toRefs(props),
      formatNum
    }
  }
})

export default AtCountdownItem
</script>