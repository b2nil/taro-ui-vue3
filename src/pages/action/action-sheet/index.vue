<template>
  <view class="page">
    <!-- s header -->
    <docs-header title="ActionSheet 动作面板" />
    <!-- e header -->

    <!-- s body -->
    <view class="doc-body">
      <!-- 无标题 -->
      <view class="panel">
          <view class="panel__title">无标题</view>
          <view class="panel__content">
              <view class="example-item">
                  <at-button @click="handleClick(1)">打开 ActionSheet</at-button>
              </view>
          </view>
      </view>

      <!-- 有标题 -->
      <view class="panel">
          <view class="panel__title">有标题</view>
          <view class="panel__content">
              <view class="example-item">
                  <at-button @click="handleClick(2)">打开 ActionSheet</at-button>
              </view>
          </view>
      </view>

      <!-- 自定义选项 -->
      <view class="panel">
          <view class="panel__title">自定义选项</view>
          <view class="panel__content">
              <view class="example-item">
                  <at-button @click="handleClick(3)">打开 ActionSheet</at-button>
              </view>
          </view>
      </view>
    </view>
    
    <!-- action sheet 1 -->
    <at-action-sheet
        cancelText="取消"
        :isOpened="isOpened1"
        @close="handleClose(1)"
    >
        <at-action-sheet-item
            @click="showToast('点击了按钮一')"
        >
            按钮一
        </at-action-sheet-item>
        <at-action-sheet-item
            @click="showToast('点击了按钮二')"
        >
            按钮二
        </at-action-sheet-item>
    </at-action-sheet>

    <!-- action sheet 2 -->
    <at-action-sheet
        title="清除位置信息后，别人将不能查看到你"
        cancelText="取消"
        :isOpened="isOpened2"
        @close="handleClose(2)"
    >
        <at-action-sheet-item
            @click="showToast('点击了按钮一')"
        >
            按钮一
        </at-action-sheet-item>
        <at-action-sheet-item
            @click="showToast('点击了按钮二')"
        >
            按钮二
        </at-action-sheet-item>
    </at-action-sheet>
    
    <!-- action sheet 3 -->
    <at-action-sheet
        title="清除位置信息后，别人将不能查看到你"
        cancelText="取消"
        :isOpened="isOpened3"
        @close="handleClose(3)"
        @cancel="handleCancel"
    >
        <at-action-sheet-item
            @click="showToast('点击了按钮一')"
        >
            按钮一
        </at-action-sheet-item>
        <at-action-sheet-item
            @click="showToast('点击了按钮二')"
        >
            按钮二
        </at-action-sheet-item>
        <at-action-sheet-item @click="showToast('成功清除位置')">
            <text class="danger">清除位置信息并退出</text>
        </at-action-sheet-item>
    </at-action-sheet>
    <!-- e body -->
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'

import AtActionSheet from '@/components/action-sheet'
import AtActionSheetItem from '@/components/action-sheet/body/item'
import AtButton from '@/components/button'
import DocsHeader from '../../components/doc-header'

export default {

  components: {
    DocsHeader,
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
}
</script>

<style lang="scss">
@import "@/style/variables/default";

.danger {
    color: $color-error;
}

</style>