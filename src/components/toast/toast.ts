import { h, defineComponent, ref, Ref, nextTick, watch, computed } from "vue"
import { Image, Text, View, CommonEventFunction, CommonEvent } from "@tarojs/components"
import { AtToastProps } from "types/toast"
import AtComponentWithDefaultProps from '@/components/mixins'
import PropTypes, { func } from '@/utils/vue-types/index'
import classNames from 'classnames'
import statusImg from './img.json'

const AtToast = defineComponent({
    extends: AtComponentWithDefaultProps,

    props: {
        isOpened: PropTypes.bool.def(false).isRequired,
        text: PropTypes.string,
        icon: PropTypes.string,
        image: PropTypes.string,
        status: String as () => AtToastProps['status'],
        duration: PropTypes.number.def(3000),
        hasMask: Boolean,
        onClick: func<CommonEventFunction>().def(() => () => {}),
        onClose: func<CommonEventFunction>().def(() => () => {}),
    },

    setup(props: AtToastProps, { slots }) {
        const _timer: Ref<NodeJS.Timeout | null> = ref(null)
        const _isOpened = ref(props.isOpened)
        if (props.isOpened) {
            makeTimer(props.duration || 0)
        }

        watch(() => props, (nextProps) => {
            if (!nextProps.isOpened) {
                close()
                return
            }

            if(!_isOpened.value) {
                _isOpened.value = true
            } else {
                clearTimer()
            }

            makeTimer(nextProps.duration || 0)
        })

        function clearTimer() {
            if(_timer.value) {
                clearTimeout(_timer.value)
            }
        }

        function makeTimer(duration: number) {
            if(duration === 0) return

            _timer.value = setTimeout(() => {
                close()
            }, +duration);
        }

        function close() {
            if(_isOpened.value) {
                _isOpened.value = false
                nextTick(handleClose)
                clearTimer()
            }
        }

        function handleClose(e?: CommonEvent) {
            if (typeof props.onClose === 'function') {
                props.onClose(e!)
            }
        }

        function handleClick(e: CommonEvent) {
            if (props.status === 'loading') return

            if (props.onClick) {
                return props.onClick(e)
            }

            close()
        }

        return () => {
            const realImg = props.image || statusImg[props.status!] || null
            const isRenderIcon = !!(props.icon && !(props.image || statusImg[props.status!]))

            const rootClass = computed(() => classNames('at-toast', props.className))

            const bodyClass = computed(() => classNames('toast-body', {
                'at-toast__body--custom-image': props.image,
                'toast-body--text': !realImg && !props.icon,
                [`at-toast__body--${props.status}`]: !!props.status
            }))

            const iconClass = computed(() => classNames('at-icon', {
                [`at-icon-${props.icon}`]: props.icon
            }))

            if (!_isOpened) return null

            return (
                h(View, { class: rootClass }, [
                    props.hasMask && h(View, { class: 'at-toast__overlay' }),
                    h(View, {
                        class: bodyClass,
                        style: props.customStyle,
                        onTap: handleClick
                    }, [
                        h(View, { class: 'toast-body-content' }, [
                            realImg && h(View, { class: 'toast-body-content__img' }, [
                                h(Image, {
                                    class: 'toast-body-content__img-item',
                                    src: realImg,
                                    mode: 'scaleToFill'
                                })
                            ]),
                            isRenderIcon && h(View, { class: 'toast-body-content__icon' }, [
                                h(Text, { class: iconClass })
                            ]),
                            props.text && h(View, { class: 'toast-body-content__icon' }, [
                                h(Text, { class: iconClass }, props.text)
                            ])
                        ])
                    ])
                ])
            )
        }
    }
})

export default AtToast