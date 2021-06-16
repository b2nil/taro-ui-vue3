<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <view class="at-slider__inner">
      <slider
        :min="min"
        :max="max"
        :step="step"
        :value="value_"
        :disabled="disabled"
        :block-size="blockSize"
        :block-color="blockColor"
        :active-color="activeColor"
        :background-color="backgroundColor"
        @change="handleChange"
        @changing="handleChanging"
      />
    </view>

    <view
      v-if="showValue"
      class="at-slider__text"
    >{{ value_ }}</view>
  </view>
</template>

<script lang="ts">
import { reactive, watch, computed, defineComponent, toRefs, toRef } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSliderProps } from "@taro-ui-vue3/types/slider"

const AtSlider = defineComponent({
  name: "AtSlider",

  emits: ['change', 'changing'],

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    showValue: Boolean,
    activeColor: {
      type: String,
      default: '#6190e8'
    },
    blockSize: {
      type: Number,
      default: 28,
      validator: (val: number) => val >= 12 && val <= 28
    },
    blockColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundColor: {
      type: String,
      default: '#e9e9e9'
    }
  },

  setup(props: AtSliderProps, { emit }) {
    const state = reactive({
      _value: clampNumber(props.value!, props.min!, props.max!)
    })

    const precision = computed(() => 10 ** countDecimals(props.step!))

    const rootClasses = computed(() => ({
      'at-slider': true,
      'at-slider--disabled': props.disabled
    }))

    function clampNumber(
      value: number,
      lower: number,
      upper: number
    ): number {
      return Math.max(lower, Math.min(upper, value))
    }

    function countDecimals(value: number) {
      if (Math.floor(value) === value) return 0
      return value.toString().split(".")[1].length || 0
    }

    function ensurePrecision(value: number) {
      return Math.round((value + Number.EPSILON) * precision.value) / precision.value
    }

    function handleChanging(e: CommonEvent) {
      const { _value } = state
      let { value }: { value: number } = e.detail

      value = ensurePrecision(value)

      if (value !== _value) {
        state._value = value
      }

      emit('changing', value)
    }

    function handleChange(e: CommonEvent) {
      let { value } = e.detail
      value = ensurePrecision(value)

      state._value = value
      emit('change', value)
    }

    watch(() => [
      props.value,
      props.min,
      props.max
    ], ([value, min, max]) => {
      state._value = clampNumber(value!, min!, max!)
    })

    return {
      ...toRefs(props),
      value_: toRef(state, '_value'),
      rootClasses,
      handleChange,
      handleChanging,
    }
  }
})

export default AtSlider
</script>

