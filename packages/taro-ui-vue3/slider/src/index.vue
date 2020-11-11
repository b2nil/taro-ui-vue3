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
        :value="_value"
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
    >{{ `${_value}` }}</view>
  </view>
</template>

<script lang="ts">
import { reactive, watch, computed, defineComponent, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSliderProps, AtSliderState } from "@taro-ui-vue3/types/slider"

export default defineComponent({
  name: "AtSlider",

  emits: {
    'change'(value: number) {
      return !!(value && typeof value === 'number')
    },
    'changing'(value: number) {
      return !!(value && typeof value === 'number')
    }
  },

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
    }
  },

  setup(props: AtSliderProps, { emit }) {

    const state = reactive<AtSliderState>({
      _value: clampNumber(props.value!, props.min!, props.max!)
    })

    const rootClasses = computed(() => ({
      'at-slider': true,
      'at-slider--disabled': props.disabled
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

      emit('changing', value)
    }

    function handleChange(e: CommonEvent): void {
      const { value } = e.detail

      state._value = value
      emit('change', value)
    }

    return {
      ...toRefs(props),
      ...toRefs(state),
      rootClasses,
      handleChange,
      handleChanging
    }
  }
})
</script>

