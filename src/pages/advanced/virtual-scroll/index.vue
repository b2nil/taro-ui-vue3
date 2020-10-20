<template>
  <page
    class="virtual-scroll-page"
    header-title="VirtualScroll 虚拟列表"
  >
    <panel title="一般案例">
      <template #controller>
        <example-item style="margin: 15px;">
          <view class="example-item__desc">bench: 可视区域外渲染的列表行数，避免快速滑动时白屏</view>
          <at-input-number
            :min="0"
            :max="10"
            :step="1"
            :value="benched"
            @change="handleBenchChange"
          />
          <view class="example-item__desc">length: 列表长度</view>
          <at-slider
            showValue
            :min="7000"
            :max="15000"
            :step="10"
            :value="length"
            @change="handleLengthChange"
          />
          <view class="example-item__desc">height: 长列表组件的高度, 用作 css 样式值</view>
          <at-slider
            showValue
            :min="200"
            :max="800"
            :step="10"
            :value="height"
            @change="handleHeightChange"
          />
          <view class="example-item__desc">itemHeight: 显示列表单项的高度，单位为 px</view>
          <at-slider
            showValue
            :min="64"
            :max="160"
            :step="1"
            :value="itemHeight"
            @change="handleItemHeightChange"
          />
        </example-item>
      </template>
      <at-virtual-scroll
        :bench="benched"
        :items="items"
        :height="height"
        :item-height="itemHeight"
      >
        <template #default="{ item }">
          <at-list-item
            :key="item"
            title="虚拟列表"
            :note="`第 ${item} 条`"
            :extraText="`共 ${length} 条`"
            arrow="right"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </template>
      </at-virtual-scroll>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { AtDivider, AtSlider, AtListItem, AtInputNumber, AtFlex, AtFlexItem, AtVirtualScroll } from '@/components/index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import './index.scss'

export default defineComponent({
  name: "VirtualScrollDemo",

  components: {
    AtVirtualScroll,
    AtDivider,
    AtSlider,
    AtListItem,
    AtInputNumber,
    AtFlex,
    AtFlexItem,
    Page,
    Panel,
    ExampleItem
  },

  setup() {
    const benched = ref(5)
    const length = ref(7000)
    const height = ref(300)
    const itemHeight = ref(80)

    const items = computed(() => {
      return Array.from({
        length: length.value
      }, (_, v) => v + 1)
    })

    function handleBenchChange(value) {
      benched.value = value
    }

    function handleLengthChange(value) {
      length.value = value
    }

    function handleItemHeightChange(value) {
      itemHeight.value = value
    }

    function handleHeightChange(value) {
      height.value = value
    }

    return {
      benched,
      items,
      length,
      height,
      itemHeight,
      handleBenchChange,
      handleLengthChange,
      handleHeightChange,
      handleItemHeightChange
    }
  }
})
</script>
