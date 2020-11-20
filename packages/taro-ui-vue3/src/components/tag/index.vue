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
import { AtTagProps, TagInfo } from "types/tag"

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

const TYPE_CLASS = {
  primary: 'primary'
}

export default defineComponent({
  name: "AtTag",

  emits: {
    'click'(tagInfo: TagInfo, event: CommonEvent) {
      return !!(
        tagInfo && tagInfo.name &&
        typeof tagInfo.name === 'string' &&
        typeof tagInfo.active === 'boolean' &&
        event && typeof event === 'object'
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
      'at-tag--active': props.active,
      'at-tag--circle': props.circle,
      'at-tag--disabled': props.disabled,
      'at-tag': true,
    }))

    function handleClick(event: CommonEvent): void {
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
</script>
