<template>
  <page header-title="Input Number 数字输入框">
    <panel
      title="基础用法"
      class="panel__content"
    >
      <example-item>
        <view class="example-item__desc">通过 onChange 事件更新 value 值</view>
        <view class="example-item__desc">min=0, max=10, step=1</view>
        <at-input-number
          :min="0"
          :max="10"
          :step="1"
          :value="number1"
          @change="handleNumberChange('number1', $event)"
        />
      </example-item>
    </panel>

    <panel
      title="小数"
      class="panel__content"
    >
      <example-item>
        <view class="example-item__desc">通过 v-model:value 更新 value 值</view>
        <view class="example-item__desc">min = 0, max = 10, step = 0.1</view>
        <at-input-number
          type="digit"
          :min="0"
          :max="10"
          :step="0.1"
          v-model:value="number2"
        />
      </example-item>
    </panel>

    <panel
      title="禁用状态"
      class="panel__content"
    >
      <example-item>
        <at-input-number
          disabled
          :min="0"
          :max="10"
          :step="1"
          v-model:value="number3"
        />
      </example-item>
    </panel>

    <panel
      title="禁用输入状态"
      class="panel__content"
    >
      <example-item>
        <at-input-number
          disabled-input
          :min="0"
          :max="10"
          :step="1"
          v-model:value="number4"
        />
      </example-item>
    </panel>

    <panel
      title="自定义宽度"
      class="panel__content"
    >
      <example-item>
        <at-input-number
          :width="200"
          :min="0"
          :max="10"
          :step="1"
          v-model:value="number5"
        />
      </example-item>
    </panel>

    <panel
      title="大尺寸"
      class="panel__content"
    >
      <example-item>
        <at-input-number
          size="large"
          :min="0"
          :max="10"
          :step="1"
          v-model:value="number6"
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
  name: "InputNumberDemo",

  setup() {

    const state = reactive<IndexState>({
      number1: 1,
      number2: 1,
      number3: 1,
      number4: 1,
      number5: 1,
      number6: 1
    })


    function handleNumberChange(
      stateName: string,
      value: number,
    ): void {
      state[stateName] = value
    }

    return {
      ...toRefs(state),
      handleNumberChange
    }

  }
})

</script>