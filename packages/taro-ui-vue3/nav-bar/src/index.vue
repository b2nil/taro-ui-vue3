<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <!-- left-view -->
    <view
      class="at-nav-bar__left-view"
      :style="linkStyle"
      @tap="handleClickLeftIcon"
    >
      <text
        v-if="leftIconType"
        :class="leftIconClasses"
        :style="leftIconStyle"
      />
      <text class="at-nav-bar__text">{{ leftText }}</text>
    </view>

    <!-- title -->
    <view class="at-nav-bar__title">
      <text v-if="title">{{ title }}</text>
      <slot v-else />
    </view>

    <!-- right-view -->
    <view class="at-nav-bar__right-view">
      <!-- 2nd icon -->
      <view
        :class="containerClasses(rightSecondIconType)"
        :style="linkStyle"
        @tap="handleClickRightSecondIcon"
      >
        <text
          v-if="rightSecondIconType"
          :class="rightSecondIconClasses"
          :style="rightSecondIconStyle"
        />
      </view>

      <!-- 1nd icon -->
      <view
        :class="containerClasses(rightFirstIconType)"
        :style="linkStyle"
        @tap="handleClickRightFirstIcon"
      >
        <text
          v-if="rightFirstIconType"
          :class="rightFirstIconClasses"
          :style="rightFirstIconStyle"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from 'vue'
import { ITouchEvent } from '@tarojs/components/types/common'
import { AtNavBarProps } from "@taro-ui-vue3/types/nav-bar"
import { mergeStyle, pxTransform } from "@taro-ui-vue3/utils/common"

export default defineComponent({
  name: "AtNavBar",

  emits: [
    'click-left-icon',
    'click-right-first-icon',
    'click-right-second-icon',
  ],

  props: {
    title: {
      type: String as PropType<AtNavBarProps['title']>,
      default: ''
    },
    fixed: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    color: {
      type: String as PropType<AtNavBarProps['color']>,
      default: '#6190E8'
    },
    leftIconType: {
      type: [String, Object] as PropType<AtNavBarProps['leftIconType']>,
      default: ''
    },
    leftText: {
      type: String as PropType<AtNavBarProps['leftText']>,
      default: ''
    },
    rightFirstIconType: {
      type: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>,
      default: ''
    },
    rightSecondIconType: {
      type: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>,
      default: ''
    }
  },

  setup(props: AtNavBarProps, { emit }) {

    const defaultIconInfo = {
      customStyle: '',
      className: '',
      prefixClass: 'at-icon',
      value: '',
      color: '',
      size: 24
    }

    const linkStyle = computed(() => ({ color: props.color }))

    const rootClasses = computed(() => ({
      'at-nav-bar': true,
      'at-nav-bar--fixed': props.fixed,
      'at-nav-bar--no-border': !props.border
    }))

    const containerClasses = computed(() => (iconType) => ({
      'at-nav-bar__container': true,
      'at-nav-bar__container--hide': !iconType
    }))

    const leftIconStyle = computed(() => mergeStyle(
      {
        color: leftIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(leftIconInfo.value.size.toString()) * 2
        )}`
      },
      leftIconInfo.value.customStyle
    ))

    const leftIconInfo = computed(() =>
      props.leftIconType instanceof Object
        ? { ...defaultIconInfo, ...props.leftIconType }
        : { ...defaultIconInfo, value: props.leftIconType }
    )

    const leftIconClasses = computed(() => ({
      [`${leftIconInfo.value.prefixClass}`]: Boolean(leftIconInfo.value.prefixClass),
      [`${leftIconInfo.value.prefixClass}-${leftIconInfo.value.value}`]: Boolean(leftIconInfo.value.value),
      [`${leftIconInfo.value.className}`]: Boolean(leftIconInfo.value.className)
    }))

    const rightFirstIconStyle = computed(() => mergeStyle(
      {
        color: rightFirstIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(rightFirstIconInfo.value.size.toString()) * 2
        )}`
      },
      rightFirstIconInfo.value.customStyle
    ))

    const rightFirstIconInfo = computed(() =>
      props.rightFirstIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightFirstIconType }
        : { ...defaultIconInfo, value: props.rightFirstIconType }
    )

    const rightFirstIconClasses = computed(() => ({
      [`${rightFirstIconInfo.value.prefixClass}`]: Boolean(rightFirstIconInfo.value.prefixClass),
      [`${rightFirstIconInfo.value.prefixClass}-${rightFirstIconInfo.value.value}`]: Boolean(rightFirstIconInfo.value.value),
      [`${rightFirstIconInfo.value.className}`]: Boolean(rightFirstIconInfo.value.className)
    }))

    const rightSecondIconStyle = computed(() => mergeStyle(
      {
        color: rightSecondIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(rightSecondIconInfo.value.size.toString()) * 2
        )}`
      },
      rightSecondIconInfo.value.customStyle
    ))

    const rightSecondIconInfo = computed(() =>
      props.rightSecondIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightSecondIconType }
        : { ...defaultIconInfo, value: props.rightSecondIconType }
    )

    const rightSecondIconClasses = computed(() => ({
      [`${rightSecondIconInfo.value.prefixClass}`]: Boolean(rightSecondIconInfo.value.prefixClass),
      [`${rightSecondIconInfo.value.prefixClass}-${rightSecondIconInfo.value.value}`]: Boolean(rightSecondIconInfo.value.value),
      [`${rightSecondIconInfo.value.className}`]: Boolean(rightSecondIconInfo.value.className)
    }))

    function handleClickLeftIcon(event: ITouchEvent): void {
      emit('click-left-icon', event)
    }

    function handleClickRightFirstIcon(event: ITouchEvent): void {
      emit('click-right-first-icon', event)
    }

    function handleClickRightSecondIcon(event: ITouchEvent): void {
      emit('click-right-second-icon', event)
    }

    return {
      ...toRefs(props),
      linkStyle,
      rootClasses,
      containerClasses,
      leftIconStyle,
      leftIconClasses,
      rightFirstIconStyle,
      rightFirstIconClasses,
      rightSecondIconStyle,
      rightSecondIconClasses,
      handleClickLeftIcon,
      handleClickRightFirstIcon,
      handleClickRightSecondIcon,
    }
  }
})
</script>
