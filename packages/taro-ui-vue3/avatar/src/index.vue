<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
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
import { defineComponent, computed, toRefs, PropType } from 'vue'
import { AtAvatarProps } from "@taro-ui-vue3/types/avatar"
import { getEnvs } from "@taro-ui-vue3/utils/common"


const SIZE_CLASS = {
  large: 'large',
  normal: 'normal',
  small: 'small'
}

export default defineComponent({
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

  setup(props: AtAvatarProps) {
    const { isWEAPP } = getEnvs()

    const { image, openData } = toRefs(props)

    const letter = computed(() => props.text ? props.text[0] : '')

    const iconSize = computed(() => SIZE_CLASS[props.size || 'normal'])

    const rootClasses = computed(() => ({
      [`at-avatar--${iconSize.value}`]: iconSize.value,
      'at-avatar--circle': props.circle,
      'at-avatar': true
    }))

    return {
      isWEAPP,
      image,
      letter,
      openData,
      rootClasses
    }
  }
})
</script>

<style>
</style>