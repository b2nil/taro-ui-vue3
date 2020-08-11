import { defineComponent, computed, h } from "vue"
import classNames from 'classnames'
import { Text } from "@tarojs/components"
import { AtIconProps } from "types/icon"
import { pxTransform, mergeStyle } from "@/utils/common"
import AtComponentWithDefaultProps from "../mixins"

const AtIcon = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        prefixClass: {
            type: String as () => AtIconProps['prefixClass'],
            default: 'at-icon'
        },
        value: {
            type: String as () => AtIconProps['value'],
            default: ''
        },
        color: {
            type: String as () => AtIconProps['color'],
            default: ''
        },
        size: {
            type: [String, Number] as unknown as () => AtIconProps['size'],
            default: 24
        },
        onClick: {
            type: Function as unknown as () => AtIconProps['onClick'],
            default: () => () => {}
        }
    },

    setup(props: AtIconProps) {

        function handleClick() {
            props.onClick && props.onClick(arguments as any)
        }

        return () => {
            const rootStyle = computed(() => ({
                fontSize: `${pxTransform(parseInt(String(props.size)) * 2)}`,
                color: props.color
            }))
    
            const iconName = computed(() => props.value
                ? `${props.prefixClass}-${props.value}`
                : ''
            )
            
            const mergedStyle = mergeStyle(rootStyle.value, props.customStyle as object)
    
            const rootClass = computed(() => classNames(
                props.prefixClass,
                iconName.value,
                props.className
            ))
            
            return h(Text, {
                class: rootClass.value,
                style: mergedStyle,
                onTap: handleClick.bind(this)
            })
        }
    }
})

export default AtIcon