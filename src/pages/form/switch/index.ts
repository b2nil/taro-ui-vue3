import { h, defineComponent, reactive } from 'vue'
import { AtForm, AtSwitch } from '@/components/index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  switchValue: boolean
}

export default defineComponent({
  setup() {
    const state = reactive<IndexState>({
      switchValue: true
    })


    const handleChange = (value: boolean): void => {
      state.switchValue = value
    }


    return () => (
      h(Page, { headerTitle: 'Switch 开关' }, {
        default: () => [

          /* 基础用法*/
          h(Panel, { title: '基础用法', noPadding: true }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtForm, null, {
                    default: () => [
                      h(AtSwitch, {
                        title: state.switchValue ? '开启中' : '已关闭',
                        checked: state.switchValue,
                        onChange: handleChange,
                      }),
                      h(AtSwitch, {
                        title: '已关闭',
                        border: false,
                      })
                    ]
                  })
                ]
              }),
            ]
          }),

          /* 禁用状态*/
          h(Panel, { title: '禁用状态', noPadding: true }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtForm, null, {
                    default: () => [
                      h(AtSwitch, { title: '不可点击', checked: true, disabled: true }),
                      h(AtSwitch, { title: '不可点击', border: false, disabled: true })
                    ]
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
