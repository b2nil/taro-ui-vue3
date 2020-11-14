<template>
  <view
    class="page"
    :style="rootStyle"
  >
    <!-- S Header -->
    <view class="panel-header">
      <view class="panel-header__icon">
        <image
          v-if="icon"
          :src="icon"
          class="img"
          mode="widthFix"
        />
        <text
          v-else
          class="at-icon at-icon-list"
        />
      </view>
      <view class="panel-header__title">{{ title }}</view>
    </view>
    <!-- E Header -->

    <!-- S Body -->
    <view class="panel-body">
      <view class="component-list">
        <view
          v-for="item in itemList"
          :key="item.id"
          class="component-list__item"
          @tap="gotoComponent(item.id, currentId)"
        >
          <text class="name">{{ `${item.id} ${item.name}` }}</text>
          <text class="at-icon at-icon-chevron-right" />
        </view>
      </view>
    </view>
    <!-- E Body -->
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed, toRefs } from "vue"
import Taro from "@tarojs/taro"
import iconAction from '@/assets/images/icon-list-action.png'
import iconBasic from '@/assets/images/icon-list-basic.png'
import iconForm from '@/assets/images/icon-list-form.png'
import iconHOC from '@/assets/images/icon-list-hoc.png'
import iconLayout from '@/assets/images/icon-list-layout.png'
import iconNavigation from '@/assets/images/icon-list-navigation.png'
import iconView from '@/assets/images/icon-list-view.png'

import "./index.scss"

export default defineComponent({
  name: "PanelDemo",

  setup() {
    const state = reactive({
      panelNames: {
        basic: {
          name: '基础',
          icon: iconBasic
        },
        view: {
          name: '视图',
          icon: iconView
        },
        action: {
          name: '操作反馈',
          icon: iconAction
        },
        form: {
          name: '表单',
          icon: iconForm
        },
        layout: {
          name: '布局',
          icon: iconLayout
        },
        navigation: {
          name: '导航',
          icon: iconNavigation
        },
        advanced: {
          name: '高阶组件',
          icon: iconHOC
        }
      },
      list: {
        basic: [
          {
            id: 'Color',
            name: '颜色'
          },
          {
            id: 'Icon',
            name: '图标'
          },
          {
            id: 'Typo',
            name: '字体'
          },
          {
            id: 'Button',
            name: '按钮'
          }
        ],
        view: [
          {
            id: 'Avatar',
            name: '头像'
          },
          {
            id: 'Article',
            name: '文章'
          },
          {
            id: 'Badge',
            name: '徽标'
          },
          {
            id: 'Countdown',
            name: '倒计时'
          },
          {
            id: 'Curtain',
            name: '幕帘'
          },
          {
            id: 'Divider',
            name: '分割线'
          },
          {
            id: 'NoticeBar',
            name: '通告栏'
          },
          {
            id: 'Tag',
            name: '标签'
          },
          {
            id: 'Timeline',
            name: '时间轴'
          },
          {
            id: 'Swiper',
            name: '滑块视图容器'
          },
          {
            id: 'Load-More',
            name: '页面提示'
          },
          {
            id: 'Steps',
            name: '步骤条'
          }
        ],
        action: [
          {
            id: 'Action-Sheet',
            name: '动作面板'
          },
          {
            id: 'Activity-Indicator',
            name: '活动指示器'
          },
          {
            id: 'Modal',
            name: '模态框'
          },
          {
            id: 'Progress',
            name: '进度条'
          },
          {
            id: 'Toast',
            name: '轻提示'
          },
          {
            id: 'Swipe-Action',
            name: '滑动操作'
          },
          {
            id: 'Message',
            name: '消息通知'
          }
        ],
        form: [
          {
            id: 'Form',
            name: '表单'
          },
          {
            id: 'Input',
            name: '输入框'
          },
          {
            id: 'Radio',
            name: '单选框'
          },
          {
            id: 'Checkbox',
            name: '复选框'
          },
          {
            id: 'Switch',
            name: '开关'
          },
          {
            id: 'Rate',
            name: '评分'
          },
          {
            id: 'Input-Number',
            name: '数字输入框'
          },
          {
            id: 'Textarea',
            name: '多行文本框'
          },
          {
            id: 'Picker',
            name: '选择器'
          },
          {
            id: 'Picker-View',
            name: '滚动选择器'
          },
          {
            id: 'Slider',
            name: '滑动条'
          },
          {
            id: 'Search-Bar',
            name: '搜索栏'
          },
          {
            id: 'Image-Picker',
            name: '图片选择器'
          },
          {
            id: 'Range',
            name: '范围选择器'
          }
        ],
        layout: [
          {
            id: 'Flex',
            name: '弹性布局'
          },
          {
            id: 'Grid',
            name: '栅格'
          },
          {
            id: 'List',
            name: '列表'
          },
          {
            id: 'Card',
            name: '卡片'
          },
          {
            id: 'Float-Layout',
            name: '浮动弹层'
          },
          {
            id: 'Accordion',
            name: '手风琴'
          }
        ],
        navigation: [
          {
            id: 'NavBar',
            name: '导航栏'
          },
          {
            id: 'TabBar',
            name: '标签栏'
          },
          {
            id: 'Tabs',
            name: '标签页'
          },
          {
            id: 'Segmented-Control',
            name: '分段器'
          },
          {
            id: 'Pagination',
            name: '分页器'
          },
          {
            id: 'Drawer',
            name: '抽屉'
          },
          {
            id: 'Indexes',
            name: '索引选择器'
          }
        ],
        advanced: [
          {
            id: 'Calendar',
            name: '日历'
          },
          {
            id: 'Virtual-Scroll',
            name: '虚拟列表'
          },
          {
            id: 'Skeleton',
            name: '骨架'
          },
        ]
      },
      currentId: ''
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

    const itemList = computed(() => state.list[state.currentId] || [])

    const title = computed(() => {
      return (state.panelNames[state.currentId])
        && state.panelNames[state.currentId].name
        || ''
    })

    const icon = computed(() => {
      return (state.panelNames[state.currentId])
        && state.panelNames[state.currentId].icon
        || ''
    })

    onMounted(() => {
      const { id } = Taro.Current!.router!.params
      state.currentId = id?.toLowerCase() || ''
    })

    function gotoComponent(id, parent) {
      Taro.navigateTo({
        url: `/pages/${parent.toLowerCase()}/${id.toLowerCase()}/index`
      })
    }

    return {
      ...toRefs(state),
      rootStyle,
      itemList,
      title,
      icon,
      gotoComponent
    }
  }
})
</script>