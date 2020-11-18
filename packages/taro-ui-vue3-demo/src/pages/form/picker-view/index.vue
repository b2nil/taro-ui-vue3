<template>
  <page header-title="Picker View 滚动选择器">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <view class="example-item__desc">嵌入页面的滑动选择器</view>
        <view v-if="!isWeb">
          <view class="title-date">
            {{ `${year} 年 ${month} 月 ${day} 日` }}
          </view>

          <picker-view
            class="picker"
            indicator-style="height: 50px;"
            style="width: 100%; height: 300px; text-align: center;"
            :value="value"
            @change="handleChange"
          >
            <picker-view-column>
              <view
                v-for="(item, idx) in years"
                :key="`years-${idx}`"
                style="line-height:50px;"
              >{{`${item}年`}}</view>
            </picker-view-column>
            <picker-view-column>
              <view
                v-for="(item, idx) in months"
                :key="`months-${idx}`"
                style="line-height:50px;"
              >{{`${item}月`}}</view>
            </picker-view-column>
            <picker-view-column>
              <view
                v-for="(item, idx) in days"
                :key="`days-${idx}`"
                style="line-height:50px;"
              >{{`${item}日`}}</view>
            </picker-view-column>
          </picker-view>
        </view>
        <view
          v-else
          class="title-date"
        >
          暂时仅支持小程序
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

interface IndexState {
  years: number[]
  year: number
  months: number[]
  month: number
  days: number[]
  day: number
  value: number[]
  isWeb: boolean
}

export default defineComponent({
  name: "PickerViewDemo",

  components: {
    Page, Panel, ExampleItem
  },

  setup() {

    const date = new Date()
    const years: number[] = []
    const months: number[] = []
    const days: number[] = []

    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }

    const state = reactive<IndexState>({
      years,
      year: date.getFullYear(),
      months,
      month: date.getMonth() + 1,
      days,
      day: date.getDate(),
      value: [30, date.getMonth(), date.getDate() - 1],
      isWeb: false,
    })

    onMounted(() => {
      const env = Taro.getEnv()
      state.isWeb = env === Taro.ENV_TYPE.WEB
    })

    const handleChange = (e: CommonEvent): void => {
      const val = e.detail.value
      state.value = val
      state.year = state.years[val[0]]
      state.month = state.months[val[1]]
      state.day = state.days[val[2]]
    }

    return {
      ...toRefs(state),
      handleChange
    }
  }
})
</script>