<template>
  <page header-title="Color 颜色">
    <panel
      v-for="item in colorData"
      :key="item.type"
      :title="item.type"
    >
      <view class="color-list">
        <view
          class="color-item"
          v-for="(color, index) in item.data"
          :key="`color-${color.hex}-${index}`"
        >
          <view
            class="color-item__circle"
            :style="{background: color.hex}"
          >
            <view class="inner-circle-1" />
            <view
              class="inner-circle-2"
              :style="{borderColor: color.hex}"
            />
          </view>
          <view class="color-item__info">
            <text class="name">{{ color.name }}</text>
            <text
              class="hex"
              selectable
            >{{ color.hex }}</text>
          </view>
        </view>
      </view>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "ColorDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
  },

  setup() {

    const colorData = ref([
      {
        type: '主色',
        data: [
          {
            name: '浅蓝色',
            hex: '#78A4FA'
          },
          {
            name: '品牌蓝',
            hex: '#6190E8'
          },
          {
            name: '深蓝色',
            hex: '#346FC2'
          }
        ]
      },
      {
        type: '辅助色',
        data: [
          {
            name: '蓝色 - Info',
            hex: '#78A4FA'
          },
          {
            name: '绿色 - Positive',
            hex: '#13CE66'
          },
          {
            name: '红色 - Negative',
            hex: '#FF4949'
          },
          {
            name: '黄色 - Warning',
            hex: '#FFC82C'
          }
        ]
      },
      {
        type: '中性色',
        data: [
          {
            name: '黑色 0',
            hex: '#333333'
          },
          {
            name: '黑色 1',
            hex: '#7F7F7F'
          },
          {
            name: '黑色 2',
            hex: '#B2B2B2'
          },
          {
            name: '灰色 0',
            hex: '#333333'
          },
          {
            name: '灰色 1',
            hex: '#666666'
          },
          {
            name: '灰色 2',
            hex: '#999999'
          },
          {
            name: '灰色 3',
            hex: '#CCCCCC'
          },
          {
            name: '灰色 4',
            hex: '#E5E5E5'
          },
          {
            name: '灰色 5',
            hex: '#F0F0F0'
          },
          {
            name: '灰色 6',
            hex: '#F7F7F7'
          }
        ]
      },
      {
        type: '其他色',
        data: [
          {
            name: '边框可选色',
            hex: '#C5D9E8'
          },
          {
            name: '背景色 0',
            hex: '#ECF5FD'
          },
          {
            name: '背景色 1',
            hex: '#FAFBFC'
          }
        ]
      }
    ])

    return {
      colorData
    }
  }
})
</script>
