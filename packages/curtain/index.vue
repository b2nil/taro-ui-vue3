<template>
  <view
    v-bind="$attrs"
    :class="['at-curtain', { 'at-curtain--closed': !isOpened }]"
    @tap="(e) => { e.stopPropagation() }"
  >
    <view class="at-curtain__container">
      <view class="at-curtain__body">
        <slot />
        <view
          :class="['at-curtain__btn-close', closeBtnClasses]"
          @tap="handleClose"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from "vue"
import { CommonEvent } from '@tarojs/components/types/common'
import { AtCurtainProps } from "@taro-ui-vue3/types/curtain"

const AtCurtain = defineComponent({
  name: "AtCurtain",

  emits: ['close'],

  props: {
    isOpened: Boolean,
    closeBtnPosition: {
      type: String as PropType<AtCurtainProps['closeBtnPosition']>,
      default: 'bottom',
      validator: (pos: string) => [
        "top", "top-left", "top-right",
        "bottom", "bottom-left", "bottom-right"
      ].includes(pos)
    }
  },

  setup(props, { emit }) {

    const closeBtnClasses = computed(() => {

      const pos = [
        "top", "top-left", "top-right",
        "bottom", "bottom-left", "bottom-right"
      ].includes(props.closeBtnPosition!)
        ? props.closeBtnPosition
        : "top-right"

      return {
        [`at-curtain__btn-close--${pos}`]: Boolean(props.closeBtnPosition)
      }
    })

    function handleClose(e: CommonEvent) {
      e.stopPropagation()
      emit('close', e)
    }

    return {
      isOpened: toRef(props, 'isOpened'),
      handleClose,
      closeBtnClasses
    }
  }

})

export default AtCurtain
</script>