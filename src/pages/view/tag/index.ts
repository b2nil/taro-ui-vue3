
import { AtTag } from '@/components/index'
import { h, defineComponent, reactive } from 'vue'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

type ListItem = {
  name: string
  active: boolean
}

interface TagPageState {
  tagList: ListItem[]
  hollowTagList: ListItem[]
  solidTagList: ListItem[]
  hollowTagList2: ListItem[]
  solidTagList2: ListItem[]
}

export default defineComponent({
  name: "TagDemo",

  setup() {

    const state = reactive<TagPageState>({
      tagList: [
        { name: 'tag-1', active: false },
        { name: 'tag-2', active: false },
        { name: 'tag-3', active: true },
        { name: 'tag-4', active: true }
      ],
      hollowTagList: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      solidTagList: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      hollowTagList2: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      solidTagList2: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ]
    })

    function onClick(data: ListItem): void {
      const { tagList } = state
      const findIndex = tagList.findIndex(item => item.name === data.name)
      const active = !tagList[findIndex].active
      const content = `您点击的 tag 标签名是：${data.name}，点击前是否选中：${data.active}，点击后：${active}`

      tagList[findIndex].active = active
      state.tagList = tagList

      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        alert(content)
      } else {
        Taro.showModal({ content, showCancel: false })
      }
    }

    function handleHollowClick(data: ListItem): void {
      const { hollowTagList } = state
      const findIndex = hollowTagList.findIndex(item => item.name === data.name)

      hollowTagList[findIndex].active = !hollowTagList[findIndex].active
      state.hollowTagList = hollowTagList
    }

    function handleSolidClick(data: ListItem): void {
      const { solidTagList } = state
      const findIndex = solidTagList.findIndex(item => item.name === data.name)

      solidTagList[findIndex].active = !solidTagList[findIndex].active
      state.solidTagList = solidTagList
    }

    function handleHollowSmallClick(data: ListItem): void {
      const { hollowTagList2 } = state
      const findIndex = hollowTagList2.findIndex(item => item.name === data.name)

      hollowTagList2[findIndex].active = !hollowTagList2[findIndex].active
      state.hollowTagList2 = hollowTagList2
    }

    function handleSolidSmallClick(data: ListItem): void {
      const { solidTagList2 } = state
      const findIndex = solidTagList2.findIndex(item => item.name === data.name)

      solidTagList2[findIndex].active = !solidTagList2[findIndex].active
      state.solidTagList2 = solidTagList2
    }

    return () => {
      return (
        h(Page, { headerTitle: 'Tag 标签' }, {
          default: () => [
            /* 空心标签*/
            h(Panel, { title: '空心标签' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () =>
                    state.hollowTagList.map((item, index) => (
                      h(View, { class: 'subitem', key: `at-tag-${index}` }, {
                        default: () => [
                          h(AtTag, {
                            name: item.name,
                            active: item.active,
                            circle: index % 2 === 0,
                            onClick: handleHollowClick.bind(this),
                          }, {
                            default: () => [
                              h(Text, null, { default: () => '标签' })
                            ]
                          })
                        ]
                      })
                    ))
                })
              ]
            }),

            /* 实心标签*/
            h(Panel, { title: '实心标签', class: 'panel__content' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () =>
                    state.solidTagList.map((item, index) => (
                      h(View, { class: 'subitem', key: `at-tag-${index}` }, {
                        default: () => [
                          h(AtTag, {
                            type: 'primary',
                            name: item.name,
                            active: item.active,
                            circle: index % 2 === 0,
                            onClick: handleSolidClick.bind(this),
                          }, {
                            default: () => [
                              h(Text, null, { default: () => '标签' })
                            ]
                          })
                        ]
                      })
                    ))
                })
              ]
            }),

            /* 点击事件*/
            h(Panel, { title: '点击事件', class: 'panel__content' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () =>
                    state.tagList.map((item, index) => (
                      h(View, { class: 'subitem', key: `at-tag-${index}` }, {
                        default: () => [
                          h(AtTag, {
                            name: item.name,
                            type: 'primary',
                            active: item.active,
                            circle: index % 2 === 0,
                            onClick: onClick.bind(this),
                          }, {
                            default: () => [
                              h(Text, null, { default: () => `tag-${index + 1}` })
                            ]
                          })
                        ]
                      })
                    ))
                })
              ]
            }),

            /* 不可点击态*/
            h(Panel, { title: '不可点击态', class: 'panel__content' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(View, { class: 'subitem' }, { default: () => [
                      h(AtTag, { type: 'primary', circle: true, disabled: true }, {
                        default: () => [
                          h(Text, null, { default: () => '标签' })
                        ]
                      })
                    ]}),
                    h(View, { class: 'subitem' }, { default: () => [
                      h(AtTag, { type: 'primary', disabled: true }, {
                        default: () => [
                          h(Text, null, { default: () => '标签' })
                        ]
                      })
                    ]}),
                  ]
                })
              ]
            }),

            /* 空心标签（小）*/
            h(Panel, { title: '空心标签（小）', class: 'panel__content' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    state.hollowTagList2.map((item, index) => (
                      h(View, { class: 'subitem', key: `at-tag-${index}` }, {
                        default: () => [
                          h(AtTag, {
                            size: 'small',
                            name: item.name,
                            active: item.active,
                            circle: index % 2 === 0,
                            onClick: handleHollowSmallClick.bind(this),
                          }, {
                            default: () => [
                              h(Text, null, { default: () => '标签' })
                            ]
                          })
                        ]
                      })
                    ))
                  ]
                })
              ]
            }),

            /* 实心标签（小）*/
            h(Panel, { title: '实心标签（小）', class: 'panel__content' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () =>
                    state.solidTagList2.map((item, index) => (
                      h(View, { class: 'subitem', key: `at-tag-${index}` }, {
                        default: () => [
                          h(AtTag, {
                            size: 'small',
                            type: 'primary',
                            name: item.name,
                            active: item.active,
                            circle: index % 2 === 0,
                            onClick: handleSolidSmallClick.bind(this),
                          }, {
                            default: () => [
                              h(Text, null, { default: () => '标签' })
                            ]
                          })
                        ]
                      })
                    ))
                })
              ]
            }),

            /* 不可点击态（小）*/
            h(Panel, { title: '不可点击态（小）', class: 'panel__content' }, {
              default: () => [
                h(ExampleItem, null, {
                  default: () => [
                    h(View, { class: 'subitem' }, { default: () => [
                      h(AtTag, { size: 'small', type: 'primary', circle: true, disabled: true }, {
                        default: () => [
                          h(Text, null, { default: () => '标签' })
                        ]
                      })
                    ]}),
                    h(View, { class: 'subitem' }, { default: () => [
                      h(AtTag, { size: 'small', type: 'primary', disabled: true }, {
                        default: () => [
                          h(Text, null, { default: () => '标签' })
                        ]
                      })
                    ]}),
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
