import { h, defineComponent, reactive } from 'vue'
import { AtRate } from '@/components/index'
import { View } from '@tarojs/components'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: number
}

export default defineComponent({

  setup() {

    const state = reactive<IndexState>({
      rateValue1: 3,
      rateValue2: 3,
      rateValue3: 3,
      rateValue4: 3
    })

    function handleRateChange(stateName: string, value: number): void {
      state[stateName] = value
    }

    return () => {
      const { rateValue1, rateValue2, rateValue3, rateValue4 } = state

      return (
        h(Page, { headerTitle: 'Rate 评分' }, {
          default: () => [
            /* 基础用法*/
            h(Panel, { title: '基础用法', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtRate, {
                      value: rateValue1,
                      onChange: handleRateChange.bind(this, 'rateValue1'),
                    })
                  ]
                }),
              ]
            }),

            /* 自定义尺寸*/
            h(Panel, { title: '自定义尺寸', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtRate, {
                      size: 16,
                      value: rateValue2,
                      onChange: handleRateChange.bind(this, 'rateValue2'),
                    })
                  ]
                }),
              ]
            }),

            /* 自定义评分数*/
            h(Panel, { title: '自定义评分数', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtRate, {
                      max: 10,
                      value: rateValue3,
                      onChange: handleRateChange.bind(this, 'rateValue3'),
                    })
                  ]
                }),
              ]
            }),

            /* 自定义星星间隔*/
            h(Panel, { title: '自定义星星间隔', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtRate, {
                      margin: 15,
                      value: rateValue4,
                      onChange: handleRateChange.bind(this, 'rateValue4'),
                    })
                  ]
                }),
              ]
            }),

            /* 只读*/
            h(Panel, { title: '只读', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(View, null, { default: () => '评分: 3.5' }),
                    h(View, null, {
                      default: () => [
                        h(AtRate, { value: 3.5 })
                      ]
                    })
                  ]
                }),
              ]
            }),
          ]
        })
        /* E Body*/
      )
    }
  }
})
