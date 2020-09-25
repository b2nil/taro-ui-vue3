
import { h, defineComponent } from 'vue'
import { AtNoticebar } from '@/components/index'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Page, Panel } from '../../components/demo-page'
import './index.scss'

export default defineComponent({
  name: "NoticebarDemo",

  setup() {

    const textOnly = '[纯文字] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。 [结束]'
    const singleLineText = '[单行] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。'
    const multiLineText = '[多行] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。'
    const textWithIcon = '[带icon] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。 [结束]'
    const superLongText = '[超长文本] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。两鬓风霜，途次早行之客，一蓑烟雨，溪边晚钓之翁。沿对革，异对同，白叟对黄童。江风对海雾，牧子对渔翁。颜巷陋，阮途穷，冀北对辽东。池中濯足水，门外打头风。梁帝讲经同泰寺，汉皇置酒未央宫。 [结束]'

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
                      h(Text, { 'user-select': true }, { default: () => singleLineText }),
                    ]
                  })
                ]
              }),
              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, null, {
                    default: () => [
                      h(Text, { 'user-select': true }, { default: () => multiLineText }),
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
                      h(Text, {
                        'user-select': true,
                        style: 'white-space: nowrap;'
                      }, { default: () => textOnly })
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
                      h(Text, {
                        'user-select': true,
                        style: 'white-space: nowrap;'
                      }, { default: () => textWithIcon })
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { marquee: true }, {
                    default: () => [
                      h(Text, {
                        'user-select': true,
                        style: 'white-space: nowrap;'
                      }, { default: () => superLongText })
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
                      h(Text, { 'user-select': true }, { default: () => singleLineText })
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
                      h(Text, { 'user-select': true }, { default: () => multiLineText })
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
                      h(Text, { 'user-select': true }, { default: () => singleLineText })
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
                      h(Text, { 'user-select': true }, { default: () => singleLineText })
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
                      h(Text, { 'user-select': true }, { default: () => multiLineText })
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
                        h(Text, { 'user-select': true }, { default: () => multiLineText })
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
                      h(Text, { 'user-select': true }, { default: () => singleLineText })
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { close: true, icon: 'volume-plus', single: true }, {
                    default: () => [
                      h(Text, { 'user-select': true }, { default: () => singleLineText })
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
                      h(Text, { 'user-select': true }, { default: () => singleLineText })
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
                      h(Text, { 'user-select': true }, { default: () => singleLineText })
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { close: true }, {
                    default: () => [
                      h(Text, { 'user-select': true }, { default: () => multiLineText })
                    ]
                  })
                ]
              }),

              h(View, { class: 'bar-item' }, {
                default: () => [
                  h(AtNoticebar, { close: true }, {
                    default: () => [
                      h(Text, { 'user-select': true }, { default: () => multiLineText })
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
                      h(Text, { 'user-select': true }, { default: () => multiLineText })
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
