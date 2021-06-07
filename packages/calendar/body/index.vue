<template>
  <!-- not using swiper -->
  <view
    v-if="!isSwiper"
    class="main at-calendar-slider__main"
  >
    <at-calendar-day-list />

    <view class="main__body body">
      <view class="body__slider body__slider--now">
        <at-calendar-date-list
          :list="listGroup[1].list"
          @click="$emit('day-click', $event)"
          @long-click="$emit('long-click', $event)"
        />
      </view>
    </view>
  </view>

  <!-- 需要 Taro 组件库维护 Swiper 使小程序和 H5 的表现保持一致 -->
  <view
    v-else-if="isWeb"
    class="main at-calendar-slider__main"
    @touchend="handleTouchEnd"
    @touchmove="handleTouchMove"
    @touchstart="handleTouchStart"
  >
    <at-calendar-day-list />

    <view
      :class="['body', 'main__body', {
        'main__body--slider': isSwiper,
        'main__body--animate': isAnimate
      }]"
      :style="h5MainBodyStyle"
    >
      <view class="body__slider body__slider--pre">
        <at-calendar-date-list :list="listGroup[0].list" />
      </view>

      <view class="body__slider body__slider--now">
        <at-calendar-date-list
          :list="listGroup[1].list"
          @click="$emit('day-click', $event)"
          @long-click="$emit('long-click', $event)"
        />
      </view>

      <view class="body__slider body__slider--next">
        <at-calendar-date-list :list="listGroup[2].list" />
      </view>
    </view>
  </view>

  <!-- using swiper -->
  <view
    v-else-if="isSwiper && !isWeb"
    class="main at-calendar-slider__main"
  >
    <at-calendar-day-list />

    <swiper
      class="main__body"
      circular
      skip-hidden-item-layout
      :catchMove="true"
      :vertical="isVertical"
      :current="currentSwiperIndex"
      @change="handleChange"
      @touchend="handleSwipeTouchEnd"
      @touchmove="handleSwipeTouchMove"
      @touchstart="handleSwipeTouchStart"
      @animationfinish="handleAnimationFinish"
    >
      <swiper-item
        v-for="(item, key) in listGroup"
        :key="key.toString()"
        :item-id="key.toString()"
      >
        <at-calendar-date-list
          :list="item.list"
          @click="$emit('day-click', $event)"
          @long-click="$emit('long-click', $event)"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import dayjs from 'dayjs/esm'
import {
  defineComponent,
  computed,
  reactive,
  watch,
  onMounted,
  ref,
  nextTick,
  toRef,
  toRefs,
  PropType,
  CSSProperties
} from "vue"

import {
  BaseEventOrig,
  ITouch,
  ITouchEvent
} from '@tarojs/components/types/common'

import {
  Calendar,
  AtCalendarBodyState,
  AtCalendarBodyProps,
  AtCalendarBodyListGroup
} from "@taro-ui-vue3/types/calendar"

import {
  delayQuerySelector
} from "@taro-ui-vue3/utils"

import generateCalendarGroup from '../common/helper'

import AtCalendarDateList from '../ui/date-list/index.vue'
import AtCalendarDayList from '../ui/day-list/index.vue'

const ANIMATE_DURATION: number = 300

const AtCalendarBody = defineComponent({
  name: "AtCalendarBody",

  components: {
    AtCalendarDayList,
    AtCalendarDateList
  },

  emits: {
    'day-click'(item: Calendar.Item) {
      return !!(item && typeof item === 'object')
    },

    'long-click'(item: Calendar.Item) {
      return !!(item && typeof item === 'object')
    },

    'swipe-month'(vectorCount: number) {
      return !!(vectorCount && typeof vectorCount === 'number')
    }
  },

  data: () => ({ addGlobalClass: true }),

  props: {
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    validDates: {
      type: Array as PropType<AtCalendarBodyProps['validDates']>,
      default: () => []
    },
    marks: {
      type: Array as PropType<AtCalendarBodyProps['marks']>,
      default: () => []
    },
    minDate: [String, Number, Date] as PropType<AtCalendarBodyProps['minDate']>,
    maxDate: [String, Number, Date] as PropType<AtCalendarBodyProps['maxDate']>,
    isSwiper: {
      type: Boolean,
      default: true
    },
    isVertical: Boolean,
    generateDate: {
      type: [Number, String] as PropType<AtCalendarBodyProps['generateDate']>,
      default: Date.now()
    },
    selectedDate: {
      type: Object as PropType<AtCalendarBodyProps['selectedDate']>,
      default: () => ({ end: Date.now(), start: Date.now() })
    },
    selectedDates: {
      type: Array as PropType<AtCalendarBodyProps['selectedDates']>,
      default: () => []
    }
  },

  setup(props: AtCalendarBodyProps, { emit }) {
    const startX = ref(0)
    const maxWidth = ref(0)
    const changeCount = ref(0)
    const swipeStartPoint = ref(0)
    const currentSwiperIndex = ref(1)
    const isPreMonth = ref(false)
    const isWeb = ref(Taro.getEnv() === Taro.ENV_TYPE.WEB)

    let generateFunc = generateCalendarGroup({
      validDates: props.validDates,
      format: props.format,
      minDate: props.minDate,
      maxDate: props.maxDate,
      marks: props.marks,
      selectedDates: props.selectedDates
    })

    const state = reactive<AtCalendarBodyState>({
      listGroup: getGroups(props.generateDate, props.selectedDate),
      offsetSize: 0,
      isAnimate: false
    })

    const h5MainBodyStyle = computed(() => {
      let style: CSSProperties = {}

      const transformStyle = props.isVertical
        ? `translateY(-100%) translate3d(0,${state.offsetSize}px,0)`
        : `translateX(-100%) translate3d(${state.offsetSize}px,0,0)`

      if (props.isSwiper) {
        style.transform = transformStyle
        style.WebkitTransform = transformStyle
        if (props.isVertical) {
          style.flexDirection = 'column'
        }
      }

      return style
    })

    watch(() => [
      props.validDates,
      props.marks,
      props.format,
      props.minDate,
      props.maxDate,
      props.selectedDates,
      props.generateDate,
      props.selectedDate
    ], ([
      validDates,
      marks,
      format,
      minDate,
      maxDate,
      selectedDates,
      generateDate,
      selectedDate
    ]) => {
      const options = {
        validDates: validDates,
        marks: marks,
        format: format,
        selectedDates: selectedDates,
        minDate: minDate,
        maxDate: maxDate
      } as Calendar.GroupOptions

      generateFunc = generateCalendarGroup(options)

      state.offsetSize = 0
      state.listGroup = getGroups(generateDate as number, selectedDate as Calendar.SelectedDate)
    })

    function getGroups(
      generateDate: number,
      selectedDate: Calendar.SelectedDate
    ): AtCalendarBodyListGroup {
      const dayjsDate = dayjs(generateDate)
      const arr: AtCalendarBodyListGroup = []

      const preList: Calendar.ListInfo<Calendar.Item> = generateFunc(
        dayjsDate.subtract(1, 'month').valueOf(),
        selectedDate
      )

      const nowList: Calendar.ListInfo<Calendar.Item> = generateFunc(
        generateDate,
        selectedDate,
        true
      )

      const nextList: Calendar.ListInfo<Calendar.Item> = generateFunc(
        dayjsDate.add(1, 'month').valueOf(),
        selectedDate
      )

      const preListIndex = currentSwiperIndex.value === 0 ? 2 : currentSwiperIndex.value - 1
      const nextListIndex = currentSwiperIndex.value === 2 ? 0 : currentSwiperIndex.value + 1

      arr[preListIndex] = preList
      arr[nextListIndex] = nextList
      arr[currentSwiperIndex.value] = nowList
      return arr
    }

    function handleTouchStart(e: ITouchEvent) {
      startX.value = props.isVertical ? e.touches[0].clientY : e.touches[0].clientX
    }

    function handleTouchMove(e: ITouchEvent) {
      const clientXorY = props.isVertical ? e.touches[0].clientY : e.touches[0].clientX
      state.offsetSize = clientXorY - startX.value

      e.preventDefault()
      e.stopPropagation()
    }

    function animateMoveSlide(offset: number, callback?: Function) {
      state.isAnimate = true
      nextTick(() => {
        state.offsetSize = offset
        setTimeout(() => {
          state.isAnimate = false
          nextTick(() => {
            callback && callback()
          })
        }, ANIMATE_DURATION)
      })
    }

    function handleTouchEnd() {
      const isRight = state.offsetSize > 0

      const breakpoint = maxWidth.value / 2
      const absOffsetSize = Math.abs(state.offsetSize)

      if (absOffsetSize > breakpoint) {
        const res = isRight ? maxWidth.value : - maxWidth.value
        return animateMoveSlide(res, () => {
          emit('swipe-month', isRight ? -1 : 1)
        })
      }

      animateMoveSlide(0)
    }

    function handleChange(e: BaseEventOrig<{ current: number, source: string }>) {
      const { current, source } = e.detail
      if (source === 'touch') {
        currentSwiperIndex.value = current
        changeCount.value += 1
      }
    }

    function handleAnimationFinish() {
      if (changeCount.value > 0) {
        emit('swipe-month', isPreMonth.value ? -changeCount.value : changeCount.value)
        changeCount.value = 0
      }
    }

    function handleSwipeTouchStart(e: ITouchEvent & { changedTouches: Array<ITouch> }) {
      const { clientX, clientY } = e.changedTouches[0]
      swipeStartPoint.value = props.isVertical ? clientY : clientX
    }

    function handleSwipeTouchEnd(e: ITouchEvent & { changedTouches: Array<ITouch> }) {
      const { clientX, clientY } = e.changedTouches[0]
      isPreMonth.value = props.isVertical
        ? clientY - swipeStartPoint.value > 0
        : clientX - swipeStartPoint.value > 0
    }

    function handleSwipeTouchMove(e: ITouchEvent & { changedTouches: Array<ITouch> }) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    onMounted(() => {
      delayQuerySelector(this, '.at-calendar-slider__main', 100).then(res => {
        // @ts-ignore
        maxWidth.value = props.isVertical ? res[0].height : res[0].width
      })
    })

    return {
      ...toRefs(state),
      isSwiper: toRef(props, 'isSwiper'),
      isWeb,
      h5MainBodyStyle,
      currentSwiperIndex,
      handleChange,
      handleTouchEnd,
      handleTouchMove,
      handleTouchStart,
      handleAnimationFinish,
      handleSwipeTouchEnd,
      handleSwipeTouchMove,
      handleSwipeTouchStart
    }
  }
})

export default AtCalendarBody
</script>