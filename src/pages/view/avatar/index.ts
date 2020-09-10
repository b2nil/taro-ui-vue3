
import { h, defineComponent } from 'vue'
import { AtAvatar } from '@/components/index'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

export default defineComponent({
  name: "AvatarDemo",

  setup() {

    return () => {
      const avatarImg =
        'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'

      return (
        h(Page, { headerTitle: 'Avatar 头像' }, {
          default: () => [
            /* 圆形头像*/
            h(Panel, { title: '圆形头像' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { circle: true, size: 'small', image: avatarImg })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { circle: true, image: avatarImg })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { circle: true, size: 'large', image: avatarImg })
                      ]
                    }),
                  ]
                }),
              ]
            }),


            /* 圆角矩形头像*/
            h(Panel, { title: '圆角矩形头像' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { size: 'small', image: avatarImg })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { image: avatarImg })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { size: 'large', image: avatarImg })
                      ]
                    }),
                  ]
                }),
              ]
            }),

            /* 圆形头像（支持文本）*/
            h(Panel, { title: '圆形头像（支持文本）' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { circle: true, size: 'small', text: '凹' })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { circle: true, text: '凹', })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { circle: true, size: 'large', text: '凹' })
                      ]
                    }),
                  ]
                }),
              ]
            }),

            /* 圆角矩形头像（支持文本）*/
            h(Panel, {
              title: '圆角矩形头像（支持文本）',
              class: 'panel__content'
            }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { size: 'small', text: '凹' })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { text: '凹' })
                      ]
                    }),
                    h(View, { class: 'subitem' }, {
                      default: () => [
                        h(AtAvatar, { size: 'large', text: '凹' })
                      ]
                    }),
                  ]
                }),
              ]
            }),

            /* openData 头像（仅微信小程序支持）*/
            Taro.getEnv() === Taro.ENV_TYPE.WEAPP && (
              h(Panel, {
                title: 'openData 头像（仅微信小程序支持）',
                class: 'panel__content'
              }, {
                default: () => [

                  h(ExampleItem, null, {
                    default: () => [
                      h(View, { class: 'subitem' }, {
                        default: () => [
                          h(AtAvatar, {
                            openData: { type: 'userAvatarUrl' },
                            size: 'small',
                          })
                        ]
                      }),
                      h(View, { class: 'subitem' }, {
                        default: () => [
                          h(AtAvatar, { openData: { type: 'userAvatarUrl' } })
                        ]
                      }),
                      h(View, { class: 'subitem' }, {
                        default: () => [
                          h(AtAvatar, {
                            size: 'large',
                            openData: { type: 'userAvatarUrl' }
                          })
                        ]
                      }),
                      h(View, { class: 'subitem' }, {
                        default: () => [
                          h(AtAvatar, {
                            size: 'large',
                            circle: true,
                            openData: { type: 'userAvatarUrl' }
                          })
                        ]
                      }),
                    ]
                  }),
                ]
              })
            )
          ]
        })
      )
    }
  }
})
