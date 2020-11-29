import { h, defineComponent } from 'vue'
import { AtSlider } from '@/components/index'
import { View } from '@tarojs/components'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

export default defineComponent({

  setup() {

    return () => (
      h(Page, { headerTitle: 'Slider 滑动条' }, {
        default: () => [
          /* 基础用法*/
          h(Panel, { title: '基础用法', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, { default: () => 'step=1' }),
                  h(AtSlider, { step: 1, value: 50, })
                ]
              }),
            ]
          }),

          /* 显示当前 Value*/
          h(Panel, { title: '显示当前 Value', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, { default: () => 'step=0.1' }),
                  h(AtSlider, { step: 0.1, value: 50, showValue: true })
                ]
              }),
            ]
          }),

          /* 设置最大/最小值*/
          h(Panel, { title: '设置最大/最小值', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, { default: () => 'step = 1, min = 50, max = 200' }),
                  h(AtSlider, {
                    step: 1,
                    value: 100,
                    min: 50,
                    max: 200,
                    showValue: true
                  })
                ]
              }),
            ]
          }),

          /* 自定义样式*/
          h(Panel, { title: '自定义样式', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, { default: () => 'step = 1, blockSize = 24' }),
                  h(AtSlider, {
                    step: 1,
                    value: 50,
                    activeColor: '#4285F4',
                    backgroundColor: '#BDBDBD',
                    blockColor: '#4285F4',
                    blockSize: 24,
                  })
                ]
              }),
            ]
          }),

          /* 禁用状态*/
          h(Panel, { title: '禁用状态', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, { default: () => 'step = 1, blockSize = 24' }),
                  h(AtSlider, { step: 1, value: 50, showValue: true, disabled: true })
                ]
              }),
            ]
          }),
        ]
      })
    )
  }
})
