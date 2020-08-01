import { h, defineComponent, reactive, onMounted, watchEffect, Ref, toRefs, computed } from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtNoticeBarProps } from 'types/noticebar'

const AtNoticebar = defineComponent({

    props: {
        close: { type: Boolean, default: false },
        single: Boolean,
        marquee: Boolean,
        speed: {
            type: Number as () => AtNoticeBarProps['speed'],
            default: 100
        },
        moreText: {
            type: String,
            default: '查看详情'
        },
        showMore: { type: Boolean, default: false },
        icon: String as () => AtNoticeBarProps['icon'],
        // events
        onClose: Function as unknown as () => AtNoticeBarProps['onClose'],
        onGotoMore: Function as unknown as () => AtNoticeBarProps['onGotoMore']
    },

    setup(props: AtNoticeBarProps, { slots }) {

        let timeout: Ref<NodeJS.Timeout | null>
        let interval: Ref<NodeJS.Timer>

        const state = reactive({
            show: true,
            animElemId: `J_${Math.ceil(Math.random() * 10e5).toString(36)}`,
            animationData: {
                actions: [{}]
            },
            dura: 15,
            isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
            isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
        })

        function handleClose(event: CommonEvent): void {
            state.show = false
            props.onClose && props.onClose(event)
        }

        function onGotoMore(event: CommonEvent): void {
            props.onGotoMore && props.onGotoMore(event)
        }

        watchEffect(() => {
            if (!timeout.value) {
                interval.value && clearInterval(interval.value)
                initAnimation()
            }
        })

        onMounted(() => {
            if (!props.marquee) return
            initAnimation()
        })

        function initAnimation(): void {
            const { isWEAPP, isALIPAY } = state
            timeout.value = setTimeout(() => {
                timeout.value = null
                if (state.isWEB) {
                    const { speed = 100 } = props
                    const elem = document.querySelector(`.${state.animElemId}`)

                    if (!elem) return

                    const width = elem.getBoundingClientRect().width
                    state.dura = width / +speed

                } else if (isWEAPP || isALIPAY) {
                    const query = Taro.createSelectorQuery()
                    query
                        .select(`.${state.animElemId}`)
                        .boundingClientRect()
                        .exec(res => {
                            const queryRes = res[0]
                            if (!queryRes) return

                            const { width } = queryRes
                            const { speed = 100 } = props
                            const dura = width / +speed

                            const animation = Taro.createAnimation({
                                duration: dura * 1000,
                                timingFunction: 'linear'
                            })

                            const resetAnimation = Taro.createAnimation({
                                duration: 0,
                                timingFunction: 'linear'
                            })

                            const resetOpacityAnimation = Taro.createAnimation({
                                duration: 0,
                                timingFunction: 'linear'
                            })

                            const animBody = (): void => {
                                resetOpacityAnimation.opacity(0).step()
                                state.animationData = resetOpacityAnimation.export()

                                setTimeout(() => {
                                    resetAnimation.translateX(0).step()
                                    state.animationData = resetAnimation.export()
                                }, 300)

                                setTimeout(() => {
                                    resetOpacityAnimation.opacity(1).step()
                                    state.animationData = resetOpacityAnimation.export()
                                }, 600)

                                setTimeout(() => {
                                    animation.translateX(-width).step()
                                    state.animationData = animation.export()
                                }, 900)
                            }
                            animBody()
                            interval.value = setInterval(animBody, dura * 1000 + 1000)
                        })
                }
            }, 1000)
        }

        return () => {
            let { showMore, close } = toRefs(props)
            const {
                dura,
                show,
                animElemId,
                animationData,
                isWEAPP,
                isALIPAY
            } = state

            if (!props.single) {
                showMore!.value = false
            }

            const rootClass = computed(() => classNames(
                'at-noticebar',
                {
                    'at-noticebar--marquee': props.marquee,
                    'at-noticebar--weapp': props.marquee && (isWEAPP || isALIPAY),
                    'at-noticebar--single': !props.marquee && props.single
                },
                props.className
            ))

            const style = {}
            const innerClass = ['at-noticebar__content-inner']

            if (props.marquee) {
                close!.value = false
                style['animation-duration'] = `${dura}s`
                innerClass.push(animElemId)
            }

            const iconClass = ['at-icon']
            if (props.icon) iconClass.push(`at-icon-${props.icon}`)

            return (
                show && (
                    h(View, {
                        class: rootClass.value,
                        style: props.customStyle
                    }, {
                        default: () => [
                            // close icon
                            close?.value && (
                                h(View, {
                                    class: 'at-noticebar__close',
                                    onClick: handleClose
                                }, {
                                    default: () => [
                                        h(Text, { class: 'at-icon at-icon-close' })
                                    ]
                                })
                            ),
                            // content
                            h(View, { class: 'at-noticebar__content' }, {
                                default: () => [
                                    // content icon
                                    props.icon && (
                                        h(View, { class: 'at-noticebar__content-icon' }, {
                                            default: () => [
                                                /* start hack 百度小程序 */
                                                h(Text, { class: classNames(iconClass, iconClass) })
                                            ]
                                        })
                                    ),
                                    // content text
                                    h(View, { class: 'at-noticebar__content-text' }, {
                                        default: () => [
                                            // default content slot
                                            h(View, {
                                                id: animElemId,
                                                animation: animationData,
                                                class: classNames(innerClass),
                                                style: style,
                                            }, slots.default && slots.default()),
                                            // show more content
                                            showMore?.value && (
                                                h(View, {
                                                    class: 'at-noticebar__more',
                                                    onClick: onGotoMore.bind(this)
                                                }, {
                                                    default: () => [
                                                        h(Text, { class: 'text' }, props.moreText),
                                                        h(View, { class: 'at-noticebar__more-icon' }, {
                                                            default: () => [
                                                                h(Text, { class: 'at-icon at-icon-chevron-right' })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            )
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                )
            )
        }
    }
})

export default AtNoticebar

