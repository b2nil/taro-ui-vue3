<template>
  <view
    v-if="Array.isArray(data) && data.length > 0"
    v-bind="$attrs"
    class="at-grid"
  >
    <view
      v-for="(item, i) in gridGroup"
      :key="`at-grid-group-${i}`"
      class="at-grid__flex"
    >
      <view
        v-for="(childItem, index) in item"
        :key="`at-grid-item-${index}`"
        :class="gridItemClasses(index)"
        :style="flexStyle"
        @tap="handleClick(childItem, index, i, $event)"
      >
        <view class="at-grid-item__content">
          <view class="at-grid-item__content-inner">
            <view class="content-inner__icon">
              <!-- use image -->
              <image
                v-if="childItem.image"
                class="content-inner__img"
                mode="scaleToFill"
                :src="childItem.image"
              />

              <!-- use icon -->
              <text
                v-if="childItem.iconInfo && !childItem.image"
                :class="iconInfoClasses(childItem)"
                :style="iconInfoStyle(childItem)"
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
import { defineComponent, computed, toRefs, PropType } from "vue"
import { CommonEvent } from '@tarojs/components/types/common'
import { AtGridProps, AtGridItem } from "types/grid"
import { mergeStyle } from "@/utils/common"
import _chunk from 'lodash/chunk'

export default defineComponent({
  name: "AtGrid",

  emits: {
    'click'(item: AtGridItem, index: number, event: CommonEvent) {
      return !!(
        item &&
        index &&
        event &&
        typeof item === 'object' &&
        typeof index === 'number' &&
        typeof event === 'object'
      )
    }
  },

  props: {
    // 参数
    data: {
      type: Array as PropType<AtGridProps['data']>,
      default: () => [],
    },
    columnNum: {
      type: Number as PropType<AtGridProps['columnNum']>,
      default: 3,
    },
    hasBorder: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String as PropType<AtGridProps['mode']>,
      default: 'square'
    }
  },

  setup(props: AtGridProps, { emit }) {

    const gridGroup = computed(() => _chunk(props.data, props.columnNum))

    const bodyClasses = computed(() => ({
      'at-grid-item': true,
      'at-grid__flex-item': true,
      [`at-grid-item--${props.mode}`]: true,
      'at-grid-item--no-border': !props.hasBorder
    }))

    const gridItemClasses = computed(() => (index) => ({
      ...bodyClasses.value,
      'at-grid-item--last': index === props.columnNum! - 1
    }))

    const flexStyle = computed(() => ({
      flex: `0 0 ${100 / props.columnNum!}%`
    }))

    const iconInfoClasses = computed(() => (childItem) => ({
      [`${childItem.iconInfo?.prefixClass || 'at-icon'}`]: true,
      [`${childItem.iconInfo?.prefixClass || 'at-icon'
        }-${childItem.iconInfo?.value}`]: Boolean(childItem.iconInfo?.value),
      [`${childItem.iconInfo?.className}`]: Boolean(childItem.iconInfo?.className)
    }))

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
      const clickIndex = row * props.columnNum! + index
      emit('click', item, clickIndex, event)
    }

    return {
      ...toRefs(props),
      gridGroup,
      flexStyle,
      iconInfoStyle,
      gridItemClasses,
      iconInfoClasses,
      handleClick,
    }
  }
})
</script>

