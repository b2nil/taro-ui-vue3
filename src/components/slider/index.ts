import { reactive, watch, computed, h, defineComponent, mergeProps, PropType } from 'vue'
import { Slider, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSliderProps, AtSliderState } from 'types/slider'

const AtSlider = defineComponent({
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
      type: Function as PropType<AtSliderProps['onChange']>,
      default: () => (value: number) => { }
    },
    onChanging: {
      type: Function as PropType<AtSliderProps['onChange']>,
      default: () => (value: number) => { }
    },
  },

  setup(props: AtSliderProps, { attrs, slots }) {

    const state = reactive<AtSliderState>({
      _value: clampNumber(props.value!, props.min!, props.max!)
    })

    const precision = computed(() => 10 ** countDecimals(props.step))

    const rootClass = computed(() => ({
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

    function handleChanging(e: CommonEvent): void {
      const { _value } = state
      let { value }: { value: number } = e.detail

      value = ensurePrecision(value)

      if (value !== _value) {
        state._value = value
      }
      props.onChanging && props.onChanging(value)
    }

    function handleChange(e: CommonEvent): void {
      let { value } = e.detail
      value = ensurePrecision(value)

      state._value = value
      props.onChange && props.onChange(value)
    }

    watch(() => [
      props.value,
      props.min,
      props.max
    ], ([value, min, max]) => {
      state._value = clampNumber(value!, min!, max!)
    })

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
      }), {
        default: () => [
          h(View, {
            class: 'at-slider__inner'
          }, {
            default: () => [
              h(Slider, {
                min: props.min,
                max: props.max,
                step: props.step,
                value: state._value,
                disabled: props.disabled,
                activeColor: props.activeColor,
                backgroundColor: props.backgroundColor,
                blockSize: props.blockSize,
                blockColor: props.blockColor,
                onChange: handleChange,
                onChanging: handleChanging,
              })
            ]
          }),

          props.showValue && (
            h(View, {
              class: 'at-slider__text'
            }, { default: () => `${state._value}` })
          )
        ]
      })
    )
  }
})

export default AtSlider