<template>
  <view
    :class="rootClass"
    :style="rootStyle"
  >
    <view
      v-for="(value, i) in values"
      :key="i"
      :class="itemClass(i)"
      :style="itemStyle(i)"
      @tap="handleClick(i, $event)"
    >{{ value }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSegmentedControlProps } from 'types/segmented-control'
import { mergeStyle, pxTransform } from '../../utils/common'
import AtComponentWithDefaultProps from '../mixins'

export default defineComponent({
  name: "AtSegmentedControl",

  mixins: [AtComponentWithDefaultProps],

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
    disabled: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array as () => AtSegmentedControlProps['values'],
      default: [],
      required: true
    },
    onClick: {
      type: Function as unknown as () => AtSegmentedControlProps['onClick'],
      default: () => (index: number, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtSegmentedControlProps, { slots }) {

    const rootClass = computed(() => mergeStyle(props.customStyle, {
      'at-segmented-control': true,
      'at-segmented-control--disabled': props.disabled,
      [props.className]: true
    }))

    const rootStyle = computed(() => ({
      borderColor: props.selectedColor
    }))

    const itemClass = computed(() => (i) => ({
      'at-segmented-control__item': true,
      'at-segmented-control__item--active': props.current === i,
    }))

    const itemStyle = computed(() => (i) => ({
      color: props.current === i ? props.color : props.selectedColor,
      fontSize: pxTransform(props.fontSize!),
      borderColor: props.selectedColor,
      backgroundColor: props.current === i ? props.selectedColor : props.color
    }))

    function handleClick(index: number, event: CommonEvent): void {
      if (props.disabled) return

      props.onClick(index, event)
    }

    return {
      values: toRef(props, 'values'),
      rootClass,
      rootStyle,
      itemClass,
      itemStyle,
      handleClick
    }
  }
})
</script>
