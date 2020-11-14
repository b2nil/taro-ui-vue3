<template>
  <view
    class="page page-index"
    :style="rootStyle"
  >
    <!-- logo -->
    <view class="logo">
      <image
        class="img"
        :src="logoImg"
        mode="widthFix"
      />
    </view>
    <!-- title -->
    <view class="page-title">Taro UI Vue3</view>
    <!-- module list -->
    <view class="module-list">
      <view
        class="module-list__item"
        v-for="(item, index) in list"
        :key="index"
        @tap="gotoPanel(item.id)"
      >
        <view class="module-list__icon">
          <image
            class="img"
            :src="item.icon"
            mode="widthFix"
          />
        </view>
        <view class="module-list__info">
          <view class="title">{{ item.title }}</view>
          <view class="content">{{ item.content }}</view>
        </view>
        <view class="module-list__arrow">
          <text class="at-icon at-icon-chevron-right" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import iconAction from '@/assets/images/icon-list-action.png'
import iconBasic from '@/assets/images/icon-list-basic.png'
import iconForm from '@/assets/images/icon-list-form.png'
import iconHOC from '@/assets/images/icon-list-hoc.png'
import iconLayout from '@/assets/images/icon-list-layout.png'
import iconNavigation from '@/assets/images/icon-list-navigation.png'
import iconView from '@/assets/images/icon-list-view.png'
import logoImg from '@/assets/images/logo_taro.png'

import './index.scss'

export default defineComponent({
  name: "IndexPage",

  setup() {
    const state = reactive({
      list: [
        {
          id: 'Basic',
          title: '基础',
          content: '包含颜色、文本、图标等',
          icon: iconBasic
        },
        {
          id: 'View',
          title: '视图',
          content: '包含通告栏、标签、徽标等',
          icon: iconView
        },
        {
          id: 'Action',
          title: '操作反馈',
          content: '包含对话框、进度条、动作面板等',
          icon: iconAction
        },
        {
          id: 'Form',
          title: '表单',
          content: '包含输入框、单选框、复选框等',
          icon: iconForm
        },
        {
          id: 'Layout',
          title: '布局',
          content: '包含列表、浮层、卡片等',
          icon: iconLayout
        },
        {
          id: 'Navigation',
          title: '导航',
          content: '包含标签栏、导航栏、分段器等',
          icon: iconNavigation
        },
        {
          id: 'Advanced',
          title: '高阶组件',
          content: '包含日历、虚拟列表、骨架等',
          icon: iconHOC
        }
      ]
    })



    const rootStyle = computed(() => {
      const deviceWidth = Taro.getSystemInfoSync().windowWidth

      return Taro.getEnv() === Taro.ENV_TYPE.WEB
        ? {
          width: deviceWidth >= 1024 ? '75%' : '100%',
          margin: 'auto'
        }
        : null
    })

    function onShareAppMessage() {
      return {
        title: 'Taro UI Vue3',
        path: '/pages/index/index',
        imageUrl:
          'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
      }
    }

    function gotoPanel(id) {
      Taro.navigateTo({
        url: `/pages/panel/index?id=${id.toLowerCase()}`
      })
    }

    return {
      ...toRefs(state),
      logoImg,
      rootStyle,
      gotoPanel,
      onShareAppMessage
    }
  }
})
</script>
