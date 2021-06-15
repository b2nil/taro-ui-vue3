<template>
  <page header-title="NavBar 导航栏">
    <!-- 基础用法 -->
    <panel
      no-padding
      title="基础用法"
    >
      <example-item>
        <at-nav-bar
          title="NavBar 导航栏示例"
          @click-left-icon="handleClick('返回')"
        />
      </example-item>
      <example-item>
        <at-nav-bar
          title="NavBar 导航栏示例"
          rightFirstIconType="bullet-list"
          rightSecondIconType="user"
          @click-left-icon="handleClick('返回')"
        />
      </example-item>
      <example-item>
        <at-nav-bar
          title="NavBar 导航栏示例"
          rightFirstIconType="user"
          @click-left-icon="handleClick('返回')"
        />
      </example-item>
    </panel>

    <!-- 自定义左上角文案 -->
    <panel
      no-padding
      title="自定义左上角文案"
    >
      <example-item>
        <at-nav-bar
          title="NavBar 导航栏示例"
          leftText="返回"
          rightFirstIconType="bullet-list"
          rightSecondIconType="user"
          @click-left-icon="handleClick('返回')"
        />
      </example-item>
      <example-item>
        <at-nav-bar
          title="NavBar 导航栏示例"
          leftText="返回"
          rightFirstIconType="bullet-list"
          rightSecondIconType="user"
          @click-left-icon="handleClick('返回')"
        />
      </example-item>
    </panel>

    <!-- 自定义颜色 -->
    <panel
      no-padding
      title="自定义颜色"
    >
      <example-item>
        <at-nav-bar
          color="#333"
          title="NavBar 导航栏示例"
          leftText="返回"
          rightFirstIconType="bullet-list"
          rightSecondIconType="user"
          @click-left-icon="clickReturn"
          @click-right-second-icon="clickMy"
          @click-right-first-icon="clickList"
        />
      </example-item>
    </panel>

    <!-- 自定义图标样式 -->

    <panel
      no-padding
      title="自定义图标样式"
    >
      <example-item>
        <at-nav-bar
          color="#333"
          title="NavBar 导航栏示例"
          leftText="返回"
          rightFirstIconType="bullet-list"
          :rightSecondIconType="{ value: 'user', size: 36, color: 'red' }"
          @click-left-icon="clickReturn"
          @click-right-second-icon="clickMy"
          @click-right-first-icon="clickList"
        />
      </example-item>
    </panel>

    <!-- 无下划线 -->

    <panel
      no-padding
      title="无下划线"
    >
      <example-item>
        <at-nav-bar
          :border="false"
          color="#333"
          title="NavBar 导航栏示例"
          leftText="返回"
          rightFirstIconType="bullet-list"
          rightSecondIconType="user"
          @click-left-icon="clickReturn"
          @click-right-second-icon="clickMy"
          @click-right-first-icon="clickList"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Taro from "@tarojs/taro"

import "./index.scss"

export default defineComponent({
  name: "NavbarDemo",

  setup() {

    function handleClick(title) {
      Taro.showToast({
        title,
        duration: 2000,
        icon: 'success'
      })
    }

    function clickReturn() {
      Taro.showToast({
        title: '返回',
        duration: 2000,
        icon: 'success'
      })
    }

    function clickMy() {
      Taro.showToast({
        title: '我的',
        duration: 2000,
        icon: 'success'
      })
    }

    function clickList() {
      Taro.showToast({
        title: '功能列表',
        duration: 2000,
        icon: 'success'
      })
    }


    return {
      handleClick,
      clickMy,
      clickList,
      clickReturn
    }
  }
})
</script>
