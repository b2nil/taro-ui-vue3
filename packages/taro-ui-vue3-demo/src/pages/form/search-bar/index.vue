<template>
  <page header-title="SearchBar 搜索栏">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <view class="component-item">
          <at-search-bar
            v-model="value1"
            @update:model-value="(e) => value1 = e"
            @action-click="onActionClick('value1')"
          />
        </view>
      </example-item>
    </panel>

    <panel
      title="自定义按钮文字和点击事件"
      no-padding
    >
      <example-item>
        <view class="component-item">
          <at-search-bar
            action-name="搜一下"
            v-model="value2"
            @update:model-value="(e) => value2 = e"
            @action-click="onActionClick('value2')"
          />
        </view>
      </example-item>
    </panel>

    <panel
      title="始终显示按钮"
      no-padding
    >
      <example-item>
        <view class="component-item">
          <at-search-bar
            showActionButton
            placeholder="请输入ISBN号"
            v-model="value3"
            @update:model-value="(e) => value3 = e"
            @action-click="onActionClick('value3')"
          />
        </view>
      </example-item>
    </panel>

    <panel
      title="自定义输入框类型"
      no-padding
    >
      <example-item>
        <view class="component-item">
          <at-search-bar
            showActionButton
            placeholder="请输入数字"
            input-type="number"
            v-model="value4"
            @update:model-value="(e) => value4 = e"
            @action-click="onActionClick('value4')"
          />
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { toRefs, defineComponent, reactive } from 'vue'
import { AtSearchBar } from "taro-ui-vue3"
import { Page, Panel } from '@/components/index'
import './index.scss'

interface IndexState {
  [key: string]: string
}

export default defineComponent({
  name: "SearchBarDemo",

  components: {
    AtSearchBar, Page, Panel
  },

  setup() {

    const state = reactive<IndexState>({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })

    function onActionClick(stateName: string): void {
      Taro.showToast({
        title: `开始搜索: ${state[stateName]}`,
        icon: 'success',
        duration: 2000
      })
    }

    return {
      ...toRefs(state),
      onActionClick
    }
  }
})

</script>
