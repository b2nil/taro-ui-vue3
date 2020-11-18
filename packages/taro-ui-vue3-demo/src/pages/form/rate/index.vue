<template>
  <page header-title="Rate 评分">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <at-rate
          v-model="rateValue1"
          @update:model-value="(e) => rateValue1 = e"
        />
      </example-item>
    </panel>

    <panel
      title="自定义尺寸"
      no-padding
    >
      <example-item>
        <at-rate
          size.number="16"
          v-model="rateValue2"
          @update:model-value="(e) => rateValue2 = e"
        />
      </example-item>
    </panel>

    <panel
      title="自定义评分数"
      no-padding
    >
      <example-item>
        <at-rate
          max.number="10"
          v-model="rateValue3"
          @update:model-value="(e) => rateValue3 = e"
        />
      </example-item>
    </panel>

    <panel
      title="自定义星星间隔"
      no-padding
    >
      <example-item>
        <at-rate
          margin.number="15"
          v-model="rateValue4"
          @update:model-value="(e) => rateValue4 = e"
        />
      </example-item>
    </panel>

    <panel
      title="只读"
      no-padding
    >
      <example-item>
        <view>评分: 3.5</view>
        <view>
          <at-rate v-model="3.5" />
        </view>
      </example-item>
    </panel>

  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { AtRate } from "taro-ui-vue3"
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

interface IndexState {
  [key: string]: number
}

export default defineComponent({

  name: "RateDemo",

  components: {
    AtRate, Page, Panel, ExampleItem
  },

  setup() {

    const state = reactive<IndexState>({
      rateValue1: 3,
      rateValue2: 3,
      rateValue3: 3,
      rateValue4: 3
    })

    return {
      ...toRefs(state)
    }
  }
})

</script>