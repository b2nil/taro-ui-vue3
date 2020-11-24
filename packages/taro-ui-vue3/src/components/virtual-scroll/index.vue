<template>
  <view>
    <view class="at-virtual-scroll__header">
      <slot name="header" />
    </view>

    <scroll-view
      scroll-y
      scroll-with-animation
      class="at-virtual-scroll"
      v-bind="isWeb ? { scrollTop: scrollTop } : { scrollIntoView: `item-${scrollIntoItem}` }"
      :style="dimensions.style"
      :ref="el => elRef = el"
      :upper-threshold="parseInt(`${reachTopThreshold}`, 10)"
      :lower-threshold="parseInt(`${reachBottomThreshold}`, 10)"
      @scroll="handleScroll"
      @scroll-to-upper="$emit('reach-top', $event)"
      @scroll-to-lower="$emit('reach-bottom', $event)"
    >
      <view>
        <view
          class="at-virtual-scroll__container"
          :style="{ height: convertToUnit((items.length * __itemHeight))}"
        >
          <view
            v-for="(item, index) in items.slice(firstToRender, lastToRender)"
            :key="firstToRender + index"
            :id="`item-${firstToRender + index}`"
            class="at-virtual-scroll__item"
            :style="{ top: convertToUnit((firstToRender + index) * __itemHeight)}"
          >
            <slot
              :index="firstToRender + index"
              :item="item"
            />
          </view>
        </view>

        <view class="at-virtual-scroll__footer">
          <slot name="footer" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro"
import {
  defineComponent,
  computed,
  ref,
  toRefs,
  watch,
  onMounted,
  PropType
} from "vue"

// utils
import { convertToUnit } from "@/utils/common"
import { dimensionsFactory } from "@/utils/composables/dimensions"

// types
import { ScrollViewProps } from "@tarojs/components/types/ScrollView"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { AtVirtualScrollProps } from "types/virtual-scroll"

const { useDimensions, makeDimensionsProps } = dimensionsFactory()

export default defineComponent({
  name: "AtVirtualScroll",

  emits: ['reach-top', 'reach-bottom'],

  props: {
    ...makeDimensionsProps(),
    bench: {
      type: [Number, String] as PropType<AtVirtualScrollProps['bench']>,
      default: 0,
    },
    itemHeight: {
      type: [Number, String] as PropType<AtVirtualScrollProps['itemHeight']>,
      required: true,
    },
    items: {
      type: Array as PropType<AtVirtualScrollProps['items']>,
      default: () => [],
    },
    scrollIntoItem: [Number, String] as PropType<AtVirtualScrollProps['scrollIntoItem']>,
    reachTopThreshold: {
      type: [Number, String] as PropType<AtVirtualScrollProps['reachTopThreshold']>,
      default: 50
    },
    reachBottomThreshold: {
      type: [Number, String] as PropType<AtVirtualScrollProps['reachBottomThreshold']>,
      default: 50
    },
    onReachTop: Function as PropType<AtVirtualScrollProps['onReachTop']>,
    onReachBottom: Function as PropType<AtVirtualScrollProps['onReachBottom']>
  },

  setup(props: AtVirtualScrollProps) {
    const first = ref(0)
    const last = ref(0)
    const scrollTop = ref(0)
    const elRef = ref<any>(null)
    const isWeb = ref(Taro.getEnv() === Taro.ENV_TYPE.WEB)

    const __bench = computed<number>(() => {
      return parseInt(`${props.bench}`, 10)
    })

    const __itemHeight = computed<number>(() => {
      return parseInt(`${props.itemHeight}`, 10)
    })

    const firstToRender = computed<number>(() => {
      return Math.max(0, first.value - __bench.value)
    })

    const lastToRender = computed<number>(() => {
      return Math.min(props.items.length, last.value + __bench.value)
    })

    const { dimensions } = useDimensions(props)

    watch(() => props.height, updateFirstAndLast)
    watch(() => props.itemHeight, updateFirstAndLast)
    watch(() => props.scrollIntoItem, (itemIndex, prevItemIndex) => {
      let parsedIndex = parseInt(`${itemIndex || 0}`, 10)

      // make sure index is within length of items
      parsedIndex = Math.min(props.items.length - 1, Math.max(0, parsedIndex))

      scrollTop.value = parsedIndex * __itemHeight.value
      updateFirstAndLast()
    })

    onMounted(() => {
      if (Boolean(props.scrollIntoItem)) {
        let parsedIndex = parseInt(`${props.scrollIntoItem || 0}`, 10)
        scrollTop.value = parsedIndex * __itemHeight.value
        updateFirstAndLast()
      } else {
        last.value = getLast(0)
      }
    })

    function getFirst(): number {
      return Math.floor(scrollTop.value / __itemHeight.value)
    }

    function getLast(first: number): number {
      const height = parseInt(`${props.height || 0}`, 10) || elRef.value.$el.clientHeight

      return first + Math.ceil(height / __itemHeight.value)
    }

    function updateFirstAndLast() {
      first.value = getFirst()
      last.value = getLast(first.value)
    }

    function handleScroll(e: BaseEventOrig<ScrollViewProps.onScrollDetail>) {
      scrollTop.value = isWeb.value
        ? elRef.value.$el.scrollTop
        : e.detail.scrollTop
      updateFirstAndLast()
    }

    return {
      ...toRefs(props),
      isWeb,
      elRef,
      scrollTop,
      __itemHeight,
      dimensions,
      firstToRender,
      lastToRender,
      convertToUnit,
      handleScroll
    }
  },
})
</script>