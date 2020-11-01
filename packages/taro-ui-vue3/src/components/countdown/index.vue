<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <at-countdown-item
      v-if="isShowDay"
      :num="_day"
      :separator="format.day"
    />
    <at-countdown-item
      v-if="isShowHour"
      :num="_hours"
      :separator="format.hours"
    />
    <at-countdown-item
      :num="_minutes"
      :separator="format.minutes"
    />
    <at-countdown-item
      :num="_seconds"
      :separator="format.seconds"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive, onMounted, onUnmounted, toRefs, PropType } from "../../api"
import { AtCountDownProps, AtCountdownState } from 'types/countdown'


import AtCountdownItem from "./item"

import './index.scss'

const toSeconds = (
  day: number,
  hours: number,
  minutes: number,
  seconds: number
): number => day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds

export default defineComponent({
  name: "AtCountdown",



  props: {
    // 参数
    isCard: Boolean,
    isShowDay: Boolean,
    isShowHour: { type: Boolean, default: true },
    format: {
      type: Object as PropType<AtCountDownProps['format']>,
      default: () => ({
        day: '天',
        hours: '时',
        minutes: '分',
        seconds: '秒'
      }),
    },
    day: {
      type: Number as PropType<AtCountDownProps['day']>,
      default: 0,
    },
    hours: {
      type: Number as PropType<AtCountDownProps['hours']>,
      default: 0,
    },
    minutes: {
      type: Number as PropType<AtCountDownProps['minutes']>,
      default: 0,
    },
    seconds: {
      type: Number as PropType<AtCountDownProps['seconds']>,
      default: 0,
    },
    // 事件
    onTimeUp: Function as unknown as () => AtCountDownProps['onTimeUp']
  },

  onShow() {
    this.setTimer()
  },

  onHide() {
    this.clearTimer()
  },

  setup(props: AtCountDownProps) {
    const secondsRef = ref<number>(toSeconds(
      props.day!,
      props.hours!,
      props.minutes!,
      props.seconds!
    ))
    // @ts-ignore
    const timer = ref<NodeJS.Timeout | number | null>(null)

    const state = reactive<AtCountdownState>(calculateTime())

    watch(() => [
      props.day,
      props.hours,
      props.minutes,
      props.seconds
    ], ([
      day,
      hours,
      minutes,
      seconds
    ]) => {
      secondsRef.value = toSeconds(day!, hours!, minutes!, seconds!)
      clearTimer()
      setTimer()
    })

    function setTimer() {
      if (!timer.value) countdown()
    }

    function clearTimer() {
      if (timer.value) {
        clearTimeout(timer.value as number)
      }
    }

    function calculateTime(): AtCountdownState {
      let [_day, _hours, _minutes, _seconds] = [0, 0, 0, 0]

      if (secondsRef.value > 0) {
        _day = props.isShowDay
          ? Math.floor(secondsRef.value / (60 * 60 * 24))
          : 0

        _hours = Math.floor(secondsRef.value / (60 * 60)) - _day * 24
        _minutes = Math.floor(secondsRef.value / 60) - _day * 24 * 60 - _hours * 60
        _seconds =
          Math.floor(secondsRef.value) -
          _day * 24 * 60 * 60 -
          _hours * 60 * 60 -
          _minutes * 60
      }

      return {
        _day,
        _hours,
        _minutes,
        _seconds
      }
    }

    function countdown() {
      Object.assign(state, calculateTime())
      secondsRef.value--

      if (secondsRef.value < 0) {
        clearTimer()
        props.onTimeUp && props.onTimeUp()
        return
      }

      timer.value = setTimeout(() => {
        countdown()
      }, 1000)
    }

    onMounted(() => {
      setTimer()
    })

    onUnmounted(() => {
      clearTimer()
    })

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-countdown': true,
      'at-countdown--card': props.isCard
    }))

    const { customStyle, format, isShowDay, isShowHour } = toRefs(props)

    return {
      ...toRefs(state),
      rootClasses,
      customStyle,
      format,
      isShowDay,
      isShowHour
    }
  }
})
</script>

