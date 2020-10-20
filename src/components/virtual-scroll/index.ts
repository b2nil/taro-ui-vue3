import "./index.scss"

import { h, defineComponent, computed, ref, PropType, watch, onMounted } from "vue"
import { ScrollView, View } from "@tarojs/components"
import { AtVirtualScrollProps } from "types/virtual-scroll"
import Taro from "@tarojs/taro"


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

    function handleScroll(e) {
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

      return h(ScrollView, {
        scrollY: true,
        scrollwithAnimation: true,
        class: 'at-virtual-scroll',
        style: measurableStyles.value,
        ref: (e) => { elRef.value = e },
        onScroll: (e) => handleScroll(e)
      }, { default: () => [content] })
    }
  }
})

export default AtVirtualScroll