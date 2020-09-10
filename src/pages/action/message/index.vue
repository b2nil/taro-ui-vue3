<template>
  <page
    class="toast-page"
    header-title="Message 消息通知"
  >
    <!-- body -->
    <panel title="基本案例">
      <example-item>
        <at-button @click="handleClick('')">普通消息</at-button>
      </example-item>
      <example-item>
        <at-button @click="handleClick('success')">成功消息</at-button>
      </example-item>
      <example-item>
        <at-button @click="handleClick('error')">错误消息</at-button>
      </example-item>
      <example-item>
        <at-button @click="handleClick('warning')">警告消息</at-button>
      </example-item>
      <example-item>
        <at-button @click="handleClick('info')">提示消息</at-button>
      </example-item>
    </panel>
    <!-- end body -->

    <!-- AtMessage Component -->
    <template #extra>
      <at-message />
    </template>
  </page>
</template>

<script>
import { defineComponent } from "vue"
import Taro from "@tarojs/taro"
import AtButton from "@/components/button"
import AtMessage from "@/components/message"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "MessageDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtButton,
    AtMessage,
  },

  setup() {
    function handleClick(type) {
      Taro.atMessage({
        message: '消息通知',
        type
      })
    }

    return {
      handleClick
    }
  }
})
</script>