
import { h, defineComponent } from 'vue'
import { AtDivider, AtIcon } from '@/components/index'
import { Page, Panel } from '../../components/demo-page'
import './index.scss'

export default defineComponent({
  name: "DividerDemo",

  setup() {

    return () => (
      h(Page, { headerTitle: 'Divider 分隔线' }, {
        default: () => [
          /* 文字*/
          h(Panel, { title: '一般用法', noPadding: true }, {
            default: () => [
              h(AtDivider, { content: '分割线' })
            ]
          }),

          /* 自定义颜色*/
          h(Panel, { title: '自定义颜色', noPadding: true }, {
            default: () => [
              h(AtDivider, {
                content: '没有更多了',
                fontColor: '#ed3f14',
                lineColor: '#ed3f14',
              }),
              h(AtDivider, {
                content: '没有更多了',
                fontColor: '#ff9900',
                lineColor: '#ff9900',
              }),
              h(AtDivider, {
                content: '没有更多了',
                fontColor: '#2d8cf0',
                lineColor: '#2d8cf0',
              }),
            ]
          }),

          /* 自定义内容*/
          h(Panel, { title: '自定义内容', noPadding: true }, {
            default: () => [
              h(AtDivider, null, {
                default: () => [
                  h(AtIcon, { value: 'check-circle' })
                ]
              }),
            ]
          })
        ]
      })
    )
  }
})
