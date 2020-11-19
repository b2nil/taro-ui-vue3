<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    :style="heightStyle"
  >
    <!-- with scroll view -->
    <scroll-view
      v-if="scroll"
      :id="tabId"
      class="at-tabs__header"
      scroll-with-animation
      :style="heightStyle"
      :scroll-x="scrollX"
      :scroll-y="scrollY"
      :scroll-top="scrollTop"
      :scroll-left="scrollLeft"
      :scroll-into-view="scrollIntoView"
    >
      <view
        v-for="(item, idx) in tabList"
        :key="`${item.title}-${idx}`"
        :id="`tab${tabId}${idx}`"
        :class="genTabItemClasses(idx)"
        @tap="handleClick(idx, $event)"
      >
        <text style="white-space: nowrap;">{{ item.title }}</text>
        <view class="at-tabs__item-underline" />
      </view>
    </scroll-view>

    <!-- without scroll view -->
    <view
      v-else
      :id="tabId"
      class="at-tabs__header"
    >
      <view
        v-for="(item, idx) in tabList"
        :key="`${item.title}-${idx}`"
        :id="`tab${tabId}${idx}`"
        :class="genTabItemClasses(idx)"
        @tap="handleClick(idx, $event)"
      >
        <text style="white-space: nowrap;">{{ item.title }}</text>
        <view class="at-tabs__item-underline" />
      </view>
    </view>

    <!-- tab body -->
    <view
      class="at-tabs__body"
      :style="bodyStyle"
      @touch-end="handleTouchEnd"
      @touch-move="handleTouchMove"
      @touch-start="handleTouchStart"
    >
      <view
        class="at-tabs__underline"
        :style="underlineStyle"
      />
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import {
  defineComponent,
  reactive,
  ref,
  watch,
  onMounted,
  onUnmounted,
  CSSProperties,
  computed,
  toRefs,
  warn,
  PropType
} from 'vue'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtTabsProps, AtTabsState } from "@taro-ui-vue3/types/tabs"
import { isTest, uuid } from "@taro-ui-vue3/utils/common"

const ENV = Taro.getEnv()

const MIN_DISTANCE = 100
const MAX_INTERVAL = 10

export default defineComponent({
  name: "AtTabs",

  emits: {
    'click'(index: number, event: CommonEvent) {
      if (typeof index === 'number') return true
      else {
        warn("index should be type number, but actual type is: ", typeof index)
        return false
      }
    }
  },

  props: {
    tabDirection: {
      type: String as PropType<AtTabsProps['tabDirection']>,
      default: 'horizontal'
    },
    height: {
      type: String,
      default: ''
    },
    current: {
      type: Number,
      default: 0,
      required: true
    },
    scroll: Boolean,
    animated: {
      type: Boolean,
      default: true
    },
    swipeable: {
      type: Boolean,
      default: true
    },
    tabList: {
      type: Array as PropType<AtTabsProps['tabList']>,
      default: [],
      required: true
    }
  },

  setup(props: AtTabsProps, { emit }) {

    const tabId = ref<string>(isTest() ? 'tabs-AOTU2018' : uuid())
    // 触摸时的原点
    const _touchDot = ref<number>(0)
    // 定时器
    const _timer = ref<NodeJS.Timeout | null>(null)
    // 滑动时间间隔
    const _interval = ref<number>(0)
    // 是否已经在滑动
    const _isMoving = ref<boolean>(false)
    const tabHeaderRef = ref<any>(null)

    const state = reactive<AtTabsState>({
      scrollLeft: 0,
      scrollTop: 0,
      scrollIntoView: ''
    })

    const scrollX = computed(() => props.tabDirection === 'horizontal')
    const scrollY = computed(() => props.tabDirection === 'vertical')

    const rootClasses = computed(() => ({
      [`at-tabs--${props.tabDirection}`]: true,
      'at-tabs--scroll': props.scroll,
      [`at-tabs--${ENV}`]: true,
      'at-tabs': true
    }))

    const heightStyle = computed(() => ({ height: props.height }))

    const underlineStyle = computed(() => ({
      height: props.tabDirection === 'vertical' ? `${props.tabList.length * 100}%` : '1PX',
      width: props.tabDirection === 'horizontal' ? `${props.tabList.length * 100}%` : '1PX'
    }))

    const bodyStyle = computed(() => {
      const bodyStyle: CSSProperties = {
        ...heightStyle.value
      }
      let transformStyle = `translate3d(0px, -${props.current * 100}%, 0px)`

      if (props.tabDirection === 'horizontal') {
        transformStyle = `translate3d(-${props.current * 100}%, 0px, 0px)`
      }

      Object.assign(bodyStyle, {
        transform: transformStyle,
        '-webkit-transform': transformStyle
      })

      if (!props.animated) {
        bodyStyle.transition = 'unset'
      }
      return bodyStyle
    })

    const genTabItemClasses = computed(() => (idx: number) => ({
      'at-tabs__item': true,
      'at-tabs__item--active': props.current === idx
    }))

    watch(() => [
      props.scroll,
      props.current
    ], (
      [scroll, current]: [boolean, number],
      [preScroll, preCurrent]: [boolean, number]
    ) => {
      if (scroll !== preScroll) {
        getTabHeaderRef()
      }
      if (current !== preCurrent) {
        updateState(current)
      }
    })

    onMounted(() => {
      getTabHeaderRef()
      updateState(props.current)
    })

    onUnmounted(() => {
      tabHeaderRef.value = null
    })

    function updateState(idx: number): void {
      if (props.scroll) {
        // 标签栏滚动
        switch (ENV) {
          case Taro.ENV_TYPE.WEAPP:
          case Taro.ENV_TYPE.ALIPAY:
          case Taro.ENV_TYPE.TT:
          case Taro.ENV_TYPE.SWAN: {
            const index = Math.max(idx - 1, 0)
            state.scrollIntoView = `tab${tabId.value}${index}`
            break
          }
          case Taro.ENV_TYPE.WEB: {
            const index = Math.max(idx - 1, 0)
            const prevTabItem = tabHeaderRef.value.childNodes[index]
            if (prevTabItem) {
              state.scrollTop = prevTabItem.offsetTop
              state.scrollLeft = prevTabItem.offsetLeft
            }
            break
          }
          default: {
            console.warn('AtTab 组件在该环境还未适配')
            break
          }
        }
      }
    }

    function handleClick(index: number, event: CommonEvent): void {
      emit('click', index, event)
    }

    function handleTouchStart(e: ITouchEvent): void {

      if (!props.swipeable || props.tabDirection === 'vertical') return
      // 获取触摸时的原点
      _touchDot.value = e.touches[0].pageX
      // 使用js计时器记录时间
      _timer.value = setInterval(() => {
        _interval.value++
      }, 100)
    }

    function handleTouchMove(e: ITouchEvent): void {
      if (!props.swipeable || props.tabDirection === 'vertical') return

      const touchMove = e.touches[0].pageX
      const moveDistance = touchMove - _touchDot.value
      const maxIndex = props.tabList.length

      if (
        !_isMoving.value &&
        _interval.value < MAX_INTERVAL &&
        _touchDot.value > 20
      ) {
        // 向左滑动
        if (props.current + 1 < maxIndex && moveDistance <= -MIN_DISTANCE) {
          _isMoving.value = true
          handleClick(props.current + 1, e)

          // 向右滑动
        } else if (props.current - 1 >= 0 && moveDistance >= MIN_DISTANCE) {
          _isMoving.value = true
          handleClick(props.current - 1, e)
        }
      }
    }

    function handleTouchEnd(): void {
      if (!props.swipeable || props.tabDirection === 'vertical') return

      clearInterval(_timer.value as NodeJS.Timeout)
      _interval.value = 0
      _isMoving.value = false
    }

    function getTabHeaderRef(): void {
      if (ENV === Taro.ENV_TYPE.WEB) {
        tabHeaderRef.value = document.getElementById(tabId.value)
      }
    }

    return {
      ...toRefs(props),
      ...toRefs(state),
      tabId,
      scrollX,
      scrollY,
      bodyStyle,
      heightStyle,
      underlineStyle,
      rootClasses,
      genTabItemClasses,
      handleClick,
      handleTouchEnd,
      handleTouchMove,
      handleTouchStart,
    }
  }
})
</script>
