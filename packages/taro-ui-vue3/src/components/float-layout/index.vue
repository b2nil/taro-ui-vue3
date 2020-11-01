<template>
  <view
    :class="rootClasses"
    @touch-move="handleTouchMove"
  >
    <!-- overlay -->
    <view
      class="at-float-layout__overlay"
      @tap="close"
    />

    <!-- container layout -->
    <view class="at-float-layout__container layout">
      <!-- header -->
      <view
        v-if="title"
        class="layout-header"
      >
        <text class="layout-header__title">{{ title }}</text>
        <view
          class="layout-header__btn-close"
          @tap="close"
        />
      </view>

      <!-- body -->
      <view class="layout-body">
        <scroll-view
          class="layout-body__content"
          :scroll-x="scrollX"
          :scroll-y="scrollY"
          :scroll-top="scrollTop"
          :scroll-left="scrollLeft"
          :upper-threshold="upperThreshold"
          :lower-threshold="lowerThreshold"
          :scroll-with-animation="scrollWithAnimation"
          @scroll="onScroll"
          @scroll-to-lower="onScrollToLower"
          @scroll-to-upper="onScrollToUpper"
        >
          <slot />
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick, watch, toRefs, PropType } from "../../api"
import { handleTouchScroll } from "../../utils/common"
import { CommonEvent } from '@tarojs/components/types/common'
import { AtFloatLayoutProps } from 'types/float-layout'



export default defineComponent({
  name: "AtFloatLayout",


  props: {
    // 参数
    isOpened: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String as PropType<AtFloatLayoutProps['title']>,
      default: '',
    },
    scrollX: Boolean,
    scrollY: {
      type: Boolean,
      default: true,
    },
    scrollTop: Number as PropType<AtFloatLayoutProps['scrollTop']>,
    scrollLeft: Number as PropType<AtFloatLayoutProps['scrollLeft']>,
    upperThreshold: Number as PropType<AtFloatLayoutProps['upperThreshold']>,
    lowerThreshold: Number as PropType<AtFloatLayoutProps['lowerThreshold']>,
    scrollWithAnimation: Boolean,
    // 事件
    onClose: Function as PropType<AtFloatLayoutProps['onClose']>,
    onScroll: Function as PropType<AtFloatLayoutProps['onScroll']>,
    onScrollToUpper: Function as PropType<AtFloatLayoutProps['onScrollToUpper']>,
    onScrollToLower: Function as PropType<AtFloatLayoutProps['onScrollToLower']>,
  },

  setup(props: AtFloatLayoutProps, { slots }) {
    const _isOpened = ref<boolean>(props.isOpened)

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-float-layout--active': _isOpened.value,
      'at-float-layout': true,
    }))

    watch(() => props.isOpened, (val, oldVal) => {
      if (val === oldVal) {
        handleTouchScroll(val)
      }

      if (val !== _isOpened.value) {
        _isOpened.value = val
      }
    })

    function handleClose() {
      if (typeof props.onClose === 'function') {
        props.onClose()
      }
    }

    function close() {
      _isOpened.value = false
      nextTick(handleClose)
    }

    function handleTouchMove(e: CommonEvent) {
      e.stopPropagation()
    }


    return {
      ...toRefs(props),
      rootClasses,
      close,
      handleTouchMove
    }
  }

})
</script>

