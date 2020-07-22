import { h, defineComponent, reactive, ref, watch, nextTick} from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtAccordionProps, AtAccordionState } from "types/accordion";
import { AtIconBaseProps } from "types/base";
import { delayQuerySelector } from '../../utils/common'

const AtAccordion = defineComponent({
    props: {
        open: { 
            type: Boolean, 
            default: false 
        },
        title: { 
            type: String, 
            default: '' 
        },
        icon: { 
            type: Object as () => AtIconBaseProps, 
            default: () => ({ value: '' }) 
        },
        hasBorder: { 
            type: Boolean, 
            default: true 
        },
        isAnimation: { 
            type: Boolean, 
            default: true 
        },
        note: { 
            type: String, 
            default: '' 
        },
        onClick: { 
            type: Function as unknown as () => (open: boolean, event: CommonEvent) => void, 
            default: () => () => {}
        }
    },

    setup(props: AtAccordionProps, { slots }) {
        const isCompleted = ref(true)
        const startOpen = ref(false)
        const state = reactive({ wrapperHeight: 0 } as AtAccordionState)

        watch(() => props.open, (val, oldVal) => {
            if (val !== oldVal) {
                startOpen.value = !!val && !!props.isAnimation
                toggleWithAnimation()
            }
        })
       
        function handleClick(e: CommonEvent) {
            if (!isCompleted.value) return

            props.onClick && props.onClick(!props.open, e)
        }

        function toggleWithAnimation() {
            if (!isCompleted.value || !props.isAnimation) return

            isCompleted.value = false
            delayQuerySelector(this, '.at-accordion__body').then((rect) => {
                const height = parseInt(rect[0].height.toString())
                const startHeight = props.open ? height : 0
                const endHeight = props.open ? 0 : height

                startOpen.value = false
                state.wrapperHeight = startHeight
                nextTick(() => {
                    setTimeout(() => {
                        state.wrapperHeight = endHeight
                        nextTick(() => {
                            setTimeout(() => {
                                isCompleted.value = true
                                delete state.wrapperHeight
                            }, 100)
                        })                                    
                    }, 700)
                })                
            })
        }        

        return () => {
             const rootClass = classNames('at-accordion', props.className)
             const prefixClass = (props.icon && props.icon.prefixClass) || 'at-icon'
             const iconClass = classNames({
                 [prefixClass]: true,
                 [`${prefixClass}-${props.icon && props.icon.value}`]: props.icon && props.icon.value,
                 'at-accordion__icon': true
             })
             const headerClass = classNames('at-accordion__header', {
                'at-accordion__header--noborder': !props.hasBorder
             })
             const arrowClass = classNames('at-accordion__arrow', {
                 'at-accordion__arrow--folded': !!props.open
             })
             const contentClass = classNames('at-accordion__content', {
                 'at-accordion__content--inactive': (!props.open && isCompleted.value) || startOpen.value
             })
             const iconStyle = {
                 color: (props.icon && props.icon.color) || '',
                 fontSize: (props.icon && `${props.icon.size}px`) || ''
             }
             const contentStyle = {
                 height: `${state.wrapperHeight}px`
             }

             if (isCompleted.value) {
                 contentStyle.height = ''
             }

            return h(View, { class: rootClass, style: props.customStyle }, [
                h(View, { class: headerClass, onTap: handleClick}, [
                    props.icon && props.icon.value && h(Text, { class: iconClass, style: iconStyle }),
                    h(View, { class: 'at-accordion__info' }, [
                        h(View, { class: 'at-accordion__info__title' }, props.title), 
                        h(View, { class: 'at-accordion__info__note' }, props.note)
                    ]),
                    h(View, { class: arrowClass }, [
                        h(Text, { class: classNames('at-icon', 'at-icon-chevron-down') })
                    ])
                ]),
                h(View, { class: contentClass, style: contentStyle }, [
                    h(View, { class: 'at-accordion__body' }, slots.default && slots.default())
                ])
            ])
        }
    }
})

export default AtAccordion
