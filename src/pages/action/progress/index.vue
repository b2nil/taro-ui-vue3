<template>
  <page
    class="progress-page"
    header-title="Progress 进度条"
  >
    <!-- body -->
    <panel title="基础进度条">
      <example-item>
        <at-progress :percent="25" />
      </example-item>
      <example-item>
        <at-progress :percent="50" />
      </example-item>
      <example-item>
        <at-progress :percent="75" />
      </example-item>
    </panel>

    <panel title="隐藏进度文案">
      <example-item>
        <at-progress
          :percent="25"
          is-hide-percent
        />
      </example-item>
      <example-item>
        <at-progress
          :percent="75"
          is-hide-percent
        />
      </example-item>
    </panel>

    <panel title="自定义进度条线宽">
      <example-item>
        <at-progress
          :percent="25"
          :stroke-width="6"
        />
      </example-item>
      <example-item>
        <at-progress
          :percent="50"
          :stroke-width="8"
        />
      </example-item>
      <example-item>
        <at-progress
          :percent="75"
          :stroke-width="10"
        />
      </example-item>
    </panel>

    <panel title="自定义颜色">
      <example-item>
        <at-progress
          :percent="25"
          color="#FF4949"
        />
      </example-item>
      <example-item>
        <at-progress
          :percent="50"
          color="#13CE66"
        />
      </example-item>
      <example-item>
        <at-progress
          :percent="75"
          color="#FFC82C"
        />
      </example-item>
    </panel>

    <panel title="不同的状态">
      <example-item>
        <view class="example-item__desc">暂停</view>
        <at-progress :percent="25" />
      </example-item>
      <example-item>
        <view class="example-item__desc">进行中</view>
        <at-progress
          :percent="50"
          status="progress"
        />
      </example-item>
      <example-item>
        <view class="example-item__desc">错误</view>
        <at-progress
          :percent="75"
          status="error"
        />
      </example-item>
      <example-item>
        <view class="example-item__desc">已完成</view>
        <at-progress
          :percent="100"
          status="success"
        />
      </example-item>
    </panel>

    <panel title="实际案例">
      <example-item>
        <at-progress :percent="percent" />
        <view class="example-item__buttons">
          <view class="btn">
            <at-button
              size="small"
              @click="reduce"
            >
              <at-icon
                value="subtract"
                :size="12"
              />
            </at-button>
          </view>
          <view class="btn">
            <at-button
              size="small"
              @click="increase"
            >
              <at-icon
                value="add"
                :size="12"
              />
            </at-button>
          </view>
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import AtButton from "@/components/button"
import AtIcon from "@/components/icon"
import AtProgress from "@/components/progress"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "ProgressDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtButton,
    AtIcon,
    AtProgress
  },

  setup() {
    const OFFSET = 15
    const percent = ref(0)

    function reduce() {
      if (percent.value === 0) return

      percent.value = percent.value - OFFSET < 0
        ? 0
        : percent.value - OFFSET
    }

    function increase() {
      if (percent.value === 100) return

      percent.value = percent.value + OFFSET > 100
        ? 100
        : percent.value + OFFSET
    }

    return {
      percent,
      reduce,
      increase
    }
  }
})
</script>