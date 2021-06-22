<template>
  <view>
    <view
      v-if="'header' in $slots"
      class="at-virtual-scroll__header"
    >
      <slot name="header" />
    </view>

    <scroll-view
      class="at-virtual-scroll"
      v-bind="anchor"
      :ref="el => elRef = el"
      :style="dimensions.style"
      :scroll-y="true"
      :scroll-with-animation="true"
      :upper-threshold="parseInt(`${reachTopThreshold}`, 10)"
      :lower-threshold="parseInt(`${reachBottomThreshold}`, 10)"
      @scroll="handleScroll"
      @scrolltoupper="$emit('reach-top', $event)"
      @scrolltolower="$emit('reach-bottom', $event)"
    >
      <view>
        <view
          class="at-virtual-scroll__container"
          :style="scrollContainerStyle"
        >
          <view
            v-for="(item, index) in items.slice(firstToRender, lastToRender)"
            class="at-virtual-scroll__item"
            :key="firstToRender + index"
            :id="`item-${firstToRender + index}`"
            :style="genScrollItemStyle(index)"
          >
            <slot
              :index="firstToRender + index"
              :item="item"
            />
          </view>
        </view>

        <view
          v-if="'footer' in $slots"
          class="at-virtual-scroll__footer"
        >
          <slot name="footer" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
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
import { convertToUnit } from "@taro-ui-vue3/utils"
import { dimensionsFactory } from "@taro-ui-vue3/composables"

// types
import { ScrollViewProps } from "@tarojs/components/types/ScrollView"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { AtVirtualScrollProps } from "@taro-ui-vue3/types/virtual-scroll"

const { useDimensions, makeDimensionsProps } = dimensionsFactory()

const AtVirtualScroll = defineComponent({
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
    scrollToItem: [Number, String] as PropType<AtVirtualScrollProps['scrollToItem']>,
    reachTopThreshold: {
      type: [Number, String] as PropType<AtVirtualScrollProps['reachTopThreshold']>,
      default: 50
    },
    reachBottomThreshold: {
      type: [Number, String] as PropType<AtVirtualScrollProps['reachBottomThreshold']>,
      default: 50
    }
  },

  setup(props: AtVirtualScrollProps) {
    const first = ref(0)
    const last = ref(0)
    const scrollTop = ref(0)
    const elRef = ref<any>(null)

    const anchor = computed(() => (process.env.TARO_ENV === 'h5'
      ? { scrollTop: scrollTop.value }
      : { scrollIntoView: `item-${props.scrollToItem || 0}` }
    ))

    const __bench = computed<number>(() => {
      return parseInt(`${props.bench}`, 10)
    })

    const item_height = computed<number>(() => {
      return parseInt(`${props.itemHeight}`, 10)
    })

    const firstToRender = computed<number>(() => {
      return Math.max(0, first.value - __bench.value)
    })

    const lastToRender = computed<number>(() => {
      return Math.min(props.items.length, last.value + __bench.value)
    })

    const scrollContainerStyle = computed(() => ({
      height: convertToUnit(props.items.length * item_height.value)
    }))

    const genScrollItemStyle = computed(() => (i: number) => ({
      top: convertToUnit((i + firstToRender.value) * item_height.value)
    }))

    const { dimensions } = useDimensions(props)

    watch(() => props.height, updateFirstAndLast)
    watch(() => props.itemHeight, updateFirstAndLast)
    watch(() => props.scrollToItem, (index, _prevIndex) => {
      let parsedIndex = parseInt(`${index || 0}`, 10)

      // make sure index is within length of items
      parsedIndex = Math.min(props.items.length - 1, Math.max(0, parsedIndex))

      scrollTop.value = parsedIndex * item_height.value
      updateFirstAndLast()
    })

    onMounted(() => {
      if (typeof props.scrollToItem !== 'undefined') {
        let parsedIndex = parseInt(`${props.scrollToItem}`, 10)
        scrollTop.value = parsedIndex * item_height.value
        updateFirstAndLast()
      } else {
        last.value = getLast(0)
      }
    })

    function getFirst(): number {
      return Math.floor(scrollTop.value / item_height.value)
    }

    function getLast(first: number): number {
      const height = parseInt(`${props.height}`, 10) || elRef.value.$el.clientHeight

      return first + Math.ceil(height / item_height.value)
    }

    function updateFirstAndLast() {
      first.value = getFirst()
      last.value = getLast(first.value)
    }

    function handleScroll(e: BaseEventOrig<ScrollViewProps.onScrollDetail>) {
      scrollTop.value = process.env.TARO_ENV === 'h5'
        ? elRef.value.$el.scrollTop
        : e.detail.scrollTop
      updateFirstAndLast()
    }

    return {
      ...toRefs(props),
      anchor,
      elRef,
      scrollTop,
      dimensions,
      item_height,
      lastToRender,
      firstToRender,
      genScrollItemStyle,
      scrollContainerStyle,
      handleScroll
    }
  },
})

export default AtVirtualScroll
</script>