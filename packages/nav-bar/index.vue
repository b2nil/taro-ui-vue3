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
      <text
        v-if="leftText"
        class="at-nav-bar__text"
      >{{ leftText }}</text>
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
        :class="genContainerClasses(rightSecondIconType)"
        :style="linkStyle"
        @tap="handleClickRightSecondIcon"
      >
        <text
          v-if="rightSecondIconType"
          :class="rightSecondIconClasses"
          :style="rightSecondIconStyle"
        />
      </view>

      <!-- 1st icon -->
      <view
        :class="genContainerClasses(rightFirstIconType)"
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
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables"
import { pxTransform } from "@taro-ui-vue3/utils"

import { AtNavBarProps } from "@taro-ui-vue3/types/nav-bar"
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'
import { ITouchEvent } from '@tarojs/components/types/common'

const AtNavBar = defineComponent({
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
    leftText: {
      type: String as PropType<AtNavBarProps['leftText']>,
      default: ''
    },
    leftIconType: {
      type: [String, Object] as PropType<AtNavBarProps['leftIconType']>,
      default: 'chevron-left'
    },
    rightFirstIconType: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>,
    rightSecondIconType: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>
  },

  setup(props: AtNavBarProps, { emit }) {

    const linkStyle = computed(() => ({ color: props.color }))

    const rootClasses = computed(() => ({
      'at-nav-bar': true,
      'at-nav-bar--fixed': props.fixed,
      'at-nav-bar--no-border': !props.border
    }))

    const genContainerClasses = computed(() => (iconType?: string | AtIconBaseProps) => ({
      'at-nav-bar__container': true,
      'at-nav-bar__container--hide': !Boolean(iconType)
    }))

    const defaultIconInfo = {
      prefixClass: 'at-icon',
      value: '',
      color: '',
      size: 24
    }

    const genIconInfo = (iconType?: string | AtIconBaseProps) => {
      const iconInfo = computed(() => (
        iconType instanceof Object
          ? { ...defaultIconInfo, ...iconType }
          : { ...defaultIconInfo, value: iconType || '' }
      ))

      if (iconInfo.value.size) {
        iconInfo.value.size = parseInt(iconInfo.value.size.toString()) * 2
      }

      return iconInfo
    }

    const leftIconInfo = genIconInfo(props.leftIconType)
    const rightFirstIconInfo = genIconInfo(props.rightFirstIconType)
    const rightSecondIconInfo = genIconInfo(props.rightSecondIconType)

    const {
      iconClasses: leftIconClasses
    } = useIconClasses(leftIconInfo.value, true)

    const {
      iconStyle: leftIconStyle
    } = useIconStyle(leftIconInfo.value, undefined, undefined, pxTransform)

    const {
      iconClasses: rightFirstIconClasses
    } = useIconClasses(rightFirstIconInfo.value, true)

    const {
      iconStyle: rightFirstIconStyle
    } = useIconStyle(rightFirstIconInfo.value, undefined, undefined, pxTransform)

    const {
      iconClasses: rightSecondIconClasses
    } = useIconClasses(rightSecondIconInfo.value, true)

    const {
      iconStyle: rightSecondIconStyle
    } = useIconStyle(rightSecondIconInfo.value, undefined, undefined, pxTransform)

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
      genContainerClasses,
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

export default AtNavBar
</script>
