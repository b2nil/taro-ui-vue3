<template>
  <page header-title="Timeline 时间轴">
    <panel title="基础用法">
      <example-item>
        <at-timeline :items="items1" />
      </example-item>
    </panel>

    <panel title="自定义颜色">
      <example-item>
        <at-timeline :items="items2" />
      </example-item>
    </panel>

    <panel title="自定义图标">
      <example-item>
        <at-timeline :items="items3" />
      </example-item>
    </panel>

    <panel title="幽灵节点">
      <example-item>
        <at-timeline
          pending
          :items="items4"
        />
      </example-item>
    </panel>

    <panel title="丰富内容">
      <example-item>
        <at-timeline
          pending
          :items="items5"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: "TimelineDemo",
  setup() {

    const items1 = [
      { title: '刷牙洗脸' },
      { title: '吃早餐' },
      { title: '上班' },
      { title: '睡觉' }
    ]

    const items2 = [
      { title: '刷牙洗脸' },
      { title: '吃早餐', color: 'green' },
      { title: '上班', color: 'red' },
      { title: '睡觉', color: 'yellow' }
    ]

    const items3 = [
      { title: '刷牙洗脸', icon: 'check-circle' },
      { title: '吃早餐', icon: 'clock' },
      { title: '上班', icon: 'clock' },
      { title: '睡觉', icon: 'clock' }
    ]

    const items4 = [
      { title: '刷牙洗脸' },
      { title: '吃早餐' },
      { title: '上班' },
      { title: '睡觉' }
    ]

    const items5 = [
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
      { title: '睡觉', content: ['不超过23:00'], 'clock' }
    ]

    return {
      items1,
      items2,
      items3,
      items4,
      items5
    }
  }
})
</script>