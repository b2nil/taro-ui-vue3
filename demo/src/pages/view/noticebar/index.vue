<template>
  <page header-title="NoticeBar 通告栏">
    <template
      v-for="(panel, i) in panels"
      :key="i"
    >
      <panel
        :title="panel.title"
        class="panel__content"
      >
        <view
          v-for="(barItem, j) in panel.barItems"
          :key="j"
          class="bar-item"
        >
          <at-noticebar v-bind="barItem.attrs">
            <text
              user-select
              :style="barItem.attrs.marquee ? 'white-space: nowrap;' : ''"
            >{{ barItem.text }}</text>
          </at-noticebar>
        </view>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

export default defineComponent({
  name: "NoticebarDemo",

  setup() {

    const textOnly = '[纯文字] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。 [结束]'
    const singleLineText = '[单行] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。'
    const multiLineText = '[多行] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。'
    const textWithIcon = '[带icon] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。 [结束]'
    const superLongText = '[超长文本] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。两鬓风霜，途次早行之客，一蓑烟雨，溪边晚钓之翁。沿对革，异对同，白叟对黄童。江风对海雾，牧子对渔翁。颜巷陋，阮途穷，冀北对辽东。池中濯足水，门外打头风。梁帝讲经同泰寺，汉皇置酒未央宫。 [结束]'

    const panels = [
      {
        title: "文字",
        barItems: [
          {
            attrs: { single: true },
            text: singleLineText
          },
          {
            attrs: {},
            text: multiLineText
          },
        ]
      },
      {
        title: "跑马灯",
        barItems: [
          {
            attrs: { marquee: true },
            text: textOnly
          },
          {
            attrs: {
              marquee: true,
              icon: 'volume-plus'
            },
            text: textWithIcon
          },
          {
            attrs: { marquee: true },
            text: superLongText
          },
        ]
      },
      {
        title: "图标",
        barItems: [
          {
            attrs: { icon: 'volume-plus', single: true },
            text: singleLineText
          },
          {
            attrs: {
              icon: 'volume-plus'
            },
            text: multiLineText
          }
        ]
      },
      {
        title: "查看更多",
        barItems: [
          {
            attrs: {
              showMore: true,
              single: true,
              onGotoMore: onGotoMore
            },
            text: singleLineText
          },
          {
            attrs: {
              showMore: true,
              single: true,
              icon: 'volume-plus',
              onGotoMore: onGotoMore
            },
            text: singleLineText
          },
          {
            attrs: {
              showMore: true,
              moreText: '更多内容',
              onGotoMore: onGotoMore
            },
            text: multiLineText
          },
          {
            attrs: {
              showMore: true,
              moreText: '更多内容',
              icon: 'volume-plus',
              onGotoMore: onGotoMore
            },
            text: multiLineText
          },
        ]
      },
      {
        title: "关闭按钮",
        barItems: [
          {
            attrs: { close: true, single: true },
            text: singleLineText
          },
          {
            attrs: { close: true, icon: 'volume-plus', single: true },
            text: singleLineText
          },
          {
            attrs: {
              close: true,
              single: true,
              showMore: true,
              onGotoMore: onGotoMore,
            },
            text: singleLineText
          },
          {
            attrs: {
              close: true,
              single: true,
              showMore: true,
              icon: 'volume-plus',
              onGotoMore: onGotoMore
            },
            text: singleLineText
          },
          {
            attrs: { close: true },
            text: multiLineText
          },
          {
            attrs: {
              close: true,
              icon: 'volume-plus'
            },
            text: multiLineText
          },
        ]
      },

    ]

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

    return {
      panels
    }
  }
})

</script>
