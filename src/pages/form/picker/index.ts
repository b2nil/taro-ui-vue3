import { h, defineComponent, reactive, onMounted } from 'vue'
import { Picker, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  selector: string[]
  multiSelector: string[][]
  selectorValue: number
  mulitSelectorValues: number[]
  timeSel: string
  dateSel: string
  isAlipay: boolean
}

export default defineComponent({

  setup() {

    const state = reactive<IndexState>({
      selector: ['中国', '美国', '巴西', '日本'],
      multiSelector: [
        ['饭', '粥', '粉'],
        ['猪肉', '牛肉']
      ],
      selectorValue: 0,
      mulitSelectorValues: [0, 1],
      timeSel: '06:18',
      dateSel: '2018-06-18',
      isAlipay: false
    })

    onMounted(() => {
      const env = Taro.getEnv()
      state.isAlipay = env === Taro.ENV_TYPE.ALIPAY
    })

    const handleChange = (e: CommonEvent): void => {
      state.selectorValue = e.detail.value
    }

    const handleMulitChange = (e: CommonEvent): void => {
      state.mulitSelectorValues = e.detail.value
    }

    const handleTimeChange = (e: CommonEvent): void => {
      state.timeSel = e.detail.value
    }

    const handleDateChange = (e: CommonEvent): void => {
      state.dateSel = e.detail.value
    }

    return () => {
      const {
        selector,
        selectorValue,
        multiSelector,
        mulitSelectorValues,
        timeSel,
        dateSel,
        isAlipay
      } = state

      return (
        h(Page, {
          class: 'picker__page',
          headerTitle: 'Picker 选择器'
        }, {
          default: () => [
            /* 普通选择器*/
            h(Panel, { title: '普通选择器', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(Picker, {
                      mode: 'selector',
                      range: selector,
                      value: selectorValue,
                      onChange: handleChange,
                    }, {
                      default: () => [
                        h(View, { class: 'demo-list-item' }, {
                          default: () => [
                            h(View, { class: 'demo-list-item__label' }, { default: () => '国家地区' }),
                            h(View, { class: 'demo-list-item__value' }, {
                              default: () =>
                                selector[selectorValue]
                            }),
                          ]
                        }),
                      ]
                    }),
                  ]
                }),
              ]
            }),

            /* 多列选择器*/
            !isAlipay && (
              h(Panel, { title: '多列选择器', }, {
                default: () => [
                  h(ExampleItem, null, {
                    default: () => [
                      h(Picker, {
                        mode: 'multiSelector',
                        range: multiSelector,
                        value: mulitSelectorValues,
                        onChange: handleMulitChange,
                      }, {
                        default: () => [
                          h(View, { class: 'demo-list-item' }, {
                            default: () => [
                              h(View, { class: 'demo-list-item__label' }, { default: () => '请选择早餐' }),
                              h(View, { class: 'demo-list-item__value' }, {
                                default: () => [
                                  `${
                                  multiSelector[0][mulitSelectorValues[0]]
                                  } & ${multiSelector[1][mulitSelectorValues[1]]}`
                                ]
                              }),
                            ]
                          }),
                        ]
                      }),
                    ]
                  })
                ]
              })
            ),

            /* 时间选择器*/
            h(Panel, { title: '时间选择器', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(Picker, {
                      mode: 'time',
                      value: timeSel,
                      onChange: handleTimeChange,
                    }, {
                      default: () => [
                        h(View, { class: 'demo-list-item' }, {
                          default: () => [
                            h(View, { class: 'demo-list-item__label' }, { default: () => '请选择时间' }),
                            h(View, { class: 'demo-list-item__value' }, { default: () => timeSel }),
                          ]
                        }),

                      ]
                    }),
                  ]
                }),
              ]
            }),

            /* 日期选择器*/
            h(Panel, { title: '日期选择器', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(Picker, {
                      mode: 'date',
                      value: dateSel,
                      onChange: handleDateChange,
                    }, {
                      default: () => [
                        h(View, { class: 'demo-list-item' }, {
                          default: () => [
                            h(View, { class: 'demo-list-item__label' }, { default: () => '请选择日期' }),
                            h(View, { class: 'demo-list-item__value' }, { default: () => dateSel }),
                          ]
                        })
                      ]
                    })
                  ]
                }),
              ]
            })
          ]
        })
      )
    }
  }
})
