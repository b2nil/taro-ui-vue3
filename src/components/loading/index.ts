import { h, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { pxTransform } from '../../utils/common'
import { AtComponent } from 'types/base'
import AtComponentWithDefaultProps from '../mixins'

interface AtLoadingProps extends AtComponent {
    size?: string | number
    color?: string | number
}

const AtLoading = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        size: { type: [String, Number], default: 0 },
        color: { type: [String, Number], default: '' }
    },

    setup(props: AtLoadingProps){
        const loadingSize = typeof props.size === 'string' ? props.size : String(props.size)
        
        const sizeStyle = {
            width: props.size ? `${ pxTransform(parseInt(loadingSize)) }` : '',
            height: props.size ? `${ pxTransform(parseInt(loadingSize)) }` : '',
        }
        
        const colorStyle = {
            border: props.color ? `1px solid ${props.color}` : '',
            'border-color': 
                props.color
                    ? `${props.color} transparent transparent transparent`
                    : '',
        }

        const ringStyle = Object.assign({}, colorStyle, sizeStyle)

        return () => h(View, 
            { class: 'at-loading', style: sizeStyle }, 
            // VNodes Must Be Unique, workarounds: 
            Array.apply(null, {length: 3}).map((_, index) => {
                return h(View, {
                    key: index,
                    class: 'at-loading__ring',
                    style: ringStyle 
                })
            })
        )
    }
})

export default AtLoading