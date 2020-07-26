import { h, defineComponent, nextTick, watch, computed, reactive, watchEffect } from "vue"
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
        status: { 
            type: String as () => AtToastProps['status'], 
            default: '' as AtToastProps['status'],
            validator: (val: string) => ['', 'error', 'loading', 'success'].includes(val)
        },
        duration: PropTypes.number.def(3000),
        hasMask: Boolean,
        onClick: func<CommonEventFunction>().def(() => () => {}),
        onClose: func<CommonEventFunction>().def(() => () => {}),
    },

    setup(props: AtToastProps, { slots }) {
        const state = reactive({
            _timer: null as NodeJS.Timeout | null,
            _isOpened: props.isOpened
        })

        watchEffect(() => handleChange())

        watch(() => props.duration, (val) => {
            handleChange()
        })

        function clearTimer() {
            if(state._timer) {
                clearTimeout(state._timer)
                state._timer = null
            }
        }

        function makeTimer(duration: number) {
            if(duration === 0) return

            state._timer = setTimeout(() => {
                close()
            }, +duration);
        }

        function close() {
            if(state._isOpened) {
                state._isOpened = false
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

            if (typeof props.onClick === 'function') {
                return props.onClick(e)
            }

            close()
        }

        function handleChange() {
            if(!props.isOpened) {
                close()
                return
            }

            if(!state._isOpened) {
                state._isOpened = true
            } else {
                clearTimer()
            }

            makeTimer(props.duration || 0)
        }

        return () => {
            const realImg = computed(() => (props.image || statusImg[props.status!] || null))
            const isRenderIcon = computed(() => !!(props.icon && !(props.image || statusImg[props.status!])))
            const rootClass = computed(() => classNames('at-toast', props.className))

            const bodyClass = computed(() => classNames('toast-body', {
                'at-toast__body--custom-image': props.image,
                'toast-body--text': !realImg.value && !props.icon,
                [`at-toast__body--${props.status}`]: !!props.status
            }))

            const iconClass = computed(() => classNames('at-icon', {
                [`at-icon-${props.icon}`]: props.icon
            }))
            
            return state._isOpened ? (
                h(View, { class: rootClass.value }, [
                    // mask layer
                    props.hasMask && h(View, { class: 'at-toast__overlay' }),
                    // body
                    h(View, {
                        class: bodyClass.value,
                        style: props.customStyle,
                        onTap: handleClick
                    }, [
                        // body content
                        h(View, { class: 'toast-body-content' }, [
                            // use real image
                            realImg.value && h(View, { class: 'toast-body-content__img' }, [
                                h(Image, {
                                    class: 'toast-body-content__img-item',
                                    src: realImg.value,
                                    mode: 'scaleToFill'
                                })
                            ]),
                            // use icon
                            isRenderIcon.value && h(View, { class: 'toast-body-content__icon' }, [
                                h(Text, { class: iconClass.value })
                            ]),
                            // text
                            props.text && h(View, { class: 'toast-body-content__info' }, [
                                h(Text, null, props.text)
                            ])
                        ])
                    ])
                ])
            ): null
        }
    }
})

export default AtToast