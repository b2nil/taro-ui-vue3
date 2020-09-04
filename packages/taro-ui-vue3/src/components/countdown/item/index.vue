<template>
  <view class="at-countdown__item">
    <view class="at-countdown__time-box">
      <text class="at-countdown__time">{{ formatNum(num) }}</text>
    </view>
    <text class="at-countdown__separator">{{ separator }}</text>
  </view>
</template>
<script lang="ts">
import { defineComponent, toRefs } from "vue"
import { AtCountdownItemProps } from 'types/countdown'

import AtComponentWithDefaultProps from '../../mixins'

export default defineComponent({
  name: "AtCountdownItem",

  mixins: [AtComponentWithDefaultProps],

  props: {
    // 参数
    num: {
      type: Number as () => AtCountdownItemProps['num'],
      default: 0,
      required: true
    },
    separator: {
      type: String as () => AtCountdownItemProps['separator'],
      default: ':',
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
</script>