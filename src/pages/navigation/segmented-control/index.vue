<template>
  <page header-title="Segmented Control 分段器">
    <panel
      no-padding
      title="基础用法"
    >
      <example-item>
        <at-segmented-control
          :current="current1"
          :values="tabList2"
          @click="handleClick(1, $event)"
        />
        <view class="tab-content">标签 {{ current1 + 1 }} 的内容</view>
      </example-item>
    </panel>

    <panel
      no-padding
      title="自定义颜色、字体大小"
    >
      <example-item>
        <at-segmented-control
          @click="handleClick(2, $event)"
          selectedColor="#FF4949"
          :fontSize="30"
          :current="current2"
          :values="tabList2"
        />
        <view class="tab-content">标签 {{current2 + 1}} 的内容</view>
      </example-item>
    </panel>

    <panel
      no-padding
      title="禁用"
    >
      <example-item>
        <at-segmented-control
          disabled
          :values="tabList1"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue"
import { AtSegmentedControl } from "@/components/index"
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import "./index.scss"

export default defineComponent({
  name: "SegmentedControlDemo",

  components: {
    AtSegmentedControl,
    Page,
    Panel,
    ExampleItem
  },

  setup() {
    const state = reactive({
      current1: 0,
      current2: 0
    })

    const tabList1 = ref(['标签页1', '标签页2'])
    const tabList2 = ref(['标签页1', '标签页2', '标签页3'])

    function handleClick(num, value) {
      state[`current${num}`] = value
    }


    return {
      ...toRefs(state),
      tabList1,
      tabList2,
      handleClick
    }
  }
})
</script>