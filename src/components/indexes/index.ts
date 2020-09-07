import { h, defineComponent, computed, ref, reactive, nextTick, watch, onMounted, onBeforeMount } from "vue"
import {
    delayQuerySelector,
    isTest,
    pxTransform,
    uuid
} from "@/utils/common";

import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtIndexesProps, AtIndexesState, Item } from 'types/indexes'

import AtList from '../list'
import AtListItem from '../list/item'
import AtToast from '../toast'
import AtComponentWithDefaultProps from '../mixins'

const ENV = Taro.getEnv()

const AtIndexes = defineComponent({
    mixins: [AtComponentWithDefaultProps],

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

    setup(props: AtIndexesProps, { slots }) {
        const menuHeight = ref(0)
        const startTop = ref(0)
        const itemHeight = ref(0)
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

        watch(() => props.list, (list, prevList) => {
            if (list.length !== prevList.length) {
                initData()
            }
        })

        const toastStyle = computed(() => ({
            minWidth: pxTransform(100)
        }))

        const rootClass = computed(() => ({
            'at-indexes': true,
            [`${props.className}`]: true
        }))

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

        function initData() {
            delayQuerySelector(this, '.at-indexes__menu', 30).then(rect => {
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
            props.onScrollIntoView && props.onScrollIntoView(__jumpTarget)
        })

        const menuList = props.list.map((dataList, i) => {
            const { key } = dataList
            const targetView = `at-indexes__list-${key}`
            return (
                h(View, {
                    class: 'at-indexes__menu-item',
                    key: key,
                    onTap: jumpTarget.bind(this, targetView, i + 1)
                }, key)
            )
        })

        const indexesList = props.list.map(dataList => {
            return (
                h(View, {
                    id: `at-indexes__list-${dataList.key}`,
                    class: 'at-indexes__list',
                    key: dataList.key
                }, [
                    h(View, { class: 'at-indexes__list-title' }, dataList.title),
                    h(AtList, null, {
                        default: () => dataList.items && dataList.items.map(item => {
                            return h(AtListItem, {
                                key: item.name,
                                title: item.name,
                                onClick: handleClick.bind(this, item)
                            })
                        })
                    })
                ])
            )
        })

        return () => (
            h(View, {
                class: rootClass.value,
                style: props.customStyle
            }, [
                h(AtToast, {
                    isOpened: state._isShowToast,
                    text: state._tipText,
                    duration: 2000,
                    customStyle: toastStyle.value
                }),
                h(View, {
                    class: 'at-indexes__menu',
                    onTouchMove: handleTouchMove,
                    onTouchEnd: handleTouchEnd
                }, [
                    h(View, {
                        class: 'at-indexes__menu-item',
                        onTap: jumpTarget.bind(this, 'at-indexes__top', 0)
                    }, props.topKey),
                    ...menuList
                ]),
                h(ScrollView, {
                    class: 'at-indexes__body',
                    id: listId.value,
                    scrollY: true,
                    scrollWithAnimation: props.animation,
                    scrollTop: state.isWEB ? state._scrollTop : undefined,
                    scrollIntoView: !state.isWEB ? state._scrollIntoView : '',
                    onScroll: handleScroll
                }, [
                    h(View, {
                        class: 'at-indexes__content',
                        id: 'at-indexes__top'
                    }, slots.default && slots.default()),
                    ...indexesList
                ])
            ])
        )
    }
})

export default AtIndexes