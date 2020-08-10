import { h, defineComponent, reactive } from 'vue'
import { AtRange } from '@/components/index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: [number, number]
}

export default defineComponent({
  setup() {

    const state = reactive<IndexState>({
      value1: [50, 60],
      value2: [50, 60]
    })

    function handleChange(stateName: string, value: [number, number]): void {
      state[stateName] = value
    }

    return () => {
      return (
        h(Page, { headerTitle: 'Range 范围选择器' }, {
          default: () => [
            /* 基础用法*/
            h(Panel, { title: '基础用法', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () =>
                    `数值范围：${state.value1[0]}~${state.value1[1]}`
                }),
                h(AtRange, {
                  min: 30,
                  max: 90,
                  value: state.value1,
                  onChange: handleChange.bind(this, 'value1'),
                })
              ]
            }),
            /* 自定义样式*/
            h(Panel, { title: '自定义样式', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () =>
                    `数值范围：${state.value2[0]}~${state.value2[1]}`
                }),
                h(AtRange, {
                  sliderStyle: { backgroundColor: '#6190E8' },
                  value: state.value2,
                  onChange: handleChange.bind(this, 'value2'),
                })
              ]
            }),
            /* 禁止状态*/
            h(Panel, { title: '禁止状态', }, {
              default: () => [
                h(AtRange, { value: [30, 50], disabled: true })
              ]
            }),
          ]
        })
      )
    }
  }
})
