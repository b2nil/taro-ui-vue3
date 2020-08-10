
import { h, defineComponent } from 'vue'
import { AtNoticebar } from '@/components/index'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Page, Panel } from '../../components/demo-page'
import './index.scss'

export default defineComponent({

  setup() {

    function onGotoMore(): void {
      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        alert('您点击了更多!')
        return
      }

      Taro.showModal({
        content: '点击了更多!',
        cancelText: '取消'
      })
    }

    return () => (
      h(Page, { headerTitle: 'NoticeBar 通告栏' }, {
        default: () => [
          // 文字
          h(Panel, { title: '文字', class: 'panel__content' }, {
            default: () => [
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { single: true }, {
                    default: () => [
                      h(Text, null, '[单行]'),
                      h(Text, null, '这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏'),
                    ]
                  })
                ]
              }),
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, null, {
                    default: () => [
                      h(Text, null, '[多行]'),
                      h(Text, null, '这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏'),
                    ]
                  })
                ]
              }),
            ]
          }),

          /* 跑马灯*/
          h(Panel, { title: '跑马灯', class: 'panel__content' }, {
            default: () => [
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { marquee: true }, {
                    default: () => [
                      h(Text, null, '[纯文字]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]')
                    ]
                  })
                ]
              }),
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    marquee: true,
                    icon: 'volume-plus'
                  }, {
                    default: () => [
                      h(Text, null, '[带icon]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { marquee: true }, {
                    default: () => [
                      h(Text, null, '[超长文本]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]')
                    ]
                  })
                ]
              }),
            ]
          }),

          /* 图标*/
          h(Panel, { title: '图标', class: 'panel__content' }, {
            default: () => [
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { icon: 'volume-plus', single: true }, {
                    default: () => [
                      h(Text, null, '[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    icon: 'volume-plus'
                  }, {
                    default: () => [
                      h(Text, null, '[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),
            ]
          }),

          /* 查看更多*/
          h(Panel, { title: '查看更多', class: 'panel__content' }, {
            default: () => [
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    showMore: true,
                    single: true,
                    onGotoMore: onGotoMore.bind(this)
                  }, {
                    default: () => [
                      h(Text, null, '[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    showMore: true,
                    single: true,
                    icon: 'volume-plus',
                    onGotoMore: onGotoMore.bind(this)
                  }, {
                    default: () => [
                      h(Text, null, '[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    showMore: true,
                    moreText: '更多内容',
                    onGotoMore: onGotoMore.bind(this)
                  }, {
                    default: () => [
                      h(Text, null, '[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    showMore: true,
                    moreText: '更多内容',
                    icon: 'volume-plus',
                    onGotoMore: onGotoMore.bind(this)
                  },
                    {
                      default: () => [
                        h(Text, null, '[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                      ]
                    })
                ]
              })
            ]
          }),

          /* 关闭按钮*/
          h(Panel, { title: '关闭按钮', class: 'panel__content' }, {
            default: () => [
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { close: true, single: true }, {
                    default: () => [
                      h(Text, null, '[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { close: true, icon: 'volume-plus', single: true }, {
                    default: () => [
                      h(Text, null, '[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    close: true,
                    single: true,
                    showMore: true,
                    onGotoMore: onGotoMore.bind(this),
                  }, {
                    default: () => [
                      h(Text, null, '[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    close: true,
                    single: true,
                    showMore: true,
                    icon: 'volume-plus',
                    onGotoMore: onGotoMore.bind(this),
                  }, {
                    default: () => [
                      h(Text, null, '[单行]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { close: true }, {
                    default: () => [
                      h(Text, null, '[多行]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { close: true }, {
                    default: () => [
                      h(Text, null, '[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, {
                    close: true,
                    icon: 'volume-plus'
                  }, {
                    default: () => [
                      h(Text, null, '[多行]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏')
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
})
