<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    :style="heightStyle"
  >
    <!-- with scroll view -->
    <scroll-view
      v-if="scroll"
      class="at-tabs__header"
      scroll-with-animation
      :id="tabId"
      :ref="(el) => tabHeaderRef = el"
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
      @touchend="handleTouchend"
      @touchmove="handleTouchmove"
      @touchstart="handleTouchstart"
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
  computed,
  toRefs,
  PropType,
  CSSProperties,
} from 'vue'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtTabsProps, AtTabsState } from "@taro-ui-vue3/types/tabs"
import { uuid } from "@taro-ui-vue3/utils"

const ENV = Taro.getEnv()

const MIN_DISTANCE = 100
const MAX_INTERVAL = 10

const AtTabs = defineComponent({
  name: "AtTabs",

  emits: {
    'click': (index: number, event: CommonEvent) => {
      return !!(typeof index === 'number' && typeof event === 'object')
    }
  },

  props: {
    tabDirection: {
      type: String as PropType<AtTabsProps['tabDirection']>,
      default: 'horizontal'
    },
    height: String,
    current: {
      type: Number,
      default: 0
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
      default: []
    }
  },

  setup(props: AtTabsProps, { emit }) {

    const tabId = ref<string>(uuid())
    const _touchDot = ref<number>(0) // 触摸时的原点    
    const _timer = ref<NodeJS.Timeout | null>(null) // 定时器    
    const _interval = ref<number>(0) // 滑动时间间隔    
    const _isMoving = ref<boolean>(false) // 是否已经在滑动
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

    const heightStyle = computed(() => (
      scrollY.value
        ? { height: props.height }
        : {}
    ))

    const underlineStyle = computed(() => ({
      height: scrollY.value ? `${props.tabList.length * 100}%` : '1PX',
      width: scrollX.value ? `${props.tabList.length * 100}%` : '1PX'
    }))

    const bodyStyle = computed(() => {

      const transformStyle = scrollX.value
        ? `translate3d(-${props.current * 100}%, 0px, 0px)`
        : `translate3d(0px, -${props.current * 100}%, 0px)`

      const bodyStyle: CSSProperties = {
        ...heightStyle.value,
        transform: transformStyle,
        WebkitTransform: transformStyle
      }

      if (!props.animated) {
        bodyStyle.transition = 'unset'
      }

      return bodyStyle
    })

    const genTabItemClasses = computed(() => (idx: number) => ({
      'at-tabs__item': true,
      'at-tabs__item--active': props.current === idx
    }))

    function updateState(idx: number) {
      if (props.scroll) {
        // 标签栏滚动
        if (ENV !== Taro.ENV_TYPE.WEB) {
          const index = Math.max(idx - 1, 0)
          state.scrollIntoView = `tab${tabId.value}${index}`
        } else {
          const index = Math.max(idx - 1, 0)
          const prevTabItem = tabHeaderRef.value.$el.children[index]
          if (prevTabItem) {
            state.scrollTop = prevTabItem.offsetTop
            state.scrollLeft = prevTabItem.offsetLeft
          }
        }
      }
    }

    function handleClick(index: number, event: CommonEvent) {
      emit('click', index, event)
    }

    function handleTouchstart(e: ITouchEvent) {
      if (!props.swipeable || scrollY.value) return

      // 获取触摸时的原点
      _touchDot.value = e.touches[0].pageX
      // 使用js计时器记录时间
      _timer.value = setInterval(() => {
        _interval.value++
      }, 100)
    }

    function handleTouchmove(e: ITouchEvent) {
      if (!props.swipeable || scrollY.value) return

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

    function handleTouchend() {
      if (!props.swipeable || scrollY.value) return

      clearInterval(_timer.value as NodeJS.Timeout)
      _interval.value = 0
      _isMoving.value = false
    }

    watch(() => props.current, (
      current: number
    ) => {
      updateState(current)
    })

    onMounted(() => {
      updateState(props.current)
    })

    return {
      ...toRefs(props),
      ...toRefs(state),
      tabId,
      scrollX,
      scrollY,
      bodyStyle,
      heightStyle,
      underlineStyle,
      tabHeaderRef,
      rootClasses,
      genTabItemClasses,
      handleClick,
      handleTouchend,
      handleTouchmove,
      handleTouchstart,
    }
  }
})

export default AtTabs
</script>
