<template>
  <view
    class="page"
    style="height: 100vh;"
  >
    <view style="height: 100%;">
      <at-indexes
        topKey="Top"
        :list="mockdata"
        @click="handleClick"
        @scroll-into-view="handleScrollIntoView"
      >
        <view class="custom-area">
          用户自定义内容
          <at-search-bar
            placeholder="跳转到指定Key"
            :value="searchbarValue"
            @change="handleChange"
            @action-click="handleActionClick"
          />
        </view>
      </at-indexes>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import Taro from "@tarojs/taro"
import AtIndexes from "@/components/indexes"
import AtSearchBar from "@/components/search-bar"
import mockData from './mock-data'

import "./index.scss"

export default defineComponent({
  name: "IndexesDemo",

  components: {
    AtIndexes,
    AtSearchBar,
  },

  setup() {
    const searchbarValue = ref('')
    const mockdata = ref(mockData)

    const scrollIntoView = ref((key) => {
      Taro.showToast({
        title: `scrollIntoView: ${key}`,
        icon: 'none'
      })
    })

    function handleClick(item) {
      Taro.showToast({
        title: `onClick: ${JSON.stringify(item)}`,
        icon: 'none'
      })
    }

    function handleActionClick() {
      if (!searchbarValue.value) {
        return
      }

      scrollIntoView.value(searchbarValue.value.toUpperCase())
    }

    function handleChange(value) {
      searchbarValue.value = value
    }

    function handleScrollIntoView(fn) {
      scrollIntoView.value = fn
    }

    return {
      mockdata,
      searchbarValue,
      handleClick,
      handleChange,
      handleActionClick,
      handleScrollIntoView
    }
  }
})
</script>
