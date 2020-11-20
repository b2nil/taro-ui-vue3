<template>
  <view
    v-if="isOpened_"
    :class="rootClasses"
  >
    <!-- mask layer -->
    <view
      v-if="hasMask"
      class="at-toast__overlay"
    />

    <!-- body -->
    <view
      :class="bodyClasses"
      :style="$attrs.style"
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
import { AtToastProps } from "types/toast"

import statusImg from './img.json'

export default defineComponent({
  name: "AtToast",

  emits: [
    'click',
    'close'
  ],

  props: {
    isOpened: { type: Boolean, default: false, required: true },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    status: {
      type: String as PropType<AtToastProps['status']>,
      default: '',
      validator: (val: string) => ['', 'error', 'loading', 'success'].includes(val)
    },
    duration: { type: Number, default: 3000 },
    hasMask: Boolean,
  },

  setup(props: AtToastProps, { attrs, emit }) {
    const state = reactive({
      timer_: props.isOpened
        ? makeTimer(props.duration || 0)
        : null as NodeJS.Timeout | null,
      isOpened_: props.isOpened
    })

    const realImg = computed(() => (props.image || statusImg[props.status!] || null))
    const isRenderIcon = computed(() => !!(props.icon && !(props.image || statusImg[props.status!])))

    const rootClasses = computed(() => ({
      'at-toast': true,
      [`${attrs.class}`]: Boolean(attrs.class)
    }))

    const bodyClasses = computed(() => ({
      'toast-body': true,
      'at-toast__body--custom-image': props.image,
      'toast-body--text': !realImg.value && !props.icon,
      [`at-toast__body--${props.status}`]: !!props.status
    }))

    const iconClasses = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon}`]: props.icon
    }))

    watch(() => [
      props.isOpened,
      props.duration,
    ], ([isOpened, duration]: [boolean, number]) => {
      if (!isOpened) {
        close()
        return
      }

      if (!state.isOpened_) {
        state.isOpened_ = true
      } else {
        clearTimer()
      }

      makeTimer(duration || 0)
    })

    function clearTimer() {
      if (state.timer_) {
        clearTimeout(state.timer_)
        state.timer_ = null
      }
    }

    function makeTimer(duration: number) {
      if (duration === 0) return

      state.timer_ = setTimeout(() => {
        close()
      }, +duration)
    }

    function close() {
      if (state.isOpened_) {
        state.isOpened_ = false
        nextTick(handleClose)
        clearTimer()
      }
    }

    function handleClose(e?: CommonEvent) {
      emit('close', e!)
    }

    function handleClick(e: CommonEvent) {
      if (props.status === 'loading') return

      if (typeof props.onClick === 'function') {
        return emit('click', e)
      }

      close()
    }

    return {
      isOpened_: toRef(state, 'isOpened_'),
      hasMask: toRef(props, 'hasMask'),
      text: toRef(props, 'text'),
      rootClasses,
      bodyClasses,
      iconClasses,
      realImg,
      isRenderIcon,
      handleClick
    }
  }
})
</script>

