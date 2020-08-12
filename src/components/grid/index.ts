import { h, defineComponent, computed } from "vue"

import classNames from 'classnames'
import _chunk from 'lodash/chunk'

import { Image, View, Text } from '@/utils/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtGridProps, AtGridItem } from 'types/grid'

import AtComponentWithDefaultProps from '../mixins'
import { mergeStyle } from "@/utils/common"

const AtGrid = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        // 参数
        data: {
            type: Array as () => AtGridProps['data'],
            default: () => [],
        },
        columnNum: {
            type: Number as () => AtGridProps['columnNum'],
            default: 3,
        },
        hasBorder: {
            type: Boolean,
            default: true,
        },
        mode: {
            type: String as () => AtGridProps['mode'],
            default: 'square' as AtGridProps['mode'],
        },
        onClick: {
            type: Function as unknown as () => AtGridProps['onClick'],
            default: () => (item: AtGridItem, index: number, event: CommonEvent) => {}
        }
    },

    setup(props: AtGridProps) {

        function handleClick(
            item: AtGridItem,
            index: number,
            row: number,
            event: CommonEvent
        ) {
            if (typeof props.onClick === 'function') {
                const clickIndex = row * props.columnNum! + index
                props.onClick(item, clickIndex, event)
            }
        }

        return () => {
            if (Array.isArray(props.data) && props.data.length === 0) { 
                return null
            }
            const gridGroup  = computed(() => _chunk(props.data, props.columnNum))

            const rootClass = computed(() => classNames('at-grid', props.className))

            const bodyClass = computed(() => classNames(
                ['at-grid__flex-item', 'at-grid-item', `at-grid-item--${props.mode}`],
                {
                    'at-grid-item--no-border': !props.hasBorder
                }
            ))
            
            const gridGroupNodes = gridGroup.value.map((item, i) => {

                const childItemNodes = item.map((childItem, index) => {
                    const gridItemClass = computed(() => classNames(
                        bodyClass.value,
                        { 'at-grid-item--last': index === props.columnNum! - 1 }
                    ))

                    const flexStyle = computed(() => ({
                        flex: `0 0 ${100 / props.columnNum!}%`
                    }))

                    const iconInfoClass = computed(() => classNames(
                        childItem.iconInfo?.prefixClass || 'at-icon',
                        {
                            [`${
                                childItem.iconInfo?.prefixClass || 'at-icon'
                            }-${childItem.iconInfo?.value}`]: childItem.iconInfo?.value
                        },
                        childItem.iconInfo?.className
                    ))

                    const iconInfoStyle = computed(() => mergeStyle(
                        {
                            color: childItem.iconInfo?.color,
                            fontSize: `${childItem.iconInfo?.size || 24}px`
                        },
                        childItem.iconInfo!.customStyle!
                    ))

                    return h(View, {
                        key: `at-grid-item-${index}`,
                        class: gridItemClass.value,
                        style: flexStyle.value,
                        onTap: handleClick.bind(this, childItem, index, i)
                    }, [
                        h(View, { class: 'at-grid-item__content' }, [
                            h(View, { class: 'at-grid-item__content-inner' }, [
                                h(View, { class: 'content-inner__icon' }, [
                                    // use image
                                    childItem.image && (
                                        h(Image, {
                                            class: 'content-inner__img',
                                            mode: 'scaleToFill',
                                            src: childItem.image
                                        })
                                    ),
                                    // use icon
                                    childItem.iconInfo && !childItem.image && (
                                        h(Text, {
                                            class: iconInfoClass.value,
                                            style: iconInfoStyle.value
                                        })
                                    )
                                ]),
                                h(Text, { class: 'content-inner__text' }, childItem.value)
                            ])
                        ])
                    ])
                })

                return (
                    h(View, {
                        class: 'at-grid__flex',
                        key: `at-grid-group-${i}`
                    }, childItemNodes)
                )
            })

            return h(View, { class: rootClass.value }, gridGroupNodes)
        }
    }
})

export default AtGrid