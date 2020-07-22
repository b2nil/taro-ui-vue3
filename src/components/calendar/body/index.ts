import classNames from "classnames"
import dayjs from 'dayjs'

import { h, defineComponent, computed, reactive, watch, onMounted, ref, nextTick} from "vue"
import { Swiper, SwiperItem, View } from "@tarojs/components"
import { BaseEventOrig, ITouch, ITouchEvent } from '@tarojs/components/types/common'
import { AtCalendarBodyListGroup, AtCalendarBodyProps, Calendar } from 'types/calendar'
import { delayQuerySelector } from '../../../utils/common'
import generateCalendarGroup from '../common/helper'
import AtCalendarDateList from '../ui/date-list/index'
import AtCalendarDayList from '../ui/day-list/index'


const ANIMATE_DURATION: number = 300

const AtCalendarBody = defineComponent({
    components: {
        AtCalendarDateList,
        AtCalendarDayList,
    },

    data: () => ({ addGlobalClass: true}),

    props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        validDates: {
            type: Array as () => Array<Calendar.ValidDate>, 
            default: () => [] as Array<Calendar.ValidDate>
        },
        marks: {
            type: Array as () => Array<Calendar.Mark>,
            default: () => [] as Array<Calendar.Mark>
        },        
        minDate: {
            type: (String || Number || Date) as () => Calendar.DateArg,
            default: () => '' 
        },
        maxDate: {
            type: (String || Number || Date) as () => Calendar.DateArg, 
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
            type: Number || String,
            default: Date.now() 
        },
        selectedDate: {
            type: Object as () => Calendar.SelectedDate,
            default: () => ({ end: Date.now(), start: Date.now() })
        },
        selectedDates: { 
            type: Array as () => Array<Calendar.SelectedDate> | [], 
            default: () => []
        },
        onDayClick: {
            type: Function as unknown as () => (item: Calendar.Item) => void,
            default: () => () => {}
        },
        onLongClick: {
            type: Function as unknown as () => (item: Calendar.Item) => void, 
            default: () => () => {} 
        },
        onSwipeMonth: { 
            type: Function as unknown as () => (vectorCount: number) => void, 
            default: () => () => {} 
        },
    },

    setup(props: AtCalendarBodyProps) {
        const states = reactive({
            changeCount: 0,
            currentSwiperIndex: 1,
            startX: 0,
            swipeStartPoint: 0,
            maxWidth: 0,
            isPreMonth: false,
            isTouching: false,
            state: {
                listGroup: [] as AtCalendarBodyListGroup,
                offsetSize: 0,
                isAnimate: false
            }
        })

        const generateFunc = ref(generateCalendarGroup({
            validDates: props.validDates,
            format: props.format,
            minDate: props.minDate,
            maxDate: props.maxDate,
            marks: props.marks,
            selectedDates: props.selectedDates
        }))        

        const nextProps = computed(() => ({
            validDates: props.validDates,
            marks: props.marks,
            format: props.format,
            minDate: props.minDate,
            maxDate: props.maxDate,
            generateDate: props.generateDate,
            selectedDate: props.selectedDate,
            selectedDates: props.selectedDates
        }))

        watch(nextProps, (nextP, prevP) => {
            const options: Calendar.GroupOptions = {
                validDates: nextP.validDates,
                marks: nextP.marks,
                format: nextP.format,
                selectedDates: nextP.selectedDates,
                minDate: nextP.minDate,
                maxDate: nextP.maxDate
            }
            generateFunc.value = generateCalendarGroup(options)

            states.state.offsetSize = 0
            states.state.listGroup = getGroups(nextP.generateDate, nextP.selectedDate)
        })

        function getGroups(
            generateDate: number,
            selectedDate: Calendar.SelectedDate
        ): AtCalendarBodyListGroup {
            const dayjsDate = dayjs(generateDate)
            const arr: AtCalendarBodyListGroup = []

            const preList: Calendar.ListInfo<Calendar.Item> = generateFunc.value(
                dayjsDate.subtract(1, 'month').valueOf(),
                selectedDate
            )
            
            const nowList: Calendar.ListInfo<Calendar.Item> = generateFunc.value(
                generateDate,
                selectedDate,
                true
            )
            
            const nextList: Calendar.ListInfo<Calendar.Item> = generateFunc.value(
                dayjsDate.add(1, 'month').valueOf(),
                selectedDate
            )

            const preListIndex = states.currentSwiperIndex === 0 ? 2 : states.currentSwiperIndex - 1
            const nextListIndex = states.currentSwiperIndex === 2 ? 0 : states.currentSwiperIndex + 1

            arr[preListIndex] = preList
            arr[nextListIndex] = nextList
            arr[states.currentSwiperIndex] = nowList

            return arr
        }

        function handleTouchStart(e: ITouchEvent) {
            if (!props.isSwiper) return
            states.isTouching = true
            states.startX = e.touches[0].clientX
        }

        function handleTouchMove(e: ITouchEvent) {
            if (!props.isSwiper) return
            if (!states.isTouching) return

            const { clientX } = e.touches[0]
            states.state.offsetSize = clientX - states.startX
        }

        function animateMoveSlide(offset: number, callback?: Function) {
            states.state.isAnimate = true
            nextTick(() => {
                states.state.offsetSize = offset
                setTimeout(() => {
                    states.state.isAnimate = false
                    nextTick(() => {
                        callback && callback()
                    })
                }, ANIMATE_DURATION)
            })            
        }

        function handleTouchEnd() {
            if(!props.isSwiper) return

            const { offsetSize } = states.state

            states.isTouching = false
            const isRight = offsetSize > 0

            const breakpoint = states.maxWidth / 2
            const absOffsetSize = Math.abs(offsetSize)

            if(absOffsetSize > breakpoint) {
                const res = isRight ? states.maxWidth : - states.maxWidth
                return animateMoveSlide(res, () => {
                    props.onSwipeMonth(isRight ? -1 : 1)
                })
            }

            animateMoveSlide(0)
        }

        function handleChange(e: BaseEventOrig<{current: number, source: string}>) {
            const { current, source } = e.detail

            if(source === 'touch') {
                states.currentSwiperIndex = current
                states.changeCount += 1
            }
        }

        function handleAnimateFinish() {
            if(states.changeCount > 0) {
                props.onSwipeMonth(states.isPreMonth ? -states.changeCount : states.changeCount)
                states.changeCount = 0
            }
        }

        function handleSwipeTouchStart(e: ITouchEvent & { changedTouches: Array<ITouch> }) {
            const { clientX, clientY } = e.changedTouches[0]
            states.swipeStartPoint = props.isVertical ? clientY : clientX
        }

        function handleSwipeTouchEnd(e: ITouchEvent & { changedTouches: Array<ITouch> }) {
            const { clientX, clientY } = e.changedTouches[0]
            states.isPreMonth = props.isVertical 
                ? clientY - states.swipeStartPoint > 0 
                : clientX - states.swipeStartPoint > 0
        }

        states.state.listGroup = getGroups(props.generateDate, props.selectedDate)
        
        onMounted(() => {
            delayQuerySelector(this, '.at-calendar-slider__main').then(res => {
                states.maxWidth = res[0].width
            })
        })

        return () => {
            const rootClass = classNames(
                'main',
                'at-calendar-slider__main',
                `at-calendar-slider__main--${process.env.TARO_ENV}`
            )

            if (!props.isSwiper) {
                return h(View, { class: rootClass }, [
                    h(AtCalendarDayList),
                    h(View, { class: classNames('main__body', 'body') }, [
                        h(View, { class: classNames('body__slider', 'body__slider--now') }, [
                            h(AtCalendarDateList, {
                                list: states.state.listGroup[1].list,
                                onTap: props.onDayClick,
                                onLongPress: props.onLongClick
                            })
                        ])
                    ])
                ])
            }

            /* 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致  */
            if (process.env.TARO_ENV === 'h5') {
                const h5MainBodyClass = classNames('main__body body', {
                    'main__body--slider': props.isSwiper,
                    'main__body--animate': states.state.isAnimate,
                })

                const h5MainBodyStyle = {
                    transform: props.isSwiper 
                        ? `translateX(-100%) translate3d(${states.state.offsetSize},0,0)` 
                        : '',
                    WebkitTransform: props.isSwiper 
                        ? `translateX(-100%) translate3d(${states.state.offsetSize}px,0,0)`
                        : ''
                }

                return h(View, {
                    class: rootClass,
                    onTouchEnd: handleTouchEnd,
                    onTouchMove: handleTouchMove,
                    onTouchStart: handleTouchStart
                }, [
                    h(AtCalendarDayList),
                    h(View, { class: h5MainBodyClass, style: h5MainBodyStyle }, [
                        h(View, { class: classNames('body__slider', 'body__slider--pre')}, [
                            h(AtCalendarDateList, { list: states.state.listGroup[0].list })
                        ]),
                        h(View, { class: classNames('body__slider', 'body__slider--now')}, [
                            h(AtCalendarDateList, {
                                list: states.state.listGroup[1].list,
                                onTap: props.onDayClick,
                                onLongPress: props.onLongClick
                            })
                        ]),
                        h(View, { class: classNames('body__slider', 'body__slider--next')}, [
                            h(AtCalendarDateList, { list: states.state.listGroup[2].list })
                        ])
                    ])
                ])
            }

            const swiperItems = states.state.listGroup.map((item, key) => {
                return h(SwiperItem, { key: item.value, itemId: key.toString() }, [
                    h(AtCalendarDateList, {
                        list: item.list,
                        onTap: props.onDayClick,
                        onLongPress: props.onLongClick
                    })
                ])
            })
            
            return h(View, { class: rootClass }, [
                    h(AtCalendarDayList),
                    h(Swiper, {
                        circular: true,
                        current: 1,
                        skipHiddenItemLayout: true,
                        vertical: props.isVertical,
                        class: classNames('main__body'),
                        onChange: handleChange,
                        onAnimateFinish: handleAnimateFinish,
                        onTouchEnd: handleSwipeTouchEnd,
                        onTouchStart: handleSwipeTouchStart
                    }, swiperItems)
                ]
            )
        }
    }
})

export default AtCalendarBody