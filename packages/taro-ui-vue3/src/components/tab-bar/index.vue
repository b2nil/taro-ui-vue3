<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    :style="rootStyle"
  >
    <view
      v-for="(item, i) in tabList"
      :key="`${item.title}-${i}`"
      :class="genTabItemClasses(i)"
      :style="current === i ? selectedStyle : defaultStyle"
      @tap="handleClick(i, $event)"
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
            :class="genTabBarItemIconClasses(item, i)"
            :style="genTabBarItemIconStyle(i)"
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
            :class="genTabBarItemInnerImgClasses(current !== i)"
            :style="imgStyle"
          />
          <image
            mode="widthFix"
            :src="item.image"
            :class="genTabBarItemInnerImgClasses(current === i)"
            :style="imgStyle"
          />
        </view>
      </at-badge>

      <!-- tab bar title -->
      <view>
        <at-badge
          :dot="item.iconType || item.image ? false : !!item.dot"
          :value="item.iconType || item.image ? '' : item.text"
          :max-value="item.iconType || item.image ? 0 : Number(item.max)"
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
import { defineComponent, computed, toRef, PropType } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTabBarProps } from "types/tab-bar"
import AtBadge from '@/components/badge/index.vue'

export default defineComponent({
  name: "AtTabBar",

  components: {
    AtBadge
  },

  emits: {
    'click'(index: number, event: CommonEvent) {
      return !!(
        typeof index === 'number' &&
        event && typeof event === 'object'
      )
    }
  },

  props: {
    fixed: Boolean,
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
    }
  },

  setup(props: AtTabBarProps, { emit }) {

    const defaultStyle = computed(() => ({
      color: props.color || ''
    }))

    const selectedStyle = computed(() => ({
      color: props.selectedColor || ''
    }))

    const titleStyle = computed(() => ({
      fontSize: props.fontSize ? `${props.fontSize}px` : ''
    }))

    const rootStyle = computed(() => ({
      backgroundColor: props.backgroundColor || ''
    }))

    const imgStyle = computed(() => ({
      width: `${props.iconSize}px`,
      height: `${props.iconSize}px`
    }))

    const rootClasses = computed(() => ({
      'at-tab-bar': true,
      'at-tab-bar--fixed': props.fixed
    }))

    const genTabItemClasses = computed(() => (i) => ({
      'at-tab-bar__item': true,
      'at-tab-bar__item--active': props.current === i
    }))

    const genTabBarItemIconClasses = computed(() => (item, i) => ({
      [`${item.iconPrefixClass || 'at-icon'}`]: true,
      [`${item.iconPrefixClass || 'at-icon'}-${item.selectedIconType
        }`]: props.current === i && item.selectedIconType,
      [`${item.iconPrefixClass || 'at-icon'}-${item.iconType
        }`]: !(props.current === i && item.selectedIconType)
    }))

    const genTabBarItemIconStyle = computed(() => (i) => ({
      color: props.current === i ? props.selectedColor : props.color,
      fontSize: props.iconSize ? `${props.iconSize}px` : ''
    }))

    const genTabBarItemInnerImgClasses = computed(() => (selected: boolean) => ({
      'at-tab-bar__inner-img': true,
      'at-tab-bar__inner-img--inactive': selected
    }))

    function handleClick(index: number, event: CommonEvent): void {
      emit('click', index, event)
    }

    return {
      tabList: toRef(props, 'tabList'),
      current: toRef(props, 'current'),
      imgStyle,
      rootStyle,
      titleStyle,
      defaultStyle,
      selectedStyle,
      rootClasses,
      genTabItemClasses,
      genTabBarItemIconStyle,
      genTabBarItemIconClasses,
      genTabBarItemInnerImgClasses,
      handleClick,
    }
  }
})
</script>
