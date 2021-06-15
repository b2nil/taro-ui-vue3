<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <view class="at-progress__outer">
      <view class="at-progress__outer-inner">
        <view
          class="at-progress__outer-inner-background"
          :style="progressStyle"
        />
      </view>
    </view>

    <view
      v-if="!hidePercent"
      class="at-progress__content"
    >
      <text v-if="!status || status === 'progress'">{{ `${percent}%` }}</text>
      <text
        v-else
        :class="iconClasses"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue'
import { AtProgressProps } from "@taro-ui-vue3/types/progress"

const AtProgress = defineComponent({
  name: "AtProgress",

  props: {
    color: {
      type: String as PropType<AtProgressProps['color']>,
      default: ''
    },
    status: {
      type: String as PropType<AtProgressProps['status']>,
      validator: (val: string) => ['progress', 'error', 'success'].includes(val)
    },
    percent: {
      type: Number as PropType<AtProgressProps['percent']>,
      default: 0
    },
    strokeWidth: {
      type: Number as PropType<AtProgressProps['strokeWidth']>,
      default: 10
    },
    hidePercent: Boolean,
  },

  setup(props: AtProgressProps) {

    const percent = computed(() => {
      let p = props.percent

      if (props.percent! < 0) {
        p = 0
      }

      if (props.percent! > 100) {
        p = 100
      }

      return p
    })

    const rootClasses = computed(() => (['at-progress', {
      [`at-progress--${props.status}`]: !!props.status
    }]))

    const iconClasses = computed(() => (['at-icon', {
      'at-icon-close-circle': props.status === 'error',
      'at-icon-check-circle': props.status === 'success'
    }]))

    const progressStyle = computed(() => ({
      width: `${percent.value}%`,
      height: props.strokeWidth && `${props.strokeWidth}px`,
      backgroundColor: props.color
    }))

    return {
      status: toRef(props, 'status'),
      hidePercent: toRef(props, 'hidePercent'),
      percent,
      rootClasses,
      iconClasses,
      progressStyle
    }
  }
})

export default AtProgress
</script>

