import { defineComponent, reactive, nextTick, watch, h } from 'vue'
import classNames from 'classnames'
import { handleTouchScroll } from '@/utils/common'

import Taro from '@tarojs/taro'
import { Button, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtModalProps, AtModalState } from 'types/modal'

import AtComponentWithDefaultProps from '../mixins'
import AtModalAction from './action'
import AtModalContent from './content'
import AtModalHeader from './header'

const AtModal = defineComponent({

    mixins: [AtComponentWithDefaultProps],

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

    setup(props: AtModalProps, { slots }) {
        const state = reactive<AtModalState>({
            _isOpened: props.isOpened,
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
        })

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
                nextTick(handleClose)
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
            const rootClass = classNames(
                'at-modal',
                {
                    'at-modal--active': state._isOpened
                },
                props.className
            )

            // if either title or content exists
            if (props.title || props.content) {
                const isRenderAction = props.cancelText || props.confirmText

                return (
                    h(View, { class: rootClass }, { default: () => [
                        h(View, {
                            onTap: handleClickOverlay,
                            class: 'at-modal__overlay'
                        }),
                        h(View, { class: 'at-modal__container' }, { default: () => [
                            props.title && (
                                h(AtModalHeader, null, { default: () => [
                                    h(Text, null, props.title)
                                ]})
                            ),
                            props.content && (
                                h(AtModalContent, null, { default: () => [
                                    h(View, { class: 'content-simple' }, [
                                        state.isWEB
                                            ? h(Text, {
                                                dangerouslySetInnerHTML: {
                                                    __html: props.content!.replace(/\n/g, '<br])')
                                                }
                                            })
                                            : h(Text, null, props.content)
                                    ])
                                ]})
                            ),
                            isRenderAction && (
                                h(AtModalAction, { isSimple: true }, { default: () => [
                                    props.cancelText && (
                                        h(Button, { onTap: handleCancel }, props.cancelText)
                                    ),
                                    props.confirmText && (
                                        h(Button, { onTap: handleConfirm }, props.confirmText)
                                    )
                                ]})
                            )
                        ]})
                    ]})
                )
            }

            return (
                h(View, {
                    onTouchMove: handleTouchMove,
                    class: rootClass
                }, [
                    h(View, {
                        class: 'at-modal__overlay',
                        onTap: handleClickOverlay
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


