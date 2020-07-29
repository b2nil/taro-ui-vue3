<template>
  <view class="page calendar-page">
    <view class="doc-body">
      <view class="panel__title">一般案例</view>
      <view class="panel__content">
        <at-calendar @month-change="handleMonthChange" />
      </view>
    </view>

    <view class="doc-body">
      <view class="panel__title">跳转到制定日期</view>
      <view class="panel__content">
        <at-calendar :currentDate="now" />
        <view class="body_controllers">
          <at-button size="small" @tap="handleClick('now', '2018/01/01')">
            跳转到 2018/01/01
          </at-button>
          <at-button size="small" @tap="handleClick('now', '2018/06/18')">
            跳转到 2018/6/18
          </at-button>
        </view>
      </view>
    </view>

    <view class="doc-body">
      <view class="panel__title">指定最小日期和最大日期</view>
      <view class="panel__content">
        <at-calendar :minDate="minDate" :maxDate="maxDate" />
        <view class="body_controllers">
          <at-button size="small" @tap="handleClick('minDate', '2018/01/01')">
            设置最小值 2018/1/1
          </at-button>
          <at-button size="small" @tap="handleClick('maxDate', '2019/12/31')">
            设置最大值 2019/12/31
          </at-button>
        </view>
      </view>
    </view>

    <view class="doc-body">
      <view class="panel__title">标记时间</view>
      <view class="panel__content">
        <at-calendar :marks="mark" />
        <view class="body_controllers">
          <at-button size="small" class="button" @tap="handleClick('mark', [{ value: Date.now() }])">
            标记当前时间
          </at-button>
        </view>
      </view>
    </view>

    <view class="doc-body">
      <view class="panel__title">范围选择</view>
      <view class="panel__content">
        <at-calendar @select-date="handleDateChange" :currentDate="multiCurrentDate" isMultiSelect />
        <view class="body_controllers">
          <at-button
            size="small"
            class="button"
            @tap="handleClick('multiCurrentDate', { start: '2018/10/28', end: '2018/11/11' })"
          >
            设置选择区间为 2018/10/28 - 2018/11/11
          </at-button>
        </view>
      </view>
    </view>

    <view class="doc-body">
      <view class="panel__title">禁止滑动</view>
      <view class="panel__content">
        <at-calendar :is-swiper="false" />
      </view>
    </view>

    <view class="doc-body">
      <view class="panel__title">垂直滑动</view>
      <view class="panel__content">
        <at-calendar is-vertical @select-date="handleDateChange" />
      </view>
    </view>

    <view class="doc-body">
      <view class="panel__title">有效时间组</view>
      <view class="panel__content">
        <at-calendar :validDates="validDates" />
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

import AtButton from '../../components/button'
import AtCalendar from '../../components/calendar'

export default {
  components: {
    AtButton,
    AtCalendar,
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
      console.log('state[key]: ', state[key])
      state[key] = value
      console.log('state.now : ', state.now)
    }

    function handleDayClick(...args) {
      console.log(this.$event)
      console.log('handleDayClick', args)
    }

    function handleDayLongClick(...args) {
      console.log('handleDayLongClick', args)
    }

    function handleDateChange(arg) {
      Taro.showToast({
        title: `handleDateChange: ${JSON.stringify(arg)}`,
        icon: 'none',
      })
    }
    function handleMonthChange(arg) {
      Taro.showToast({
        title: `handleMonthChange: ${JSON.stringify(arg)}`,
        icon: 'none',
      })
    }

    return {
      ...toRefs(state),
      handleClick,
      handleDayClick,
      handleDayLongClick,
      handleDateChange,
      handleMonthChange,
    }
  },
}
</script>

<style lang="scss">
</style>
