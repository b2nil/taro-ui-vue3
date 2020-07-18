import { h, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { pxTransform } from '../../utils/common'

const AtLoading = defineComponent({
    props: {
        size: { type: String||Number, default: 0 },
        color: { type: String||Number, default: '' },
    },

    setup(props){
        const { color, size } = props
        const loadingSize = typeof size === 'string' ? size : String(size)

        const sizeStyle = {
            width: size ? `${ pxTransform(parseInt(loadingSize)) }` : '',
            height: size ? `${ pxTransform(parseInt(loadingSize)) }` : '',
        }

        const colorStyle = {
            border: color ? `1px solid ${color}` : '',
            'border-color': color ? `${color} transparent transparent transparent` : '',
        }

        const ringStyle = Object.assign({}, colorStyle, sizeStyle)

        return () => h(View, { class: 'at-loading', style: sizeStyle }, [
            h(View, { class: 'at-loading__ring', style: ringStyle }),
            h(View, { class: 'at-loading__ring', style: ringStyle }),
            h(View, { class: 'at-loading__ring', style: ringStyle })
        ])
    }

})

export default AtLoading