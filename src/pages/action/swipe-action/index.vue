<template>
  <page
    class="swipe-action-page"
    header-title="SwipeAction 滑动操作"
  >
    <!-- 一般用法 -->
    <panel
      title="一般用法"
      no-padding
    >
      <example-item class="example-item--border">
        <at-swipe-action
          @click="handleClick"
          :options="OPTIONS"
        >
          <view class="normal">AtSwipeAction 一般使用场景</view>
        </at-swipe-action>
      </example-item>
    </panel>

    <!-- 禁止滑动 -->
    <panel
      title="禁止滑动"
      no-padding
    >
      <example-item class="example-item--border">
        <at-swipe-action
          disabled
          :options="OPTIONS"
        >
          <view class="normal">禁止滑动场景</view>
        </at-swipe-action>
      </example-item>
    </panel>

    <!-- 使用变量控制开关 -->
    <panel
      title="使用变量控制开关"
      no-padding
    >
      <template #controller>
        <view
          class="panel__controller"
          :style="{ marginBottom: '10px' }"
        >
          <at-button
            size="small"
            @click="handleStatusClick"
          >当前状态：{{ isOpened2 ? "开" : "关" }}{{ ' '}}</at-button>
        </view>
      </template>
      <example-item class="example-item--border">
        <at-swipe-action
          :options="OPTIONS"
          :isOpened="isOpened2"
          @closed="handleStatusClosed"
          @opened="handleStatusOpened"
        >
          <view class="normal">使用变量控制开关</view>
        </at-swipe-action>
      </example-item>
    </panel>

    <!-- 自动关闭 -->
    <panel
      title="自动关闭"
      no-padding
    >
      <example-item class="example-item--border">
        <at-swipe-action
          auto-close
          @click="handleClick"
          :options="OPTIONS"
        >
          <view class="normal">点击按钮自动关闭</view>
        </at-swipe-action>
      </example-item>
    </panel>

    <!-- 传递点击事件 -->
    <panel
      title="传递点击事件"
      no-padding
    >
      <example-item class="example-item--border">
        <at-swipe-action
          @click="handleClick"
          :options="OPTIONS"
        >
          <view class="normal">点击事件触发</view>
        </at-swipe-action>
      </example-item>
    </panel>

    <!-- 开启和关闭事件 -->
    <panel
      title="开启和关闭事件"
      no-padding
    >
      <example-item class="example-item--border">
        <at-swipe-action
          :options="OPTIONS"
          @click="handleClick"
          @opened="handleOpened"
          @closed="handleClosed"
        >
          <view class="normal">开启和关闭触发事件</view>
        </at-swipe-action>
      </example-item>
    </panel>

    <!-- 与 List 组件配合使用 -->
    <panel
      title="与 List 组件配合使用"
      no-padding
    >
      <example-item>
        <at-list>
          <at-swipe-action :options="OPTIONS">
            <at-list-item title="Item1" />
          </at-swipe-action>
          <at-swipe-action :options="OPTIONS">
            <at-list-item title="Item2" />
          </at-swipe-action>
          <at-swipe-action :options="[{text: '警告', style: { backgroundColor: '#FFC82C' }}]">
            <at-list-item title="Item3" />
          </at-swipe-action>
        </at-list>
      </example-item>
    </panel>

    <!-- 与 List 组件配合使用 -->
    <panel
      title="控制只显示单个"
      no-padding
    >
      <example-item>
        <at-list>
          <at-swipe-action
            v-for="(item, index) in list"
            :key="item.title"
            :options="item.options"
            :isOpened="item.isOpened"
            @click="handleClicked(index)"
            @opened="handleSingle(index)"
          >
            <at-list-item :title="item.title" />
          </at-swipe-action>
        </at-list>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue"
import Taro from "@tarojs/taro"
import AtButton from "@/components/button"
import AtList from "@/components/list"
import AtListItem from "@/components/list/item"
import AtSwipeAction from "@/components/swipe-action"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "SwipeActionDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtButton,
    AtList,
    AtListItem,
    AtSwipeAction
  },

  setup() {

    const OPTIONS = ref([
      {
        text: '删除',
        style: {
          color: '#333',
          backgroundColor: '#F7F7F7'
        }
      },
      {
        text: '确认',
        style: {
          backgroundColor: '#E93B3D'
        }
      }
    ])

    const state = reactive({
      isOpened2: false,
      list: [
        {
          title: 'item1',
          isOpened: false,
          options: OPTIONS
        },
        {
          title: 'item2',
          isOpened: false,
          options: OPTIONS
        },
        {
          title: 'item3',
          isOpened: false,
          options: OPTIONS
        },
        {
          title: 'item4',
          isOpened: false,
          options: OPTIONS
        },
        {
          title: 'item5',
          isOpened: false,
          options: OPTIONS
        },
        {
          title: 'item6',
          isOpened: false,
          options: OPTIONS
        }
      ]
    })

    function handleClick(item, key) {
      showToast(`点击了${item.text}按钮，key: ${key}`)
    }

    function handleClicked(index) {
      const list = state.list.filter((_item, key) => key !== index)
      state.list = list
    }

    function handleStatusClick() {
      state.isOpened2 = !state.isOpened2
    }

    function handleStatusOpened() {
      state.isOpened2 = true
    }

    function handleStatusClosed() {
      state.isOpened2 = false
    }

    function handleSingle(index) {
      const list = state.list.map((item, key) => {
        item.isOpened = key === index
        return item
      })
      state.list = list
    }

    function handleOpened() {
      showToast('Handle Opened')
    }

    function handleClosed() {
      showToast('Handle Closed')
    }

    function showToast(titleMsg) {
      Taro.showToast({
        icon: 'none',
        title: titleMsg
      })
    }

    return {
      ...toRefs(state),
      OPTIONS,
      handleOpened,
      handleStatusOpened,
      handleClosed,
      handleStatusClosed,
      handleClick,
      handleStatusClick,
      handleClicked,
      handleSingle
    }
  }
})
</script>