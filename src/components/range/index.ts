import { h, defineComponent, reactive, ref, watch, onMounted, computed, } from 'vue'
import classNames from 'classnames'
import { View } from '@/utils/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtRangeProps, AtRangeState } from 'types/range'
import {
    delayQuerySelector,
    getEventDetail,
    mergeStyle
} from '@/utils/common'
import AtComponentWithDefaultProps from '../mixins'
import { nextTick } from '@tarojs/taro'

const AtRange = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        sliderStyle: {
            type: [Object, String] as unknown as () => AtRangeProps['sliderStyle'],
            default: ''
        },
        railStyle: {
            type: [Object, String] as unknown as () => AtRangeProps['railStyle'],
            default: ''
        },
        trackStyle: {
            type: [Object, String] as unknown as () => AtRangeProps['trackStyle'],
            default: ''
        },
        value: {
            type: Array as unknown as () => AtRangeProps['value'],
            default: [0, 0] as AtRangeProps['value']
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        blockSize: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        },
        onChange: Function as unknown as () => AtRangeProps['onChange'],
        onAfterChange: Function as unknown as () => AtRangeProps['onAfterChange'],
    },

    setup(props: AtRangeProps, { slots }) {

        const width = ref<number>(0)
        const left = ref<number>(0)
        const deltaValue = ref<number>(props.max! - props.min!)
        const currentSlider = ref<string>('')

        const state = reactive<AtRangeState>({
            aX: 0,
            bX: 0
        })

        function handleClick(event: CommonEvent) {
            if (currentSlider.value && !props.disabled) {
                let sliderValue = 0
                const detail = getEventDetail(event)
                sliderValue = detail.x - left.value
                setSliderValue(currentSlider.value, sliderValue, 'onChange')
            }
        }

        function handleTouchMove(sliderName: string, event: ITouchEvent): void {
            if (props.disabled) return
            event.stopPropagation()

            const clientX = event.touches[0].clientX
            setSliderValue(sliderName, clientX - left.value, 'onChange')
        }

        function handleTouchEnd(sliderName: string): void {
            if (props.disabled) return

            currentSlider.value = sliderName
            triggerEvent('onAfterChange')
        }

        function setSliderValue(
            sliderName: string,
            targetValue: number,
            funcName: string
        ): void {
            const distance = Math.min(Math.max(targetValue, 0), width.value)
            const sliderValue = Math.floor((distance / width.value) * 100)
            if (funcName) {
                state[sliderName] = sliderValue
                nextTick(() => triggerEvent(funcName))
            } else {
                state[sliderName] = sliderValue
            }
        }

        function setValue(value: number[]): void {
            const aX = Math.round(((value[0] - props.min!) / deltaValue.value) * 100) // fix issue #670
            const bX = Math.round(((value[1] - props.min!) / deltaValue.value) * 100) // fix issue #670
            state.aX = aX
            state.bX = bX
        }

        function triggerEvent(funcName: string): void {
            const { aX, bX } = state
            const a = Math.round((aX / 100) * deltaValue.value) + props.min! // fix issue #670
            const b = Math.round((bX / 100) * deltaValue.value) + props.min! // fix issue #670
            const result = [a, b].sort((x, y) => x - y) as [number, number]

            if (funcName === 'onChange') {
                props.onChange && props.onChange(result)
            } else if (funcName === 'onAfterChange') {
                props.onAfterChange && props.onAfterChange(result)
            }
        }

        function updatePos(): void {
            delayQuerySelector(this, '.at-range__container', 10).then(rect => {
                width.value = Math.round(rect[0].width)
                left.value = Math.round(rect[0].left)
            })
        }

        watch(() => props.value, (value, oldValue) => {
            updatePos()
            if (
                oldValue![0] !== value![0] ||
                oldValue![1] !== value![1]
            ) {
                setValue(value!)
            }
        })

        onMounted(() => {
            updatePos()
            setValue(props.value!)
        })

        return () => {
            const rootClass = computed(() => classNames(
                'at-range',
                {
                    'at-range--disabled': props.disabled
                },
                props.className
            ))

            const { aX, bX } = state

            const sliderCommonStyle = computed(() => ({
                width: props.blockSize ? `${props.blockSize}PX` : '',
                height: props.blockSize ? `${props.blockSize}PX` : '',
                marginLeft: props.blockSize ? `${-props.blockSize / 2}PX` : ''
            }))

            const sliderAStyle = computed(() => ({
                ...sliderCommonStyle.value,
                left: `${aX}%`,
                top: '0%'
            }))

            const sliderBStyle = computed(() => ({
                ...sliderCommonStyle.value,
                left: `${bX}%`,
                top: '0%'
            }))

            const containerStyle = computed(() => ({
                height: props.blockSize ? `${props.blockSize}PX` : ''
            }))

            const atTrackStyle = computed(() => ({
                left: `${Math.min(aX, bX)}%`,
                width: `${Math.abs(aX - bX)}%`
            }))

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle,
                    onTap: handleClick
                }, {
                    default: () => [
                        h(View, {
                            class: 'at-range__container',
                            style: containerStyle.value
                        }, {
                            default: () => [
                                h(View, {
                                    class: 'at-range__rail',
                                    style: props.railStyle
                                }, {
                                    default: () => [
                                        h(View, {
                                            class: 'at-range__track',
                                            style: mergeStyle(atTrackStyle.value, props.trackStyle!)
                                        }),
                                        h(View, {
                                            class: 'at-range__slider',
                                            style: mergeStyle(sliderAStyle.value, props.sliderStyle!),
                                            onTouchMove: handleTouchMove.bind(this, 'aX'),
                                            onTouchEnd: handleTouchEnd.bind(this, 'aX'),
                                        }),
                                        h(View, {
                                            class: 'at-range__slider',
                                            style: mergeStyle(sliderBStyle.value, props.sliderStyle!),
                                            onTouchMove: handleTouchMove.bind(this, 'bX'),
                                            onTouchEnd: handleTouchEnd.bind(this, 'bX'),
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            )
        }
    }
})

export default AtRange

