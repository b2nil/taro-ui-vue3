<template>
  <view
    v-bind="$attrs"
    class="at-indexes"
  >
    <!-- menu-->
    <view
      class="at-indexes__menu"
      @touchmove="handleTouchmove"
    >
      <!-- top key -->
      <view
        class="at-indexes__menu-item"
        :style="genActiveIndexStyle(0)"
        @tap="jumpTarget('at-indexes__top', 0)"
      >{{ topKey }}</view>

      <!-- menu letters -->
      <view
        v-for="(dataList, i) in list"
        :key="`${dataList.key}-${i+1}`"
        class="at-indexes__menu-item"
        :style="genActiveIndexStyle(i+1)"
        @tap="jumpTarget(`at-indexes__list-${dataList.key}`, i + 1)"
      >{{ dataList.key }}</view>
    </view>

    <!-- scroll view of indexes -->
    <scroll-view
      class="at-indexes__body"
      scroll-y
      enable-back-to-top
      :scroll-top="scrollTop"
      :scroll-into-view="!isWEB ? scrollIntoView : ''"
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
        <at-list v-if="dataList.items && dataList.items.length > 0">
          <at-list-item
            v-for="(item, i) in dataList.items"
            :key="`${item.name}-${i}`"
            :title="item.name"
            @click="handleClick(item)"
          />
        </at-list>
      </view>
    </scroll-view>

    <!-- toast message -->
    <at-toast
      :is-opened="showToast"
      :text="tipText"
      :duration="1000"
      :style="toastStyle"
    />
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import {
  defineComponent,
  computed,
  ref,
  watch,
  toRefs,
  reactive,
  nextTick,
  onMounted,
  onBeforeMount,
  PropType
} from "vue"

import {
  delayQuerySelector,
  pxTransform,
} from "@taro-ui-vue3/utils"

import {
  BaseEventOrig,
  ITouchEvent
} from '@tarojs/components/types/common'

import {
  AtIndexesProps,
  AtIndexesState,
  Item,
  ListItem
} from "@taro-ui-vue3/types/indexes"

import AtList from "../list/index.vue"
import AtListItem from "../list/item/index.vue"
import AtToast from '../toast/index.vue'
import { ScrollViewProps } from 'node_modules/@tarojs/components/types/ScrollView'

const AtIndexes = defineComponent({
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
    showToast: {
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
    const currentIndex = ref(0)  // Set intital active style at 0
    const timeoutTimer = ref<NodeJS.Timeout | number | null>(null)

    const state = reactive<AtIndexesState>({
      scrollIntoView: '',
      scrollTop: 0,
      tipText: '',
      showToast: false,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const toastStyle = computed(() => ({
      minWidth: pxTransform(100)
    }))

    const genActiveIndexStyle = computed(() => (i: number) => {
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

    function handleTouchmove(e: ITouchEvent) {
      e.stopPropagation()
      e.preventDefault()

      const pageY = e.touches[0].pageY
      const index = Math.floor((pageY - startTop.value) / itemHeight.value)
      if (
        index >= 0 &&
        index <= props.list.length &&
        currentIndex.value !== index
      ) {
        currentIndex.value = index
        const key = index > 0 ? props.list[index - 1].key : 'top'
        const touchView = `at-indexes__list-${key}`
        jumpTarget(touchView, index)
      }
    }

    function jumpTarget(scrollIntoView: string, idx: number) {
      currentIndex.value = idx

      updateState({
        scrollIntoView,
        scrollTop: scrollItemHeights.value[idx],
        tipText: idx === 0 ? props.topKey : props.list[idx - 1].key
      })
    }

    function __jumpTarget(key: string) {
      const index = props.list.findIndex(item => item.key === key)
      const targetView = `at-indexes__list-${key}`
      jumpTarget(targetView, index + 1)
    }

    function updateState(stateValue: Partial<AtIndexesState>) {
      const { scrollIntoView, tipText, scrollTop } = stateValue

      state.tipText = tipText!
      state.scrollTop = scrollTop!
      state.showToast = props.showToast!
      state.scrollIntoView = scrollIntoView!

      nextTick(() => {
        clearTimeout(timeoutTimer.value as number)

        timeoutTimer.value = setTimeout(() => {
          state.tipText = ''
          state.showToast = false
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
          itemHeight.value = Math.floor(menuHeight.value / (len + 1))
        })
      }
    }

    function _getHeight(selector: string, delay = 500): Promise<number> {
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

    function handleScroll(e: BaseEventOrig<ScrollViewProps.onScrollDetail>) {
      if (e && e.detail) {
        state.scrollIntoView = ''

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
      ...toRefs(props),
      ...toRefs(state),
      toastStyle,
      jumpTarget,
      handleClick,
      handleScroll,
      handleTouchmove,
      genActiveIndexStyle
    }
  }
})

export default AtIndexes
</script>