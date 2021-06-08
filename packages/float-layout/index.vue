<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    :catchMove="true"
    @touchmove="handleTouchMove"
  >
    <!-- overlay -->
    <view
      class="at-float-layout__overlay"
      v-bind="disableScroll"
      @tap="handleClose"
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
          @tap="handleClose"
        />
      </view>

      <!-- body -->
      <view class="layout-body">
        <scroll-view
          class="layout-body__content"
          v-bind="trapScroll"
          :scroll-x="scrollX"
          :scroll-y="scrollY"
          :scroll-top="scrollTop"
          :scroll-left="scrollLeft"
          :upper-threshold="upperThreshold"
          :lower-threshold="lowerThreshold"
          :scroll-with-animation="scrollWithAnimation"
          @scroll="(e) => $emit('scroll', e)"
          @scrolltolower="(e) => $emit('scroll-to-lower', e)"
          @scrolltoupper="(e) => $emit('scroll-to-upper', e)"
        >
          <slot />
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick, watch, toRefs, PropType } from "vue"
import { AtFloatLayoutProps } from "@taro-ui-vue3/types/float-layout"
import { CommonEvent } from '@tarojs/components/types/common'
import { handleTouchScroll } from "@taro-ui-vue3/utils"

const AtFloatLayout = defineComponent({
  name: "AtFloatLayout",

  emits: {
    'close': null,
    'scroll'(e: CommonEvent) {
      return !!(e && typeof e === 'object')
    },
    'scroll-to-upper'(e: CommonEvent) {
      return !!(e && typeof e === 'object')
    },
    'scroll-to-lower'(e: CommonEvent) {
      return !!(e && typeof e === 'object')
    }
  },

  props: {
    title: String as PropType<AtFloatLayoutProps['title']>,
    scrollWithAnimation: Boolean,
    isOpened: Boolean,
    scrollX: Boolean,
    scrollY: {
      type: Boolean,
      default: true,
    },
    scrollTop: Number as PropType<AtFloatLayoutProps['scrollTop']>,
    scrollLeft: Number as PropType<AtFloatLayoutProps['scrollLeft']>,
    upperThreshold: Number as PropType<AtFloatLayoutProps['upperThreshold']>,
    lowerThreshold: Number as PropType<AtFloatLayoutProps['lowerThreshold']>
  },

  setup(props: AtFloatLayoutProps, { emit }) {
    const _isOpened = ref<boolean>(props.isOpened)

    const rootClasses = computed(() => (['at-float-layout', {
      'at-float-layout--active': _isOpened.value
    }]))

    const disableScroll = process.env.TARO_ENV === 'alipay' ? { disableScroll: true } : {}
    const trapScroll = process.env.TARO_ENV === 'alipay' ? { trapScroll: true } : {}

    watch(() => props.isOpened, (val, oldVal) => {
      if (val === oldVal) {
        handleTouchScroll(val)
      }

      if (val !== _isOpened.value) {
        _isOpened.value = val
      }
    })

    function handleClose() {
      _isOpened.value = false
      nextTick(() => {
        emit('close')
      })
    }

    function handleTouchMove(e: CommonEvent) {
      e.stopPropagation()
    }

    return {
      ...toRefs(props),
      rootClasses,
      trapScroll,
      disableScroll,
      handleClose,
      handleTouchMove,
    }
  }
})

export default AtFloatLayout
</script>

