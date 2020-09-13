import { h, defineComponent, mergeProps, computed } from 'vue'
import { Image, OpenData, Text, View } from "@tarojs/components"
import { AtAvatarProps } from "types/avatar";
import { getEnvs } from '../../utils/common'

const SIZE_CLASS = {
    large: 'large',
    normal: 'normal',
    small: 'small'
}

const AtAvatar = defineComponent({
    name: "AtAvatar",

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

    setup(props: AtAvatarProps, { attrs }) {
        const { isWEAPP } = getEnvs()

        const letter = computed(() => props.text ? props.text[0] : '')

        const iconSize = SIZE_CLASS[props.size || 'normal']

        const rootClasses = computed(() => ({
            'at-avatar': true,
            [`at-avatar--${iconSize}`]: iconSize,
            'at-avatar--circle': props.circle
        }))

        const children = isWEAPP && props.openData && props.openData.type === 'userAvatarUrl'
            ? h(OpenData, { type: props.openData.type })
            : props.image
                ? h(Image, { class: 'at-avatar__img', src: props.image })
                : h(Text, { class: 'at-avatar__text' }, letter.value)

        return () => (
            h(View, mergeProps(attrs, {
                class: rootClasses.value
            }), [children])
        )
    }
})

export default AtAvatar