<template>
  <view class="at-calendar__controller controller">
    <!-- left arrow -->
    <view
      v-if="!hideArrow"
      :class="genArrowClass('left', isMinMonth)"
      @tap="onPreMonth(isMinMonth)"
    ></view>

    <!-- date picker -->
    <picker
      mode="date"
      fields="month"
      :end="maxDateValue"
      :start="minDateValue"
      :value="dayjsDate.format('YYYY-MM')"
      @change="onSelectDate"
    >
      <text class="controller__info">{{ dayjsDate.format(monthFormat) }}</text>
    </picker>

    <!-- right arrow -->
    <view
      v-if="!hideArrow"
      :class="genArrowClass('right', isMaxMonth)"
      @tap="onNextMonth(isMaxMonth)"
    ></view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue"
import { AtCalendarControllerProps } from 'types/calendar'
import { CommonEvent } from '@tarojs/components/types/common'
import dayjs from 'dayjs'
import AtComponentWithDefaultProps from "../../mixins"

export default defineComponent({
  name: "AtCalendarController",

  mixins: [AtComponentWithDefaultProps],

  data: () => ({ addGlobalClass: true }),

  props: {
    generateDate: {
      type: Number || String,
      default: Date.now()
    },
    minDate: {
      type: [String, Number, Date] as unknown as () => AtCalendarControllerProps['minDate'],
      default: () => ''
    },
    maxDate: {
      type: [String, Number, Date] as unknown as () => AtCalendarControllerProps['maxDate'],
      default: () => ''
    },
    hideArrow: {
      type: Boolean,
      default: false
    },
    monthFormat: {
      type: String,
      default: 'YYYY 年 MM 月'
    },
    onPreMonth: {
      type: Function as unknown as () => AtCalendarControllerProps['onPreMonth'],
      default: () => () => { }
    },
    onNextMonth: {
      type: Function as unknown as () => AtCalendarControllerProps['onNextMonth'],
      default: () => () => { }
    },
    onSelectDate: {
      type: Function as unknown as () => AtCalendarControllerProps['onSelectDate'],
      default: () => () => { }
    },
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

    const genArrowClass = (
      direction: string,
      disabled: boolean
    ) => ({
      [`controller__arrow--${direction}`]: true,
      'controller__arrow': true,
      'controller__arrow--disabled': disabled,
    })

    return {
      ...toRefs(props),
      dayjsDate,
      isMinMonth,
      isMaxMonth,
      minDateValue,
      maxDateValue,
      genArrowClass
    }
  }
})
</script>

<style>
</style>