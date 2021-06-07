<template>
  <view
    v-bind="$attrs"
    class="at-calendar"
  >
    <at-calendar-controller
      :min-date="minDate"
      :max-date="maxDate"
      :hide-arrow="hideArrow"
      :month-format="monthFormat"
      :generate-date="generateDate"
      @select-date="handleSelectDate"
      @pre-month="handleClickPreMonth"
      @next-month="handleClickNextMonth"
    />
    <at-calendar-body
      :marks="marks"
      :format="format"
      :min-date="minDate"
      :max-date="maxDate"
      :is-swiper="isSwiper"
      :is-vertical="isVertical"
      :valid-dates="validDates"
      :selected-date="selectedDate"
      :selected-dates="selectedDates"
      :generate-date="generateDate"
      @swipe-month="setMonth"
      @day-click="handleDayClick"
      @long-click="handleDayLongClick"
    />
  </view>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import {
  defineComponent,
  nextTick,
  reactive,
  toRefs,
  watch,
  PropType
} from "vue"

import {
  CommonEvent
} from '@tarojs/components/types/common'
import {
  AtCalendarProps,
  AtCalendarPropsWithDefaults,
  AtCalendarState,
  Calendar
} from "@taro-ui-vue3/types/calendar"

import AtCalendarBody from './body/index.vue'
import AtCalendarController from './controller/index.vue'


const AtCalendar = defineComponent({
  name: "AtCalendar",

  components: {
    AtCalendarBody,
    AtCalendarController
  },

  emits: {
    'click-pre-month': null,
    'click-next-month': null,
    'select-date'(item: { value: Calendar.SelectedDate }) {
      return !!(item && item.value)
    },
    'day-click'(item: { value: string }) {
      return !!(item && item.value)
    },
    'day-long-click'(item: { value: string }) {
      return !!(item && item.value)
    },
    'month-change'(value: string) {
      return !!(value && typeof value === 'string')
    }
  },

  data: () => ({ addGlobalClass: true }),

  props: {
    // 参数
    currentDate: {
      type: [Number, String, Date, Object] as PropType<AtCalendarProps['currentDate']>,
      default: Date.now() as Calendar.DateArg
    },
    minDate: {
      type: [String, Number, Date] as PropType<AtCalendarProps['minDate']>,
      default: () => ''
    },
    maxDate: {
      type: [String, Number, Date] as PropType<AtCalendarProps['maxDate']>,
      default: () => ''
    },
    isSwiper: {
      type: Boolean,
      default: true
    },
    marks: {
      type: Array as PropType<AtCalendarProps['marks']>,
      default: () => []
    },
    validDates: {
      type: Array as PropType<AtCalendarProps['validDates']>,
      default: () => []
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    monthFormat: {
      type: String,
      default: 'YYYY 年 MM 月'
    },
    hideArrow: Boolean,
    isVertical: Boolean,
    isMultiSelect: Boolean,
    selectedDates: {
      type: Array as PropType<AtCalendarPropsWithDefaults['selectedDates']>,
      default: () => []
    }
  },

  setup(props: AtCalendarProps, { emit }) {
    const { currentDate, isMultiSelect } = toRefs(props as AtCalendarPropsWithDefaults)

    let { generateDate, selectedDate } = getInitializedState(currentDate.value, isMultiSelect.value)

    const state = reactive<AtCalendarState>({
      generateDate,
      selectedDate
    })

    watch(() => [
      props.currentDate,
      props.isMultiSelect
    ], (
      [currentDate, isMultiSelect],
      [preCurrentDate, preIsMultiSelect]
    ) => {

      if (!currentDate || currentDate === preCurrentDate) return

      if (isMultiSelect && preIsMultiSelect) {
        const { start, end } = currentDate as Calendar.SelectedDate
        const { start: preStart, end: preEnd } = preCurrentDate as Calendar.SelectedDate

        if (start === preStart && preEnd === end) {
          return
        }
      }

      const stateValue = getInitializedState(
        currentDate as Calendar.SelectedDate,
        isMultiSelect as boolean
      )
      Object.assign(state, stateValue)
    })

    function getSingleSelectedState(value: Dayjs): Partial<AtCalendarState> {

      const stateValue: Partial<AtCalendarState> = {
        selectedDate: getSelectedDate(value.valueOf())
      }

      const dayjsGenerateDate: Dayjs = value.startOf('month')
      const generateDateValue: number = dayjsGenerateDate.valueOf()

      if (generateDateValue !== state.generateDate) {
        triggerChangeDate(dayjsGenerateDate)
        stateValue.generateDate = generateDateValue
      }

      return stateValue
    }

    function getMultiSelectedState(value: Dayjs): Pick<AtCalendarState, 'selectedDate'> {

      const { end, start } = state.selectedDate

      const valueUnix: number = value.valueOf()
      const stateValue: Pick<AtCalendarState, 'selectedDate'> = {
        selectedDate: state.selectedDate
      }

      if (end) {
        stateValue.selectedDate = getSelectedDate(valueUnix, 0)
      } else {
        stateValue.selectedDate.end = Math.max(valueUnix, +start)
        stateValue.selectedDate.start = Math.min(valueUnix, +start)
      }

      return stateValue
    }

    function getInitializedState(
      currentDate: Calendar.DateArg | Calendar.SelectedDate,
      isMultiSelect?: boolean
    ): AtCalendarState {
      let end: number
      let start: number
      let generateDateValue: number

      if (!currentDate) {
        const dayjsStart = dayjs()
        start = dayjsStart.startOf('day').valueOf()
        generateDateValue = dayjsStart.startOf('month').valueOf()

        return {
          generateDate: generateDateValue,
          selectedDate: {
            start: ''
          }
        }
      }

      if (isMultiSelect) {
        const { start: cStart, end: cEnd } = currentDate as Calendar.SelectedDate
        const dayjsStart = dayjs(cStart)

        start = dayjsStart.startOf('day').valueOf()
        generateDateValue = dayjsStart.startOf('month').valueOf()

        end = cEnd ? dayjs(cEnd).startOf('day').valueOf() : start
      } else {
        const dayjsStart = dayjs(currentDate as Calendar.DateArg)

        start = dayjsStart.startOf('day').valueOf()
        generateDateValue = dayjsStart.startOf('month').valueOf()

        end = start
      }

      return {
        generateDate: generateDateValue,
        selectedDate: getSelectedDate(start, end)
      }
    }

    function getSelectedDate(start: number, end?: number): Calendar.SelectedDate {
      const stateValue: Calendar.SelectedDate = {
        start,
        end: start
      }

      if (typeof end !== 'undefined') {
        stateValue.end = end
      }

      return stateValue
    }

    function triggerChangeDate(value: Dayjs) {
      emit('month-change', value.format(props.format))
    }

    function setMonth(vectorCount: number) {
      const _generateDate: Dayjs = dayjs(state.generateDate).add(vectorCount, 'month')
      state.generateDate = _generateDate.valueOf()

      if (vectorCount) {
        emit('month-change', _generateDate.format(props.format))
      }
    }

    function handleClickPreMonth(isMinMonth?: boolean) {
      if (isMinMonth === true) return

      setMonth(-1)

      emit('click-pre-month')
    }

    function handleClickNextMonth(isMaxMonth?: boolean) {
      if (isMaxMonth === true) return

      setMonth(1)

      emit('click-next-month')
    }

    function handleSelectDate(e: CommonEvent) {
      const { value } = e.detail
      const _generateDate: Dayjs = dayjs(value)
      const _generateDateValue: number = _generateDate.valueOf()

      if (state.generateDate === _generateDateValue) return

      triggerChangeDate(_generateDate)
      state.generateDate = _generateDateValue
    }

    function handleDayClick(item: Calendar.Item) {
      const { isDisabled, value } = item

      if (isDisabled) return

      const dayjsDate: Dayjs = dayjs(value)
      let stateValue: Partial<AtCalendarState> = {}

      stateValue = props.isMultiSelect
        ? getMultiSelectedState(dayjsDate)
        : getSingleSelectedState(dayjsDate)

      Object.assign(state, stateValue)

      nextTick(() => {
        handleSelectedDate()
      })

      emit('day-click', { value: item.value })
    }

    function handleSelectedDate() {
      const info: Calendar.SelectedDate = {
        start: dayjs(state.selectedDate.start).format(props.format)
      }

      if (state.selectedDate.end) {
        info.end = dayjs(state.selectedDate.end).format(props.format)
      }

      emit('select-date', { value: info })
    }

    function handleDayLongClick(item: Calendar.Item) {
      emit('day-long-click', { value: item.value })
    }

    return {
      ...toRefs(state),
      ...toRefs(props as AtCalendarPropsWithDefaults),
      setMonth,
      handleDayClick,
      handleSelectDate,
      handleDayLongClick,
      handleSelectedDate,
      handleClickPreMonth,
      handleClickNextMonth,
    }
  }
})

export default AtCalendar
</script>