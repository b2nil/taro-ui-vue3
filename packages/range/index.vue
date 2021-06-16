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
          v-for="(sliderName, index) in ['aX', 'bX']"
          :key="`${sliderName} - ${index}`"
          :style="sliderName === 'aX' ? sliderAStyle : sliderBStyle"
          class="at-range__slider"
          @touchend="handleTouchend(sliderName)"
          @touchmove="handleTouchmove(sliderName, $event)"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  onMounted,
  nextTick,
  computed,
  PropType,
  toRef
} from 'vue'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtRangeProps, AtRangeState } from "@taro-ui-vue3/types/range"
import {
  delayQuerySelector,
  getEventDetail,
  cssStringToObject
} from "@taro-ui-vue3/utils"
import { useModelValue } from "@taro-ui-vue3/composables"

const AtRange = defineComponent({
  name: "AtRange",

  emits: {
    'update:modelValue'(value: [number, number]) {
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
    modelValue: {
      type: Array as unknown as PropType<AtRangeProps['modelValue']>,
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
    onAfterChange: Function as unknown as PropType<AtRangeProps['onAfterChange']>
  },

  setup(props: AtRangeProps, { emit }) {
    const left = ref<number>(0)
    const width = ref<number>(0)
    const currentSlider = ref<string>('')
    const rangeValue = useModelValue(props, emit)
    const deltaValue = computed<number>(() => props.max! - props.min!)

    const state = reactive<AtRangeState>({
      aX: 0,
      bX: 0
    })

    const rootClasses = computed(() => (['at-range', {
      'at-range--disabled': props.disabled
    }]))

    const containerStyle = computed(() => ({
      height: props.blockSize ? `${props.blockSize}PX` : ''
    }))

    const sliderCommonStyle = computed(() => ({
      width: props.blockSize ? `${props.blockSize}PX` : '',
      height: props.blockSize ? `${props.blockSize}PX` : '',
      marginLeft: props.blockSize ? `${-props.blockSize / 2}PX` : ''
    }))

    const sliderAStyle = computed(() => ({
      ...sliderCommonStyle.value,
      ...(
        typeof props.sliderStyle! === 'string'
          ? cssStringToObject(props.sliderStyle!)
          : props.sliderStyle!
      ),
      left: `${state.aX}%`,
      top: '0%'
    }))

    const sliderBStyle = computed(() => ({
      ...sliderCommonStyle.value,
      ...(
        typeof props.sliderStyle! === 'string'
          ? cssStringToObject(props.sliderStyle!)
          : props.sliderStyle!
      ),
      left: `${state.bX}%`,
      top: '0%'
    }))

    const atTrackStyle = computed(() => ({
      ...(
        typeof props.trackStyle! === 'string'
          ? cssStringToObject(props.trackStyle!)
          : props.trackStyle!
      ),
      left: `${Math.min(state.aX, state.bX)}%`,
      width: `${Math.abs(state.aX - state.bX)}%`
    }))

    function handleClick(event: CommonEvent) {
      if (currentSlider.value && !props.disabled) {
        let sliderValue = 0
        const detail = getEventDetail(event)
        sliderValue = detail.x - left.value
        setSliderValue(currentSlider.value, sliderValue, 'onChange')
      }
    }

    function handleTouchmove(sliderName: string, event: ITouchEvent) {
      if (props.disabled) return
      event.stopPropagation()

      const clientX = event.touches[0].clientX
      setSliderValue(sliderName, clientX - left.value, 'onChange')
    }

    function handleTouchend(sliderName: string) {
      if (props.disabled) return

      currentSlider.value = sliderName
      triggerEvent('onAfterChange')
    }

    function setSliderValue(
      sliderName: string,
      targetValue: number,
      funcName: string
    ) {
      const distance = Math.min(Math.max(targetValue, 0), width.value)
      const sliderValue = Math.floor((distance / width.value) * 100)

      if (funcName) {
        state[sliderName] = sliderValue
        nextTick(() => { triggerEvent(funcName) })
      } else {
        state[sliderName] = sliderValue
      }
    }

    function setValue(value: number[]) {
      const aX = Math.round(((value[0] - props.min!) / deltaValue.value) * 100) // fix issue #670
      const bX = Math.round(((value[1] - props.min!) / deltaValue.value) * 100) // fix issue #670
      state.aX = aX
      state.bX = bX
    }

    function triggerEvent(funcName: string) {
      const { aX, bX } = state
      const a = Math.round((aX / 100) * deltaValue.value) + props.min! // fix issue #670
      const b = Math.round((bX / 100) * deltaValue.value) + props.min! // fix issue #670
      const result = [a, b].sort((x, y) => x - y) as [number, number]

      if (funcName === 'onChange') {
        rangeValue.value = result
      } else if (funcName === 'onAfterChange') {
        emit('after-change', result)
      }
    }

    function updatePos() {
      delayQuerySelector(this, '.at-range__container', 10).then(rect => {
        // @ts-ignore
        width.value = Math.round(rect[0].width)
        // @ts-ignore
        left.value = Math.round(rect[0].left)
      })
    }

    watch(rangeValue, (value, prevValue) => {
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
      setValue(rangeValue.value)
    })

    return {
      railStyle: toRef(props, 'railStyle'),
      rootClasses,
      sliderAStyle,
      sliderBStyle,
      atTrackStyle,
      containerStyle,
      handleClick,
      handleTouchend,
      handleTouchmove
    }
  }
})

export default AtRange
</script>