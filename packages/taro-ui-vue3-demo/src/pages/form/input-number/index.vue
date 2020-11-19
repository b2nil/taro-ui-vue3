<template>
  <page header-title="Input Number 数字输入框">
    <template
      v-for="(panel, index) in panels"
      :key="index"
    >
      <panel
        :title="panel.title"
        class="panel__content"
      >
        <example-item>
          <view
            v-if="panel.desc"
            class="example-item__desc"
          >{{ panel.desc }}</view>

          <at-input-number v-bind="panel.attrs" />
        </example-item>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { AtInputNumber } from "taro-ui-vue3"
import { CommonEvent } from '@tarojs/components/types/common'
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

interface IndexState {
  [key: string]: number
}

export default defineComponent({

  name: "InputNumberDemo",

  components: {
    AtInputNumber, Page, Panel, ExampleItem
  },

  setup() {

    const state = reactive<IndexState>({
      number1: 1,
      number2: 1,
      number3: 1,
      number4: 1,
      number5: 1,
      number6: 1
    })

    const panels = [
      {
        title: "基础用法",
        desc: "min=0, max=10, step=1",
        attrs: {
          min: 0,
          max: 10,
          step: 1,
          modelValue: state.number1,
          'onUpdate:modelValue': (e) => state.number1 = e
        }
      },
      {
        title: "小数",
        desc: "min = 0, max = 10, step = 0.1",
        attrs: {
          type: 'digit',
          min: 0,
          max: 10,
          step: 0.1,
          value: state.number2,
          onChange: handleNumberChange.bind(this, 'number2')
        }
      },
      {
        title: "禁用状态",
        attrs: {
          disabled: true,
          min: 0,
          max: 10,
          step: 1,
          value: state.number3,
          onChange: handleNumberChange.bind(this, 'number3')
        }
      },
      {
        title: "禁用输入状态",
        attrs: {
          disabledInput: true,
          min: 0,
          max: 10,
          step: 1,
          value: state.number6,
          onChange: handleNumberChange.bind(this, 'number6')
        }
      },
      {
        title: "自定义宽度",
        attrs: {
          width: 200,
          min: 0,
          max: 10,
          step: 1,
          value: state.number4,
          onChange: handleNumberChange.bind(this, 'number4')
        }
      },
      {
        title: "大尺寸",
        attrs: {
          size: 'large',
          min: 0,
          max: 10,
          step: 1,
          value: state.number5,
          onChange: handleNumberChange.bind(this, 'number5')
        }
      },

    ]

    function handleNumberChange(
      stateName: string,
      value: number,
      e: CommonEvent
    ): void {
      state[stateName] = value
    }

    return {
      panels
    }
  }
})

</script>