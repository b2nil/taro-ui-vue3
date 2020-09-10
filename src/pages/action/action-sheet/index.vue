<template>
  <page header-title="ActionSheet 动作面板">
    <!-- 无标题 -->
    <panel title="无标题">
      <example-item>
        <at-button @click="handleClick(1)">打开 ActionSheet</at-button>
      </example-item>
    </panel>

    <!-- 有标题 -->
    <panel title="有标题">
      <example-item>
        <at-button @click="handleClick(2)">打开 ActionSheet</at-button>
      </example-item>
    </panel>

    <!-- 自定义选项 -->
    <panel title="自定义选项">
      <example-item>
        <at-button @click="handleClick(3)">打开 ActionSheet</at-button>
      </example-item>
    </panel>

    <template #extra>
      <!-- action sheet 1 -->
      <at-action-sheet
        cancelText="取消"
        :isOpened="isOpened1"
        @close="handleClose(1)"
      >
        <at-action-sheet-item @click="showToast('点击了按钮一')">按钮一</at-action-sheet-item>
        <at-action-sheet-item @click="showToast('点击了按钮二')">按钮二</at-action-sheet-item>
      </at-action-sheet>

      <!-- action sheet 2 -->
      <at-action-sheet
        title="清除位置信息后，别人将不能查看到你"
        cancelText="取消"
        :isOpened="isOpened2"
        @close="handleClose(2)"
      >
        <at-action-sheet-item @click="showToast('点击了按钮一')">按钮一</at-action-sheet-item>
        <at-action-sheet-item @click="showToast('点击了按钮二')">按钮二</at-action-sheet-item>
      </at-action-sheet>

      <!-- action sheet 3 -->
      <at-action-sheet
        title="清除位置信息后，别人将不能查看到你"
        cancelText="取消"
        :isOpened="isOpened3"
        @close="handleClose(3)"
        @cancel="handleCancel"
      >
        <at-action-sheet-item @click="showToast('点击了按钮一')">按钮一</at-action-sheet-item>
        <at-action-sheet-item @click="showToast('点击了按钮二')">按钮二</at-action-sheet-item>
        <at-action-sheet-item @click="showToast('成功清除位置')">
          <text class="danger">清除位置信息并退出</text>
        </at-action-sheet-item>
      </at-action-sheet>
    </template>
    <!-- e body -->
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'

import AtActionSheet from '@/components/action-sheet'
import AtActionSheetItem from '@/components/action-sheet/body/item'
import AtButton from '@/components/button'
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import './index.scss'

export default defineComponent({
  name: 'ActionSheetDemo',

  components: {
    Page,
    Panel,
    ExampleItem,
    AtActionSheet,
    AtActionSheetItem,
    AtButton
  },

  setup() {
    const state = reactive({
      isOpened1: false,
      isOpened2: false,
      isOpened3: false
    })

    function handleClick(serialNum) {
      state[`isOpened${serialNum}`] = true
    }

    function handleClose(serialNum) {
      state[`isOpened${serialNum}`] = false

      Taro.showToast({
        title: `第 ${serialNum} 个 Action Sheet 已经关闭`,
        icon: 'none'
      })
    }

    function handleCancel() {
      showToast('点击了取消按钮')
    }

    function showToast(message) {
      Taro.showToast({
        icon: 'none',
        title: message
      })
    }

    return {
      ...toRefs(state),
      handleClick,
      handleClose,
      handleCancel,
      showToast
    }
  }
})
</script>
