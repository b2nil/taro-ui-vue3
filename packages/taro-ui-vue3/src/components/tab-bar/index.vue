<template>
  <view
    :class="rootClasses"
    :style="rootStyle"
  >
    <view
      v-for="(item, i) in tabList"
      :key="item.title"
      :class="tabItemClass(i)"
      :style="itemStyle"
      @tap="handleClick(i)"
    >
      <!-- tab bar icon -->
      <at-badge
        v-if="item.iconType"
        :dot="!!item.dot"
        :value="item.text"
        :max-value="Number(item.max)"
      >
        <view class="at-tab-bar__icon">
          <text
            :class="tabBarItemIconClass(item, i)"
            :style="tabBarItemIconStyle(i)"
          />
        </view>
      </at-badge>

      <!-- tab bar image -->
      <at-badge
        v-if="item.image"
        :dot="!!item.dot"
        :value="item.text"
        :max-value="Number(item.max)"
      >
        <view class="at-tab-bar__icon">
          <image
            mode="widthFix"
            :src="item.selectedImage || item.image"
            :class="tabBarItemInnerImgClass(current !== i)"
            :style="imgStyle"
          />
          <image
            mode="widthFix"
            :src="item.image"
            :class="tabBarItemInnerImgClass(current === i)"
            :style="imgStyle"
          />
        </view>
      </at-badge>

      <!-- tab bar title -->
      <view>
        <at-badge
          :dot="item.iconType || item.image ? false : !!item.dot"
          :value="item.iconType || item.image ? '' : item.text"
          :maxValue="item.iconType || item.image ? 0 : Number(item.max)"
        >
          <view
            class="at-tab-bar__title"
            :style="titleStyle"
          >{{ item.title }}</view>
        </at-badge>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'

import { CommonEvent } from '@tarojs/components/types/common'
import { AtTabBarProps, TabItem } from 'types/tab-bar'
import { mergeStyle } from '../../utils/common'

import AtBadge from '../badge/index.vue'

export default defineComponent({
  name: "AtTabBar",


  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    current: {
      type: Number,
      default: 0,
      required: true
    },
    iconSize: {
      type: Number,
      default: 24
    },
    fontSize: {
      type: Number,
      default: 14
    },
    color: {
      type: String,
      default: '#333'
    },
    selectedColor: {
      type: String,
      default: '#6190E8'
    },
    tabList: {
      type: Array as PropType<AtTabBarProps['tabList']>,
      default: []
    },
    onClick: {
      type: Function as PropType<AtTabBarProps['onClick']>,
      default: () => (index: number, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtTabBarProps, { slots }) {

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-tab-bar--fixed': props.fixed,
      'at-tab-bar': true,
    }))

    const rootStyle = computed(() => mergeStyle(props.customStyle, {
      backgroundColor: props.backgroundColor || ''
    }))

    const defaultStyle = computed(() => ({
      color: props.color || ''
    }))

    const selectedStyle = computed(() => ({
      color: props.selectedColor || ''
    }))

    const itemStyle = computed(() => (i) =>
      props.current === i
        ? selectedStyle.value
        : defaultStyle.value
    )

    const titleStyle = computed(() => ({
      fontSize: props.fontSize ? `${props.fontSize}px` : ''
    }))


    const imgStyle = computed(() => ({
      width: `${props.iconSize}px`,
      height: `${props.iconSize}px`
    }))

    const tabItemClass = computed(() => (i) => ({
      'at-tab-bar__item': true,
      'at-tab-bar__item--active': props.current === i
    }))

    const tabBarItemIconClass = computed(() => (item, i) => ({
      'at-icon': item.iconPrefixClass === undefined,
      [`${item.iconPrefixClass}`]: item.iconPrefixClass !== undefined,
      [`${item.iconPrefixClass || 'at-icon'}-${item.selectedIconType
        }`]: props.current === i && item.selectedIconType,
      [`${item.iconPrefixClass || 'at-icon'}-${item.iconType
        }`]: !(props.current === i && item.selectedIconType)
    }))

    const tabBarItemIconStyle = computed(() => (i) => ({
      color: props.current === i ? props.selectedColor : props.color,
      fontSize: props.iconSize ? `${props.iconSize}px` : ''
    }))

    const tabBarItemInnerImgClass = computed(() => (selected: boolean) => ({
      'at-tab-bar__inner-img': true,
      'at-tab-bar__inner-img--inactive': selected
    }))

    function handleClick(index: number, event: CommonEvent): void {
      props.onClick(index, event)
    }

    return {
      tabList: toRef(props, 'tabList'),
      current: toRef(props, 'current'),
      rootClasses,
      rootStyle,
      itemStyle,
      imgStyle,
      titleStyle,
      tabItemClass,
      tabBarItemIconStyle,
      tabBarItemIconClass,
      tabBarItemInnerImgClass,
      handleClick,
    }
  }
})
</script>
