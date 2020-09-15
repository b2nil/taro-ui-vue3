import { h, defineComponent, reactive, onMounted } from 'vue'
import { PickerView, PickerViewColumn, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  years: number[]
  year: number
  months: number[]
  month: number
  days: number[]
  day: number
  value: number[]
  isWeapp: boolean
  isAlipay: boolean
}

export default defineComponent({

  setup() {

    const date = new Date()
    const years: number[] = []
    const months: number[] = []
    const days: number[] = []

    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }

    const state = reactive<IndexState>({
      years,
      year: date.getFullYear(),
      months,
      month: date.getMonth(),
      days,
      day: date.getDay(),
      value: [date.getFullYear(), date.getMonth(), date.getDay()],
      isWeapp: false,
      isAlipay: false
    })

    onMounted(() => {
      const env = Taro.getEnv()
      state.isWeapp = env === Taro.ENV_TYPE.WEAPP
      state.isAlipay = env === Taro.ENV_TYPE.ALIPAY
    })

    const handleChange = (e: CommonEvent): void => {
      const val = e.detail.value

      state.year = state.years[val[0]]
      state.month = state.months[val[1]]
      state.day = state.days[val[2]]
      state.value = val
    }

    return () => (
      h(Page, { headerTitle: 'Picker View 滚动选择器' }, {
        default: () => [

          /* 基础用法*/
          h(Panel, { title: '基础用法', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'example-item__desc' }, '嵌入页面的滑动选择器'),

                  state.isWeapp || state.isAlipay
                    ? (
                      h(View, null, {
                        default: () => [
                          h(View, { class: 'title-date' }, `${state.year} 年 ${state.month} 月 ${state.day} 日`),

                          h(PickerView, {
                            class: 'picker',
                            indicatorStyle: 'height: 50px;',
                            style: 'width: 100%; height: 300px; text-align: center;',
                            value: state.value,
                            onChange: handleChange,
                          }, {
                            default: () => [
                              h(PickerViewColumn, null, {
                                default: () =>
                                  state.years.map((item, idx) => (
                                    h(View, { key: `years-${idx}`, style: 'line-height: 50px' }, `${item} 年`)
                                  ))
                              }),

                              h(PickerViewColumn, null, {
                                default: () =>
                                  state.months.map((item, idx) => (
                                    h(View, { key: `months-${idx}`, style: 'line-height: 50px' }, `${item} 月`)
                                  ))

                              }),

                              h(PickerViewColumn, null, {
                                default: () =>
                                  state.days.map((item, idx) => (
                                    h(View, { key: `days-${idx}`, style: 'line-height: 50px' }, `${item} 日`)
                                  ))
                              }),
                            ]
                          })
                        ]
                      })
                    )
                    : (
                      h(View, { class: 'title-date' }, '暂时仅支持微信小程序')
                    )
                ]
              })
            ]
          }),
        ]
      })
    )
  }
})
