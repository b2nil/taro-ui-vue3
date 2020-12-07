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
            :value="value1"
            @change="onChange('value1', $event)"
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
            v-model:value="value2"
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
            v-model:value="value3"
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
            v-model:value="value4"
            @action-click="onActionClick('value4')"
          />
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { AtSearchBar } from '../../../index'
import Taro from '@tarojs/taro'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: string
}

export default defineComponent({
  name: "SearchBarDemo",

  components: {
    AtSearchBar,
    Page,
    Panel,
    ExampleItem
  },

  setup() {

    const state = reactive<IndexState>({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })

    function onChange(stateName: string, value: string | number): void {
      state[stateName] = value as string
    }

    function onActionClick(stateName: string): void {
      Taro.showToast({
        title: `${state[stateName]}`,
        icon: 'success',
        duration: 2000
      })
    }

    return {
      ...toRefs(state),
      onChange,
      onActionClick
    }
  }
})

</script>