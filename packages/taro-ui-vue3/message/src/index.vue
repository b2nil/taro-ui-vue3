<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >{{ _message }}</view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'

import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  nextTick,
  computed,
  toRef
} from 'vue'

import {
  AtMessageState
} from "@taro-ui-vue3/types/message"


export default defineComponent({
  name: "AtMessage",

  onHide() {
    Taro.eventCenter.off('atMessage')
  },

  onShow() {
    this.bindMessageListener()
  },

  setup() {
    const _timer = ref<NodeJS.Timeout | number | null>(null)

    const state = reactive<AtMessageState>({
      _isOpened: false,
      _message: '',
      _type: 'info',
      _duration: 3000
    })

    const rootClasses = computed(() => ({
      'at-message': true,
      'at-message--show': state._isOpened,
      'at-message--hidden': !state._isOpened,
      [`at-message--${state._type}`]: true,
    }))

    function bindMessageListener(): void {
      Taro.eventCenter.on('atMessage', (options = {}) => {
        const { message, type, duration } = options

        const newState = {
          _isOpened: true,
          _message: message,
          _type: type,
          _duration: duration || state._duration
        }

        Object.assign(state, newState)

        nextTick(() => {
          clearTimeout(_timer.value as number)
          _timer.value = setTimeout(() => {
            state._isOpened = false
          }, state._duration)
        })
      })

      // 绑定函数
      Taro.atMessage = Taro.eventCenter.trigger.bind(
        Taro.eventCenter,
        'atMessage'
      )
    }

    onMounted(() => {
      bindMessageListener()
    })

    onUnmounted(() => {
      Taro.eventCenter.off('atMessage')
    })

    return {
      _message: toRef(state, '_message'),
      rootClasses,
      bindMessageListener
    }
  }
})
</script>

