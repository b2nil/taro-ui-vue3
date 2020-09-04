<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <!-- left-view -->
    <view
      class="at-nav-bar__left-view"
      :style="linkStyle"
      @tap="handleClickLeftView"
    >
      <text
        v-if="leftIconType"
        :class="leftIconClass"
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
        :class="containerClass(rightSecondIconType)"
        :style="linkStyle"
        @tap="handleClick2Nd"
      >
        <text
          v-if="rightSecondIconType"
          :class="rightSecondIconClass"
          :style="rightSecondIconStyle"
        />
      </view>

      <!-- 1nd icon -->
      <view
        :class="containerClass(rightFirstIconType)"
        :style="linkStyle"
        @tap="handleClick1St"
      >
        <text
          v-if="rightFirstIconType"
          :class="rightFirstIconClass"
          :style="rightFirstIconStyle"
        />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { ITouchEvent } from '@tarojs/components/types/common'
import { AtNavBarProps } from 'types/nav-bar'
import { mergeStyle, pxTransform } from '../../utils/common'
import AtComponentWithDefaultProps from '../mixins'

export default defineComponent({
  name: "AtNavBar",

  mixins: [
    AtComponentWithDefaultProps
  ],

  props: {
    title: {
      type: String as () => AtNavBarProps['title'],
      default: ''
    },
    fixed: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    color: {
      type: String as () => AtNavBarProps['color'],
      default: '#6190E8'
    },
    leftIconType: {
      type: [String, Object] as unknown as () => AtNavBarProps['leftIconType'],
      default: ''
    },
    leftText: {
      type: String as () => AtNavBarProps['leftText'],
      default: ''
    },
    rightFirstIconType: {
      type: [String, Object] as unknown as () => AtNavBarProps['rightFirstIconType'],
      default: ''
    },
    rightSecondIconType: {
      type: [String, Object] as unknown as () => AtNavBarProps['rightFirstIconType'],
      default: ''
    },
    // events
    onClickLeftIcon: Function as unknown as () => AtNavBarProps['onClickLeftIcon'],
    onClickRgIconSt: Function as unknown as () => AtNavBarProps['onClickRgIconSt'],
    onClickRgIconNd: Function as unknown as () => AtNavBarProps['onClickRgIconNd']
  },

  setup(props: AtNavBarProps, { slots }) {

    const linkStyle = computed(() => ({ color: props.color }))

    const defaultIconInfo = {
      customStyle: '',
      className: '',
      prefixclass: 'at-icon',
      value: '',
      color: '',
      size: 24
    }

    const leftIconInfo = computed(() =>
      props.leftIconType instanceof Object
        ? { ...defaultIconInfo, ...props.leftIconType }
        : { ...defaultIconInfo, value: props.leftIconType }
    )

    const leftIconClass = computed(() => ({
      [leftIconInfo.value.prefixClass]: true,
      [`${leftIconInfo.value.prefixClass}-${leftIconInfo.value.value}`]: leftIconInfo.value.value,
      [leftIconInfo.value.className]: true,
    }))

    const rightFirstIconInfo = computed(() =>
      props.rightFirstIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightFirstIconType }
        : { ...defaultIconInfo, value: props.rightFirstIconType }
    )

    const rightFirstIconClass = computed(() => ({
      [rightFirstIconInfo.value.prefixClass]: true,
      [`${rightFirstIconInfo.value.prefixClass}-${rightFirstIconInfo.value.value}`]: rightFirstIconInfo.value.value,
      [rightFirstIconInfo.value.className]: true
    }))

    const rightSecondIconInfo = computed(() =>
      props.rightSecondIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightSecondIconType }
        : { ...defaultIconInfo, value: props.rightSecondIconType }
    )

    const rightSecondIconClass = computed(() => ({
      [rightSecondIconInfo.value.prefixClass]: true,
      [`${rightSecondIconInfo.value.prefixClass}-${rightSecondIconInfo.value.value}`]: rightSecondIconInfo.value.value,
      [rightSecondIconInfo.value.className]: true,
    }))

    const rootClass = computed(() => (
      {
        [props.className]: true,
        'at-nav-bar--fixed': props.fixed,
        'at-nav-bar--no-border': !props.border,
        'at-nav-bar': true,
      }
    ))

    const leftIconStyle = computed(() => mergeStyle(
      {
        color: leftIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(leftIconInfo.value.size.toString()) * 2
        )}`
      },
      leftIconInfo.value.customStyle
    ))

    const rightSecondIconStyle = computed(() => mergeStyle(
      {
        color: rightSecondIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(rightSecondIconInfo.value.size.toString()) * 2
        )}`
      },
      rightSecondIconInfo.value.customStyle
    ))

    const containerClass = computed(() => (iconType) => ({
      'at-nav-bar__container': true,
      'at-nav-bar__container--hide': !iconType
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


    function handleClickLeftView(event: ITouchEvent): void {
      props.onClickLeftIcon && props.onClickLeftIcon(event)
    }

    function handleClick1St(event: ITouchEvent): void {
      props.onClickRgIconSt && props.onClickRgIconSt(event)
    }

    function handleClick2Nd(event: ITouchEvent): void {
      props.onClickRgIconNd && props.onClickRgIconNd(event)
    }

    return {
      ...toRefs(props),
      rootClass,
      linkStyle,
      containerClass,
      leftIconClass,
      leftIconStyle,
      rightFirstIconClass,
      rightFirstIconStyle,
      rightSecondIconClass,
      rightSecondIconStyle,
      handleClick1St,
      handleClick2Nd,
      handleClickLeftView
    }
  }
})
</script>
