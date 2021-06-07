<template>
  <view class="at-calendar__controller controller">
    <!-- left arrow -->
    <view
      v-if="!hideArrow"
      :class="genArrowClasses('left', isMinMonth)"
      @tap="$emit('pre-month', isMinMonth)"
    ></view>

    <!-- date picker -->
    <picker
      mode="date"
      fields="month"
      :end="maxDateValue"
      :start="minDateValue"
      :value="dayjsDate.format('YYYY-MM')"
      @change="$emit('select-date', $event)"
    >
      <text class="controller__info">{{ dayjsDate.format(monthFormat) }}</text>
    </picker>

    <!-- right arrow -->
    <view
      v-if="!hideArrow"
      :class="genArrowClasses('right', isMaxMonth)"
      @tap="$emit('next-month', isMaxMonth)"
    ></view>
  </view>
</template>

<script lang="ts">
import dayjs from 'dayjs/esm'

import {
  defineComponent,
  computed,
  toRefs,
  PropType
} from "vue"

import {
  AtCalendarControllerProps
} from "@taro-ui-vue3/types/calendar"

const AtCalendarController = defineComponent({
  name: "AtCalendarController",

  data: () => ({ addGlobalClass: true }),

  emits: [
    'pre-month',
    'next-month',
    'select-date'
  ],

  props: {
    generateDate: {
      type: [String, Number, Date] as PropType<AtCalendarControllerProps["generateDate"]>,
      default: Date.now()
    },
    minDate: [String, Number, Date] as PropType<AtCalendarControllerProps['minDate']>,
    maxDate: [String, Number, Date] as PropType<AtCalendarControllerProps['maxDate']>,
    hideArrow: Boolean,
    monthFormat: {
      type: String,
      default: 'YYYY 年 MM 月'
    }
  },

  setup(props: AtCalendarControllerProps) {
    const dayjsDate = computed(() => dayjs(props.generateDate))
    const dayjsMinDate = computed(() => !!props.minDate && dayjs(props.minDate))
    const dayjsMaxDate = computed(() => !!props.maxDate && dayjs(props.maxDate))

    const isMinMonth = computed(() => {
      return dayjsMinDate.value &&
        dayjsMinDate.value
          .startOf('month')
          .isSame(dayjsDate.value)
    })

    const isMaxMonth = computed(() => {
      return dayjsMaxDate.value &&
        dayjsMaxDate.value
          .startOf('month')
          .isSame(dayjsDate.value)
    })

    const minDateValue = computed(() => dayjsMinDate.value
      ? dayjsMinDate.value.format('YYYY-MM')
      : ''
    )

    const maxDateValue = computed(() => dayjsMaxDate.value
      ? dayjsMaxDate.value.format('YYYY-MM')
      : ''
    )

    const genArrowClasses = (
      direction: string,
      disabled: boolean
    ) => (['controller__arrow', {
      [`controller__arrow--${direction}`]: true,
      'controller__arrow--disabled': disabled
    }])

    return {
      ...toRefs(props),
      dayjsDate,
      isMinMonth,
      isMaxMonth,
      minDateValue,
      maxDateValue,
      genArrowClasses
    }
  }
})

export default AtCalendarController
</script>