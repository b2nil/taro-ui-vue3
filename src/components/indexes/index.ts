import { h, defineComponent, computed, ref, reactive, nextTick, watch, onMounted, onBeforeMount, mergeProps } from "vue"
import {
    delayQuerySelector,
    isTest,
    pxTransform,
    uuid
} from "@/utils/common";

import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtIndexesProps, AtIndexesState, Item, ListItem } from 'types/indexes'

import AtList from '../list'
import AtListItem from '../list/item'
import AtToast from '../toast'

const ENV = Taro.getEnv()

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
            type: String as () => AtIndexesProps['topKey'],
            default: 'Top' as AtIndexesProps['topKey']
        },
        list: {
            type: Array as () => AtIndexesProps['list'],
            default: () => []
        },
        // 事件
        onClick: Function as unknown as () => AtIndexesProps['onClick'],
        onScrollIntoView: Function as unknown as () => AtIndexesProps['onScrollIntoView']
    },

    setup(props: AtIndexesProps, { attrs, slots }) {
        const menuHeight = ref(0)
        const startTop = ref(0)
        const itemHeight = ref(0)
        const scrollItemHeights = ref<number[]>([])
        const currentIndex = ref(-1)
        const listId = ref(isTest() ? 'indexes-list-AOTU2018' : `list-${uuid()}`)
        const timeoutTimer = ref<NodeJS.Timeout | number | null>(null)
        const listRef = ref<any>(null)

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
                _scrollTop: scrollItemHeights.value[idx],
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

            state._scrollIntoView = _scrollIntoView!
            state._tipText = _tipText!
            state._scrollTop = _scrollTop!
            state._isShowToast = props.isShowToast!

            nextTick(() => {
                clearTimeout(timeoutTimer.value as number)
                timeoutTimer.value = setTimeout(() => {
                    state._tipText = ''
                    state._isShowToast = false
                }, 3000)
            })

            if (props.isVibrate) {
                Taro.vibrateShort()
            }
        }

        async function initData() {
            await delayQuerySelector(this, '.at-indexes__menu', 30).then(rect => {
                const len = props.list.length
                // @ts-ignore
                menuHeight.value = rect[0].height
                // @ts-ignore
                startTop.value = rect[0].top
                itemHeight.value = Math.floor(menuHeight.value / (len + 1))
            })

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
                // state._scrollTop = e.detail.scrollTop
                state._scrollIntoView = ''

                for (let i = 0; i < scrollItemHeights.value.length - 1; i++) {
                    let h1 = scrollItemHeights.value[i]
                    let h2 = scrollItemHeights.value[i + 1]

                    if (e.detail.scrollTop >= h1 && e.detail.scrollTop < h2) {
                        currentIndex.value = i
                        return
                    }
                }
            }
        }

        onMounted(() => {
            if (ENV === Taro.ENV_TYPE.WEB) {
                listRef.value = document.getElementById(listId.value)
            }
            initData()
        })

        onBeforeMount(() => {
            props.onScrollIntoView && props.onScrollIntoView(__jumpTarget)
        })

        return () => (
            h(View, mergeProps(attrs, {
                class: 'at-indexes',
            }), [
                h(View, {
                    class: 'at-indexes__menu',
                    onTouchMove: (e) => handleTouchMove(e),
                    onTouchEnd: handleTouchEnd.bind(this)
                }, [
                    h(View, {
                        class: 'at-indexes__menu-item',
                        style: activeIndexStyle.value(0),
                        onTap: jumpTarget.bind(this, 'at-indexes__top', 0)
                    }, props.topKey),

                    ...props.list.map((dataList, i) => {
                        const { key } = dataList
                        const targetView = `at-indexes__list-${key}`
                        return (
                            h(View, {
                                key: `${key}-${i}`,
                                class: 'at-indexes__menu-item',
                                style: activeIndexStyle.value(i + 1),
                                onTap: jumpTarget.bind(this, targetView, i + 1)
                            }, key)
                        )
                    })
                ]),

                h(ScrollView, {
                    class: 'at-indexes__body',
                    id: listId.value,
                    scrollY: true,
                    enableBackToTop: true,
                    scrollWithAnimation: props.animation,
                    scrollTop: state._scrollTop,
                    scrollIntoView: !state.isWEB ? state._scrollIntoView : '',
                    onScroll: (e) => handleScroll(e)
                }, [
                    h(View, {
                        id: 'at-indexes__top',
                        class: 'at-indexes__content',
                    }, slots.default && slots.default()),

                    ...props.list.map(dataList => {
                        return (
                            h(View, {
                                id: `at-indexes__list-${dataList.key}`,
                                class: 'at-indexes__list',
                                key: dataList.key
                            }, [
                                h(View, {
                                    class: 'at-indexes__list-title'
                                }, dataList.title),

                                h(AtList, null, {
                                    default: () => dataList.items && dataList.items.map(item => (
                                        h(AtListItem, {
                                            key: item.name,
                                            title: item.name,
                                            onClick: handleClick.bind(this, item)
                                        })
                                    ))
                                })
                            ])
                        )
                    })
                ]),

                h(AtToast, {
                    isOpened: state._isShowToast,
                    text: state._tipText,
                    duration: 2000,
                    style: toastStyle.value
                }),
            ])
        )
    }
})

export default AtIndexes