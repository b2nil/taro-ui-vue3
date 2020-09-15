import { defineComponent, computed, h, mergeProps } from "vue"
import { Text } from "@tarojs/components"
import { AtIconProps } from "types/icon"
import { pxTransform } from "@/utils/common"

const AtIcon = defineComponent({
    name: "AtIcon",

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

    setup(props: AtIconProps, { attrs }) {

        const rootStyle = computed(() => ({
            color: props.color,
            fontSize: `${pxTransform(parseInt(String(props.size)) * 2)}`
        }))
        
        const rootClass = computed(() => ({
            [`${props.prefixClass}`]: true,
            [`${props.prefixClass}-${props.value}`]: Boolean(props.value),
        }))

        function handleClick() {
            props.onClick && props.onClick(arguments as any)
        }

        return () => (            
            h(Text, mergeProps(attrs, {
                class: rootClass.value,
                style: rootStyle.value,
                onTap: handleClick.bind(this)
            }))
        )
    }
})

export default AtIcon