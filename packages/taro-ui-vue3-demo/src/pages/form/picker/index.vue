<template>
  <page
    class="picker__page"
    header-title="Picker 选择器"
  >
    <panel title="普通选择器">
      <example-item>
        <picker
          mode="selector"
          :range="selector"
          :value="selectorValue"
          @change="handleChange"
        >
          <view class="demo-list-item">
            <view class="demo-list-item__label">国家地区</view>
            <view class="demo-list-item__value">{{ selector[selectorValue] }}
            </view>
          </view>
        </picker>
      </example-item>
    </panel>

    <panel
      title="多列选择器"
      v-if="!isAlipay"
    >
      <example-item>
        <picker
          mode="multiSelector"
          :range="multiSelector"
          :value="mulitSelectorValues"
          @change="handleMulitChange"
        >
          <view class="demo-list-item">
            <view class="demo-list-item__label">请选择早餐</view>
            <view class="demo-list-item__value">
              {{ `${multiSelector[0][mulitSelectorValues[0]]} & ${multiSelector[1][mulitSelectorValues[1]]}` }}
            </view>
          </view>
        </picker>
      </example-item>
    </panel>

    <panel title="时间选择器">
      <example-item>
        <picker
          mode="time"
          :value="timeSel"
          @change="handleTimeChange"
        >
          <view class="demo-list-item">
            <view class="demo-list-item__label">请选择时间</view>
            <view class="demo-list-item__value">
              {{ timeSel }}
            </view>
          </view>
        </picker>
      </example-item>
    </panel>

    <panel title="日期选择器">
      <example-item>
        <picker
          mode="date"
          :value="dateSel"
          @change="handleTimeChange"
        >
          <view class="demo-list-item">
            <view class="demo-list-item__label">请选择日期</view>
            <view class="demo-list-item__value">
              {{ dateSel }}
            </view>
          </view>
        </picker>
      </example-item>
    </panel>

  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

interface IndexState {
  selector: string[]
  multiSelector: string[][]
  selectorValue: number
  mulitSelectorValues: number[]
  timeSel: string
  dateSel: string
  isAlipay: boolean
}

export default defineComponent({
  name: "PickerDemo",

  components: {
    Page, Panel, ExampleItem
  },

  setup() {

    const state = reactive<IndexState>({
      selector: ['中国', '美国', '巴西', '日本'],
      multiSelector: [
        ['饭', '粥', '粉'],
        ['猪肉', '牛肉']
      ],
      selectorValue: 0,
      mulitSelectorValues: [0, 1],
      timeSel: '06:18',
      dateSel: '2018-06-18',
      isAlipay: false
    })

    onMounted(() => {
      const env = Taro.getEnv()
      state.isAlipay = env === Taro.ENV_TYPE.ALIPAY
    })

    const handleChange = (e: CommonEvent): void => {
      state.selectorValue = e.detail.value
    }

    const handleMulitChange = (e: CommonEvent): void => {
      state.mulitSelectorValues = e.detail.value
    }

    const handleTimeChange = (e: CommonEvent): void => {
      state.timeSel = e.detail.value
    }

    const handleDateChange = (e: CommonEvent): void => {
      state.dateSel = e.detail.value
    }

    return {
      ...toRefs(state),
      handleChange,
      handleMulitChange,
      handleTimeChange,
      handleDateChange
    }
  }
})

</script>