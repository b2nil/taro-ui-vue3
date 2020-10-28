<template>
  <page
    class="virtual-scroll-page"
    header-title="VirtualScroll 虚拟列表"
  >
    <panel title="功能展示">
      <template #controller>
        <at-card
          style="margin: 15px;"
          title="参数控制"
        >
          <example-item>
            <at-flex justify="around">
              <at-flex-item>
                <view
                  class="example-item__desc"
                  style="color: red;"
                >bench</view>
              </at-flex-item>
              <at-flex-item>
                <view
                  class="example-item__desc"
                  style="color: red;"
                >viewport</view>
              </at-flex-item>
            </at-flex>
            <at-flex justify="around">
              <at-flex-item>
                <at-input-number
                  :min="0"
                  :max="10"
                  :step="1"
                  :value="benched"
                  @change="handleBenchChange"
                />
              </at-flex-item>
              <at-flex-item>
                <at-input-number
                  :min="1"
                  :max="10"
                  :step="1"
                  :value="viewportRows"
                  @change="handleViewportChange"
                />
              </at-flex-item>
            </at-flex>
            <at-flex justify="around">
              <at-flex-item is-wrap>
                <view class="example-item__desc">* 可视区域外渲染的列表行数</view>
              </at-flex-item>
              <at-flex-item is-wrap>
                <view class="example-item__desc">* 可视区域渲染的列表行数</view>
              </at-flex-item>
            </at-flex>
          </example-item>
          <example-item>
            <at-flex>
              <at-flex-item
                :size="3"
                style="color: red;"
              >height</at-flex-item>
              <at-flex-item>
                <at-slider
                  showValue
                  :min="200"
                  :max="500"
                  :step="10"
                  :value="height"
                  @change="handleHeightChange"
                />

              </at-flex-item>
            </at-flex>
            <view class="example-item__desc">* 长列表组件的高度, 用作 css 样式值</view>
          </example-item>
          <example-item>
            <at-flex>
              <at-flex-item
                :size="3"
                style="color: red;"
              >itemHeight</at-flex-item>
              <at-flex-item>
                <at-slider
                  showValue
                  :min="48"
                  :max="128"
                  :step="1"
                  :value="itemHeight"
                  @change="handleItemHeightChange"
                />
              </at-flex-item>
            </at-flex>
            <view class="example-item__desc">* 显示列表单项的高度，单位为 px</view>
          </example-item>
          <example-item>
            <at-flex>
              <at-flex-item
                :size="3"
                style="color: red;"
              >items.length</at-flex-item>
              <at-flex-item>
                <at-slider
                  showValue
                  :min="1"
                  :max="150000"
                  :step="1"
                  :value="length"
                  @change="handleLengthChange"
                />
              </at-flex-item>
            </at-flex>
            <view class="example-item__desc">* 列表长度</view>
          </example-item>
          <example-item>
            <at-flex>
              <at-flex-item>
                <at-switch
                  border
                  style="margin-left: 0px;"
                  title="onReachTop"
                  :checked="reachTopOn"
                  @change="handleReachToOn"
                />
              </at-flex-item>
              <at-flex-item>
                <at-switch
                  border
                  style="margin-left: 0px;"
                  title="onReachBottom"
                  :checked="reachBottomOn"
                  @change="handleReachBottomOn"
                />
              </at-flex-item>
            </at-flex>
          </example-item>
        </at-card>
      </template>
      <at-card
        style="margin: 5px;"
        title="列表展示"
      >
        <at-virtual-scroll
          :bench="benched"
          :viewport="viewportRows"
          :height="height"
          :items="directoryItems"
          :scroll-into-item="toItem"
          :item-height="itemHeight"
          @reach-top="handleReachTop"
          @reach-bottom="handleReachBottom"
        >
          <template #header>
            <view
              class="example-item__desc"
              style="text-align: center;"
            > 初始 scrollIntoItem 索引设置: 10 </view>
            <at-search-bar
              action-name="跳转"
              placeholder="header 插槽: 输入需跳转的列表索引"
              input-type="number"
              :value="searchbarValue"
              @change="handleChange"
              @action-click="handleActionClick"
            />
          </template>
          <template #default="{ index, item }">
            <at-swipe-action
              auto-close
              :key="index"
              :options="OPTIONS"
              :style="{ marginBottom: '5px' }"
              @click="(item, key) => handleClick(item, key, index)"
            >
              <view>
                <at-flex :style="{ border: 'solid 1px gray'}">
                  <at-flex-item :size="2">
                    <at-fab
                      size="small"
                      :style="{ backgroundColor: item.color }"
                    >{{ item.initials }}</at-fab>
                  </at-flex-item>
                  <at-flex-item :size="7">
                    <view
                      class="example-item__desc"
                      :style="{fontWeight: 'bolder', marginBottom: 0}"
                    >{{ item.fullName }}</view>
                    <view
                      class="example-item__desc"
                      :style="{ marginTop: 0,}"
                    >第 {{index+1}} 条/共 {{ length }} 条</view>
                  </at-flex-item>
                  <at-flex-item :size="3">
                    <view class="example-item__desc">左滑看看</view>
                  </at-flex-item>
                </at-flex>
              </view>
            </at-swipe-action>
          </template>
          <template #footer>
            <at-load-more
              v-if="loadMore.show"
              :status="loadMore.status"
            />
          </template>
        </at-virtual-scroll>
      </at-card>
    </panel>
  </page>
</template>

<script lang="ts">
import './index.scss'
import { defineComponent, computed, ref } from 'vue'
import {
  AtFab,
  AtFlex,
  AtCard,
  AtButton,
  AtSlider,
  AtSwitch,
  AtDivider,
  AtFlexItem,
  AtListItem,
  AtLoadMore,
  AtInputNumber,
  AtVirtualScroll,
  AtSwipeAction,
  AtSearchBar,
} from '@/components/index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import Taro from '@tarojs/taro'


export default defineComponent({
  name: "VirtualScrollDemo",

  components: {
    AtFab,
    AtFlex,
    AtCard,
    AtButton,
    AtSlider,
    AtDivider,
    AtSwitch,
    AtFlexItem,
    AtListItem,
    AtLoadMore,
    AtInputNumber,
    AtVirtualScroll,
    AtSwipeAction,
    AtSearchBar,
    Page,
    Panel,
    ExampleItem
  },

  setup() {
    const benched = ref(5)
    const viewportRows = ref(5)
    const length = ref(20)
    const itemHeight = ref(80)
    const height = ref(300)
    const toItem = ref(10)
    const searchbarValue = ref(undefined)
    const reachTopOn = ref(true)
    const reachBottomOn = ref(true)
    const loadMore = ref({ status: 'loading', show: false })

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

    const directoryItems = computed(() => {
      const namesLength = names.value.length
      const surnamesLength = surnames.value.length
      const colorsLength = colors.value.length

      return Array.from({ length: length.value }, () => {
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
              length.value -= 1
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

    function handleViewportChange(value) {
      viewportRows.value = value
    }

    function handleReachTop() {
      if (reachTopOn.value) {
        Taro.showToast({
          title: `刷新数据中...`,
          icon: 'loading',
          duration: genRandomIndex(3000),
          success(_) {
            // 模拟刷新数据 -> 
            const randIndex = genRandomIndex(colors.value.length)
            names.value.push(names.value[randIndex])
            surnames.value.push(surnames.value[randIndex])
            length.value = 20
          }
        })
      } else {
        Taro.showToast({
          title: `无触顶逻辑`,
          icon: 'none',
          duration: genRandomIndex(3000),
        })
      }
    }

    function handleReachBottom() {
      loadMore.value.show = true
      if (reachBottomOn.value) {
        loadMore.value.status = 'loading'

        Taro.showToast({
          title: `reachBottom 加载数据`,
          icon: 'loading',
          duration: genRandomIndex(3000),
          success: (_) => {
            // 模拟加载数据 -> 附加 10 条数据
            setTimeout(() => {
              length.value += 10
              loadMore.value.show = false
            }, 3000)
          }
        })
      } else {
        loadMore.value.status = 'noMore'
      }
    }

    function handleActionClick() {
      toItem.value = searchbarValue.value || 0
    }

    function handleChange(value) {
      searchbarValue.value = value
    }

    function handleReachToOn(value) {
      reachTopOn.value = value
    }

    function handleReachBottomOn(value) {
      reachBottomOn.value = value
    }

    return {
      loadMore,
      reachTopOn,
      reachBottomOn,
      searchbarValue,
      toItem,
      OPTIONS,
      benched,
      viewportRows,
      length,
      height,
      itemHeight,
      directoryItems,
      handleClick,
      handleBenchChange,
      handleLengthChange,
      handleHeightChange,
      handleItemHeightChange,
      handleReachTop,
      handleReachBottom,
      handleChange,
      handleActionClick,
      handleViewportChange,
      handleReachToOn,
      handleReachBottomOn
    }
  }
})
</script>
