<template>
  <page header-title="Divider 分隔线">
    <panel
      v-for="(panel, i) in panels"
      :key="i"
      no-padding
      :title="panel.title"
    >
      <at-divider
        v-if="i===0"
        v-bind="panel.attrs"
      />
      <template v-else-if="i===1">
        <at-divider
          v-for="(attr, j) in panel.attrs"
          :key="j"
          v-bind="attr"
        />
      </template>
      <at-divider v-else-if="i===2">
        <at-icon v-bind="panel.subAttrs" />
      </at-divider>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AtDivider, AtIcon } from "taro-ui-vue3"
import { Page, Panel } from '@/components/index'
import './index.scss'

export default defineComponent({
  name: "DividerDemo",

  components: {
    AtDivider,
    AtIcon,
    Page,
    Panel
  },

  setup() {

    const panels = [
      {
        title: "一般用法",
        attrs: {
          content: '分割线'
        }
      },
      {
        title: "自定义颜色",
        attrs: [
          {
            content: '没有更多了',
            fontColor: '#ed3f14',
            lineColor: '#ed3f14',
          },
          {
            content: '没有更多了',
            fontColor: '#ff9900',
            lineColor: '#ff9900',
          },
          {
            content: '没有更多了',
            fontColor: '#2d8cf0',
            lineColor: '#2d8cf0',
          }
        ]
      },
      {
        title: "自定义内容",
        attrs: {},
        subAttrs: {
          value: 'check-circle'
        }
      },
    ]

    return {
      panels
    }
  }
})

</script>
