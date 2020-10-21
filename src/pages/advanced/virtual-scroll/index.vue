<template>
  <page
    class="virtual-scroll-page"
    header-title="VirtualScroll 虚拟列表"
  >
    <panel title="一般案例">
      <template #controller>
        <example-item style="margin: 15px;">
          <view class="example-item__desc">bench: 可视区域外渲染的列表行数，避免快速滑动时白屏</view>
          <at-input-number
            :min="0"
            :max="10"
            :step="1"
            :value="benched"
            @change="handleBenchChange"
          />
          <view class="example-item__desc">length: 列表长度</view>
          <at-slider
            showValue
            :min="7000"
            :max="150000"
            :step="100"
            :value="length"
            @change="handleLengthChange"
          />
          <view class="example-item__desc">height: 长列表组件的高度, 用作 css 样式值</view>
          <at-slider
            showValue
            :min="200"
            :max="500"
            :step="10"
            :value="height"
            @change="handleHeightChange"
          />
          <view class="example-item__desc">itemHeight: 显示列表单项的高度，单位为 px</view>
          <at-slider
            showValue
            :min="48"
            :max="128"
            :step="1"
            :value="itemHeight"
            @change="handleItemHeightChange"
          />
        </example-item>
      </template>
      <at-virtual-scroll
        :bench="benched"
        :items="items"
        :height="height"
        :item-height="itemHeight"
      >
        <template #default="{ item }">
          <at-list-item
            :key="item"
            title="虚拟列表"
            :note="`第 ${item} 条`"
            :extraText="`共 ${length} 条`"
            arrow="right"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </template>
      </at-virtual-scroll>
    </panel>
    <panel title="触底和触顶事件">
      <at-virtual-scroll
        bench="10"
        height="300"
        :item-height="directoryItemHeight"
        :items="directoryItems"
        :scroll-into-item="toItem"
        :ref="(e) => elRef = e"
        @reach-top="handleReachTop"
        @reach-bottom="handleReachBottom"
      >
        <template #default="{ index, item }">
          <at-swipe-action
            auto-close
            :key="index"
            :options="OPTIONS"
            :style="{ marginBottom: '5px' }"
            @click="(item, key) => handleClick(item, key, index)"
          >
            <at-flex
              :style="{ border: 'solid 1px gray'}"
              wrap="wrap"
            >
              <at-flex-item :size="2">
                <at-fab
                  size="small"
                  :style="{ backgroundColor: item.color }"
                >{{ item.initials }}</at-fab>
              </at-flex-item>
              <at-flex-item>
                <view style="font-weight: bolder;">{{ item.fullName }}</view>
                <view style="font-size: smaller;">第 {{index+1}} 条/共 {{ directoryLength }} 条</view>
              </at-flex-item>
              <at-flex-item
                :size="3"
                :style="{ whiteSpace: 'normal', fontSize: 'smaller'}"
              >
                向左滑动删除或查看详情
              </at-flex-item>
            </at-flex>
          </at-swipe-action>
        </template>
      </at-virtual-scroll>
    </panel>
    <panel title="跳转至指定 Item">
      <at-button
        type="secondary"
        @click="scrollToItem"
      >随机跳转至第 N 条数据</at-button>
    </panel>
  </page>
</template>

<script lang="ts">
import './index.scss'
import { defineComponent, computed, ref } from 'vue'
import {
  AtFab,
  AtFlex,
  AtButton,
  AtSlider,
  AtFlexItem,
  AtListItem,
  AtInputNumber,
  AtVirtualScroll,
  AtSwipeAction,
} from '@/components/index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import Taro from '@tarojs/taro'


export default defineComponent({
  name: "VirtualScrollDemo",

  components: {
    AtFab,
    AtFlex,
    AtButton,
    AtSlider,
    AtFlexItem,
    AtListItem,
    AtInputNumber,
    AtVirtualScroll,
    AtSwipeAction,
    Page,
    Panel,
    ExampleItem
  },

  setup() {
    const benched = ref(5)
    const length = ref(7000)
    const height = ref(300)
    const itemHeight = ref(80)
    const elRef = ref(null)
    const toItem = ref(0)

    const colors = ref(['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF'])
    const names = ref(['Oliver', 'Jake', 'Noah', 'James', 'Jack', 'Connor', 'Liam', 'John', 'Harry', 'Callum', 'Mason', 'Robert', 'Jacob', 'Jacob', 'Jacob', 'Michael', 'Charlie', 'Kyle', 'William', 'William', 'Thomas', 'Joe', 'Ethan', 'David', 'George', 'Reece', 'Michael', 'Richard', 'Oscar', 'Rhys', 'Alexander', 'Joseph', 'James', 'Charlie', 'James', 'Charles', 'William', 'Damian', 'Daniel', 'Thomas', 'Amelia', 'Margaret', 'Emma', 'Mary', 'Olivia', 'Samantha', 'Olivia', 'Patricia', 'Isla', 'Bethany'])
    const surnames = ref(['Smith', 'Anderson', 'Clark', 'Wright', 'Mitchell', 'Johnson', 'Thomas', 'Rodriguez', 'Lopez', 'Perez', 'Williams', 'Jackson', 'Lewis', 'Hill', 'Roberts', 'Jones', 'White', 'Lee', 'Scott', 'Turner', 'Brown', 'Harris', 'Walker', 'Green', 'Phillips', 'Davis', 'Martin', 'Hall', 'Adams', 'Campbell', 'Miller', 'Thompson', 'Allen', 'Baker', 'Parker', 'Wilson', 'Garcia', 'Young', 'Gonzalez', 'Evans', 'Moore', 'Martinez', 'Hernandez', 'Nelson', 'Edwards', 'Taylor', 'Robinson', 'King', 'Carter', 'Collins'])

    const OPTIONS = ref([
      {
        text: '删除',
        style: {
          backgroundColor: '#E93B3D'
        }
      },
      {
        text: '查看详情',
        style: {
          backgroundColor: '#3ba1e9'
        }
      }
    ])

    const items = computed(() => {
      return Array.from({
        length: length.value
      }, (_, v) => v + 1)
    })

    const directoryLength = ref(20)
    const directoryItemHeight = computed(() => {
      return Taro.getEnv() === Taro.ENV_TYPE.WEB ? 100 : 64
    })

    const directoryItems = computed(() => {
      const namesLength = names.value.length
      const surnamesLength = surnames.value.length
      const colorsLength = colors.value.length

      return Array.from({ length: directoryLength.value }, () => {
        const name = names.value[genRandomIndex(namesLength)]
        const surname = surnames.value[genRandomIndex(surnamesLength)]

        return {
          color: colors.value[genRandomIndex(colorsLength)],
          fullName: `${name} ${surname}`,
          initials: `${name[0]} ${surname[0]}`,
        }
      })
    })

    function handleClick(_, key, index) {
      if (key === 0) {
        Taro.showModal({
          title: '提示',
          content: `是否要删除第${index + 1}条数据？`,
          showCancel: true,
          success: (res) => {
            if (res.confirm) {
              directoryLength.value -= 1
            } else {
              return
            }
          }
        })
      } else if (key === 1) {
        Taro.showModal({
          title: '详情',
          content: `Data: ${JSON.stringify(directoryItems.value[index])}, Index: ${index + 1}`,
          showCancel: false
        })
      }
    }

    function genRandomIndex(length: number) {
      return Math.ceil(Math.random() * (length - 1))
    }

    function handleBenchChange(value) {
      benched.value = value
    }

    function handleLengthChange(value) {
      length.value = value
    }

    function handleItemHeightChange(value) {
      itemHeight.value = value
    }

    function handleHeightChange(value) {
      height.value = value
    }

    function handleReachTop() {
      Taro.showToast({
        title: `reachTop 刷新数据`,
        icon: 'loading',
        duration: genRandomIndex(3000),
        success(_) {
          // 模拟刷新数据 -> 
          const randIndex = genRandomIndex(colors.value.length)
          names.value.push(names.value[randIndex])
          surnames.value.push(surnames.value[randIndex])
          directoryLength.value = 20
        }
      })
    }

    function handleReachBottom() {
      Taro.showToast({
        title: `reachBottom 加载数据`,
        icon: 'loading',
        duration: genRandomIndex(3000),
        success: (_) => {
          // 模拟加载数据 -> 附加 10 条数据
          directoryLength.value += 10
        }
      })
    }

    function scrollToItem() {
      toItem.value = genRandomIndex(directoryLength.value)
      console.log(`随机跳转至: 第 ${toItem.value + 1} 条`)
    }

    return {
      toItem,
      elRef,
      OPTIONS,
      benched,
      items,
      length,
      height,
      itemHeight,
      directoryItems,
      directoryLength,
      directoryItemHeight,
      handleClick,
      scrollToItem,
      handleBenchChange,
      handleLengthChange,
      handleHeightChange,
      handleItemHeightChange,
      handleReachTop,
      handleReachBottom
    }
  }
})
</script>
