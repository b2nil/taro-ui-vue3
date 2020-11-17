<template>
  <page header-title="Badge 徽标">
    <template v-for="(panel, i) in panels" :key="i">
      <panel
        :title="panel.title"
        
      >
        <view class="badge-item">
          <view class="subitem">
            <at-badge v-bind="panel.attrs">
              <at-button
                circle
                size="small"
              >按钮</at-button>
            </at-badge>
          </view>
          <view class="subitem">
            <at-badge v-bind="panel.attrs">
              <at-button size="small">按钮</at-button>
            </at-badge>
          </view>
        </view>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AtBadge, AtButton } from "taro-ui-vue3"
import { Page, Panel } from '@/components/index'
import './index.scss'

export default defineComponent({
  name: "BadgeDemo",

  components: {
    AtBadge,
    AtButton,
    Page,
    Panel
  },

  setup() {
    const panels = [
      {
        title: "数字",
        attrs: {
          value: 10,
          maxValue: 99
        }
      },
      {
        title: "小红点",
        attrs: {
          dot: true
        }
      },
      {
        title: "文本",
        attrs: {
          value: "NEW"
        }
      },
      {
        title: "省略号",
        attrs: {
          value: "..."
        }
      },
    ]

    return {
      panels
    }
  }
})

</script>
