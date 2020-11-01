<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <!-- toast message -->
    <at-toast
      :is-opened="_isShowToast"
      :text="_tipText"
      :duration="2000"
      :custom-style="toastStyle"
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
        @tap="jumpTarget('at-indexes__top', 0)"
      >{{ topKey }}</view>

      <!-- menu list -->
      <view
        class="at-indexes__menu-item"
        v-for="(dataList, i) in list"
        :key="dataList.key"
        @tap="jumpTarget(`at-indexes__list-${dataList.key}`, i + 1)"
      >{{ dataList.key }}</view>
    </view>

    <!-- scroll view -->
    <scroll-view
      class="at-indexes__body"
      :id="listId"
      :scroll-y="true"
      :scroll-top="isWEB ? _scrollTop : undefined"
      :scrill-into-view="isWEB ? _scrollIntoView : ''"
      :scroll-with-animation="animation"
      @scroll="handleScroll"
    >
      <!-- slot content -->
      <view
        class="at-indexes__content"
        id="at-indexes__top"
      >
        <slot />
      </view>

      <!-- indexes list -->
      <view
        v-for="dataList in list"
        :key="dataList.key"
        class="at-indexes__list"
        :id="`at-indexes__list-${dataList.key}`"
      >
        <view class="at-indexes__list-title">{{ dataList.title }}</view>
        <at-list>
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
import { defineComponent, computed, ref, reactive, nextTick, watch, onMounted, onBeforeMount, toRefs, PropType } from "../../api"

import {
  delayQuerySelector,
  isTest,
  pxTransform,
  uuid
} from "../../utils/common";

import Taro from '@tarojs/taro'

import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtIndexesProps, AtIndexesState, Item } from 'types/indexes'

import AtList from '../list/index.vue'
import AtListItem from '../list/item/index.vue'
import AtToast from '../toast/index.vue'


const ENV = Taro.getEnv()

export default defineComponent({
  name: "AtIndexes",


  props: {
    // 参数
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
      default: 'Top' as AtIndexesProps['topKey']
    },
    list: {
      type: Array as PropType<AtIndexesProps['list']>,
      default: () => []
    },
    // 事件
    onClick: Function as PropType<AtIndexesProps['onClick']>,
    onScrollIntoView: Function as unknown as () => AtIndexesProps['onScrollIntoView']
  },

  setup(props: AtIndexesProps, { slots }) {
    const menuHeight = ref(0)
    const startTop = ref(0)
    const itemHeight = ref(0)
    const currentIndex = ref(-1)
    const listId = ref(isTest() ? 'indexes-list-AOTU2018' : `list-${uuid()}`)
    // @ts-ignore
    const timeoutTimer = ref<NodeJS.Timeout | number | null>(null)
    const listRef = ref<any>(null)

    const state = reactive<AtIndexesState>({
      _scrollIntoView: '',
      _scrollTop: 0,
      _tipText: '',
      _isShowToast: false,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const rootClasses = computed(() => ({
      'at-indexes': true,
      [props.className]: true,
    }))

    const toastStyle = computed(() => ({
      minWidth: pxTransform(100)
    }))

    watch(() => props.list, (list, prevList) => {
      if (list.length !== prevList.length) {
        initData()
      }
    })

    function handleClick(item: Item) {
      props.onClick && props.onClick(item)
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
      currentIndex.value = -1
    }

    function jumpTarget(_scrollIntoView: string, idx: number) {
      const _tipText = idx === 0 ? props.topKey : props.list[idx - 1].key

      if (ENV === Taro.ENV_TYPE.WEB) {
        delayQuerySelector(this, '.at-indexes', 0).then(rect => {
          const targetOffsetTop = listRef.value.childNodes[idx].offsetTop
          // @ts-ignore
          const _scrollTop = targetOffsetTop - rect[0].top
          updateState({
            _scrollTop,
            _scrollIntoView,
            _tipText
          })
        })
        return
      }
      updateState({
        _scrollIntoView,
        _tipText
      })
    }

    function __jumpTarget(key: string) {
      const index = props.list.findIndex(item => item.key === key)
      const targetView = `at-indexes__list-${key}`
      jumpTarget(targetView, index + 1)
    }

    function updateState(stateValue: Partial<AtIndexesState>) {
      const { _scrollIntoView, _tipText, _scrollTop } = stateValue
      Object.assign(state, {
        _scrollIntoView: _scrollIntoView!,
        _tipText: _tipText!,
        _scrollTop: _scrollTop!,
        _isShowToast: props.isShowToast!
      })
      nextTick(() => {
        clearTimeout(timeoutTimer.value as number)
        timeoutTimer.value = setTimeout(() => {
          Object.assign(state, {
            _tipText: '',
            _isShowToast: false
          })
        }, 3000)
      })

      if (props.isVibrate) {
        Taro.vibrateShort()
      }
    }

    function initData() {
      delayQuerySelector(this, '.at-indexes__menu').then(rect => {
        const len = props.list.length
        // @ts-ignore
        menuHeight.value = rect[0].height
        // @ts-ignore
        startTop.value = rect[0].top
        itemHeight.value = Math.floor(menuHeight.value / (len + 1))
      })
    }

    function handleScroll(e: CommonEvent) {
      if (e && e.detail) {
        state._scrollTop = e.detail.scrollTop
      }
    }

    onMounted(() => {
      if (ENV === Taro.ENV_TYPE.WEB) {
        listRef.value = document.getElementById(listId.value)
      }
      initData()
    })

    onBeforeMount(() => {
      props.onScrollIntoView && props.onScrollIntoView(__jumpTarget.bind(this))
    })

    return {
      ...toRefs(state),
      ...toRefs(props),
      listId,
      rootClasses,
      toastStyle,
      jumpTarget,
      handleClick,
      handleScroll,
      handleTouchEnd,
      handleTouchMove,
    }
  }
})
</script>

