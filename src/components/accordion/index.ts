import { h, defineComponent, reactive, ref, watch, computed } from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import AtComponentWithDefaultProps from "@/components/mixins";
import { CommonEvent } from '@tarojs/components/types/common'
import { AtAccordionProps, AtAccordionState } from "types/accordion";
import { delayQuerySelector } from '../../utils/common'

const AtAccordion = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        open: Boolean,
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: Object as () => AtAccordionProps['icon'],
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
            type: Function as unknown as () => AtAccordionProps['onClick'],
            default: () => () => { }
        }
    },

    setup(props: AtAccordionProps, { slots }) {
        const isCompleted = ref(true)
        const startOpen = ref(false)
        const state = reactive<AtAccordionState>({ wrapperHeight: 0 })

        watch(() => props.open, (val) => {
            startOpen.value = !!val && !!props.isAnimation
            toggleWithAnimation()
        })

        function handleClick(e: CommonEvent) {
            if (!isCompleted.value) return

            props.onClick && props.onClick(!props.open, e)
        }

        function toggleWithAnimation() {
            if (!isCompleted.value || !props.isAnimation) return

            isCompleted.value = false
            delayQuerySelector(this, '.at-accordion__body', 0).then((rect) => {
                const height = parseInt(rect[0].height.toString())
                const startHeight = props.open ? 0 : height
                const endHeight = props.open ? height : 0

                startOpen.value = false
                state.wrapperHeight = startHeight

                setTimeout(() => {
                    state.wrapperHeight = endHeight
                }, 100)

                setTimeout(() => {
                    isCompleted.value = true
                }, 700)
            })
        }

        return () => {
            const rootClass = computed(() => classNames('at-accordion', props.className))
            const prefixClass = computed(() => ((props.icon && props.icon.prefixClass) || 'at-icon'))
            const iconClass = computed(() => classNames({
                [prefixClass.value]: true,
                [`${prefixClass.value}-${props.icon && props.icon.value}`]: props.icon && props.icon.value,
                'at-accordion__icon': true
            }))
            const headerClass = computed(() => classNames('at-accordion__header', {
                'at-accordion__header--noborder': !props.hasBorder
            }))
            const arrowClass = computed(() => classNames('at-accordion__arrow', {
                'at-accordion__arrow--folded': !!props.open
            }))
            const contentClass = computed(() => classNames('at-accordion__content', {
                'at-accordion__content--inactive': (!props.open && isCompleted.value) || startOpen.value
            }))
            const iconStyle = computed(() => ({
                color: (props.icon && props.icon.color) || '',
                fontSize: (props.icon && `${props.icon.size}px`) || ''
            }))
            const contentStyle = computed(() => ({
                height: isCompleted.value ? '' : `${state.wrapperHeight}px`
            }))

            return h(View, { class: rootClass.value, style: props.customStyle }, [
                h(View, { class: headerClass.value, onTap: handleClick }, [
                    props.icon && props.icon.value && h(Text, { class: iconClass.value, style: iconStyle.value }),
                    h(View, { class: 'at-accordion__info' }, [
                        h(View, { class: 'at-accordion__info__title' }, props.title),
                        h(View, { class: 'at-accordion__info__note' }, props.note)
                    ]),
                    h(View, { class: arrowClass.value }, [
                        h(Text, { class: classNames('at-icon', 'at-icon-chevron-down') })
                    ])
                ]),
                h(View, { class: contentClass.value, style: contentStyle.value }, [
                    h(View, { class: 'at-accordion__body' }, slots.default && slots.default())
                ])
            ])
        }
    }
})

export default AtAccordion
