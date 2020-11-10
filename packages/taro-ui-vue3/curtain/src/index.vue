<template>
  <view
    v-bind="$attrs"
    :class="curtainClasses"
    @tap="(e) => { e.stopPropagation() }"
  >
    <view class="at-curtain__container">
      <view class="at-curtain__body">
        <slot />
        <view
          :class="btnCloseClasses"
          @tap="handleClose"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { CommonEvent } from '@tarojs/components/types/common'
import { AtCurtainProps } from "@taro-ui-vue3/types/curtain"

export default defineComponent({
  name: "AtCurtain",

  emits: ['close'],

  props: {
    isOpened: Boolean,
    closeBtnPosition: {
      type: String as PropType<AtCurtainProps['closeBtnPosition']>,
      default: 'bottom'
    }
  },

  setup(props: AtCurtainProps, { emit }) {

    const curtainClasses = computed(() => ({
      'at-curtain': true,
      'at-curtain--closed': !props.isOpened
    }))

    const btnCloseClasses = computed(() => ({
      'at-curtain__btn-close': true,
      [`at-curtain__btn-close--${props.closeBtnPosition}`]: props.closeBtnPosition
    }))

    function handleClose(e: CommonEvent) {
      e.stopPropagation()
      emit('close', e)
    }

    return {
      curtainClasses,
      btnCloseClasses,
      handleClose
    }
  }

})
</script>