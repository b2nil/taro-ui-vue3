<template>
  <page header-title="SearchBar 搜索栏">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <view class="component-item">
          <at-search-bar
            placeholder="通过 onChange 更新 value 值"
            v-model="value1"
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
            placeholder="通过 v-model:value 更新 value 值"
            v-model="value2"
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
            @action-click="onActionClick('value4')"
          />
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

export default defineComponent({
  name: "SearchBarDemo",

  setup() {

    const state = reactive({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })

    function onActionClick(stateName: string): void {
      Taro.showToast({
        title: `${state[stateName]}`,
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