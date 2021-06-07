<template>
  <view
    v-bind="$attrs"
    :class="['at-countdown', {'at-countdown--card': isCard }]"
  >
    <at-countdown-item
      v-if="isShowDay"
      :num="day_"
      :separator="format?.day"
    />
    <at-countdown-item
      v-if="isShowHour"
      :num="hours_"
      :separator="format?.hours"
    />
    <at-countdown-item
      :num="minutes_"
      :separator="format?.minutes"
    />
    <at-countdown-item
      :num="seconds_"
      :separator="format?.seconds"
    />
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  reactive,
  onMounted,
  onUnmounted,
  toRefs,
  PropType
} from "vue"

import {
  AtCountDownProps,
  AtCountdownState
} from "@taro-ui-vue3/types/countdown"

import AtCountdownItem from "./item/index.vue"

const toSeconds = (
  day: number,
  hours: number,
  minutes: number,
  seconds: number
): number => day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds

const AtCountdown = defineComponent({
  name: "AtCountdown",

  components: {
    AtCountdownItem
  },

  emits: ['time-up'],

  props: {
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
    }
  },

  onShow() {
    this.setTimer()
  },

  onHide() {
    this.clearTimer()
  },

  setup(props: AtCountDownProps, { emit }) {

    const { format, isCard, isShowDay, isShowHour } = toRefs(props)
    const timer = ref<NodeJS.Timeout | number | null>(null)

    const secondsRef = ref<number>(toSeconds(
      props.day!,
      props.hours!,
      props.minutes!,
      props.seconds!
    ))

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
      let [day_, hours_, minutes_, seconds_] = [0, 0, 0, 0]

      if (secondsRef.value > 0) {
        day_ = props.isShowDay
          ? Math.floor(secondsRef.value / (60 * 60 * 24))
          : 0

        hours_ = Math.floor(secondsRef.value / (60 * 60)) - day_ * 24
        minutes_ = Math.floor(secondsRef.value / 60) - day_ * 24 * 60 - hours_ * 60
        seconds_ =
          Math.floor(secondsRef.value) -
          day_ * 24 * 60 * 60 -
          hours_ * 60 * 60 -
          minutes_ * 60
      }

      return {
        day_,
        hours_,
        minutes_,
        seconds_
      }
    }

    function countdown() {
      Object.assign(state, calculateTime())
      secondsRef.value--

      if (secondsRef.value < 0) {
        clearTimer()
        emit('time-up')
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

    return {
      ...toRefs(state),
      format,
      isCard,
      isShowDay,
      isShowHour
    }
  }
})

export default AtCountdown
</script>

