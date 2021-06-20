<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    :style="rootStyle"
  >
    <view
      v-for="(item, i) in tabList"
      :key="`${item.title}-${i}`"
      :class="genItemClasses(i)"
      :style="genItemStyle(i)"
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
            :class="genIconClasses(item, i)"
            :style="genIconStyle(item, i)"
          />
        </view>
      </at-badge>

      <!-- tab bar image -->
      <at-badge
        v-else-if="item.image"
        :dot="!!item.dot"
        :value="item.text"
        :max-value="Number(item.max)"
      >
        <view class="at-tab-bar__icon">
          <image
            mode="widthFix"
            :src="genImgSrc(item, i)"
            :class="genImgClasses(current === i)"
            :style="imgStyle"
          />
          <image
            mode="widthFix"
            :src="genImgSrc(item, i)"
            :class="genImgClasses(current !== i)"
            :style="imgStyle"
          />
        </view>
      </at-badge>

      <!-- tab bar title -->
      <view>
        <at-badge
          :dot="Boolean(item.iconType || item.image) ? false : !!item.dot"
          :value="Boolean(item.iconType || item.image) ? '' : item.text"
          :max-value="Boolean(item.iconType || item.image) ? 0 : Number(item.max)"
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
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'
import { AtTabBarProps, TabItem } from "@taro-ui-vue3/types/tab-bar"
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables"
import { convertToUnit } from "@taro-ui-vue3/utils"

import AtBadge from '@taro-ui-vue3/badge/index.vue'

const AtTabBar = defineComponent({
  name: "AtTabBar",

  components: {
    AtBadge
  },

  emits: {
    'click': (index: number) => !!(typeof index === 'number')
  },

  props: {
    fixed: Boolean,
    current: {
      type: Number,
      default: 0
    },
    iconSize: {
      type: [Number, String],
      default: 24,
      validator: (prop: string | number) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    fontSize: {
      type: [Number, String],
      default: 14,
      validator: (prop: string | number) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    color: {
      type: String,
      default: '#333'
    },
    selectedColor: {
      type: String,
      default: '#6190E8'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    tabList: {
      type: Array as PropType<AtTabBarProps['tabList']>,
      default: []
    }
  },

  setup(props: AtTabBarProps, { emit }) {

    const rootStyle = computed(() => ({
      backgroundColor: props.backgroundColor
    }))

    const titleStyle = computed(() => ({
      fontSize: props.fontSize ? convertToUnit(props.fontSize) : ''
    }))

    const imgStyle = computed(() => ({
      width: convertToUnit(props.iconSize),
      height: convertToUnit(props.iconSize)
    }))

    const rootClasses = computed(() => ({
      'at-tab-bar': true,
      'at-tab-bar--fixed': props.fixed
    }))

    const genItemClasses = (i: number) => ({
      'at-tab-bar__item': true,
      'at-tab-bar__item--active': props.current === i
    })

    const genImgClasses = (selected: boolean) => ({
      'at-tab-bar__inner-img': true,
      'at-tab-bar__inner-img--inactive': !selected
    })

    const genImgSrc = (item: TabItem, i: number) => {
      return props.current === i
        ? item.selectedImage || item.image
        : item.image
    }

    const genItemStyle = (i: number) => {
      return props.current === i
        ? { color: props.selectedColor }
        : { color: props.color }
    }

    function genIconInfo(item: TabItem, i: number): AtIconBaseProps {
      const iconInfo: AtIconBaseProps = {
        prefixClass: item.iconPrefixClass,
        value: item.iconType!,
        color: props.color,
        size: props.iconSize
      }

      if (props.current === i) {
        iconInfo.value = item.selectedIconType || item.iconType!
        iconInfo.color = props.selectedColor
      }

      return iconInfo
    }

    const genIconClasses = (item: TabItem, i: number) => {
      const iconInfo = genIconInfo(item, i)
      const { iconClasses } = useIconClasses(iconInfo, true)
      return iconClasses.value
    }

    const genIconStyle = (item: TabItem, i: number) => {
      const iconInfo = genIconInfo(item, i)
      const { iconStyle } = useIconStyle(iconInfo)
      return iconStyle.value
    }

    function handleClick(index: number) {
      emit('click', index)
    }

    return {
      tabList: toRef(props, 'tabList'),
      current: toRef(props, 'current'),
      imgStyle,
      rootStyle,
      titleStyle,
      genItemStyle,
      rootClasses,
      genItemClasses,
      genIconStyle,
      genIconClasses,
      genImgClasses,
      genImgSrc,
      handleClick,
    }
  }
})

export default AtTabBar
</script>
