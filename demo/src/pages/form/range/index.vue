<template>
  <page header-title="Range 范围选择器">
    <panel title="基础用法">
      <example-item>
        {{`数值范围：${value1[0]}~${value1[1]}`}}
      </example-item>
      <at-range
        :min="30"
        :max="90"
        v-model="value1"
      />
    </panel>

    <panel title="自定义样式">
      <example-item>
        {{`数值范围：${value2[0]}~${value2[1]}`}}
      </example-item>
      <at-range
        :sliderStyle="{ backgroundColor: '#6190E8' }"
        v-model="value2"
      />
    </panel>

    <panel title="禁止状态">
      <at-range
        disabled
        :modelValue="[30, 50]"
      />
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import './index.scss'

interface IndexState {
  [key: string]: [number, number]
}

export default defineComponent({
  name: "RangeDemo",

  setup() {

    const state = reactive<IndexState>({
      value1: [50, 60],
      value2: [50, 60]
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
