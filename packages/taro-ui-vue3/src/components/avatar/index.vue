<template>
  <view
    :class="rootCass"
    :style="customStyle"
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
import { defineComponent, computed, toRefs } from 'vue'
import { AtAvatarProps } from "types/avatar"
import { getEnvs } from '../../utils/common'
import AtComponentWithDefaultProps from '../mixins'

const SIZE_CLASS = {
  large: 'large',
  normal: 'normal',
  small: 'small'
}

export default defineComponent({
  name: "AtAvatar",

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

    const { image, openData, customStyle } = toRefs(props)

    const letter = computed(() => props.text ? props.text[0] : '')

    const iconSize = SIZE_CLASS[props.size || 'normal']

    const rootClass = computed(() => ({
      [props.className]: true,
      [`at-avatar--${iconSize}`]: iconSize,
      'at-avatar--circle': props.circle,
      'at-avatar': true
    }))

    return {
      isWEAPP,
      image,
      openData,
      customStyle,
      letter,
      rootClass
    }
  }
})
</script>

<style>
</style>