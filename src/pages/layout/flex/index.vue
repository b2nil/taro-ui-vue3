<template>
  <page
    class="flex-page"
    header-title="Flex 弹性布局"
  >
    <panel title="基本案例">
      <example-item>
        <at-flex>
          <at-flex-item>A</at-flex-item>
          <at-flex-item>B</at-flex-item>
          <at-flex-item>C</at-flex-item>
        </at-flex>
      </example-item>
    </panel>

    <panel title="定义长度 (AtFlexItem - size)">
      <example-item>
        <at-flex>
          <at-flex-item :size="3">A</at-flex-item>
          <at-flex-item :size="6">B</at-flex-item>
          <at-flex-item :size="2">C</at-flex-item>
          <at-flex-item :size="1">D</at-flex-item>
        </at-flex>
      </example-item>
    </panel>
    <panel title="定义偏移 (AtFlexItem - offset)">
      <example-item>
        <at-flex>
          <at-flex-item :offset="2">A</at-flex-item>
          <at-flex-item :offset="3">B</at-flex-item>
          <at-flex-item>C</at-flex-item>
        </at-flex>
      </example-item>
    </panel>
    <panel title="超出换行 (AtFlex - wrap)">
      <example-item>
        <at-flex wrap="wrap">
          <at-flex-item :size="4">A</at-flex-item>
          <at-flex-item :size="4">B</at-flex-item>
          <at-flex-item :size="4">C</at-flex-item>
          <at-flex-item :size="4">D</at-flex-item>
          <at-flex-item :size="4">E</at-flex-item>
        </at-flex>
      </example-item>
    </panel>
    <panel title="宽度根据内容撑开 (AtFlexItem - isAuto)">
      <example-item>
        <at-flex>
          <at-flex-item
            is-auto
            :size="1"
          >被内容撑开</at-flex-item>
          <at-flex-item>B</at-flex-item>
        </at-flex>
      </example-item>
    </panel>
    <panel title="内容自动换行 (AtFlexItem - isWrap)">
      <example-item>
        <at-flex>
          <at-flex-item
            is-wrap
            :size="1"
          >内容自动换行</at-flex-item>
          <at-flex-item>B</at-flex-item>
        </at-flex>
      </example-item>
    </panel>
    <panel title="侧轴方向的对齐方式 (AtFlex - align)">
      <example-item>
        <at-flex>
          <at-flex-item
            :size="5"
            :style="{height: '100px'}"
          >A</at-flex-item>
          <at-flex-item is-auto>默认对齐方式 -- stretch</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex align="start">
          <at-flex-item
            :size="5"
            :style="{height: '100px'}"
          >B</at-flex-item>
          <at-flex-item is-auto>顶部对齐 -- start</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex align="center">
          <at-flex-item
            :size="5"
            :style="{height: '100px'}"
          >C</at-flex-item>
          <at-flex-item is-auto>居中对齐 -- center</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex align="end">
          <at-flex-item
            :size="5"
            :style="{height: '100px'}"
          >D</at-flex-item>
          <at-flex-item is-auto>底部对齐 -- end</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex align="baseline">
          <at-flex-item
            :size="5"
            :style="{height: '100px'}"
          >E</at-flex-item>
          <at-flex-item is-auto>基线对齐 -- baseline</at-flex-item>
        </at-flex>
      </example-item>
    </panel>
    <panel title="主轴方向的排列方式 (AtFlex - justify)">
      <example-item>
        <at-flex>
          <at-flex-item :size="5">默认</at-flex-item>
          <at-flex-item :size="5">start</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex justify="end">
          <at-flex-item :size="5">底部排列</at-flex-item>
          <at-flex-item :size="5">end</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex justify="center">
          <at-flex-item :size="5">居中排列</at-flex-item>
          <at-flex-item :size="5">center</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex justify="between">
          <at-flex-item :size="5">左右排列</at-flex-item>
          <at-flex-item :size="5">between</at-flex-item>
        </at-flex>
      </example-item>
      <example-item>
        <at-flex justify="around">
          <at-flex-item :size="5">平均排列</at-flex-item>
          <at-flex-item :size="5">around</at-flex-item>
        </at-flex>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AtFlex from "@/components/flex"
import AtFlexItem from "@/components/flex/item"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "FlexDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtFlex,
    AtFlexItem
  }
})
</script>
