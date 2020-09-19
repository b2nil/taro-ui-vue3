<template>
  <page
    class="calendar-page"
    header-title="Calendar 日历"
  >
    <panel title="一般案例">
      <at-calendar @month-change="handleMonthChange" />
    </panel>

    <panel title="跳转到指定日期">
      <at-calendar
        :currentDate="now"
        @day-click="handleDayClick"
      />
      <view class="body_controllers">
        <at-button
          size="small"
          @click="handleClick('now', '2018/01/01')"
        >跳转到 2018/01/01</at-button>
        <at-button
          size="small"
          @click="handleClick('now', '2018/06/18')"
        >跳转到 2018/6/18</at-button>
      </view>
    </panel>

    <panel title="指定最小日期和最大日期">
      <at-calendar
        :min-date="minDate"
        :max-date="maxDate"
      />
      <view class="body_controllers">
        <at-button
          size="small"
          @click="handleClick('minDate', '2018/01/01')"
        >设置最小值 2018/1/1</at-button>
        <at-button
          size="small"
          @click="handleClick('maxDate', '2019/12/31')"
        >设置最大值 2019/12/31</at-button>
      </view>
    </panel>

    <panel title="标记时间">
      <at-calendar :marks="mark" />
      <view class="body_controllers">
        <at-button
          size="small"
          class="button"
          @click="handleClick('mark', [{ value: Date.now() }])"
        >标记当前时间</at-button>
      </view>
    </panel>

    <panel title="范围选择">
      <at-calendar
        is-multi-select
        :current-date="multiCurrentDate"
        @select-date="handleDateChange"
      />
      <view class="body_controllers">
        <at-button
          size="small"
          class="button"
          @click="handleClick('multiCurrentDate', { start: '2018/10/28', end: '2018/11/11' })"
        >设置选择区间为 2018/10/28 - 2018/11/11</at-button>
      </view>
    </panel>

    <panel title="禁止滑动">
      <at-calendar :is-swiper="false" />
    </panel>

    <panel title="垂直滑动">
      <at-calendar
        is-vertical
        @select-date="handleDateChange"
      />
    </panel>

    <panel title="有效时间组">
      <at-calendar :valid-dates="validDates" />
    </panel>
  </page>
</template>

<script>
import { ref, computed, reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import Taro from '@tarojs/taro'

import AtButton from '@/components/button'
import AtCalendar from '@/components/calendar'
import { Page, Panel } from '../../components/demo-page'

import "./index.scss"

export default {
  components: {
    AtButton,
    AtCalendar,
    Page,
    Panel
  },

  setup() {
    const state = reactive({
      now: Date.now(),
      minDate: '2018/06/11',
      maxDate: '2020/12/12',
      multiCurrentDate: {
        start: Date.now(),
      },
      mark: [{ value: '2018/11/11' }],
      validDates: [{ value: '2019/04/17' }, { value: '2019/04/21' }, { value: '2019/05/04' }, { value: '2019/05/28' }],
    })

    function handleClick(key, value) {
      state[key] = value
    }

    function handleDayClick(item) {
      state.now = item.value
    }

    function handleDayLongClick(item) {
      console.log('handleDayLongClick', item.value)
    }

    function handleDateChange(selectedDates) {
      if (selectedDates.value.end) {
        state.multiCurrentDate = selectedDates.value
      }
      Taro.showToast({
        title: `handleDateChange: ${JSON.stringify(selectedDates)}`,
        icon: 'none',
      })
    }

    function handleMonthChange(arg) {
      Taro.showToast({
        title: `handleMonthChange: ${JSON.stringify(arg)}`,
        icon: 'none',
      })
    }

    onBeforeMount(() => {
      Taro.showToast({
        title: '正在加载...',
        icon: 'loading',
        duration: 7000
      })
    })

    return {
      ...toRefs(state),
      handleClick,
      handleDayClick,
      handleDayLongClick,
      handleDateChange,
      handleMonthChange,
    }
  },

  onShow() {
    Taro.hideToast()
  }
}
</script>