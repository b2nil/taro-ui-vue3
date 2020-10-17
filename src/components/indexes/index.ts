import {
  h,
  defineComponent,
  computed,
  ref,
  reactive,
  nextTick,
  watch,
  onMounted,
  onBeforeMount,
  mergeProps,
  PropType
} from "vue"

import {
  delayQuerySelector,
  pxTransform,
} from "@/utils/common"

import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtIndexesProps, AtIndexesState, Item, ListItem } from 'types/indexes'

import AtList from '../list'
import AtListItem from '../list/item'
import AtToast from '../toast'


const AtIndexes = defineComponent({
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
      default: 'Top'
    },
    list: {
      type: Array as PropType<AtIndexesProps['list']>,
      default: () => []
    },
    // 事件
    onClick: Function as PropType<AtIndexesProps['onClick']>,
    onScrollIntoView: Function as PropType<AtIndexesProps['onScrollIntoView']>
  },

  setup(props: AtIndexesProps, { attrs, slots }) {
    const scrollItemHeights = ref<number[]>([])
    const currentIndex = ref(0)  // Set intital index at 0 so that active style is applied
    const timeoutTimer = ref<NodeJS.Timeout | number | null>(null)

    const state = reactive<AtIndexesState>({
      _scrollIntoView: '',
      _scrollTop: 0,
      _tipText: '',
      _isShowToast: false,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const toastStyle = computed(() => ({
      minWidth: pxTransform(100)
    }))

    const activeIndexStyle = computed(() => (i) => {
      return currentIndex.value === i
        ? {
          color: 'white',
          backgroundColor: 'rgba(97, 144, 232, 1)', // rgba($color: $at-calendar-main-color, $alpha: 0.7)
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
      props.onClick && props.onClick(item)
    }

    function jumpTarget(_scrollIntoView: string, idx: number) {
      currentIndex.value = idx

      updateState({
        _scrollIntoView,
        _scrollTop: scrollItemHeights.value[idx],
        _tipText: idx === 0 ? props.topKey : props.list[idx - 1].key
      })
    }

    function __jumpTarget(key: string) {
      const index = props.list.findIndex(item => item.key === key)
      const targetView = `at-indexes__list-${key}`
      jumpTarget(targetView, index + 1)
    }

    function updateState(stateValue: Partial<AtIndexesState>) {
      const { _scrollIntoView, _tipText, _scrollTop } = stateValue

      state._scrollIntoView = _scrollIntoView!
      state._tipText = _tipText!
      state._scrollTop = _scrollTop!
      state._isShowToast = props.isShowToast!

      nextTick(() => {
        clearTimeout(timeoutTimer.value as number)
        timeoutTimer.value = setTimeout(() => {
          state._tipText = ''
          state._isShowToast = false
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
        state._scrollIntoView = ''

        for (let i = 0; i < scrollItemHeights.value.length - 1; i++) {
          // Use Math.floor to make sure that currentIndex is accurate
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
      props.onScrollIntoView && props.onScrollIntoView(__jumpTarget)
    })

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-indexes',
      }), {
        default: () => [
          h(View, {
            class: 'at-indexes__menu',
          }, {
            default: () => [
              h(View, {
                class: 'at-indexes__menu-item',
                style: activeIndexStyle.value(0),
                onTap: jumpTarget.bind(this, 'at-indexes__top', 0)
              }, { default: () => props.topKey }),

              ...props.list.map((dataList, i) => {
                const { key } = dataList
                const targetView = `at-indexes__list-${key}`
                return (
                  h(View, {
                    key: `${key}-${i}`,
                    class: 'at-indexes__menu-item',
                    style: activeIndexStyle.value(i + 1),
                    onTap: jumpTarget.bind(this, targetView, i + 1)
                  }, { default: () => key })
                )
              })
            ]
          }),

          h(ScrollView, {
            class: 'at-indexes__body',
            scrollY: true,
            enableBackToTop: true,
            scrollWithAnimation: props.animation,
            scrollTop: state._scrollTop,
            scrollIntoView: !state.isWEB ? state._scrollIntoView : '',
            onScroll: (e) => handleScroll(e)
          }, {
            default: () => [
              h(View, {
                id: 'at-indexes__top',
                class: 'at-indexes__content',
              }, { default: () => slots.default && slots.default() }),

              ...props.list.map(dataList => {
                return (
                  h(View, {
                    id: `at-indexes__list-${dataList.key}`,
                    class: 'at-indexes__list',
                    key: dataList.key
                  }, {
                    default: () => [
                      h(View, {
                        class: 'at-indexes__list-title'
                      }, { default: () => dataList.title }),

                      h(AtList, null, {
                        default: () => dataList.items && dataList.items.map(item => (
                          h(AtListItem, {
                            key: item.name,
                            title: item.name,
                            onClick: handleClick.bind(this, item)
                          })
                        ))
                      })
                    ]
                  })
                )
              })
            ]
          }),

          h(AtToast, {
            isOpened: state._isShowToast,
            text: state._tipText,
            duration: 1000,
            style: toastStyle.value
          }),
        ]
      })
    )
  }
})

export default AtIndexes