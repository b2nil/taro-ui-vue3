import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import classNames from "classnames"
// import PropTypes from "../../utils/vue-types"
import "../../style/components/badge.scss"

const AtBadge = defineComponent({
    props: {
        // TODO: BUG, prop type changed to any if using vue-types
        // dot: PropTypes.bool.def(false),
        // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(''),
        // maxValue: PropTypes.number.def(99),
        // className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).def(''),
        // customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).def({})
        dot: { type: Boolean, default: false },
        value: { type: String || Number, default: '' },
        maxValue: { type: Number, default: 99 },
        className: { type: String || Array, default: '' },
        customStyle: { type: String || Object, default: {} }
    },

    setup(props, { slots }) {

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
            console.log("val: ", val)
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