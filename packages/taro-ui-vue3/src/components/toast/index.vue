<template>
  <view
    v-if="_isOpened"
    :class="rootClass"
  >
    <!-- mask layer -->
    <view
      v-if="hasMask"
      class="at-toast__overlay"
    />

    <!-- body -->
    <view
      :class="bodyClass"
      :style="customStyle"
      @tap="handleClick"
    >
      <view class="toast-body-content">
        <!-- use real image -->
        <view
          v-if="realImg"
          class="toast-body-content__img"
        >
          <image
            class="toast-body-content__img-item"
            mode="scaleToFill"
            :src="realImg"
          />
        </view>

        <!-- use icon -->
        <view
          v-if="isRenderIcon"
          class="toast-body-content__icon"
        >
          <text :class="iconClass" />
        </view>

        <!-- content text -->
        <view
          v-if="text"
          class="toast-body-content__info"
        >
          <text>{{ text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch, computed, reactive, watchEffect, toRef } from "vue"

import { CommonEvent } from "@tarojs/components/types/common"
import { AtToastProps } from "types/toast"
import AtComponentWithDefaultProps from '../mixins'

import statusImg from './img.json'

export default defineComponent({
  name: "AtToast",
  mixins: [AtComponentWithDefaultProps],

  props: {
    isOpened: { type: Boolean, default: false, required: true },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    status: {
      type: String as () => AtToastProps['status'],
      default: '' as AtToastProps['status'],
      validator: (val: string) => ['', 'error', 'loading', 'success'].includes(val)
    },
    duration: { type: Number, default: 3000 },
    hasMask: Boolean,
    onClick: Function as unknown as () => AtToastProps['onClick'],
    onClose: Function as unknown as () => AtToastProps['onClick'],
  },

  setup(props: AtToastProps, { slots }) {
    const state = reactive({
      // @ts-ignore
      _timer: null as NodeJS.Timeout | null,
      _isOpened: props.isOpened
    })

    const realImg = computed(() => (props.image || statusImg[props.status!] || null))
    const isRenderIcon = computed(() => !!(props.icon && !(props.image || statusImg[props.status!])))

    const rootClass = computed(() => ({
      'at-toast': true,
      [props.className]: true,
    }))

    const bodyClass = computed(() => ({
      'toast-body': true,
      'at-toast__body--custom-image': props.image,
      'toast-body--text': !realImg.value && !props.icon,
      [`at-toast__body--${props.status}`]: !!props.status
    }))

    const iconClass = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon}`]: props.icon
    }))

    // watchEffect(() => handleChange(), { flush: 'sync' })

    watch(() => [
      props.isOpened,
      props.text,
      props.icon,
      props.duration,
      props.hasMask,
      props.image,
      props.status
    ], handleChange)

    function clearTimer() {
      if (state._timer) {
        clearTimeout(state._timer)
        state._timer = null
      }
    }

    function makeTimer(duration: number) {
      if (duration === 0) return

      state._timer = setTimeout(() => {
        close()
      }, +duration);
    }

    function close() {
      if (state._isOpened) {
        state._isOpened = false
        nextTick(handleClose)
        clearTimer()
      }
    }

    function handleClose(e?: CommonEvent) {
      if (typeof props.onClose === 'function') {
        props.onClose(e!)
      }
    }

    function handleClick(e: CommonEvent) {
      if (props.status === 'loading') return

      if (typeof props.onClick === 'function') {
        return props.onClick(e)
      }

      close()
    }

    function handleChange() {
      if (!props.isOpened) {
        close()
        return
      }

      if (!state._isOpened) {
        state._isOpened = true
      } else {
        clearTimer()
      }

      makeTimer(props.duration || 0)
    }

    return {
      _isOpened: toRef(state, '_isOpened'),
      customStyle: toRef(props, 'customStyle'),
      hasMask: toRef(props, 'hasMask'),
      text: toRef(props, 'text'),
      rootClass,
      bodyClass,
      iconClass,
      realImg,
      isRenderIcon,
      handleClick
    }
  }
})
</script>

