import { h, defineComponent, computed, reactive, watch, onMounted, ref, nextTick, PropType, CSSProperties } from "vue"
import { Swiper, SwiperItem, View } from '@tarojs/components'
import { BaseEventOrig, ITouch, ITouchEvent } from '@tarojs/components/types/common'
import { AtCalendarBodyListGroup, AtCalendarBodyProps, Calendar, AtCalendarBodyState } from '@taro-ui-vue3/types/calendar'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs/esm/index'
import { delayQuerySelector } from '@taro-ui-vue3/utils/common'
import generateCalendarGroup from '../common/helper'
import AtCalendarDateList from '../ui/date-list/index'
import AtCalendarDayList from '../ui/day-list/index'

const ANIMATE_DURATION: number = 300

const AtCalendarBody = defineComponent({
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
      default: () => [] as Array<Calendar.ValidDate>
    },
    marks: {
      type: Array as PropType<AtCalendarBodyProps['marks']>,
      default: () => [] as Array<Calendar.Mark>
    },
    minDate: [String, Number, Date] as PropType<AtCalendarBodyProps['minDate']>,
    maxDate: [String, Number, Date] as PropType<AtCalendarBodyProps['minDate']>,
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
      type: Function as unknown as PropType<AtCalendarBodyProps['onDayClick']>,
      default: () => () => { }
    },
    onLongClick: {
      type: Function as unknown as PropType<AtCalendarBodyProps['onLongClick']>,
      default: () => () => { }
    },
    onSwipeMonth: {
      type: Function as unknown as PropType<AtCalendarBodyProps['onSwipeMonth']>,
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

    const rootClass = computed(() => ({
      'main': true,
      'at-calendar-slider__main': true
    }))

    const h5MainBodyClass = computed(() => ({
      'body': true,
      'main__body': true,
      'main__body--slider': props.isSwiper,
      'main__body--animate': state.isAnimate,
    }))

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
      if (!props.isSwiper) return
      isTouching.value = true
      startX.value = props.isVertical ? e.touches[0].clientY : e.touches[0].clientX
    }

    function handleTouchMove(e: ITouchEvent) {
      if (!props.isSwiper) return
      if (!isTouching.value) return
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

    return () => {
      if (!props.isSwiper) {
        return h(View, {
          class: rootClass.value
        }, {
          default: () => [
            h(AtCalendarDayList),
            h(View, {
              class: 'main__body body'
            }, {
              default: () => [
                h(View, {
                  class: 'body__slider body__slider--now'
                }, {
                  default: () => [
                    h(AtCalendarDateList, {
                      list: state.listGroup[1].list,
                      onClick: props.onDayClick,
                      onLongClick: props.onLongClick
                    }),
                  ]
                }),
              ]
            }),
          ]
        })
      }

      /* 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致  */
      if (isWeb.value) {
        return h(View, {
          class: rootClass.value,
          onTouchend: handleTouchEnd,
          onTouchmove: handleTouchMove,
          onTouchstart: handleTouchStart
        }, {
          default: () => [
            h(AtCalendarDayList),
            h(View, {
              class: h5MainBodyClass.value,
              style: h5MainBodyStyle.value
            }, {
              default: () => [
                h(View, {
                  class: 'body__slider body__slider--pre'
                }, {
                  default: () => [
                    h(AtCalendarDateList, {
                      key: state.listGroup[0].value,
                      list: state.listGroup[0].list
                    })
                  ]
                }),

                h(View, {
                  class: 'body__slider body__slider--now'
                }, {
                  default: () => [
                    h(AtCalendarDateList, {
                      key: state.listGroup[1].value,
                      list: state.listGroup[1].list,
                      onClick: props.onDayClick,
                      onLongClick: props.onLongClick
                    })
                  ]
                }),

                h(View, {
                  class: 'body__slider body__slider--next'
                }, {
                  default: () => [
                    h(AtCalendarDateList, {
                      key: state.listGroup[2].value,
                      list: state.listGroup[2].list
                    })
                  ]
                }),
              ]
            }),
          ]
        })
      }

      return h(View, {
        class: rootClass.value
      }, {
        default: () => [
          h(AtCalendarDayList),
          h(Swiper, {
            class: 'main__body',
            circular: true,
            vertical: props.isVertical,
            skipHiddenItemLayout: true,
            current: currentSwiperIndex.value,
            catchMove: true,
            onChange: handleChange,
            onAnimationfinish: handleAnimateFinish,
            onTouchmove: handleSwipeTouchMove,
            onTouchend: handleSwipeTouchEnd,
            onTouchstart: handleSwipeTouchStart
          }, {
            default: () => state.listGroup.map((item, key) => (
              h(SwiperItem, {
                // wrong key may cause the following issue:
                // TypeError: Cannot read property '$$' of undefined
                // at HTMLElement._attached._touchstartHandlerForDevtools
                key: key.toString(),
                itemId: key.toString()
              }, {
                default: () => [
                  h(AtCalendarDateList, {
                    list: item.list,
                    onClick: props.onDayClick,
                    onLongClick: props.onLongClick
                  })
                ]
              })
            ))
          })
        ]
      })
    }
  }
})

export default AtCalendarBody