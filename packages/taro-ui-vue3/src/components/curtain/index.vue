<template>
  <view
    :class="curtainClass"
    :style="customStyle"
    @tap="(e) => { e.stopPropagation() }"
  >
    <view class="at-curtain__container">
      <view class="at-curtain__body">
        <slot />
        <view
          :class="btnCloseClass"
          @tap="handleClose"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from "vue"
import { CommonEvent } from '@tarojs/components/types/common'
import { AtCurtainProps } from 'types/curtain'

import AtComponentWithDefaultProps from '../mixins'

export default defineComponent({
  name: "AtCurtain",

  mixins: [AtComponentWithDefaultProps],

  props: {
    // 参数
    isOpened: Boolean,
    closeBtnPosition: {
      type: String as () => AtCurtainProps['closeBtnPosition'],
      default: 'bottom' as AtCurtainProps['closeBtnPosition']
    },
    // 事件
    onClose: {
      type: Function as unknown as () => AtCurtainProps['onClose'],
      default: () => () => { }
    }
  },

  setup(props: AtCurtainProps, { slots }) {

    function handleClose(e: CommonEvent) {
      e.stopPropagation()
      props.onClose(e)
    }

    return () => {
      const curtainClass = computed(() => ({
        [props.className]: true,
        'at-curtain--closed': !props.isOpened,
        'at-curtain': true,
      }))

      const btnCloseClass = computed(() => ({
        [`at-curtain__btn-close--${props.closeBtnPosition}`]: props.closeBtnPosition,
        'at-curtain__btn-close': true,
      }))

      return {
        customStyle: toRef(props, 'customStyle'),
        curtainClass,
        btnCloseClass,
        handleClose
      }
    }
  }

})
</script>