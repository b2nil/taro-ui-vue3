<template>
  <view
    :class="rootClass"
    @tap="handleClick"
  >
    <!-- header -->
    <view class="at-card__header">
      <!-- thumb image -->
      <view
        v-if="thumb"
        class="at-card__header-thumb"
      >
        <image
          class="at-card__header-thumb-info"
          mode="scaleToFill"
          :src="thumb"
        />
      </view>
      <!-- renderIcon -->
      <view
        v-if="renderIcon"
        v-html="renderIcon"
      />
      <!-- icon if not thumb -->
      <text
        v-if="!thumb && icon && icon.value"
        :class="iconClass"
        :style="iconStyle"
      />
      <!-- title -->
      <text class="at-card__header-title">{{ title }}</text>
      <!-- extra info -->
      <text
        v-if="extra"
        class="at-card__header-extra"
        :style="{ ...extraStyle }"
      >{{extra}}</text>
    </view>
    <!-- content -->
    <view class="at-card__content">
      <!-- main content -->
      <view class="at-card__content-info">
        <slot />
      </view>
      <!-- content note -->
      <view
        v-if="note"
        class="at-card__content-note"
      >{{ note }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue"
import { AtCardProps } from 'types/card'

import AtComponentWithDefaultProps from '../mixins'

export default defineComponent({
  name: "AtCard",

  mixins: [AtComponentWithDefaultProps],

  props: {
    // 参数
    note: {
      type: String as () => AtCardProps['note'],
      default: ''
    },
    isFull: Boolean,
    thumb: {
      type: String as () => AtCardProps['thumb'],
      default: ''
    },
    title: {
      type: String as () => AtCardProps['title'],
      default: ''
    },
    extra: {
      type: String as () => AtCardProps['extra'],
      default: ''
    },
    extraStyle: {
      type: Object as () => AtCardProps['extraStyle'],
      default: () => ({})
    },
    icon: Object as () => AtCardProps['icon'],
    renderIcon: Object as () => AtCardProps['renderIcon'],
    // 事件
    onClick: {
      type: Function as unknown as () => AtCardProps['onClick'],
      default: () => () => { }
    }
  },

  setup(props: AtCardProps, { slots }) {

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-card--full': props.isFull,
      'at-card': true,
    }))

    const iconClass = computed(() => ({
      [`at-icon-${props.icon && props.icon.value}`]: props.icon && props.icon.value,
      'at-card__header-icon': true,
      'at-icon': true,
    }))

    const iconStyle = computed(() => ({
      color: (props.icon && props.icon.color) || '',
      fontSize: (props.icon && `${props.icon.size}px`) || ''
    }))

    function handleClick(args: any) {
      if (typeof props.onClick === 'function') {
        props.onClick(args)
      }
    }

    return {
      ...toRefs(props),
      rootClass,
      iconClass,
      iconStyle,
      handleClick
    }
  }
})
</script>

<style>
</style>