import { h, defineComponent, reactive } from 'vue'
import { AtSearchBar } from '@/components/index'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Page, Panel } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: string
}

export default defineComponent({

  setup() {

    const state = reactive<IndexState>({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })

    function onChange(stateName: string, value: string | number): void {
      state[stateName] = value as string
    }

    function onActionClick(stateName: string): void {
      Taro.showToast({
        title: `开始搜索: ${state[stateName]}`,
        icon: 'success',
        duration: 2000
      })
    }

    return () => {
      return (
        h(Page, { headerTitle: 'SearchBar 搜索栏' }, {
          default: () => [
            /* 基础用法*/
            h(Panel, { title: '基础用法', noPadding: true }, {
              default: () => [
                h(View, { class: 'component-item' }, {
                  default: () => [
                    h(AtSearchBar, {
                      value: state.value1,
                      onChange: (e) => onChange('value1', e),
                      onActionClick: onActionClick.bind(this, 'value1'),
                    })
                  ]
                }),
              ]
            }),

            /* 自定义按钮文字和点击事件*/
            h(Panel, { title: '自定义按钮文字和点击事件', noPadding: true }, {
              default: () => [
                h(View, { class: 'component-item' }, {
                  default: () => [
                    h(AtSearchBar, {
                      actionName: '搜一下',
                      value: state.value2,
                      onChange: (e) => onChange('value2', e),
                      onActionClick: onActionClick.bind(this, 'value2'),
                    })
                  ]
                }),
              ]
            }),

            /* 始终显示按钮*/
            h(Panel, { title: '始终显示按钮', noPadding: true }, {
              default: () => [
                h(View, { class: 'component-item' }, {
                  default: () => [
                    h(AtSearchBar, {
                      placeholder: '请输入ISBN号',
                      showActionButton: true,
                      value: state.value3,
                      onChange: (e) => onChange('value3', e),
                      onActionClick: onActionClick.bind(this, 'value3'),
                    })
                  ]
                }),
              ]
            }),

            /* 自定义输入框类型*/
            h(Panel, { title: '自定义输入框类型', noPadding: true }, {
              default: () => [
                h(View, { class: 'component-item' }, {
                  default: () => [
                    h(AtSearchBar, {
                      placeholder: '请输入数字',
                      inputType: 'number',
                      value: state.value4,
                      onChange: (e) => onChange('value4', e),
                      onActionClick: onActionClick.bind(this, 'value4'),
                    })
                  ]
                }),
              ]
            }),
          ]
        })
      )
    }
  }
})
