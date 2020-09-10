import { h, defineComponent, reactive, ref } from 'vue'
import { AtSteps } from '@/components/index'
import { Item } from 'types/steps'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface TimelinePageState {
  [key: string]: number
}

export default defineComponent({
  name: "StepsDemo",

  setup() {

    const state = reactive<TimelinePageState>({
      current1: 0,
      current2: 0,
      current3: 0,
      current4: 0,
      current5: 1
    })

    const items1= ref<Item[]>([ { title: '步骤一' }, { title: '步骤二' }])

    const items2= ref<Item[]>([ 
      { title: '步骤一' },
      { title: '步骤二' },
      { title: '步骤三' }
    ])

    const items3= ref<Item[]>([ 
      { title: '步骤一', desc: '这里是额外的信息，最多两行' },
      { title: '步骤二', desc: '这里是额外的信息，最多两行' },
      { title: '步骤三', desc: '这里是额外的信息，最多两行' }
    ])

    const items4= ref<Item[]>([ 
      {
        title: '步骤一',
        desc: '这里是额外的信息，最多两行',
        icon: {
          value: 'sound',
          activeColor: '#fff',
          inactiveColor: '#78A4FA',
          size: '14'
        }
      },
      {
        title: '步骤二',
        desc: '这里是额外的信息，最多两行',
        icon: {
          value: 'shopping-cart',
          activeColor: '#fff',
          inactiveColor: '#78A4FA',
          size: '14'
        }
      },
      {
        title: '步骤三',
        desc: '这里是额外的信息，最多两行',
        icon: {
          value: 'camera',
          activeColor: '#fff',
          inactiveColor: '#78A4FA',
          size: '14'
        }
      }
    ])

    const items5= ref<Item[]>([ 
      {
        title: '步骤一',
        desc: '这里是额外的信息，最多两行',
        status: 'success'
      },
      {
        title: '步骤二',
        desc: '这里是额外的信息，最多两行'
      },
      {
        title: '步骤三',
        desc: '这里是额外的信息，最多两行',
        status: 'error'
      }
    ])

    function onChange(stateName: string, current: number): void {
      state[stateName] = current
    }

    return () => (
      h(Page, { class: 'page', headerTitle: 'Steps 步骤条' }, {
        default: () => [
          /* 基础用法*/
          h(Panel, { title: '基础用法', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtSteps, {
                    items: items1.value,
                    current: state.current1,
                    onChange: onChange.bind(this, 'current1'),
                  }),
                  h(AtSteps, {
                    items: items2.value,
                    current: state.current2,
                    onChange: onChange.bind(this, 'current2'),
                  }),
                ]
              })
            ]
          }),

          /* 带附加信息*/
          h(Panel, { title: '带附加信息', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtSteps, {
                    items: items3.value,
                    current: state.current3,
                    onChange: onChange.bind(this, 'current3'),
                  })
                ]
              })
            ]
          }),

          /* 自定义图标*/
          h(Panel, { title: '自定义图标', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtSteps, {
                    items: items4.value,
                    current: state.current4,
                    onChange: onChange.bind(this, 'current4'),
                  })
                ]
              })
            ]
          }),

          /* 状态步骤条*/
          h(Panel, { title: '状态步骤条', class: 'panel__content' }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtSteps, {
                    items: items5.value,
                    current: state.current5,
                    onChange: onChange.bind(this, 'current5'),
                  })
                ]
              })
            ]
          }),
        ]
      })
    )
  }
})
