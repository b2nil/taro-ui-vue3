<template>
  <page
    class="page"
    header-title="Timeline 时间轴"
  >
    <template
      v-for="(panel, i) in data"
      :key="i"
    >
      <panel
        :title="panel.title"
        class="panel__content"
      >
        <example-item>
          <at-timeline
            :pending="panel.pending"
            :items="panel.items"
          ></at-timeline>
        </example-item>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: "TimelineDemo",

  setup() {
    const data = [
      {
        title: "基础用法",
        items: [
          { title: '刷牙洗脸' },
          { title: '吃早餐' },
          { title: '上班' },
          { title: '睡觉' }
        ]
      },
      {
        title: "自定义颜色",
        items: [
          { title: '刷牙洗脸' },
          { title: '吃早餐', color: 'green' },
          { title: '上班', color: 'red' },
          { title: '睡觉', color: 'yellow' }
        ]
      },
      {
        title: "自定义图标",
        items: [
          { title: '刷牙洗脸', icon: 'check-circle' },
          { title: '吃早餐', icon: 'clock' },
          { title: '上班', icon: 'clock' },
          { title: '睡觉', icon: 'clock' }
        ]
      },
      {
        title: "幽灵节点",
        items: [
          { title: '刷牙洗脸' },
          { title: '吃早餐' },
          { title: '上班' },
          { title: '睡觉' }
        ]
      },
      {
        title: "丰富内容",
        pending: true,
        items: [
          {
            title: '刷牙洗脸',
            content: ['大概8:00'],
            icon: 'check-circle'
          },
          {
            title: '吃早餐',
            content: ['牛奶+面包', '餐后记得吃药'],
            icon: 'clock'
          },
          {
            title: '上班',
            content: ['查看邮件', '写PPT', '发送PPT给领导'],
            icon: 'clock'
          },
          { title: '睡觉', content: ['不超过23:00'], icon: 'clock' }
        ]
      }
    ]

    return {
      data
    }
  }
})
</script>
