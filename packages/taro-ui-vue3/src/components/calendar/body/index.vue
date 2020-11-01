<template>
  <!-- not swiper -->
  <view
    :class="rootClasses"
    v-if="!isSwiper"
  >
    <at-calendar-day-list />
    <view class="main__body body">
      <view class="body__slider body__slider--now">
        <at-calendar-date-list
          :list="listGroup[1].list"
          @click="onDayClick"
          @long-click="onLongClick"
        />
      </view>
    </view>
  </view>

  <!-- h5, 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致 -->
  <view
    v-if="isWEB"
    :class="rootClasses"
    @touch-end="handleTouchEnd"
    @touch-move="handleTouchMove"
    @touch-start="handleTouchStart"
  >
    <at-calendar-day-list />
    <view
      :class="h5MainBodyClass"
      :style="h5MainBodyStyle"
    >
      <view class="body__slider body__slider--pre">
        <at-calendar-date-list :list="listGroup[0].list" />
      </view>
      <view class="body__slider body__slider--now">
        <at-calendar-date-list
          :list="listGroup[1].list"
          @click="onDayClick"
          @long-click="onLongClick"
        />
      </view>
      <view class="body__slider body__slider--next">
        <at-calendar-date-list :list="listGroup[2].list" />
      </view>
    </view>
  </view>

  <!-- swiper -->
  <view
    :class="rootClasses"
    v-if="isSwiper && !isWEB"
  >
    <at-calendar-day-list />
    <swiper
      circular
      skip-hidden-item-layout
      class="main__body"
      :current="1"
      :vertical="isVertical"
      @change="handleChange"
      @touch-end="handleSwipeTouchEnd"
      @touch-start="handleSwipeTouchStart"
      @animation-finish="handleAnimateFinish"
    >
      <swiper-item
        v-for="(item, key) in listGroup"
        :key="`${key}-${item.value}`"
        :item-id="key.toString()"
      >
        <at-calendar-date-list
          :list="item.list"
          @click="onDayClick"
          @long-click="onLongClick"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, onMounted, ref, nextTick, toRef, PropType } from "../../api"
import { BaseEventOrig, ITouch, ITouchEvent } from '@tarojs/components/types/common'
import { AtCalendarBodyListGroup, AtCalendarBodyProps, Calendar, AtCalendarBodyState } from 'types/calendar'
import { delayQuerySelector } from '../../../utils/common'
import dayjs from 'dayjs'
import generateCalendarGroup from '../common/helper'
import AtCalendarDateList from '../ui/date-list/index.vue'
import AtCalendarDayList from '../ui/day-list/index.vue'



const ANIMATE_DURATION: number = 300

export default defineComponent({
  name: "AtCalendarBody",



  components: {
    AtCalendarDateList,
    AtCalendarDayList,
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
    minDate: {
      type: [String, Number, Date] as PropType<AtCalendarBodyProps['minDate']>,
      default: () => ''
    },
    maxDate: {
      type: [String, Number, Date] as PropType<AtCalendarBodyProps['maxDate']>,
      default: () => ''
    },
    isSwiper: {
      type: Boolean,
      default: true
    },
    isVertical: {
      type: Boolean,
      default: false
    },
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
    },
    onDayClick: {
      type: Function as PropType<AtCalendarBodyProps['onDayClick']>,
      default: () => () => { }
    },
    onLongClick: {
      type: Function as PropType<AtCalendarBodyProps['onLongClick']>,
      default: () => () => { }
    },
    onSwipeMonth: {
      type: Function as PropType<AtCalendarBodyProps['onSwipeMonth']>,
      default: () => () => { }
    },
  },

  setup(props: AtCalendarBodyProps) {
    const startX = ref(0)
    const maxWidth = ref(0)
    const changeCount = ref(0)
    const swipeStartPoint = ref(0)
    const currentSwiperIndex = ref(1)
    const isTouching = ref(false)
    const isPreMonth = ref(false)
    const isWEB = ref(process.env.TARO_ENV === 'h5')

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
      isAnimate: false,
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
      if (!props.isSwiper) return
      isTouching.value = true
      startX.value = e.touches[0].clientX
    }

    function handleTouchMove(e: ITouchEvent) {
      if (!props.isSwiper) return
      if (!isTouching.value) return

      const { clientX } = e.touches[0]
      state.offsetSize = clientX - startX.value
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
      if (!props.isSwiper) return

      isTouching.value = false
      const isRight = state.offsetSize > 0

      const breakpoint = maxWidth.value / 2
      const absOffsetSize = Math.abs(state.offsetSize)

      if (absOffsetSize > breakpoint) {
        const res = isRight ? maxWidth.value : - maxWidth.value
        return animateMoveSlide(res, () => {
          props.onSwipeMonth(isRight ? -1 : 1)
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

    function handleAnimateFinish() {
      if (changeCount.value > 0) {
        props.onSwipeMonth(isPreMonth.value ? -changeCount.value : changeCount.value)
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

    onMounted(() => {
      delayQuerySelector(this, '.at-calendar-slider__main', 30).then(res => {
        // @ts-ignore
        maxWidth.value = res[0].width
      })
    })

    const rootClasses = computed(() => ({
      [`at-calendar-slider__main--${process.env.TARO_ENV}`]: true,
      'at-calendar-slider__main': true,
      'main': true,
    }))

    const h5MainBodyClass = computed(() => ({
      'main__body body': true,
      'main__body--slider': props.isSwiper,
      'main__body--animate': state.isAnimate,
    }))

    const h5MainBodyStyle = computed(() => ({
      transform: props.isSwiper
        ? `translateX(-100%) translate3d(${state.offsetSize},0,0)`
        : '',
      WebkitTransform: props.isSwiper
        ? `translateX(-100%) translate3d(${state.offsetSize}px,0,0)`
        : ''
    }))

    return {
      listGroup: toRef(state, 'listGroup'),
      isSwiper: toRef(props, 'isSwiper'),
      onDayClick: toRef(props, 'onDayClick'),
      onLongClick: toRef(props, 'onLongClick'),
      isWEB,
      rootClasses,
      h5MainBodyClass,
      h5MainBodyStyle,
      handleTouchEnd,
      handleTouchMove,
      handleTouchStart,
      handleChange,
      handleAnimateFinish,
      handleSwipeTouchEnd,
      handleSwipeTouchStart,
    }
  }
})
</script>

<style>
</style>