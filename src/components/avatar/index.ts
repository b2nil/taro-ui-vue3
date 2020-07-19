import { h, defineComponent } from 'vue'
import { Image, OpenData, Text, View } from "@tarojs/components"
import { getEnvs } from '../../utils/common'
import classNames from 'classnames'

const SIZE_CLASS = {
    large: 'large',
    normal: 'normal',
    small: 'small'
}

const AtAvatar = defineComponent({
    props: {
        size: {
            type: String,
            default: 'normal',
            validator: (prop: string) => ['large', 'normal', 'small'].includes(prop)
        },
        circle: { type: Boolean, default: false },
        text: { type: String, default: '' },
        image: { type: String, default: '' },
        openData: { type: Object, default: undefined },
        customStyle: { type: Object || String, default: () => {} },
        className: { type: Array || String, default: () => '' }
    },

    setup(props) {
        const { isWEAPP } = getEnvs()
        const rootClassName = ['at-avatar']
        const iconSize = SIZE_CLASS[props.size || 'normal']
        
        const classObject = {
            [`at-avatar--${iconSize}`]: iconSize,
            'at-avatar--circle': props.circle
        }

        let letter = props.text ? props.text[0] : ''
        // if (text) letter = text[0]
        
        const elem = props.openData && props.openData.type === 'userAvatarUrl' && isWEAPP
            ? h(OpenData, { type: props.openData.type })
            : props.image
                ? h(Image, { class: 'at-avatar__img', src: props.image })
                : h(Text, { class: 'at-avatar__text'}, letter)

        return () => h(View, {
            class: classNames(rootClassName, classObject, props.className),
            style: props.customStyle
        }, [ elem ])
    }
})

export default AtAvatar