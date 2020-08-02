import { h, defineComponent, ref, reactive, watch, CSSProperties, computed, ComputedRef } from 'vue'
import classNames from 'classnames'
import _inRange from 'lodash/inRange'
import _isEmpty from 'lodash/isEmpty'
import { Text, View } from '@tarojs/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import {
    AtSwipeActionProps,
    AtSwipeActionState,
    SwipeActionOption,
} from 'types/swipe-action'
import {
    delayGetClientRect,
    delayGetScrollOffset,
    uuid
} from '@/utils/common'
import AtSwipeActionOptions from './options/index'

const AtSwipeAction = defineComponent({
    props: {
        isOpened: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        autoClose: { type: Boolean, default: false },
        options: {
            type: Array as () => AtSwipeActionProps['options'],
            default: () => []
        },
        onClick: Function as unknown as () => AtSwipeActionProps['onClick'],
        onOpened: Function as unknown as () => AtSwipeActionProps['onOpened'],
        onClosed: Function as unknown as () => AtSwipeActionProps['onClosed'],
    },

    setup(props: AtSwipeActionProps, { slots }) {

        const endValue = ref<number>(0)
        const startX = ref<number>(0)
        const startY = ref<number>(0)
        const maxOffsetSize = ref<number>(0)
        const isMoving = ref<boolean>(false)
        const isTouching = ref<boolean>(false)
        const domInfo = ref<any>({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        })

        const state = reactive<AtSwipeActionState>({
            componentId: uuid(),
            offsetSize: 0,
            _isOpened: !!props.isOpened
        })

        function getDomInfo(): Promise<void> {
            return Promise.all([
                delayGetClientRect({
                    delayTime: 0,
                    selectorStr: `#swipeAction-${this.state.componentId}`
                }),
                delayGetScrollOffset({ delayTime: 0 })
            ]).then(([rect, scrollOffset]) => {
                rect[0].top += scrollOffset[0].scrollTop
                rect[0].bottom += scrollOffset[0].scrollTop
                domInfo.value = rect[0]
            })
        }

        watch(() => props.isOpened, (isOpened) => {
            if (isOpened !== state._isOpened) {
                _reset(!!isOpened) // TODO: Check behavior
            }
        })

        function _reset(isOpened: boolean): void {
            isMoving.value = false
            isTouching.value = false

            if (isOpened) {
                endValue.value = -this.maxOffsetSize
                state._isOpened = true
                state.offsetSize = -this.maxOffsetSize

            } else {
                endValue.value = 0
                state.offsetSize = 0
                state._isOpened = false
            }
        }

        function computeTransform(value: number): string | null {
            // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
            //   return !_isNil(value) ? `translate3d(${value}px,0,0)` : null
            // }
            return value ? `translate3d(${value}px,0,0)` : null
        }

        function handleOpened(event: CommonEvent): void {
            if (typeof props.onOpened === 'function' && state._isOpened) {
                props.onOpened(event)
            }
        }

        function handleClosed(event: CommonEvent): void {
            if (typeof props.onClosed === 'function' && !state._isOpened) {
                props.onClosed(event)
            }
        }

        function handleTouchStart(e: ITouchEvent): void {
            const { clientX, clientY } = e.touches[0]

            if (props.disabled) return

            getDomInfo()

            startX.value = clientX
            startY.value = clientY
            isTouching.value = true
        }

        function handleTouchMove(e: ITouchEvent): void {
            if (_isEmpty(domInfo.value)) {
                return
            }

            const { top, bottom, left, right } = domInfo.value
            const { clientX, clientY, pageX, pageY } = e.touches[0]

            const x = Math.abs(clientX - startX.value)
            const y = Math.abs(clientY - startY.value)

            const inDom = _inRange(pageX, left, right) && _inRange(pageY, top, bottom)

            if (!isMoving.value && inDom) {
                isMoving.value =
                    y === 0 ||
                    x / y >= Number.parseFloat(Math.tan((45 * Math.PI) / 180).toFixed(2))
            }

            if (isTouching.value && isMoving.value) {
                e.preventDefault()

                const offsetSize = clientX - startX.value
                const isRight = offsetSize > 0

                if (state.offsetSize === 0 && isRight) return

                const value = endValue.value + offsetSize
                state.offsetSize = value >= 0 ? 0 : value
            }
        }

        function handleTouchEnd(event: ITouchEvent): void {
            isTouching.value = false

            const { offsetSize } = state

            endValue.value = offsetSize

            const breakpoint = this.maxOffsetSize / 2
            const absOffsetSize = Math.abs(offsetSize)

            if (absOffsetSize > breakpoint) {
                _reset(true)
                handleOpened(event)
                return
            }

            _reset(false) // TODO: Check behavior
            handleClosed(event)
        }

        function handleDomInfo({ width }: { width: number }): void {
            const { _isOpened } = state

            maxOffsetSize.value = width
            _reset(_isOpened)
        }

        function handleClick(
            item: SwipeActionOption,
            index: number,
            event: CommonEvent
        ): void {
            if (typeof props.onClick === 'function') {
                props.onClick(item, index, event)
            }
            if (props.autoClose) {
                _reset(false) // TODO: Check behavior
                handleClosed(event)
            }
        }

        return () => {
            const { offsetSize, componentId } = state
            const rootClass = computed(() => classNames('at-swipe-action', props.className))
            const transform = computed(() => computeTransform(offsetSize))

            const transformStyle: ComputedRef<CSSProperties> = computed(() => transform
                ? { transform: transform.value! }
                : {} as CSSProperties
            )

            const actionContentClass = computed(() => classNames('at-swipe-action__content', {
                animtion: !isTouching.value
            }))

            return (
                h(View, {
                    id: `swipeAction-${componentId}`,
                    class: rootClass.value,
                    onTouchMove: handleTouchMove,
                    onTouchEnd: handleTouchEnd,
                    onTouchStart: handleTouchStart
                }, {
                    default: () => [
                        // action content
                        h(View, {
                            class: actionContentClass.value,
                            style: transformStyle.value
                        }, slots.default && slots.default()),
                        // action options
                        Array.isArray(props.options) && props.options.length > 0
                            ? (
                                h(AtSwipeActionOptions, {
                                    options: props.options,
                                    componentId: componentId,
                                    onQueryedDom: handleDomInfo,
                                }, {
                                    default: () =>
                                        props.options!.map((item, key) => (
                                            h(View, {
                                                key: `${item.text}-${key}`,
                                                style: item.style,
                                                onClick: (e) => handleClick(item, key, e),
                                                class: classNames('at-swipe-action__option', item.className)
                                            }, {
                                                defualt: () => [
                                                    h(Text, { class: 'option__text' }, item.text)
                                                ]
                                            })
                                        ))
                                })
                            )
                            : null,
                    ]
                })
            )
        }
    }
})

export default AtSwipeAction