import { h, defineComponent, computed } from "vue"

import classNames from 'classnames'

import { View, CommonEvent } from '@tarojs/components'
import { AtCurtainProps } from 'types/curtain'

import AtComponentWithDefaultProps from '../mixins'

const AtCurtain = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        // 参数
        isOpened: Boolean,
        closeBtnPosition: {
            type: String as () => AtCurtainProps['closeBtnPosition'],
            default: 'bottom' as AtCurtainProps['closeBtnPosition']
        },
        // 事件
        onClose: {
            type: Function as unknown as () => AtCurtainProps['onClose'],
            default: () => () => { }
        }
    },

    setup(props: AtCurtainProps, { slots }) {        

        function handleClose(e: CommonEvent) {
            e.stopPropagation()
            props.onClose(e)  
        }

        return () => {
            const curtainClass = computed(() => classNames({
                    'at-curtain': true,
                    'at-curtain--closed': !props.isOpened
                },
                props.className
            ))

            const btnCloseClass = computed(() => classNames({
                'at-curtain__btn-close': true,
                [`at-curtain__btn-close--${props.closeBtnPosition}`]: props.closeBtnPosition
            }))

            return h(View, {
                class: curtainClass.value,
                style: props.customStyle,
                onTap: (e: CommonEvent) => { e.stopPropagation() }
            }, [
                h(View, { class: 'at-curtain__container'}, [
                    h(View, { class: 'at-curtain__body'}, [
                        slots.default && slots.default(),
                        h(View, {
                            class: btnCloseClass.value,
                            onTap: handleClose.bind(this)
                        })
                    ])
                ])
            ])
        }
    }
})

export default AtCurtain