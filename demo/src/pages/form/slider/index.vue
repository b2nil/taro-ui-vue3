<template>
  <page header-title="Slider 滑动条">
    <panel
      v-for="(c, idx) in cases"
      :key="idx"
      :title="c.title"
    >
      <example-item>
        <view class="example-item__desc">{{ c.desc }}</view>
        <at-slider v-bind="c.props" />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: "SliderDemo",
  setup() {
    const cases = [
      {
        title: "基础用法",
        desc: "step=1",
        props: { step: 1, value: 50, }
      },
      {
        title: "显示当前 Value",
        desc: "step=0.1",
        props: { step: 0.1, value: 50, showValue: true }
      },
      {
        title: "设置最大/最小值",
        desc: "step = 1, min = 50, max = 200",
        props: {
          step: 1,
          value: 100,
          min: 50,
          max: 200,
          showValue: true
        }
      },
      {
        title: "自定义样式",
        desc: "step = 1, blockSize = 24",
        props: {
          step: 1,
          value: 50,
          activeColor: '#4285F4',
          backgroundColor: '#BDBDBD',
          blockColor: '#4285F4',
          blockSize: 24,
        }
      },
      {
        title: "禁用状态",
        desc: "step = 1, blockSize = 24",
        props: { step: 1, value: 50, showValue: true, disabled: true }
      }
    ]
    return {
      cases
    }
  }
})
</script>