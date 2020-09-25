
import { h, defineComponent } from 'vue'
import { Image, View, Text } from '@tarojs/components'
import { Page, Panel } from '../../components/demo-page'
import './index.scss'

export default defineComponent({
  name: "ArticleDemo",

  setup() {
    return () => (
      h(Page, { headerTitle: 'Article 文章' }, {
        default: () => [
          h(Panel, { title: '示例', noPadding: true }, {
            default: () => [
              h(View, { class: 'at-article' }, {
                default: () => [
                  h(View, { class: 'at-article__h1' }, {
                    default: () => [
                      h(Text, null, { default: () => '这是一级标题这是一级标题' })
                    ]
                  }),
                  h(View, { class: 'at-article__info' }, {
                    default: () => [
                      h(Text, null, { default: () => '2017 - 05 - 07 & nbsp;& nbsp;& nbsp; 这是作者' })
                    ]
                  }),
                  h(View, { class: 'at-article__content' }, {
                    default: () => [
                      h(View, { class: 'at-article__section' }, {
                        default: () => [
                          h(View, { class: 'at-article__h2' }, {
                            default: () => [
                              h(Text, null, { default: () => '这是二级标题' })
                            ]
                          }),
                          h(View, { class: 'at-article__h3' }, {
                            default: () => [
                              h(Text, null, { default: () => '这是三级标题' })
                            ]
                          }),
                          h(View, { class: 'at-article__p' }, {
                            default: () => [
                              h(Text, null, { default: () => '这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。1234567890123456789012345678901234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' })
                            ]
                          }),
                          h(View, { class: 'at-article__p' }, {
                            default: () => [
                              h(Text, null, { default: () => '这是文本段落。这是文本段落。' })
                            ]
                          }),
                          h(Image, {
                            class: 'at-article__img',
                            src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
                            mode: 'widthFix',
                          })
                        ]
                      }),

                      h(View, { class: 'at-article__section' }, {
                        default: () => [
                          h(View, { class: 'at-article__h2' }, {
                            default: () => [
                              h(Text, null, { default: () => '这是二级标题' })
                            ]
                          }),
                          h(View, { class: 'at-article__h3' }, {
                            default: () => [
                              h(Text, null, { default: () => '这是三级标题' })
                            ]
                          }),
                          h(View, { class: 'at-article__p' }, {
                            default: () => [
                              h(Text, null, { default: () => '这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。1234567890123456789012345678901234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ' })
                            ]
                          }),
                          h(Image, {
                            class: 'at-article__img',
                            src: 'https://img30.360buyimg.com/sku/jfs/t19660/324/841553494/117886/ad2742c1/5aab8d20Ne56ae3bf.jpg',
                            mode: 'widthFix',
                          })
                        ]
                      }),
                    ]
                  }),
                ]
              }),
            ]
          }),
        ]
      })
      /* E Body*/
    )
  }
})
