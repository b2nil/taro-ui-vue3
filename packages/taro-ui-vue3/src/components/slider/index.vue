<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <view class="at-slider__inner">
      <slider
        :min="min"
        :max="max"
        :step="step"
        :value="_value"
        :disabled="disabled"
        :active-color="activeColor"
        :background-color="backgroundColor"
        :block-size="blockSize"
        :block-color="blockColor"
        @changing="handleChanging"
        @change="handleChange"
      />
    </view>
    <view
      class="at-slider__text"
      v-if="showValue"
    >{{ `${_value}` }}</view>
  </view>
</template>

<script lang="ts">
import { reactive, watch, computed, defineComponent, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSliderProps, AtSliderState } from 'types/slider'

export default defineComponent({
  name: "AtSlider",

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
    disabled: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: '#6190e8'
    },
    backgroundColor: {
      type: String,
      default: '#e9e9e9'
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
    showValue: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function as unknown as () => AtSliderProps['onChange'],
      default: () => (value: number) => { }
    },
    onChanging: {
      type: Function as unknown as () => AtSliderProps['onChange'],
      default: () => (value: number) => { }
    },
  },

  setup(props: AtSliderProps, { slots }) {

    const state = reactive<AtSliderState>({
      _value: clampNumber(props.value!, props.min!, props.max!)
    })

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-slider--disabled': props.disabled,
      'at-slider': true,
    }))

    watch(() => [
      props.value,
      props.min,
      props.max
    ], ([value, min, max]) => {
      state._value = clampNumber(value!, min!, max!)
    })

    function clampNumber(
      value: number,
      lower: number,
      upper: number
    ): number {
      return Math.max(lower, Math.min(upper, value))
    }

    function handleChanging(e: CommonEvent): void {
      const { _value } = state
      const { value }: { value: number } = e.detail

      if (value !== _value) {
        state._value = value
      }
      props.onChanging && props.onChanging(value)
    }

    function handleChange(e: CommonEvent): void {
      const { value } = e.detail

      state._value = value
      props.onChange && props.onChange(value)
    }

    return {
      ...toRefs(props),
      ...toRefs(state),
      rootClass,
      handleChanging,
      handleChange
    }
  }
})
</script>

