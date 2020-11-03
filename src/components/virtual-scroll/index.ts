import Taro from "@tarojs/taro"
import {
  h,
  defineComponent,
  computed,
  ref,
  watch,
  onMounted,
  mergeProps,
  PropType
} from "vue"

import {
  ScrollView,
  View
} from "@tarojs/components"

// utils
import { convertToUnit } from "@/utils/common"
import { dimensionsFactory } from "@/composables/dimensions"

// types
import { ScrollViewProps } from "@tarojs/components/types/ScrollView"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { AtVirtualScrollProps } from "types/virtual-scroll"

const { useDimensions, makeDimensionsProps } = dimensionsFactory()

const AtVirtualScroll = defineComponent({
  name: "AtVirtualScroll",

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

    return () => {
      const content = h(View, null, {
        default: () => [
          h(View, {
            class: 'at-virtual-scroll__container',
            style: {
              height: convertToUnit((props.items.length * __itemHeight.value)),
            }
          }, { default: () => getChildren() }),

          h(View, {
            class: 'at-virtual-scroll__footer'
          }, { default: () => slots.footer && slots.footer() }),
        ]
      })


      const scrollViewNode = h(ScrollView, mergeProps(
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
          style: dimensions.value.style,
          upperThreshold: parseInt(`${props.reachTopThreshold}`, 10),
          lowerThreshold: parseInt(`${props.reachBottomThreshold}`, 10),
          ref: (e) => { elRef.value = e },
          onScroll: handleScroll,
          onScrollToUpper: props.onReachTop,
          onScrollToLower: props.onReachBottom,
        }), { default: () => [content] })

      return h(View, null, {
        default: () => [
          h(View, {
            class: 'at-virtual-scroll__header',
          }, { default: () => slots.header && slots.header() }),
          scrollViewNode,
        ]
      })
    }
  }
})

export default AtVirtualScroll