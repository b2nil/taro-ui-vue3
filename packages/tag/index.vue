<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTagProps, TagInfo } from "@taro-ui-vue3/types/tag"

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

const TYPE_CLASS = {
  primary: 'primary'
}

const AtTag = defineComponent({
  name: "AtTag",

  emits: {
    'click': (tagInfo: TagInfo, e?: CommonEvent) => {
      return !!(
        tagInfo &&
        typeof tagInfo.name === 'string' &&
        typeof tagInfo.active === 'boolean'
      )
    }
  },

  props: {
    size: {
      type: String as PropType<AtTagProps['size']>,
      default: 'normal',
      validator: (val: string) => ['normal', 'small'].includes(val)
    },
    type: {
      type: String as PropType<AtTagProps['type']>,
      default: '',
      validator: (val: string) => ['', 'primary'].includes(val)
    },
    name: {
      type: String,
      default: ''
    },
    circle: Boolean,
    active: Boolean,
    disabled: Boolean
  },

  setup(props: AtTagProps, { emit }) {

    const rootClasses = computed(() => ({
      [`at-tag--${SIZE_CLASS[props.size!]}`]: SIZE_CLASS[props.size!],
      [`at-tag--${props.type}`]: TYPE_CLASS[props.type!],
      'at-tag--disabled': props.disabled,
      'at-tag--circle': props.circle,
      'at-tag--active': props.active,
      'at-tag': true
    }))

    function handleClick(event: CommonEvent) {
      if (!props.disabled) {
        emit('click',
          {
            name: props.name!,
            active: Boolean(props.active)
          },
          event
        )
      }
    }

    return {
      rootClasses,
      handleClick
    }
  }
})

export default AtTag
</script>
