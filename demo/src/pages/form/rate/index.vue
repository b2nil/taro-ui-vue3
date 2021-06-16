<template>
  <page header-title="Rate 评分">
    <panel title="基础用法">
      <example-item>
        <at-rate v-model="rateValue1" />
      </example-item>
    </panel>

    <panel title="自定义尺寸">
      <example-item>
        <at-rate
          :size="16"
          v-model="rateValue2"
        />
      </example-item>
    </panel>

    <panel title="自定义评分数">
      <example-item>
        <at-rate
          :max="10"
          v-model="rateValue3"
        />
      </example-item>
    </panel>

    <panel title="自定义星星间隔">
      <example-item>
        <at-rate
          :margin="10"
          v-model="rateValue4"
        />
      </example-item>
    </panel>

    <panel title="只读">
      <example-item>
        <view>评分: 3.5</view>
        <at-rate modelValue="3.5" />
      </example-item>
    </panel>

    <panel title="自定义图标颜色">
      <example-item>
        <at-rate
          color="teal"
          :size="24"
          :max="6"
          v-model="rateValue5"
        />
      </example-item>
    </panel>

    <panel title="自定义图标类型： 支持 star 或 heart">
      <example-item>
        <at-rate
          color="pink"
          :size="24"
          :max="6"
          v-model="rateValue5"
        />
        <at-rate
          color="red"
          icon="heart"
          :size="24"
          :max="6"
          v-model="rateValue5"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import './index.scss'

interface IndexState {
  [key: string]: number
}

export default defineComponent({
  name: "RateDemo",

  setup() {

    const state = reactive<IndexState>({
      rateValue1: 3,
      rateValue2: 3,
      rateValue3: 3,
      rateValue4: 3,
      rateValue5: 5,
    })

    return {
      ...toRefs(state)
    }
  }
})

</script>