<template>
  <view
    v-bind="$attrs"
    :class="['at-avatar', {
			'at-avatar--circle': circle,
			[`at-avatar--${iconSize}`]: iconSize,
    }]"
  >
    <open-data
      v-if="isWEAPP && openData && openData.type === 'userAvatarUrl'"
      :type="openData.type"
    />
    <image
      v-else-if="image"
      class="at-avatar__img"
      :src="image"
    />
    <text
      v-else
      class="at-avatar__text"
    >{{ letter }}</text>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType, warn } from 'vue'
import { AtAvatarProps } from "@taro-ui-vue3/types/avatar"
import { getEnvs } from "@taro-ui-vue3/utils"

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
    circle: Boolean,
    text: String,
    image: String,
    openData: Object as PropType<{ type: 'userAvatarUrl' }>
  },

  setup(props: AtAvatarProps) {
    const { isWEAPP } = getEnvs()

    const letter = computed(() => {
      return Boolean(props.text) ? String(props.text)[0] : ''
    })

    const iconSize = computed(() => {
      let size = SIZE_CLASS[props.size!]

      if (!size) {
        warn(
          "Prop `size` must be one of <'large' | 'normal' | 'small'>", "\nActual: '", props.size, "', now use 'normal' instead!"
        )
        size = 'normal'
      }

      return size
    })


    return {
      ...toRefs(props),
      isWEAPP,
      letter,
      iconSize
    }
  }
})

export default AtAvatar
</script>