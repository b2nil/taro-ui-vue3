<template>
  <page header-title="Slider 滑动条">
    <panel title="基础用法">
      <example-item>
        <view class="example-item__desc">step=1</view>
        <at-slider v-bind="{ step: 1, value: 50 }" />
      </example-item>
    </panel>

    <panel title="显示当前 Value">
      <example-item>
        <view class="example-item__desc">step=1</view>
        <at-slider v-bind="{ step: 1, value: 50, showValue: true }" />
      </example-item>
    </panel>

    <panel title="设置最大/最小值">
      <example-item>
        <view class="example-item__desc">step = 1, min = 50, max = 200</view>
        <at-slider v-bind="{ 
          step: 1,
          value: 100,
          min: 50,
          max: 200,
          showValue: true
        }" />
      </example-item>
    </panel>

    <panel title="自定义样式">
      <example-item>
        <view class="example-item__desc">step = 1, blockSize = 24</view>
        <at-slider v-bind="{ 
          step: 1,
          value: 50,
          activeColor: '#4285F4',
          backgroundColor: '#BDBDBD',
          blockColor: '#4285F4',
          blockSize: 24
        }" />
      </example-item>
    </panel>

    <panel title="禁用状态">
      <example-item>
        <view class="example-item__desc">step = 1, blockSize = 24</view>
        <at-slider
          v-bind="{ step: 1, value: 50, showValue: true, disabled: true }"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { h, defineComponent, resolveComponent } from 'vue'
import { AtSlider } from "taro-ui-vue3"
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

export default defineComponent({
  name: "SliderDemo",

  components: {
    AtSlider, Page, Panel, ExampleItem
  }
})

</script>
