<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    @tap="handleClick"
  >
    <view
      class="at-range__container"
      :style="containerStyle"
    >
      <view
        class="at-range__rail"
        :style="railStyle"
      >
        <view
          class="at-range__track"
          :style="atTrackStyle"
        />
        <view
          class="at-range__slider"
          :style="sliderAStyle"
          @touch-move="handleTouchMove('aX', $event)"
          @touch-end="handleTouchEnd('aX', $event)"
        />
        <view
          class="at-range__slider"
          :style="sliderBStyle"
          @touch-move="handleTouchMove('bX', $event)"
          @touch-end="handleTouchEnd('bX', $event)"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, onMounted, nextTick, computed, PropType } from 'vue'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtRangeProps, AtRangeState } from "types/range"
import {
  delayQuerySelector,
  getEventDetail,
  mergeStyle
} from "@/utils/common"

export default defineComponent({
  name: "AtRange",

  emits: {
    'change'(value: [number, number]) {
      return !!(
        value && Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === 'number' &&
        typeof value[1] === 'number'
      )
    },
    'after-change'(value: [number, number]) {
      return !!(
        value && Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === 'number' &&
        typeof value[1] === 'number'
      )
    }
  },

  props: {
    sliderStyle: {
      type: [Object, String] as PropType<AtRangeProps['sliderStyle']>,
      default: ''
    },
    railStyle: {
      type: [Object, String] as PropType<AtRangeProps['railStyle']>,
      default: ''
    },
    trackStyle: {
      type: [Object, String] as PropType<AtRangeProps['trackStyle']>,
      default: ''
    },
    value: {
      type: Array as unknown as PropType<AtRangeProps['value']>,
      default: [0, 0]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    blockSize: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    onChange: Function as PropType<AtRangeProps['onChange']>,
    onAfterChange: Function as PropType<AtRangeProps['onAfterChange']>
  },

  setup(props: AtRangeProps, { emit }) {

    const width = ref<number>(0)
    const left = ref<number>(0)
    const deltaValue = ref<number>(props.max! - props.min!)
    const currentSlider = ref<string>('')

    const state = reactive<AtRangeState>({
      aX: 0,
      bX: 0
    })

    const rootClasses = computed(() => ({
      'at-range': true,
      'at-range--disabled': props.disabled
    }))

    const sliderCommonStyle = computed(() => ({
      width: props.blockSize ? `${props.blockSize}PX` : '',
      height: props.blockSize ? `${props.blockSize}PX` : '',
      marginLeft: props.blockSize ? `${-props.blockSize / 2}PX` : ''
    }))

    const sliderAStyle = computed(() => mergeStyle(props.sliderStyle!, {
      ...sliderCommonStyle.value,
      left: `${state.aX}%`,
      top: '0%'
    }))

    const sliderBStyle = computed(() => mergeStyle(props.sliderStyle!, {
      ...sliderCommonStyle.value,
      left: `${state.bX}%`,
      top: '0%'
    }))

    const containerStyle = computed(() => ({
      height: props.blockSize ? `${props.blockSize}PX` : ''
    }))

    const atTrackStyle = computed(() => mergeStyle(props.trackStyle!, {
      left: `${Math.min(state.aX, state.bX)}%`,
      width: `${Math.abs(state.aX - state.bX)}%`
    }))

    watch(() => props.value, (value, prevValue) => {
      updatePos()

      if (
        prevValue![0] !== value![0] ||
        prevValue![1] !== value![1]
      ) {
        setValue(value!)
      }
    })

    onMounted(() => {
      updatePos()
      setValue(props.value!)
    })

    function handleClick(event: CommonEvent) {
      if (currentSlider.value && !props.disabled) {
        let sliderValue = 0
        const detail = getEventDetail(event)
        sliderValue = detail.x - left.value
        setSliderValue(currentSlider.value, sliderValue, 'onChange')
      }
    }

    function handleTouchMove(sliderName: string, event: ITouchEvent): void {
      if (props.disabled) return
      event.stopPropagation()

      const clientX = event.touches[0].clientX
      setSliderValue(sliderName, clientX - left.value, 'onChange')
    }

    function handleTouchEnd(sliderName: string): void {
      if (props.disabled) return

      currentSlider.value = sliderName
      triggerEvent('onAfterChange')
    }

    function setSliderValue(
      sliderName: string,
      targetValue: number,
      funcName: string
    ): void {
      const distance = Math.min(Math.max(targetValue, 0), width.value)
      const sliderValue = Math.floor((distance / width.value) * 100)

      if (funcName) {
        state[sliderName] = sliderValue
        nextTick(() => { triggerEvent(funcName) })
      } else {
        state[sliderName] = sliderValue
      }
    }

    function setValue(value: number[]): void {
      const aX = Math.round(((value[0] - props.min!) / deltaValue.value) * 100) // fix issue #670
      const bX = Math.round(((value[1] - props.min!) / deltaValue.value) * 100) // fix issue #670
      state.aX = aX
      state.bX = bX
    }

    function triggerEvent(funcName: string): void {
      const { aX, bX } = state
      const a = Math.round((aX / 100) * deltaValue.value) + props.min! // fix issue #670
      const b = Math.round((bX / 100) * deltaValue.value) + props.min! // fix issue #670
      const result = [a, b].sort((x, y) => x - y) as [number, number]

      if (funcName === 'onChange') {
        emit('change', result)
      } else if (funcName === 'onAfterChange') {
        emit('after-change', result)
      }
    }

    function updatePos(): void {
      delayQuerySelector(this, '.at-range__container', 10).then(rect => {
        // @ts-ignore
        width.value = Math.round(rect[0].width)
        // @ts-ignore
        left.value = Math.round(rect[0].left)
      })
    }

    return {
      rootClasses,
      handleClick,
      handleTouchMove,
      handleTouchEnd,
      containerStyle,
      atTrackStyle,
      sliderAStyle,
      sliderBStyle
    }
  }
})
</script>