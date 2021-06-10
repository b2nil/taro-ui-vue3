<template>
  <view
    v-if="isOpened"
    :class="['at-toast', Boolean($attrs.class) && $attrs.class]"
  >
    <!-- mask layer -->
    <view
      v-if="hasMask"
      class="at-toast__overlay"
    />

    <!-- body -->
    <view
      :class="['toast-body', bodyClasses]"
      :style="Boolean($attrs.style) && $attrs.style"
      @tap="handleClick"
    >
      <view class="toast-body-content">
        <!-- use image -->
        <view
          v-if="useImg"
          class="toast-body-content__img"
        >
          <image
            class="toast-body-content__img-item"
            mode="scaleToFill"
            :src="useImg"
          />
        </view>

        <!-- use icon -->
        <view
          v-else-if="useIcon"
          class="toast-body-content__icon"
        >
          <text :class="iconClasses" />
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
import {
  defineComponent,
  nextTick,
  watch,
  computed,
  reactive,
  toRef,
  PropType
} from "vue"

import { CommonEvent } from "@tarojs/components/types/common"
import { AtToastProps, AtToastState } from "@taro-ui-vue3/types/toast"

import statusImg from './img.json'

const AtToast = defineComponent({
  name: "AtToast",

  emits: ['click', 'close'],

  inheritAttrs: false,

  props: {
    isOpened: Boolean,
    hasMask: Boolean,
    text: String,
    icon: String,
    image: String,
    duration: { type: Number, default: 3000 },
    status: {
      type: String as PropType<AtToastProps['status']>,
      default: '',
      validator: (val: string) => ['', 'error', 'loading', 'success'].includes(val)
    }
  },

  setup(props: AtToastProps, { emit }) {
    const state = reactive<AtToastState>({
      _timer: null,
      _isOpened: props.isOpened
    })

    if (props.isOpened) {
      makeTimer(props.duration || 0)
    }

    const useImg = computed(() => (
      props.image || statusImg[props.status!] || null
    ))
    const useIcon = computed(() => Boolean(props.icon && !useImg.value))

    const bodyClasses = computed(() => ({
      'toast-body--text': !props.icon && !useImg.value,
      'at-toast__body--custom-image': props.image,
      [`at-toast__body--${props.status}`]: !!props.status
    }))

    const iconClasses = computed(() => (['at-icon', {
      [`at-icon-${props.icon}`]: props.icon
    }]))

    watch(() => [
      props.isOpened,
      props.duration,
    ], ([isOpened, duration]: [boolean, number]) => {
      if (!isOpened) {
        close()
        return
      }

      if (!state._isOpened) {
        state._isOpened = true
      } else {
        clearTimer()
      }

      makeTimer(duration || 0)
    })

    function clearTimer() {
      if (state._timer) {
        clearTimeout(state._timer)
        state._timer = null
      }
    }

    function makeTimer(duration: number) {
      // if (duration === 0) return

      state._timer = setTimeout(() => {
        close()
      }, +duration)
    }

    function close() {
      if (state._isOpened) {
        state._isOpened = false
        nextTick(handleClose)
        clearTimer()
      }
    }

    function handleClose(e?: CommonEvent) {
      emit('close', e!)
    }

    function handleClick(e: CommonEvent) {
      if (props.status === 'loading') return

      emit('click', e)
      close()
    }

    return {
      isOpened: toRef(state, '_isOpened'),
      hasMask: toRef(props, 'hasMask'),
      text: toRef(props, 'text'),
      bodyClasses,
      iconClasses,
      useImg,
      useIcon,
      handleClick
    }
  }
})

export default AtToast
</script>

