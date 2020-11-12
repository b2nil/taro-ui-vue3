import { h, defineComponent, reactive, resolveComponent } from 'vue'
import { AtRate } from "taro-ui-vue3"
import { Page, Panel, ExampleItem } from '@/components/index'
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

    return () => {
      const View = resolveComponent(process.env.TARO_ENV === 'h5' ? 'taro-view' : 'view')

      return (
        h(Page, { headerTitle: 'Rate 评分' }, {
          default: () => [
            /* 基础用法*/
            h(Panel, { title: '基础用法', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtRate, {
                      modelValue: state.rateValue1,
                      'onUpdate:modelValue': (e) => state.rateValue1 = e
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
                      modelValue: state.rateValue2,
                      'onUpdate:modelValue': (e) => state.rateValue2 = e
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
                      modelValue: state.rateValue3,
                      'onUpdate:modelValue': (e) => state.rateValue3 = e
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
                      modelValue: state.rateValue4,
                      'onUpdate:modelValue': (e) => state.rateValue4 = e
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
                        h(AtRate, { modelValue: 3.5 })
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
