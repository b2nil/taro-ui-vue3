import { h, defineComponent, computed, CSSProperties } from "vue"

import classNames from 'classnames'

import { View } from '@/utils/components'
import { AtDividerProps } from 'types/divider'

import AtComponentWithDefaultProps from '../mixins'
import { pxTransform, mergeStyle } from "@/utils/common"

const AtDivider = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        // 参数
        content: {
            type: String as () => AtDividerProps['content'],
            default: '',
        },
        height: {
            type: Number as () => AtDividerProps['height'],
            default: 0,
        },
        fontColor: {
            type: String as () => AtDividerProps['fontColor'],
            default: '',
        },
        fontSize: {
            type: Number as () => AtDividerProps['fontSize'],
            default: 0,
        },
        lineColor: {
            type: String as () => AtDividerProps['lineColor'],
            default: '',
        }
    },

    setup(props: AtDividerProps, { slots }) {
        return () => {
            const rootStyle = computed(() => ({
                height: props.height ? `${pxTransform(Number(props.height))}` : ''
            }))

            const fontStyle = computed(() => ({
                color: props.fontColor,
                fontSize: props.fontSize ? `${pxTransform(Number(props.fontSize))}` : ''
            }))

            const lineStyle = computed<CSSProperties>(() => ({
                backgroundColor: props.lineColor
            }))


            return h(View, {
                class: classNames('at-divider', props.className),
                style: mergeStyle(rootStyle.value, props.customStyle as object)
            }, [
                h(View, {
                    class: 'at-divider__content',
                    style: fontStyle.value
                }, props.content === ''
                    ? slots.default && slots.default()
                    : props.content
                ),
                h(View, {
                    class: 'at-divider__line',
                    style: lineStyle.value
                })
            ])
        }
    }
})

export default AtDivider