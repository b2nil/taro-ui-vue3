import { h, defineComponent, reactive } from 'vue'
import { AtInputNumber } from '@/components/index'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: number
}

export default defineComponent({

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
      e: CommonEvent
    ): void {
      state[stateName] = value
    }

    return () => (

      h(Page, { headerTitle: 'Input Number 数字输入框' }, {
        default: () => [

          /* 基础用法*/
          h(Panel, { title: '基础用法', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, { default: () => 'min=0, max=10, step=1' }),
                  h(AtInputNumber, {
                    min: 0,
                    max: 10,
                    step: 1,
                    value: state.number1,
                    onChange: handleNumberChange.bind(this, 'number1'),
                  })
                ]
              })
            ]
          }),

          /* 小数*/
          h(Panel, { title: '小数', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, { default: () => 'min = 0, max = 10, step = 0.1' }),
                  h(AtInputNumber, {
                    type: 'digit',
                    min: 0,
                    max: 10,
                    step: 0.1,
                    value: state.number2,
                    onChange: handleNumberChange.bind(this, 'number2'),
                  })
                ]
              }),
            ]
          }),

          /* 禁用状态*/
          h(Panel, { title: '禁用状态', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtInputNumber, {
                    disabled: true,
                    min: 0,
                    max: 10,
                    step: 1,
                    value: state.number3,
                    onChange: handleNumberChange.bind(this, 'number3'),
                  })
                ]
              }),
            ]
          }),

          /* 禁用输入状态*/
          h(Panel, { title: '禁用输入状态', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtInputNumber, {
                    disabledInput: true,
                    min: 0,
                    max: 10,
                    step: 1,
                    value: state.number6,
                    onChange: handleNumberChange.bind(this, 'number6'),
                  })
                ]
              }),
            ]
          }),

          /* 自定义宽度*/
          h(Panel, { title: '自定义宽度', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtInputNumber, {
                    width: 200,
                    min: 0,
                    max: 10,
                    step: 1,
                    value: state.number4,
                    onChange: handleNumberChange.bind(this, 'number4'),
                  })
                ]
              }),
            ]
          }),

          /* 大尺寸*/
          h(Panel, { title: '大尺寸', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtInputNumber, {
                    size: 'large',
                    min: 0,
                    max: 10,
                    step: 1,
                    value: state.number5,
                    onChange: handleNumberChange.bind(this, 'number5'),
                  })
                ]
              }),
            ]
          }),
        ]
      })
    )
  }
})
