<template>
  <page header-title="Divider 分隔线">
    <panel
      no-padding
      title="一般用法"
    >
      <at-divider content="分割线" />
    </panel>

    <panel
      no-padding
      title="一般用法"
    >
      <at-divider
        content="没有更多了"
        font-color="#ed3f14"
        line-color="#ed3f14"
      />
      <at-divider
        content="没有更多了"
        font-color="#ff9900"
        line-color="#ff9900"
      />
      <at-divider
        content="没有更多了"
        font-color="#2d8cf0"
        line-color="#2d8cf0"
      />
    </panel>

    <panel
      no-padding
      title="自定义内容"
    >
      <at-divider>
        <at-icon value="check-circle" />
      </at-divider>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: "DividerDemo"
})
</script>