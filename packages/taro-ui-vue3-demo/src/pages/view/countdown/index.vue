<template>
  <page header-title="CountDown 倒计时">
    <template
      v-for="(panel, i) in panels"
      :keys="i"
    >
      <panel :title="panel.title">
        <template v-if="panel.views">
          <view
            class="panel__content"
            v-for="(attrs, key) in panel.views"
            :key="key"
          >
            <at-countdown v-bind="attrs" />
          </view>
        </template>

        <at-countdown
          v-else
          v-bind="panel.attrs"
        />
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { h, defineComponent, resolveComponent } from 'vue'
import { AtCountdown } from "taro-ui-vue3"
import Taro from '@tarojs/taro'
import { Page, Panel } from '@/components/index'
import './index.scss'

export default defineComponent({
  name: "CountdownDemo",

  components: {
    AtCountdown,
    Page,
    Panel
  },

  setup() {

    const panels = [
      {
        title: "一般用法",
        views: [
          {
            minutes: 1,
            seconds: 10,
          },
          {
            hours: 48,
            minutes: 0,
            seconds: 3,
          },
          {
            isShowDay: true,
            hours: 1,
            minutes: 1,
            seconds: 10,
          },
          {
            isShowHour: false,
            minutes: 1,
            seconds: 10,
          }
        ]
      },
      {
        title: "自定义格式化",
        attrs: {
          format: { hours: ':', minutes: ':', seconds: '' },
          minutes: 1,
          seconds: 10,
        }
      },
      {
        title: "卡片式",
        views: [
          {
            isCard: true,
            minutes: 1,
            seconds: 10
          },
          {
            isCard: true,
            isShowDay: true,
            day: 1,
            minutes: 1,
            seconds: 10,
            format: { day: '天', hours: ':', minutes: ':', seconds: '' },
          }
        ]
      },
      {
        title: "自定义倒计时回调事件",
        attrs: {
          format: { hours: ':', minutes: ':', seconds: '' },
          seconds: 10,
          onTimeUp: onTimeUp.bind(this),
        }
      }
    ]

    function onTimeUp(): void {
      Taro.showToast({
        title: '时间到',
        icon: 'success',
        duration: 2000
      })
    }

    return {
      panels
    }
  }
})
</script>
