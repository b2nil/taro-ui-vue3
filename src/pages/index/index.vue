<template>
  <view class="index">
    <view class="wrapper">
      <at-button type="primary" @tap="navigateTo('/pages/calendar/index')"> 跳转至日历显示页 </at-button>
      <at-button type="primary" @tap="navigateTo('/pages/form/input/index')"> 跳转至 AtInput Demo </at-button>
      <at-button type="primary" @tap="navigateTo('/pages/action/toast/index')"> 跳转至 Toast Demo </at-button>
      <at-button type="primary" @tap="navigateTo('/pages/layout/card/index')"> 跳转至 Card Demo </at-button>
      <at-button type="primary" openType="share"> 分享 </at-button>
    </view>
  </view>
</template>

<script>
import { ref, computed, watch } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

import AtButton from '@/components/button'

export default {
  components: {
    AtButton,
  },
  setup() {
    function navigateTo(pageUrl) {
      Taro.navigateTo({ url: pageUrl })
    }

    function showToast(name) {
      Taro.showToast({
        icon: 'none',
        title: name,
      })
    }
    function onShareAppMessage(res) {
      if (res.from == 'button') {
        console.log(res.target)
      }
      return {
        title: '分享测试',
        path: '/pages/index/index?id=124',
      }
    }

    return {
      navigateTo,
      onShareAppMessage,
    }
  },
}
</script>

<style lang="scss">
.wrapper {
  margin: 30px;
  align-items: center;
  align-content: center;
}
.at-button {
  margin: 20px !important;
}
.avartar {
  display: flex;
  margin: 20px;
  float: left;
  .at-avatar {
    &__text {
      text-align: center !important;
    }
  }
}
</style>
