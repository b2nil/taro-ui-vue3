<template>
  <page header-title="CountDown 倒计时">
    <panel title="一般用法">
      <view class="panel__content">
        <at-countdown
          :minutes="1"
          :seconds="10"
        ></at-countdown>
        <at-countdown
          :hours="48"
          :minutes="0"
          :seconds="3"
        ></at-countdown>
        <at-countdown
          is-show-day
          :hours="1"
          :minutes="1"
          :seconds="10"
        ></at-countdown>
        <at-countdown
          is-show-hour
          :minutes="1"
          :seconds="10"
        ></at-countdown>
      </view>
    </panel>
    <panel title="自定义格式化">
      <view class="panel__content">
        <at-countdown
          :format="{ hours: ':', minutes: ':', seconds: '' }"
          :minutes="1"
          :seconds="10"
        ></at-countdown>
      </view>
    </panel>
    <panel title="卡片式">
      <view class="panel__content">
        <at-countdown
          is-card
          :minutes="1"
          :seconds="10"
        ></at-countdown>
        <at-countdown
          is-card
          is-show-day
          :day="1"
          :hours="1"
          :minutes="10"
          :format="{ day: '天', hours: ':', minutes: ':', seconds: '' }"
        ></at-countdown>
      </view>
    </panel>
    <panel title="自定义倒计时回调事件">
      <view class="panel__content">
        <at-countdown
          :format="{ hours: ':', minutes: ':', seconds: '' }"
          :seconds="10"
          @time-up="onTimeUp"
        ></at-countdown>
      </view>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

export default defineComponent({
  name: "CountdownDemo",

  setup() {

    function onTimeUp() {
      Taro.showToast({
        title: '时间到',
        icon: 'success',
        duration: 2000
      })
    }

    return {
      onTimeUp
    }
  }
})
</script>