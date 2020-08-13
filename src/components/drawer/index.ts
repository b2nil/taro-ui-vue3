import { h, defineComponent, computed, reactive, onMounted, nextTick, watch } from "vue"

import classNames from 'classnames'

import { View } from '@tarojs/components'
import { AtDrawerProps, AtDrawerState } from 'types/drawer'

import AtComponentWithDefaultProps from '../mixins'
import AtList from "../list"
import AtListItem from "../list/item"

const AtDrawer = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        show: {
            type: Boolean,
            default: false,
            required: true
        },
        mask: {
            type: Boolean,
            default: true,
        },
        width: {
            type: String as () => AtDrawerProps['width'],
            default: '',
        },
        right: Boolean,
        items: {
            type: Array as () => AtDrawerProps['items'],
            default: () => [],
        },
        onItemClick: {
            type: Function as unknown as () => AtDrawerProps['onItemClick'],
            default: () => () => {}
        },
        onClose: {
            type: Function as unknown as () => AtDrawerProps['onClose'],
            default: () => () => {}
        }
    },

    setup(props: AtDrawerProps, { slots }) {
        const state = reactive<AtDrawerState>({
            animShow: false,
            _show: props.show
        })

        watch(() => props.show, (val) => {
            if (val !== state._show) {
                val ? showAnimation() : hideAnimation()
            }
        })

        onMounted(() => {
            if (state._show) {
                showAnimation()
            }
        })

        function handleItemClick(index: number) {
            props.onItemClick && props.onItemClick(index)
            hideAnimation()
        }

        function onHide() {
            state._show = false
            nextTick(() => {
                props.onClose && props.onClose()
            })
        }

        function hideAnimation() {
            state.animShow = false
            setTimeout(() => {
                onHide()
            }, 300)
        }

        function showAnimation() {
            state._show = true
            setTimeout(() => {
                state.animShow = true
            }, 200)
        }

        function handleMaskClick() {
            hideAnimation()
        }

        return () => {
            const rootClass = computed(() => classNames(
                'at-drawer',
                {
                    'at-drawer--show': state.animShow,
                    'at-drawer--right': props.right,
                    'at-drawer--left': !props.right
                },
                props.className
            ))

            const maskStyle = computed(() => ({
                display: props.mask ? 'block' : 'none',
                opacity: state.animShow ? 1 : 0
            }))

            const listStyle = computed(() => ({
                width: props.width,
                transition: state.animShow
                    ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
                    : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
            }))

            const atListItemNodes = props.items?.map((name, index) => {
                return h(AtListItem, {
                    key: `${name}-${index}`,
                    'data-index': index,
                    title: name,
                    arrow: 'right',
                    onClick: handleItemClick.bind(this, index)
                })
            })

            if (!state._show) return h(View)

            return h(View, { class: rootClass.value }, [
                // mask
                h(View, {
                    class: 'at-drawer__mask',
                    style: maskStyle.value,
                    onTap: handleMaskClick.bind(this)
                }),
                // content
                h(View, {
                    class: 'at-drawer__content',
                    style: listStyle.value
                }, (!!props.items && props.items.length)
                    ? [ h(AtList, null, { default: () => atListItemNodes })]
                    : slots.default && slots.default()
                )
            ])
        }
    }
})

export default AtDrawer