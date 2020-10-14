import { h, defineComponent, reactive, ref, watch, onMounted, onUnmounted, CSSProperties, computed, mergeProps, PropType } from 'vue'
import { ScrollView, View, Text } from '@tarojs/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtTabsProps, AtTabsState } from 'types/tabs'
import { isTest, uuid } from '@/utils/common'

const ENV = Taro.getEnv()
const MIN_DISTANCE = 100
const MAX_INTERVAL = 10

const AtTabs = defineComponent({
  name: "AtTabs",

  props: {
    tabDirection: {
      type: String as PropType<AtTabsProps['tabDirection']>,
      default: 'horizontal'
    },
    height: {
      type: String,
      default: ''
    },
    current: {
      type: Number,
      default: 0,
      required: true
    },
    scroll: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    swipeable: {
      type: Boolean,
      default: true
    },
    tabList: {
      type: Array as PropType<AtTabsProps['tabList']>,
      default: [],
      required: true
    },
    onClick: {
      type: Function as PropType<AtTabsProps['onClick']>,
      default: () => (index: number, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtTabsProps, { attrs, slots }) {

    const _tabId = ref<string>(isTest() ? 'tabs-AOTU2018' : uuid())
    // 触摸时的原点
    const _touchDot = ref<number>(0)
    // 定时器
    const _timer = ref<NodeJS.Timeout | null>(null)
    // 滑动时间间隔
    const _interval = ref<number>(0)
    // 是否已经在滑动
    const _isMoving = ref<boolean>(false)
    const tabHeaderRef = ref<any>(null)

    const state = reactive<AtTabsState>({
      _scrollLeft: 0,
      _scrollTop: 0,
      _scrollIntoView: ''
    })

    const scrollX = computed(() => props.tabDirection === 'horizontal')
    const scrollY = computed(() => props.tabDirection === 'vertical')

    const rootClass = computed(() => ({
      'at-tabs': true,
      'at-tabs--scroll': props.scroll,
      [`at-tabs--${props.tabDirection}`]: true,
      [`at-tabs--${ENV}`]: true
    }))

    const heightStyle = computed(() => ({ height: props.height }))

    const underlineStyle = computed(() => ({
      height: props.tabDirection === 'vertical' ? `${props.tabList.length * 100}%` : '1PX',
      width: props.tabDirection === 'horizontal' ? `${props.tabList.length * 100}%` : '1PX'
    }))

    const bodyStyle = computed(() => {
      const bodyStyle: CSSProperties = {
        ...heightStyle.value
      }
      let transformStyle = `translate3d(0px, -${props.current * 100}%, 0px)`

      if (props.tabDirection === 'horizontal') {
        transformStyle = `translate3d(-${props.current * 100}%, 0px, 0px)`
      }

      Object.assign(bodyStyle, {
        transform: transformStyle,
        '-webkit-transform': transformStyle
      })

      if (!props.animated) {
        bodyStyle.transition = 'unset'
      }
      return bodyStyle
    })

    const tabItemClass = computed(() => (idx: number) => ({
      'at-tabs__item': true,
      'at-tabs__item--active': props.current === idx
    }))

    function updateState(idx: number): void {
      if (props.scroll) {
        // 标签栏滚动
        switch (ENV) {
          case Taro.ENV_TYPE.WEAPP:
          case Taro.ENV_TYPE.ALIPAY:
          case Taro.ENV_TYPE.TT:
          case Taro.ENV_TYPE.SWAN: {
            const index = Math.max(idx - 1, 0)
            state._scrollIntoView = `tab${_tabId.value}${index}`
            break
          }
          case Taro.ENV_TYPE.WEB: {
            const index = Math.max(idx - 1, 0)
            const prevTabItem = tabHeaderRef.value.childNodes[index]
            if (prevTabItem) {
              state._scrollTop = prevTabItem.offsetTop
              state._scrollLeft = prevTabItem.offsetLeft
            }
            break
          }
          default: {
            console.warn('AtTab 组件在该环境还未适配')
            break
          }
        }
      }
    }

    function handleClick(index: number, event: CommonEvent): void {
      props.onClick(index, event)
    }

    function handleTouchStart(e: ITouchEvent): void {

      if (!props.swipeable || props.tabDirection === 'vertical') return
      // 获取触摸时的原点
      _touchDot.value = e.touches[0].pageX
      // 使用js计时器记录时间
      _timer.value = setInterval(() => {
        _interval.value++
      }, 100)
    }

    function handleTouchMove(e: ITouchEvent): void {
      if (!props.swipeable || props.tabDirection === 'vertical') return

      const touchMove = e.touches[0].pageX
      const moveDistance = touchMove - _touchDot.value
      const maxIndex = props.tabList.length

      if (
        !_isMoving.value &&
        _interval.value < MAX_INTERVAL &&
        _touchDot.value > 20
      ) {
        // 向左滑动
        if (props.current + 1 < maxIndex && moveDistance <= -MIN_DISTANCE) {
          _isMoving.value = true
          handleClick(props.current + 1, e)

          // 向右滑动
        } else if (props.current - 1 >= 0 && moveDistance >= MIN_DISTANCE) {
          _isMoving.value = true
          handleClick(props.current - 1, e)
        }
      }
    }

    function handleTouchEnd(): void {
      if (!props.swipeable || props.tabDirection === 'vertical') return

      clearInterval(_timer.value as NodeJS.Timeout)
      _interval.value = 0
      _isMoving.value = false
    }

    function getTabHeaderRef(): void {
      if (ENV === Taro.ENV_TYPE.WEB) {
        tabHeaderRef.value = document.getElementById(_tabId.value)
      }
    }

    watch(() => [
      props.scroll,
      props.current
    ], (
      [scroll, current]: [boolean, number],
      [preScroll, preCurrent]: [boolean, number]
    ) => {
      if (scroll !== preScroll) {
        getTabHeaderRef()
      }
      if (current !== preCurrent) {
        updateState(current)
      }
    })

    onMounted(() => {
      getTabHeaderRef()
      updateState(props.current)
    })

    onUnmounted(() => {
      tabHeaderRef.value = null
    })

    return () => {

      const tabItems = props.tabList.map((item, idx) => (
        h(View, {
          id: `tab${_tabId.value}${idx}`,
          key: item.title,
          class: tabItemClass.value(idx),
          onTap: handleClick.bind(this, idx)
        }, {
          default: () => [
            h(Text, {
              style: "white-space: nowrap;"
            }, { default: () => item.title }),
            h(View, { class: 'at-tabs__item-underline' }),
          ]
        })
      ))

      return (
        h(View, mergeProps(attrs, {
          class: rootClass.value,
          style: heightStyle.value,
        }), {
          default: () => [
            // scroll view ?
            props.scroll
              ? ( // with scroll view
                h(ScrollView, {
                  id: _tabId.value,
                  class: 'at-tabs__header',
                  style: heightStyle.value,
                  scrollX: scrollX.value,
                  scrollY: scrollY.value,
                  scrollWithAnimation: true,
                  scrollLeft: state._scrollLeft,
                  scrollTop: state._scrollTop,
                  scrollIntoView: state._scrollIntoView,
                }, { default: () => tabItems })
              )
              : ( // or without scroll view
                h(View, {
                  id: _tabId.value,
                  class: 'at-tabs__header'
                }, { default: () => tabItems })
              ),

            // tab body
            h(View, {
              class: 'at-tabs__body',
              style: bodyStyle.value,
              onTouchStart: handleTouchStart,
              onTouchEnd: handleTouchEnd,
              onTouchMove: handleTouchMove,
            }, {
              default: () => [
                h(View, {
                  class: 'at-tabs__underline',
                  style: underlineStyle.value
                }),
                slots.default && slots.default()
              ]
            })
          ]
        })
      )
    }
  }
})

export default AtTabs
