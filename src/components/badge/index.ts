import { h, defineComponent } from "vue"
import { View } from "@/utils/components"
import { AtBadgeProps } from "types/badge";
import classNames from "classnames"
import AtComponentWithDefaultProps from "../mixins";

const AtBadge = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        dot: { 
            type: Boolean, 
            default: false 
        },
        value: { 
            type: [String, Number], 
            default: '' 
        },
        maxValue: { 
            type: Number,
            default: 99 
        }
    },

    setup(props: AtBadgeProps, { slots }) {

        function formatValue(
            value: string | number | undefined, 
            maxValue: number
        ): string | number {
            if (value === '' || value === null || value === undefined) return ''

            const numValue = +value

            if (Number.isNaN(numValue)) {
                return value
            }
            
            return numValue > maxValue ? `${maxValue}+` : numValue
        }

        return () => {
            const rootClass = classNames(
                'at-badge',
                props.className
            )
            const val = formatValue(props.value, props.maxValue!)
            
            return h(View, { class: rootClass, style: props.customStyle }, [
                slots.default && slots.default(),
                props.dot 
                    ? h(View, { class: 'at-badge__dot'})
                    : val !== '' && h(View, { class: 'at-badge__num'}, val),
            ])
        }
    }
})

export default AtBadge