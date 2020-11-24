<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    :style="rootStyle"
  >
    <view
      v-for="(value, i) in values"
      :key="i"
      :class="genItemClasses(i)"
      :style="current === i ? selectedItemStyle : itemStyle"
      @tap="handleClick(i, $event)"
    >{{ value }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSegmentedControlProps } from "types/segmented-control"
import { pxTransform } from "@/utils/common"

export default defineComponent({
  name: "AtSegmentedControl",

  emits: {
    'click'(index: number, event: CommonEvent) {
      return !!(
        typeof index === 'number' &&
        event && typeof event === 'object'
      )
    }
  },

  props: {
    current: {
      type: Number,
      default: 0,
      required: true
    },
    color: {
      type: String,
      default: '#fff'
    },
    selectedColor: {
      type: String,
      default: '#6190E8'
    },
    fontSize: {
      type: Number,
      default: 28
    },
    disabled: Boolean,
    values: {
      type: Array as PropType<AtSegmentedControlProps['values']>,
      default: [],
      required: true
    },
    onClick: {
      type: Function as PropType<AtSegmentedControlProps['onClick']>,
      default: () => (index: number, event: CommonEvent) => { },
      required: true
    }
  },

  setup(props: AtSegmentedControlProps, { emit }) {

    const rootClasses = computed(() => ({
      'at-segmented-control': true,
      'at-segmented-control--disabled': props.disabled
    }))

    const rootStyle = computed(() => ({
      borderColor: props.selectedColor
    }))

    const genItemClasses = computed(() => (i) => ({
      'at-segmented-control__item': true,
      'at-segmented-control__item--active': props.current === i
    }))

    const itemStyle = computed(() => ({
      color: props.selectedColor,
      fontSize: pxTransform(props.fontSize!),
      borderColor: props.selectedColor,
      backgroundColor: props.color
    }))

    const selectedItemStyle = computed(() => ({
      color: props.color,
      fontSize: pxTransform(props.fontSize!),
      borderColor: props.selectedColor,
      backgroundColor: props.selectedColor
    }))

    function handleClick(index: number, event: CommonEvent): void {
      if (props.disabled) return

      emit('click', index, event)
    }

    return {
      values: toRef(props, 'values'),
      rootClasses,
      rootStyle,
      itemStyle,
      genItemClasses,
      selectedItemStyle,
      handleClick
    }
  }
})
</script>
