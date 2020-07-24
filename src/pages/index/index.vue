<template>
  <view class="index">
    <view class="wrapper">
       <at-button 
        type="primary"
        @tap="navigateTo('/pages/calendar/index')"
      > 跳转至日历显示页 </at-button>
      <at-button
        type="primary"
        @tap="navigateTo('/pages/form/input/index')"
      > 跳转至 AtInput Demo </at-button>
      <at-button type="primary" openType="share"> 分享 </at-button>
    </view>
    <view class="wrapper">
      <at-fab class="avartar">at-fat</at-fab>
      <at-avatar class="avartar" size="normal" text="T"></at-avatar>
      <at-avatar class="avartar" size="large" text="A" circle></at-avatar>
      <at-avatar class="avartar" size="large" :image="imgSrc" circle></at-avatar>
    </view>
    <view class="wrapper">
      <at-accordion title="基础用法" note="这是一个测试" :open="isOpen" @tap="handleAccordionClick" hasBorder>
        <at-list>
          <at-list-item
            title="标题文字"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <at-list-item
            hasBorder
            title="标题文字"
            note="描述信息，这里是对标题进行补充的地方"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </at-list>
      </at-accordion>
    </view>
    <view class="wrapper">
      <at-button @tap="handleActionSheetClick">打开 ActionSheet</at-button>
    </view>
    <at-action-sheet cancelText="取消" :isOpened="isOpened" @close="handleActionSheetClose">
      <at-action-sheet-item @tap="showToast('点击了按钮一')">按钮一</at-action-sheet-item>
      <at-action-sheet-item @tap="showToast('点击了按钮二')">按钮二</at-action-sheet-item>
      <at-action-sheet-item @tap="showToast('点击了按钮三')">按钮三</at-action-sheet-item>
    </at-action-sheet>
    <view class="wrapper">
      <at-activity-indicator class="at-avatar" :size="80" color="teal" content="加载中..." />
      <at-activity-indicator class="at-avatar" :size="60" color="red" content="加载中..." />
      <at-activity-indicator class="at-avatar" :size="40" color="blue" content="加载中..." />
    </view>
    <view class="wrapper">
      <at-badge value="10" :maxValue="99">
        <at-button size="small">按钮</at-button>
      </at-badge>
      <at-badge value="100" :maxValue="99">
        <at-button size="small">按钮</at-button>
      </at-badge>
      <at-badge dot>
        <at-button size="small" circle>按钮</at-button>
      </at-badge>
      <at-badge dot>
        <at-button size="small">按钮</at-button>
      </at-badge>
      <at-badge value="NEW">
        <at-button size="small">按钮</at-button>
      </at-badge>
      <at-badge value="NEW">
        <at-button size="small" circle>按钮</at-button>
      </at-badge>
    </view>
  </view>
</template>

<script>
import { ref, computed, watch } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

import AtButton from '../../components/button'
import AtLoading from '../../components/loading'
import AtFab from '../../components/fab'
import AtAvatar from '../../components/avatar'
import AtAccordion from '../../components/accordion'
import AtList from '../../components/list'
import AtListItem from '../../components/list/item'
import AtActionSheet from '../../components/action-sheet/index'
import AtActionSheetItem from '../../components/action-sheet/body/item/index'
import AtActivityIndicator from '../../components/activity-indicator/index'
import AtBadge from '../../components/badge/index'

export default {
  components: {
    AtButton,
    AtLoading,
    AtFab,
    AtAvatar,
    AtAccordion,
    AtList,
    AtListItem,
    AtActionSheet,
    AtActionSheetItem,
    AtActivityIndicator,
    AtBadge,
  },
  setup() {
    const msg = ref('Hello world')
    const imgSrc = ref('https://avatars1.githubusercontent.com/u/16893585?s=460&u=d96ed6c4dc00f6fba5c2f42cf7595df693e6f1db&v=4')
    // const avatarStyle = computed(() => {})
    const isOpen = ref(false)
    const isOpened = ref(false)

    function navigateTo(pageUrl) {
      Taro.navigateTo({ url: pageUrl })
    }
    function handleAccordionClick() {
      isOpen.value = !isOpen.value
    }
    function handleActionSheetClick() {
      isOpened.value = true
    }
    function handleActionSheetClose() {
      isOpened.value = false
    }
    function handleActionSheetCancel() {
      showToast('点击了取消按钮')
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
      msg,
      imgSrc,
      isOpen,
      isOpened,
      navigateTo,
      handleAccordionClick,
      handleActionSheetClick,
      handleActionSheetClose,
      handleActionSheetCancel,
      showToast,
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
