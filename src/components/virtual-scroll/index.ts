import { h, defineComponent, computed, ref, PropType, watch, onMounted, warn, mergeProps } from "vue"
import Taro from "@tarojs/taro"
import { ScrollView, View } from "@tarojs/components"

// types
import { ScrollViewProps } from "@tarojs/components/types/ScrollView"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { AtVirtualScrollProps } from "types/virtual-scroll"


function convertToUnit(str: string | number | null | undefined, unit = 'px'): string | undefined {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str!)) {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

const AtVirtualScroll = defineComponent({
  name: "AtVirtualScroll",

  props: {
    bench: {
      type: [Number, String] as PropType<AtVirtualScrollProps['bench']>,
      default: 0,
    },
    viewport: {
      type: [Number, String] as PropType<AtVirtualScrollProps['viewport']>,
      default: 5,
    },
    itemHeight: {
      type: [Number, String] as PropType<AtVirtualScrollProps['itemHeight']>,
      required: true,
    },
    items: {
      type: Array as PropType<AtVirtualScrollProps['items']>,
      default: () => [],
    },
    height: [Number, String] as PropType<AtVirtualScrollProps['height']>,
    maxHeight: [Number, String] as PropType<AtVirtualScrollProps['maxHeight']>,
    maxWidth: [Number, String] as PropType<AtVirtualScrollProps['maxWidth']>,
    minHeight: [Number, String] as PropType<AtVirtualScrollProps['minHeight']>,
    minWidth: [Number, String] as PropType<AtVirtualScrollProps['minWidth']>,
    width: [Number, String] as PropType<AtVirtualScrollProps['width']>,
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
    onReachBottom: Function as PropType<AtVirtualScrollProps['onReachBottom']>,
  },

  setup(props: AtVirtualScrollProps, { slots }) {
    const first = ref(0)
    const last = ref(0)
    const scrollTop = ref(0)
    const elRef = ref<any>(null)
    const isWeb = ref(Taro.getEnv() === Taro.ENV_TYPE.WEB)

    const __bench = computed<number>(() => {
      return parseInt(`${props.bench}`, 10)
    })

    const __viewport = computed<number>(() => {
      return parseInt(`${props.viewport}`, 10) - 1
    })

    const __itemHeight = computed<number>(() => {
      return parseInt(`${props.itemHeight}`, 10)
    })

    const firstToRender = computed<number>(() => {
      return Math.max(0, first.value - __bench.value)
    })

    const lastToRender = computed<number>(() => {
      return Math.min(props.items.length, last.value + __viewport.value + __bench.value)
    })

    const measurableStyles = computed<Record<string, string>>(() => {
      const styles: Record<string, string> = {}

      const height = convertToUnit(props.height)
      const minHeight = convertToUnit(props.minHeight)
      const minWidth = convertToUnit(props.minWidth)
      const maxHeight = convertToUnit(props.maxHeight)
      const maxWidth = convertToUnit(props.maxWidth)
      const width = convertToUnit(props.width)

      if (height) styles.height = height
      if (minHeight) styles.minHeight = minHeight
      if (minWidth) styles.minWidth = minWidth
      if (maxHeight) styles.maxHeight = maxHeight
      if (maxWidth) styles.maxWidth = maxWidth
      if (width) styles.width = width

      return styles
    })

    watch(() => props.height, updateFirstAndLast)
    watch(() => props.itemHeight, updateFirstAndLast)
    watch(() => props.scrollIntoItem, (index, prevIndex) => {
      const parsedIndex = parseInt(`${index}`, 10)
      if (parsedIndex >= 0 && parsedIndex < props.items.length) {
        scrollTop.value = parsedIndex * __itemHeight.value
        updateFirstAndLast()
      } else {
        warn(`index should not exceed the length of items: ${index}`)
      }
    })

    onMounted(() => {
      last.value = getLast(0)
    })

    function getChildren() {
      return props.items.slice(
        firstToRender.value,
        lastToRender.value,
      ).map(genChild)
    }

    function genChild(item: any, index: number) {
      index += firstToRender.value

      const top = convertToUnit(index * __itemHeight.value)

      return h(View, {
        key: index,
        id: `item-${index}`,
        class: 'at-virtual-scroll__item',
        style: { top },
      }, { default: () => slots.default && slots.default({ index, item }) })
    }

    function getFirst(): number {
      return Math.floor(scrollTop.value / __itemHeight.value)
    }

    function getLast(first: number): number {
      const height = parseInt(`${props.height || 0, 10}`) || elRef.value.$el.clientHeight

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

    return () => {
      const content = h(View, {
        class: 'at-virtual-scroll__container',
        style: {
          height: convertToUnit((props.items.length * __itemHeight.value)),
        }
      }, { default: () => getChildren() })

      return h(ScrollView, mergeProps(
        isWeb.value
          ? {
            scrollTop: scrollTop.value
          }
          : {
            scrollIntoView: `item-${props.scrollIntoItem}`
          },
        {
          scrollY: true,
          scrollwithAnimation: true,
          class: 'at-virtual-scroll',
          style: measurableStyles.value,
          upperThreshold: parseInt(`${props.reachTopThreshold}`, 10),
          lowerThreshold: parseInt(`${props.reachBottomThreshold}`, 10),
          ref: (e) => { elRef.value = e },
          onScroll: handleScroll,
          onScrollToUpper: props.onReachTop,
          onScrollToLower: props.onReachBottom,
        }), { default: () => [content] })
    }
  }
})

export default AtVirtualScroll