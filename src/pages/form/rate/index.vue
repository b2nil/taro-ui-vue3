<template>
  <page header-title="Rate 评分">
    <panel title="基础用法">
      <example-item>
        <at-rate
          :value="rateValue1"
          @change="handleRateChange('rateValue1', $event)"
        />
      </example-item>
    </panel>

    <panel title="自定义尺寸">
      <example-item>
        <at-rate
          :size="16"
          :value="rateValue2"
          @change="handleRateChange('rateValue2', $event)"
        />
      </example-item>
    </panel>

    <panel title="自定义评分数">
      <example-item>
        <at-rate
          :max="10"
          :value="rateValue3"
          @change="handleRateChange('rateValue3', $event)"
        />
      </example-item>
    </panel>

    <panel title="自定义星星间隔">
      <example-item>
        <at-rate
          :margin="10"
          :value="rateValue4"
          @change="handleRateChange('rateValue4', $event)"
        />
      </example-item>
    </panel>

    <panel title="只读">
      <example-item>
        <view>评分: 3.5</view>
        <at-rate :value="3.5" />
      </example-item>
    </panel>

    <panel title="使用 vModel">
      <example-item>
        <at-rate
          :size="24"
          :max="6"
          v-model:value="rateValue5"
        />
      </example-item>
    </panel>

    <panel title="自定义图标颜色">
      <example-item>
        <at-rate
          color="teal"
          :size="24"
          :max="6"
          v-model:value="rateValue5"
        />
      </example-item>
    </panel>

    <panel title="自定义图标类型">
      <example-item>
        <at-rate
          color="red"
          icon="heart"
          :size="24"
          :max="6"
          v-model:value="rateValue5"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { AtRate } from '../../../index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: number
}

export default defineComponent({
  name: "RateDemo",

  components: {
    AtRate,
    Page,
    Panel,
    ExampleItem
  },

  setup() {

    const state = reactive<IndexState>({
      rateValue1: 3,
      rateValue2: 3,
      rateValue3: 3,
      rateValue4: 3,
      rateValue5: 5,
    })

    function handleRateChange(stateName: string, value: number): void {
      state[stateName] = value
    }

    return {
      ...toRefs(state),
      handleRateChange
    }
  }
})

</script>