<template>
  <page header-title="Tabs 标签页">
    <panel
      no-padding
      title="等宽标签栏"
    >
      <at-tabs
        :swipeable="false"
        :current="current1"
        :tab-list="tabList1"
        @click="handleClick('current1', $event)"
      >
        <at-tabs-pane
          v-for="(paneNo, index) in ['一', '二', '三']"
          :key="index"
          :current="current1"
          :index="index"
        >
          <view class="tab-content">标签页{{paneNo}}的内容</view>
        </at-tabs-pane>
      </at-tabs>
    </panel>
    <panel
      no-padding
      title="滚动标签栏"
    >
      <at-tabs
        scroll
        :swipeable="false"
        :current="current2"
        :tab-list="tabList2"
        @click="handleClick('current2', $event)"
      >
        <at-tabs-pane
          v-for="(paneNo, index) in ['一', '二', '三', '四', '五', '六']"
          :key="index"
          :current="current2"
          :index="index"
        >
          <view class="tab-content">标签页{{paneNo}}的内容</view>
        </at-tabs-pane>
      </at-tabs>
    </panel>
    <panel
      no-padding
      title="滑动切换内容"
    >
      <at-tabs
        :current="current3"
        :tab-list="tabList1"
        @click="handleClick('current3', $event)"
      >
        <at-tabs-pane
          v-for="(paneNo, index) in ['一', '二', '三']"
          :key="index"
          :current="current3"
          :index="index"
        >
          <view class="tab-content">标签页{{paneNo}}的内容</view>
        </at-tabs-pane>
      </at-tabs>
    </panel>
    <panel
      no-padding
      title="垂直模式"
    >
      <at-tabs
        scroll
        height="200px"
        tab-direction="vertical"
        :current="current4"
        :tab-list="tabList2"
        @click="handleClick('current4', $event)"
      >
        <at-tabs-pane
          v-for="(paneNo, index) in ['一', '二', '三', '四', '五', '六']"
          :key="index"
          :current="current4"
          :index="index"
          tab-direction="vertical"
        >
          <view class="tab-content--vertical">标签页{{paneNo}}的内容</view>
        </at-tabs-pane>
      </at-tabs>
    </panel>
    <panel
      no-padding
      title="禁止内容切换动画"
    >
      <at-tabs
        :current="current5"
        :animated="false"
        :tab-list="tabList1"
        @click="handleClick('current5', $event)"
      >
        <at-tabs-pane
          v-for="(paneNo, index) in ['一', '二', '三', '四']"
          :key="index"
          :current="current5"
          :index="index"
        >
          <view class="tab-content">标签页{{paneNo}}的内容</view>
        </at-tabs-pane>
      </at-tabs>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue"
import { AtTabs, AtTabsPane } from "@/components/index"
import { Page, Panel } from '../../components/demo-page'

import "./index.scss"

export default defineComponent({
  name: "TabsDemo",

  components: {
    AtTabs,
    AtTabsPane,
    Page,
    Panel
  },

  setup() {
    const state = reactive({
      current1: 0,
      current2: 0,
      current3: 0,
      current4: 0,
      current5: 0

    })

    const tabList1 = ref([
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' }
    ])

    const tabList2 = ref([
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' }
    ])

    function handleClick(stateName, value) {
      state[stateName] = value
    }

    return {
      ...toRefs(state),
      tabList1,
      tabList2,
      handleClick,
    }
  }
})
</script>
