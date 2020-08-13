import { h, defineComponent, computed, ref, nextTick, watch } from "vue"

import classNames from 'classnames'
import { handleTouchScroll } from "@/utils/common"

import { ScrollView, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtFloatLayoutProps } from 'types/float-layout'

import AtComponentWithDefaultProps from '../mixins'

const AtFloatLayout = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        // 参数
        isOpened: {
            type: Boolean,
            default: false,
            required: true
        },
        title: {
            type: String as () => AtFloatLayoutProps['title'],
            default: '',
        },
        scrollX: Boolean,
        scrollY: {
            type: Boolean,
            default: true,
        },
        scrollTop: Number as () => AtFloatLayoutProps['scrollTop'],
        scrollLeft: Number as () => AtFloatLayoutProps['scrollLeft'],
        upperThreshold: Number as () => AtFloatLayoutProps['upperThreshold'],
        lowerThreshold: Number as () => AtFloatLayoutProps['lowerThreshold'],
        scrollWithAnimation: Boolean,
        // 事件
        onClose: Function as unknown as () => AtFloatLayoutProps['onClose'],
        onScroll: Function as unknown as () => AtFloatLayoutProps['onScroll'],
        onScrollToUpper: Function as unknown as () => AtFloatLayoutProps['onScrollToUpper'],
        onScrollToLower: Function as unknown as () => AtFloatLayoutProps['onScrollToLower'],
    },

    setup(props: AtFloatLayoutProps, { slots }) {
        const _isOpened = ref<boolean>(props.isOpened)

        watch(() => props.isOpened, (val, oldVal) => {
            if (val === oldVal) {
                handleTouchScroll(val)
            }

            if (val !== _isOpened.value) {
                _isOpened.value = val
            }
        })

        function handleClose() {
            if (typeof props.onClose === 'function') {
                props.onClose()
            }
        }

        function close() {
            _isOpened.value = false
            nextTick(handleClose)
        }

        function handleTouchMove(e: CommonEvent) {
            e.stopPropagation()
        }

        return () => {
            const rootClass = computed(() => classNames(
                'at-float-layout',
                {
                    'at-float-layout--active': _isOpened.value
                },
                props.className
            ))

            return (
                h(View, {
                    class: rootClass.value,
                    onTouchMove: handleTouchMove
                }, [
                    // overlay
                    h(View, {
                        class: 'at-float-layout__overlay',
                        onTap: close
                    }),
                    // container layout
                    h(View, { class: 'at-float-layout__container layout' }, [
                        // header
                        props.title && (
                            h(View, { class: 'layout-header' }, [
                                h(Text, { class: 'layout-header__title' }, props.title),
                                h(View, { class: 'layout-header__btn-close', onTap: close }),
                            ])
                        ),
                        // body
                        h(View, { class: 'layout-body' }, [
                            h(ScrollView, {
                                class: 'layout-body__content',
                                scrollX: props.scrollX,
                                scrollY: props.scrollY,
                                scrollTop: props.scrollTop,
                                scrollLeft: props.scrollLeft,
                                upperThreshold: props.upperThreshold,
                                lowerThreshold: props.lowerThreshold,
                                scrollWithAnimation: props.scrollWithAnimation,
                                onScroll: props.onScroll,
                                onScrollToLower: props.onScrollToLower,
                                onScrollToUpper: props.onScrollToUpper,
                            }, slots.default && slots.default())
                        ])
                    ])
                ])
            )
        }
    }
})

export default AtFloatLayout