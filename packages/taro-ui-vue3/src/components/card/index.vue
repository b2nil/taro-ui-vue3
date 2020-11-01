<template>
  <view
    :class="rootClasses"
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
import { defineComponent, computed, toRefs, PropType } from "../../api"
import { AtCardProps } from 'types/card'



export default defineComponent({
  name: "AtCard",



  props: {
    // 参数
    note: {
      type: String as PropType<AtCardProps['note']>,
      default: ''
    },
    isFull: Boolean,
    thumb: {
      type: String as PropType<AtCardProps['thumb']>,
      default: ''
    },
    title: {
      type: String as PropType<AtCardProps['title']>,
      default: ''
    },
    extra: {
      type: String as PropType<AtCardProps['extra']>,
      default: ''
    },
    extraStyle: {
      type: Object as PropType<AtCardProps['extraStyle']>,
      default: () => ({})
    },
    icon: Object as PropType<AtCardProps['icon']>,
    renderIcon: Object as PropType<AtCardProps['renderIcon']>,
    // 事件
    onClick: {
      type: Function as PropType<AtCardProps['onClick']>,
      default: () => () => { }
    }
  },

  setup(props: AtCardProps, { slots }) {

    const rootClasses = computed(() => ({
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
      rootClasses,
      iconClass,
      iconStyle,
      handleClick
    }
  }
})
</script>

<style>
</style>