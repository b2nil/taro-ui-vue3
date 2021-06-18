<template>
  <view
    v-bind="$attrs"
    :id="`swipeAction-${componentId}`"
    class="at-swipe-action"
    @touchend="handleTouchend"
    @touchmove="handleTouchmove"
    @touchstart="handleTouchstart"
  >
    <!-- action content -->
    <view
      :class="actionContentClasses"
      :style="transformStyle"
    >
      <slot />
    </view>

    <!-- action options -->
    <at-swipe-action-options
      v-if="Array.isArray(options) && options.length > 0"
      :options="options"
      :component-id="componentId"
      @queryed-dom="handleDomInfo"
    >
      <view
        v-for="(item, key) in options"
        :key="`${item.text}-${key}`"
        :class="genActionItemClasses(item)"
        :style="item.style"
        @tap="handleClick(item, key, $event)"
      >
        <text class="option__text">{{ item.text }}</text>
      </view>
    </at-swipe-action-options>
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  computed,
  toRef,
  PropType,
  CSSProperties,
} from 'vue'

import _inRange from 'lodash-es/inRange'
import _isEmpty from 'lodash-es/isEmpty'

import {
  CommonEvent,
  ITouchEvent
} from '@tarojs/components/types/common'

import {
  AtSwipeActionProps,
  AtSwipeActionState,
  SwipeActionOption,
} from "@taro-ui-vue3/types/swipe-action"

import {
  delayGetClientRect,
  delayGetScrollOffset,
  uuid
} from "@taro-ui-vue3/utils"

import AtSwipeActionOptions from './options/index.vue'

const AtSwipeAction = defineComponent({
  name: "AtSwipeAction",

  components: {
    AtSwipeActionOptions
  },

  emits: {
    'opened': null,
    'closed': null,
    'click': (item: SwipeActionOption, index: number, event?: CommonEvent) => {
      return !!(
        item && item.text &&
        typeof item.text === 'string' &&
        typeof index === 'number' &&
        typeof event === 'object'
      )
    }
  },

  props: {
    isOpened: Boolean,
    disabled: Boolean,
    autoClose: Boolean,
    options: {
      type: Array as PropType<AtSwipeActionProps['options']>,
      default: () => []
    }
  },

  setup(props: AtSwipeActionProps, { emit }) {

    const endValue = ref<number>(0)
    const startX = ref<number>(0)
    const startY = ref<number>(0)
    const maxOffsetSize = ref<number>(0)
    const isMoving = ref<boolean>(false)
    const isTouching = ref<boolean>(false)
    const domInfo = ref<any>({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    })

    const state = reactive<AtSwipeActionState>({
      componentId: uuid(),
      offsetSize: 0,
      _isOpened: !!props.isOpened
    })

    const transformStyle = computed(() => {
      const transform = computeTransform(state.offsetSize)

      return transform
        ? { transform: transform }
        : {} as CSSProperties
    })

    const actionContentClasses = computed(() => ({
      'at-swipe-action__content': true,
      'animation': !isTouching.value
    }))

    const genActionItemClasses = computed(() => (item: SwipeActionOption) => ({
      'at-swipe-action__option': true,
      [`${item.className}`]: Boolean(item.className)
    }))

    watch(() => props.isOpened, (isOpened) => {
      if (isOpened !== state._isOpened) {
        _reset(!!isOpened) // TODO: Check behavior
      }
    })

    function getDomInfo(): Promise<void> {
      return Promise.all([
        delayGetClientRect({
          delayTime: 0,
          selectorStr: `#swipeAction-${state.componentId}`
        }),
        delayGetScrollOffset({ delayTime: 0 })
      ]).then(([rect, scrollOffset]) => {
        if (rect[0]) {
          rect[0].top += scrollOffset[0].scrollTop
          rect[0].bottom += scrollOffset[0].scrollTop
          domInfo.value = rect[0]
        }
      })
    }

    function _reset(isOpened: boolean) {
      isMoving.value = false
      isTouching.value = false

      if (isOpened) {
        endValue.value = -maxOffsetSize.value
        state._isOpened = true
        state.offsetSize = -maxOffsetSize.value

      } else {
        endValue.value = 0
        state.offsetSize = 0
        state._isOpened = false
      }
    }

    function computeTransform(value: number): string | null {
      // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
      //   return !_isNil(value) ? `translate3d(${value}px,0,0)` : null
      // }
      return value ? `translate3d(${value}px,0,0)` : null
    }

    function handleOpened(event: CommonEvent) {
      if (state._isOpened) {
        emit('opened', event)
      }
    }

    function handleClosed(event: CommonEvent) {
      if (!state._isOpened) {
        emit('closed', event)
      }
    }

    function handleTouchstart(e: ITouchEvent) {
      if (props.disabled) return

      const { clientX, clientY } = e.touches[0]
      getDomInfo()

      startX.value = clientX
      startY.value = clientY
      isTouching.value = true
    }

    function handleTouchmove(e: ITouchEvent) {
      if (_isEmpty(domInfo.value)) return

      const { top, bottom, left, right } = domInfo.value
      const { clientX, clientY, pageX, pageY } = e.touches[0]

      const x = Math.abs(clientX - startX.value)
      const y = Math.abs(clientY - startY.value)

      const inDom = _inRange(pageX, left, right) && _inRange(pageY, top, bottom)

      if (!isMoving.value && inDom) {
        isMoving.value =
          y === 0 ||
          x / y >= Number.parseFloat(Math.tan((45 * Math.PI) / 180).toFixed(2))
      }

      if (isTouching.value && isMoving.value) {
        e.preventDefault()

        const offsetSize = clientX - startX.value
        const isRight = offsetSize > 0

        if (state.offsetSize === 0 && isRight) return

        const value = endValue.value + offsetSize
        state.offsetSize = value >= 0 ? 0 : value
      }
    }

    function handleTouchend(event: ITouchEvent) {
      isTouching.value = false

      const { offsetSize } = state

      endValue.value = offsetSize

      const breakpoint = maxOffsetSize.value / 2
      const absOffsetSize = Math.abs(offsetSize)

      if (absOffsetSize > breakpoint) {
        _reset(true)
        handleOpened(event)
        return
      }

      _reset(false) // TODO: Check behavior
      handleClosed(event)
    }

    function handleDomInfo({ width }: { width: number }) {
      const { _isOpened } = state
      maxOffsetSize.value = width
      _reset(_isOpened)
    }

    function handleClick(
      item: SwipeActionOption,
      index: number,
      event: CommonEvent
    ) {
      emit('click', item, index, event)

      if (props.autoClose) {
        _reset(false) // TODO: Check behavior
        handleClosed(event)
      }
    }

    return {
      options: toRef(props, 'options'),
      componentId: toRef(state, 'componentId'),
      transformStyle,
      actionContentClasses,
      genActionItemClasses,
      handleClick,
      handleDomInfo,
      handleTouchend,
      handleTouchmove,
      handleTouchstart,
    }
  }
})

export default AtSwipeAction
</script>