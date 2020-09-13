import { defineComponent, reactive, nextTick, watch, h, computed, mergeProps } from 'vue'

import { handleTouchScroll } from '@/utils/common'

import Taro from '@tarojs/taro'
import { Button, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtModalProps, AtModalState } from 'types/modal'

import AtModalAction from './action'
import AtModalContent from './content'
import AtModalHeader from './header'

const AtModal = defineComponent({

    name: "AtModal",

    props: {
        title: String as () => AtModalProps['title'],
        isOpened: {
            type: Boolean,
            default: false,
            required: true
        },
        content: String as () => AtModalProps['content'],
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        cancelText: String as () => AtModalProps['cancelText'],
        confirmText: String as () => AtModalProps['confirmText'],
        onClose: Function as unknown as () => AtModalProps['onClose'],
        onConfirm: Function as unknown as () => AtModalProps['onConfirm'],
        onCancel: Function as unknown as () => AtModalProps['onCancel'],
    },

    setup(props: AtModalProps, { attrs, slots }) {
        const state = reactive<AtModalState>({
            _isOpened: props.isOpened,
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
        })

        const rootClasses = computed(() => ({
            'at-modal': true,
            'at-modal--active': state._isOpened
        }))

        watch(() => props.isOpened, (val, oldVal) => {
            if (val !== oldVal) {
                handleTouchScroll(val)
            }

            if (val !== state._isOpened) {
                state._isOpened = val
            }
        })

        function handleClickOverlay() {
            if (props.closeOnClickOverlay) {
                state._isOpened = false
                nextTick((event?: CommonEvent) => handleClose(event))
            }
        }

        function handleClose(event?: CommonEvent) {
            if (typeof props.onClose === 'function') {
                props.onClose(event!)
            }
        }

        function handleCancel(event: CommonEvent) {
            if (typeof props.onCancel === 'function') {
                props.onCancel(event)
            }
        }

        function handleConfirm(event: CommonEvent) {
            if (typeof props.onConfirm === 'function') {
                props.onConfirm(event)
            }
        }

        function handleTouchMove(e: CommonEvent) {
            e.stopPropagation()
        }

        return () => {
            // if either title or content exists
            if (props.title || props.content) {
                const isRenderAction = props.cancelText || props.confirmText

                return (
                    h(View, mergeProps(attrs, {
                        class: rootClasses.value
                    }), [
                        h(View, {
                            class: 'at-modal__overlay',
                            onTap: handleClickOverlay,
                        }),

                        h(View, {
                            class: 'at-modal__container'
                        }, [
                            props.title && (
                                h(AtModalHeader, null, {
                                    default: () => [
                                        h(Text, null, props.title)
                                    ]
                                })
                            ),

                            props.content && (
                                h(AtModalContent, null, {
                                    default: () => [
                                        h(View, {
                                            class: 'content-simple'
                                        }, [
                                            state.isWEB
                                                ? h(Text, {
                                                    innerHTML: props.content!.replace(/\n/g, '<br])')
                                                })
                                                : h(Text, null, props.content)
                                        ])
                                    ]
                                })
                            ),

                            isRenderAction && (
                                h(AtModalAction, {
                                    isSimple: true
                                }, {
                                    default: () => [
                                        props.cancelText && (
                                            h(Button, {
                                                onTap: handleCancel
                                            }, props.cancelText)
                                        ),
                                        props.confirmText && (
                                            h(Button, {
                                                onTap: handleConfirm
                                            }, props.confirmText)
                                        )
                                    ]
                                })
                            )
                        ])
                    ])
                )
            }

            return (
                h(View, mergeProps(attrs, {
                    class: rootClasses.value,
                    onTouchMove: handleTouchMove,
                }), [
                    h(View, {
                        onTap: handleClickOverlay,
                        class: 'at-modal__overlay',
                    }),
                    h(View, {
                        class: 'at-modal__container'
                    }, slots.default && slots.default())
                ])
            )
        }
    }
})

export default AtModal


