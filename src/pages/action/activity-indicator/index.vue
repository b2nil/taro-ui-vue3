<template>
  <page
    class="activity-indicator-page"
    header-title="Activity Indicator 活动指示器"
  >
    <!-- body -->
    <!-- customized size -->
    <panel title="自定义尺寸">
      <example-item>
        <view
          v-for="(size, i) in [40, 48, 64]"
          :key="i"
          class="subitem"
        >
          <at-activity-indicator :size="size" />
        </view>
      </example-item>
    </panel>
    <!-- end customized size -->

    <!-- customized color -->
    <panel title="自定义颜色">
      <example-item>
        <view
          v-for="(color, i) in ['#13CE66', '#FF4949', '#C9C9C9']"
          :key="i"
          class="subitem"
        >
          <at-activity-indicator :color="color" />
        </view>
      </example-item>
    </panel>
    <!-- end customized color -->

    <!-- customized text -->
    <panel title="自定义文字">
      <example-item>
        <view class="subitem">
          <at-activity-indicator content="加载中..." />
        </view>
      </example-item>
    </panel>
    <!-- end customized text -->

    <!-- status swtiching -->
    <panel title="状态切换">
      <at-switch
        :border="false"
        :title="isOpened ? '开启中' : '关闭中'"
        :checked="isOpened"
        @change="handleChange"
      />
      <example-item>
        <at-activity-indicator
          content="加载中..."
          :isOpened="isOpened"
        />
      </example-item>
    </panel>
    <!-- end status swtiching -->

    <!-- vertically and horizontally centered -->
    <panel title="垂直水平居中">
      <example-item class="example-item--center">
        <at-activity-indicator mode="center" />
      </example-item>
      <example-item class="example-item--center">
        <at-activity-indicator
          mode="center"
          content="Loading..."
        />
      </example-item>
    </panel>
    <!-- end vertically and horizontally centered -->
  </page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import AtActivityIndicator from "@/components/activity-indicator"
import AtSwitch from "@/components/switch"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "ActivityIndicatorDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtSwitch,
    AtActivityIndicator,
  },

  setup() {
    const isOpened = ref(true)

    function handleChange(value) {
      isOpened.value = value
    }

    return {
      isOpened,
      handleChange
    }
  }
})
</script>