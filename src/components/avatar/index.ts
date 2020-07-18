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
        const { size, circle, image, text, openData, customStyle, className } = props
        const rootClassName = ['at-avatar']
        const iconSize = SIZE_CLASS[size || 'normal']
        
        const classObject = {
            [`at-avatar--${iconSize}`]: iconSize,
            'at-avatar--circle': circle
        }

        let letter = text ? text[0] : ''
        // if (text) letter = text[0]
        
        const elem = openData && openData.type === 'userAvatarUrl' && isWEAPP
            ? h(OpenData, { type: openData.type })
            : image
                ? h(Image, { class: 'at-avatar__img', src: image })
                : h(Text, { class: 'at-avatar__text'}, letter)

        return () => h(View, {
            class: classNames(rootClassName, classObject, className),
            style: customStyle
        }, [ elem ])
    }
})

export default AtAvatar