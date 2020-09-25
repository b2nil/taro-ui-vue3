import { h, defineComponent, reactive } from 'vue'
import { AtButton, AtCurtain } from '@/components/index'
import { Image, Text } from '@tarojs/components'
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import './index.scss'

const curtainPng = require('@/assets/images/curtain.png')

interface TagPageState {
  isOpened: boolean
  closeBtnPosition:
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  [key: string]: string | boolean
}

export default defineComponent({
  name: "CurtainDemo",

  setup() {

    const state = reactive<TagPageState>({
      isOpened: false,
      closeBtnPosition: 'bottom'
    })

    function handleChange(stateName: string, value: string): void {
      state.isOpened = true
      state[stateName] = value
    }

    function onClose(): void {
      state.isOpened = false
    }

    return () => {
      const { isOpened, closeBtnPosition } = state

      return (
        h(Page, { headerTitle: 'Curtain 幕帘' }, {
          extra: () => [
            h(AtCurtain, {
              isOpened: isOpened,
              closeBtnPosition: closeBtnPosition,
              onClose: onClose.bind(this),
            }, {
              default: () => [
                h(Image, { style: 'width:100%', mode: 'widthFix', src: curtainPng })
              ]
            })
          ],
          default: () => [
            /* 顶部关闭*/
            h(Panel, { title: '顶部关闭' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtButton, {
                      onClick: handleChange.bind(
                        this,
                        'closeBtnPosition',
                        'top'
                      )
                    }, {
                      default: () => [
                        h(Text, null, { default: () => '顶部关闭幕帘' })
                      ]
                    })
                  ]
                })
              ]
            }),

            /* 底部关闭*/
            h(Panel, { title: '底部关闭', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtButton, {
                      onClick: handleChange.bind(
                        this,
                        'closeBtnPosition',
                        'bottom'
                      )
                    }, {
                      default: () => [
                        h(Text, null, { default: () => '底部关闭幕帘' })
                      ]
                    })
                  ]
                })
              ]
            }),

            /* 左上关闭*/
            h(Panel, { title: '左上关闭', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtButton, {
                      onClick: handleChange.bind(
                        this,
                        'closeBtnPosition',
                        'top-left'
                      )
                    }, {
                      default: () => [
                        h(Text, null, { default: () => '左上关闭幕帘' })
                      ]
                    })
                  ]
                })
              ]
            }),

            /* 右上关闭*/
            h(Panel, { title: '右上关闭', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtButton, {
                      onClick: handleChange.bind(
                        this,
                        'closeBtnPosition',
                        'top-right'
                      )
                    }, {
                      default: () => [
                        h(Text, null, { default: () => '右上关闭幕帘' })
                      ]
                    })
                  ]
                })
              ]
            }),

            /* 左下关闭*/
            h(Panel, { title: '左下关闭', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtButton, {
                      onClick: handleChange.bind(
                        this,
                        'closeBtnPosition',
                        'bottom-left'
                      )
                    }, {
                      default: () => [
                        h(Text, null, { default: () => '左下关闭幕帘' })
                      ]
                    })
                  ]
                })
              ]
            }),

            /* 右下关闭*/
            h(Panel, { title: '右下关闭', }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(AtButton, {
                      onClick: handleChange.bind(
                        this,
                        'closeBtnPosition',
                        'bottom-right'
                      )
                    }, {
                      default: () => [
                        h(Text, null, { default: () => '右下关闭幕帘' })
                      ]
                    })
                  ]
                })
              ]
            }),
          ]
        }
        )
      )
    }
  }
})
