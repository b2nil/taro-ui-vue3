<template>
  <view
    v-bind="$attrs"
    class="at-indexes"
  >
    <!-- toast message -->
    <at-toast
      :is-opened="isShowToast_"
      :text="tipText_"
      :duration="1000"
      :style="toastStyle"
    />

    <!-- menu-->
    <view
      class="at-indexes__menu"
      @touch-move="handleTouchMove"
      @touch-end="handleTouchEnd"
    >
      <!-- top key -->
      <view
        class="at-indexes__menu-item"
        :style="activeIndexStyle(0)"
        @tap="jumpTarget('at-indexes__top', 0)"
      >{{ topKey }}</view>

      <!-- menu letters -->
      <view
        v-for="(dataList, i) in list"
        :key="`${dataList.key}-${i+1}`"
        class="at-indexes__menu-item"
        :style="activeIndexStyle(i+1)"
        @tap="jumpTarget(`at-indexes__list-${dataList.key}`, i + 1)"
      >{{ dataList.key }}</view>
    </view>

    <!-- scroll view of indexes -->
    <scroll-view
      class="at-indexes__body"
      scroll-y
      enable-back-to-top
      :scroll-top="scrollTop_"
      :scrill-into-view="!isWEB ? scrollIntoView_ : ''"
      :scroll-with-animation="animation"
      @scroll="handleScroll"
    >
      <!-- default slot content -->
      <view
        id="at-indexes__top"
        class="at-indexes__content"
      >
        <slot />
      </view>

      <!-- indexes list -->
      <view
        v-for="dataList in list"
        :key="dataList.key"
        :id="`at-indexes__list-${dataList.key}`"
        class="at-indexes__list"
      >
        <!-- list title -->
        <view class="at-indexes__list-title">{{ dataList.title }}</view>

        <!-- list items -->
        <at-list v-if="dataList.items">
          <at-list-item
            v-for="item in dataList.items"
            :key="item.name"
            :title="item.name"
            @click="handleClick(item)"
          />
        </at-list>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import {
  defineComponent,
  computed,
  ref,
  reactive,
  nextTick,
  watch,
  onMounted,
  onBeforeMount,
  toRefs,
  PropType
} from "vue"

import {
  delayQuerySelector,
  pxTransform,
} from "@/utils/common"

import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtIndexesProps, AtIndexesState, Item, ListItem } from "types/indexes"

import AtList from "@/components/list/index.vue"
import AtListItem from "@/components/list/item/index.vue"
import AtToast from '@/components/toast/index.vue'

export default defineComponent({
  name: "AtIndexes",

  components: {
    AtList,
    AtListItem,
    AtToast
  },

  emits: {
    'click'(item: Item) {
      return !!(item && typeof item === 'object')
    },
    'scroll-into-view'(fn: (key: string) => void) {
      return !!(fn && typeof fn === 'function')
    }
  },

  props: {
    animation: Boolean,
    isVibrate: {
      type: Boolean,
      default: true
    },
    isShowToast: {
      type: Boolean,
      default: true
    },
    topKey: {
      type: String as PropType<AtIndexesProps['topKey']>,
      default: 'Top'
    },
    list: {
      type: Array as PropType<AtIndexesProps['list']>,
      default: () => []
    }
  },

  setup(props: AtIndexesProps, { emit }) {
    const menuHeight = ref(0)                    // 右侧导航高度
    const startTop = ref(0)                      // 右侧导航距离顶部高度
    const itemHeight = ref(0)                    // 右侧导航元素高度
    const scrollItemHeights = ref<number[]>([])  // 列表项目的所有高度
    const currentIndex = ref(0)  // Set intital at 0 so that active style is applied
    const timeoutTimer = ref<NodeJS.Timeout | number | null>(null)

    const state = reactive<AtIndexesState>({
      scrollIntoView_: '',
      scrollTop_: 0,
      tipText_: '',
      isShowToast_: false,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const toastStyle = computed(() => ({
      minWidth: pxTransform(100)
    }))

    const activeIndexStyle = computed(() => (i) => {
      return currentIndex.value === i
        ? {
          color: 'white',
          // rgba($color: $at-calendar-main-color, $alpha: 0.7)
          backgroundColor: 'rgba(97, 144, 232, 1)',
          borderRadius: '40px'
        }
        : {}
    })

    watch(() => props.list, (list, prevList) => {
      if (list.length !== prevList.length) {
        initData()
      }
    })

    function handleClick(item: Item) {
      emit('click', item)
    }

    function handleTouchMove(e: ITouchEvent) {
      e.stopPropagation()
      e.preventDefault()

      const pageY = e.touches[0].pageY
      const index = Math.floor((pageY - startTop.value) / itemHeight.value)

      if (index >= 0 && index <= props.list.length && currentIndex.value !== index) {
        currentIndex.value = index
        const key = index > 0 ? props.list[index - 1].key : 'top'
        const touchView = `at-indexes__list-${key}`
        jumpTarget(touchView, index)
      }
    }

    function handleTouchEnd() {
      // currentIndex.value = -1
    }

    function jumpTarget(scrollIntoView_: string, idx: number) {
      currentIndex.value = idx

      updateState({
        scrollIntoView_,
        scrollTop_: scrollItemHeights.value[idx],
        tipText_: idx === 0 ? props.topKey : props.list[idx - 1].key
      })
    }

    function __jumpTarget(key: string) {
      const index = props.list.findIndex(item => item.key === key)
      const targetView = `at-indexes__list-${key}`
      jumpTarget(targetView, index + 1)
    }

    function updateState(stateValue: Partial<AtIndexesState>) {
      const { scrollIntoView_, tipText_, scrollTop_ } = stateValue

      state.scrollIntoView_ = scrollIntoView_!
      state.tipText_ = tipText_!
      state.scrollTop_ = scrollTop_!
      state.isShowToast_ = props.isShowToast!

      nextTick(() => {
        clearTimeout(timeoutTimer.value as number)

        timeoutTimer.value = setTimeout(() => {
          state.tipText_ = ''
          state.isShowToast_ = false
        }, 1000)
      })

      if (props.isVibrate) {
        Taro.vibrateShort()
      }
    }

    async function initData() {
      if (props.list.length > 0) {
        await _getScrollListItemHeights(props.list).then(res => {
          scrollItemHeights.value = [...res]
        })

        // 获取右侧导航高度、顶部位置以及元素高度
        delayQuerySelector(this, '.at-indexes__menu').then(rect => {
          const len = props.list.length
          // @ts-ignore
          menuHeight.value = rect[0].height
          // @ts-ignore
          startTop.value = rect[0].top
          itemHeight.value = Math.floor(menuHeight / (len + 1))
        })
      }
    }

    function _getHeight(selector: string, delay?: number): Promise<number> {
      // 默认延时 500 毫秒，确保获取到所有高度
      if (!delay) {
        delay = 500
      }

      return new Promise<number>((resolve) => {
        delayQuerySelector(this, selector, delay).then(rect => {
          // @ts-ignore
          if (rect && rect[0]) {
            // @ts-ignore
            resolve(rect[0].height)
          }
        })
      })
    }

    function _getScrollListItemHeights(list: Array<ListItem>): Promise<number[]> {
      return new Promise<number[]>((resolve) => {
        if (list.length > 0) {
          let rawHeights: Promise<number>[] = []
          let itemHeights: number[] = []

          // 获取 #at-indexes__top 的高度              
          rawHeights.push(_getHeight(`#at-indexes__top`))

          // 获取 #at-indexes——list-${key} 的高度
          list.forEach((item) => {
            rawHeights.push(_getHeight(`#at-indexes__list-${item.key}`))
          })

          Promise.all(rawHeights).then(res => {
            let height = 0
            itemHeights.push(height)

            for (let i = 0; i < res.length; i++) {
              height += res[i]
              itemHeights.push(height)
            }

            resolve(itemHeights)
          })
        }
      })
    }

    function handleScroll(e: CommonEvent) {
      if (e && e.detail) {
        state.scrollIntoView_ = ''

        for (let i = 0; i < scrollItemHeights.value.length - 1; i++) {
          // Use Math.floor to ensure currentIndex is accurate
          let h1 = Math.floor(scrollItemHeights.value[i])
          let h2 = Math.floor(scrollItemHeights.value[i + 1])

          if (e.detail.scrollTop >= h1 && e.detail.scrollTop < h2) {
            currentIndex.value = i
            return
          }
        }
      }
    }

    onMounted(() => {
      initData()
    })

    onBeforeMount(() => {
      emit('scroll-into-view', __jumpTarget)
    })

    return {
      ...toRefs(state),
      ...toRefs(props),
      toastStyle,
      activeIndexStyle,
      jumpTarget,
      handleClick,
      handleScroll,
      handleTouchEnd,
      handleTouchMove,
    }
  }
})
</script>

