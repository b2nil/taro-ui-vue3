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
      @tap="handleClick(i)"
    >{{ value }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue'
import { AtSegmentedControlProps } from "@taro-ui-vue3/types/segmented-control"
import { pxTransform } from "@taro-ui-vue3/utils"

const AtSegmentedControl = defineComponent({
  name: "AtSegmentedControl",

  emits: {
    'click'(index: number) {
      return !!(typeof index === 'number')
    }
  },

  props: {
    current: {
      type: Number,
      default: 0
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
      default: []
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

    const genItemClasses = computed(() => (i: number) => ({
      'at-segmented-control__item': true,
      'at-segmented-control__item--active': props.current === i
    }))

    const itemStyle = computed(() => ({
      color: props.selectedColor,
      fontSize: pxTransform(parseInt(`${props.fontSize!}`)),
      borderColor: props.selectedColor,
      backgroundColor: props.color
    }))

    const selectedItemStyle = computed(() => ({
      color: props.color,
      fontSize: pxTransform(parseInt(`${props.fontSize!}`)),
      borderColor: props.selectedColor,
      backgroundColor: props.selectedColor
    }))

    function handleClick(index: number) {
      if (props.disabled) return

      emit('click', index)
    }

    return {
      values: toRef(props, 'values'),
      rootStyle,
      rootClasses,
      genItemClasses,
      itemStyle,
      selectedItemStyle,
      handleClick
    }
  }
})

export default AtSegmentedControl
</script>
