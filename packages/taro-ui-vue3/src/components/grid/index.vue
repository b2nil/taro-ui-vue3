<template>
  <view
    v-if="Array.isArray(data) && data.length > 0"
    :class="rootClass"
  >
    <view
      class="at-grid__flex"
      v-for="(item, i) in gridGroup"
      :key="`at-grid-group-${i}`"
    >
      <view
        v-for="(childItem, index) in item"
        :key="`at-grid-item-${index}`"
        :class="gridItemClass(index)"
        :style="flexStyle"
        @tap="handleClick(childItem, index, i, $event)"
      >
        <view class="at-grid-item__content">
          <view class="at-grid-item__content-inner">
            <view class="content-inner__icon">
              <image
                v-if="childItem.image"
                class="content-inner__img"
                mode="scaleToFill"
                :src="childItem.image"
              />
              <text
                :class="iconInfoClass(childItem)"
                :style="iconInfoStyle(childItem)"
                v-if="childItem.iconInfo && !childItem.image"
              />
            </view>
            <text class="content-inner__text">{{ childItem.value }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import _chunk from 'lodash/chunk'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtGridProps, AtGridItem } from 'types/grid'

import AtComponentWithDefaultProps from '../mixins'
import { mergeStyle } from "../../utils/common"

export default defineComponent({
  name: "AtGrid",

  mixins: [AtComponentWithDefaultProps],

  props: {
    // 参数
    data: {
      type: Array as () => AtGridProps['data'],
      default: () => [],
    },
    columnNum: {
      type: Number as () => AtGridProps['columnNum'],
      default: 3,
    },
    hasBorder: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String as () => AtGridProps['mode'],
      default: 'square' as AtGridProps['mode'],
    },
    onClick: {
      type: Function as unknown as () => AtGridProps['onClick'],
      default: () => (item: AtGridItem, index: number, event: CommonEvent) => { }
    }
  },

  setup(props: AtGridProps) {

    const gridGroup = computed(() => _chunk(props.data, props.columnNum))

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-grid': true
    }))

    const bodyClass = computed(() => ({
      [`at-grid-item--${props.mode}`]: true,
      'at-grid-item--no-border': !props.hasBorder,
      'at-grid__flex-item': true,
      'at-grid-item': true,
    }))

    const gridItemClass = computed(() => (index) => ({
      ...bodyClass.value,
      'at-grid-item--last': index === props.columnNum! - 1
    }))

    const flexStyle = computed(() => ({
      flex: `0 0 ${100 / props.columnNum!}%`
    }))

    const iconInfoClass = computed(() => (childItem) => ({
      [childItem.iconInfo?.prefixClass]: childItem.iconInfo?.prefixClass !== undefined,
      'at-icon': childItem.iconInfo?.prefixClass === undefined,
      [`${
        childItem.iconInfo?.prefixClass || 'at-icon'
        }-${childItem.iconInfo?.value}`]: childItem.iconInfo?.value,
      [childItem.iconInfo?.className]: true
    }
    ))

    const iconInfoStyle = computed(() => (childItem) => mergeStyle(
      {
        color: childItem.iconInfo?.color,
        fontSize: `${childItem.iconInfo?.size || 24}px`
      },
      childItem.iconInfo!.customStyle!
    ))

    function handleClick(
      item: AtGridItem,
      index: number,
      row: number,
      event: CommonEvent
    ) {
      if (typeof props.onClick === 'function') {
        const clickIndex = row * props.columnNum! + index
        props.onClick(item, clickIndex, event)
      }
    }

    return {
      gridGroup,
      rootClass,
      gridItemClass,
      flexStyle,
      iconInfoClass,
      iconInfoStyle,
      handleClick,
    }
  }
})
</script>

