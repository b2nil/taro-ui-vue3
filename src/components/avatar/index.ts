import { h, defineComponent } from 'vue'
import { Image, OpenData, Text, View } from "@/utils/components"
import { AtAvatarProps } from "types/avatar";
import { getEnvs } from '../../utils/common'
import classNames from 'classnames'
import AtComponentWithDefaultProps from '../mixins';

const SIZE_CLASS = {
    large: 'large',
    normal: 'normal',
    small: 'small'
}

const AtAvatar = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        size: {
            type: String as () => 'large' | 'normal' | 'small',
            default: 'normal' as 'large' | 'normal' | 'small',
            validator: (prop: string) => ['large', 'normal', 'small'].includes(prop)
        },
        circle: { 
            type: Boolean, 
            default: false 
        },
        text: { 
            type: String,
            default: '' 
        },
        image: { 
            type: String,
            default: ''
        },
        openData: { 
            type: Object as () => { type: 'userAvatarUrl' },
            default: undefined
        }
    },

    setup(props: AtAvatarProps) {
        const { isWEAPP } = getEnvs()       

        let letter = props.text ? props.text[0] : ''

        return () => {
            const iconSize = SIZE_CLASS[props.size || 'normal']

            const rootClass = classNames(
                'at-avatar',
                {
                    [`at-avatar--${iconSize}`]: iconSize,
                    'at-avatar--circle': props.circle
                },
                props.className
            )

            const elem = isWEAPP && props.openData && 
                props.openData.type === 'userAvatarUrl'
                    ? h(OpenData, { type: props.openData.type })
                    : props.image
                        ? h(Image, { class: 'at-avatar__img', src: props.image })
                        : h(Text, { class: 'at-avatar__text'}, letter)
            
            return h(View, { class: rootClass, style: props.customStyle }, [ elem ])
        }
    }
})

export default AtAvatar