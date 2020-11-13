<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <at-countdown-item
      v-if="isShowDay"
      :num="day"
      :separator="format.day"
    />
    <at-countdown-item
      v-if="isShowHour"
      :num="hours"
      :separator="format.hours"
    />
    <at-countdown-item
      :num="minutes"
      :separator="format.minutes"
    />
    <at-countdown-item
      :num="seconds"
      :separator="format.seconds"
    />
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
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

export default defineComponent({
  name: "AtCountdown",

  components: {
    AtCountdownItem
  },

  emits: ['time-up'],

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
    }
  },

  onShow() {
    this.setTimer()
  },

  onHide() {
    this.clearTimer()
  },

  setup(props: AtCountDownProps, { emit }) {

    const { format, isShowDay, isShowHour } = toRefs(props)
    const timer = ref<NodeJS.Timeout | number | null>(null)

    const secondsRef = ref<number>(toSeconds(
      props.day!,
      props.hours!,
      props.minutes!,
      props.seconds!
    ))

    const state = reactive<AtCountdownState>(calculateTime())

    const rootClasses = computed(() => ({
      'at-countdown--card': props.isCard,
      'at-countdown': true
    }))

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
      let [day, hours, minutes, seconds] = [0, 0, 0, 0]

      if (secondsRef.value > 0) {
        day = props.isShowDay
          ? Math.floor(secondsRef.value / (60 * 60 * 24))
          : 0

        hours = Math.floor(secondsRef.value / (60 * 60)) - day * 24
        minutes = Math.floor(secondsRef.value / 60) - day * 24 * 60 - hours * 60
        seconds =
          Math.floor(secondsRef.value) -
          day * 24 * 60 * 60 -
          hours * 60 * 60 -
          minutes * 60
      }

      return {
        day,
        hours,
        minutes,
        seconds
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
      rootClasses,
      format,
      isShowDay,
      isShowHour
    }
  }
})
</script>

