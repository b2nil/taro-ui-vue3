import { h, defineComponent, mergeProps, computed, PropType, warn } from 'vue'
import { Image, OpenData, Text, View } from '@tarojs/components'
import { AtAvatarProps } from '@taro-ui-vue3/types/avatar'
import { getEnvs } from '@taro-ui-vue3/utils/common'

const SIZE_CLASS = {
	large: 'large',
	normal: 'normal',
	small: 'small'
}

const AtAvatar = defineComponent({
	name: "AtAvatar",

	props: {
		size: {
			type: String as PropType<'large' | 'normal' | 'small'>,
			default: 'normal',
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
			type: Object as PropType<{ type: 'userAvatarUrl' }>,
			default: undefined
		}
	},

	setup(props: AtAvatarProps, { attrs }) {
		const { isWEAPP } = getEnvs()

		const letter = computed(() => props.text ? props.text[0] : '')

		let iconSize = SIZE_CLASS[props.size!]

		if (!Boolean(iconSize)) {
			warn(
				"Prop size must be of PropType<'large' | 'normal' | 'small'>, actual: ", props.size,
				"\nThe size is now set to 'normal' as fallback."
			)
			iconSize = 'normal'
		}

		const rootClasses = computed(() => ({
			'at-avatar': true,
			[`at-avatar--${iconSize}`]: iconSize,
			'at-avatar--circle': props.circle
		}))

		const children = isWEAPP && props.openData && props.openData.type === 'userAvatarUrl'
			? h(OpenData, { type: props.openData.type })
			: props.image
				? h(Image, { class: 'at-avatar__img', src: props.image })
				: h(Text, { class: 'at-avatar__text' }, { default: () => letter.value })

		return () => (
			h(View, mergeProps(attrs, {
				class: rootClasses.value
			}), { default: () => [children] })
		)
	}
})

export default AtAvatar