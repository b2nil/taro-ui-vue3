<template>
  <page header-title="Typography 字体">
    <panel title="示例">
      <view class="table-typo">
        <view class="table-typo__head">
          <view class="thead">类型</view>
          <view class="thead">行高</view>
          <view class="thead">用途</view>
        </view>
        <view class="table-typo__body">
          <view
            v-for="(item, index) in typographies"
            :key="index"
            class="table-typo__line"
          >
            <view :class="`col h${index}`">{{ item.type }}</view>
            <view class="col">{{ item.lineHeight }}</view>
            <view class="col">{{ item.usage }}</view>
          </view>
        </view>
      </view>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { Page, Panel } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "TypoDemo",

  components: {
    Page,
    Panel,
  },

  setup() {
    const typographies = ref([
      { type: 'H0，40PX', lineHeight: '60PX', usage: '仅用于数字' },
      { type: 'H1，36PX', lineHeight: '54PX', usage: '大模块标题' },
      { type: 'H2，32PX', lineHeight: '48PX', usage: '常规标题' },
      { type: 'H3，28PX', lineHeight: '42PX', usage: '正文' },
      { type: 'H4，24PX', lineHeight: '36PX', usage: '辅助信息、注释' },
      { type: 'H5，20PX', lineHeight: '30PX', usage: '标签' },
    ])

    return {
      typographies
    }
  }
})
</script>
