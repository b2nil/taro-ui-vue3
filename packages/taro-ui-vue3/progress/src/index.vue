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
import { defineComponent, toRefs, computed, toRef, PropType } from 'vue'
import { AtProgressProps } from "@taro-ui-vue3/types/progress"

export default defineComponent({
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

    const { percent } = toRefs(props)

    if (percent!.value! < 0) {
      percent!.value = 0
    } else if (percent!.value! > 100) {
      percent!.value = 100
    }

    const rootClasses = computed(() => ({
      'at-progress': true,
      [`at-progress--${props.status}`]: !!props.status
    }))

    const iconClasses = computed(() => ({
      'at-icon': true,
      'at-icon-close-circle': props.status === 'error',
      'at-icon-check-circle': props.status === 'success'
    }))

    const progressStyle = computed(() => ({
      width: percent!.value ? `${+percent!.value}%` : '0%',
      height: props.strokeWidth && `${+props.strokeWidth}px`,
      backgroundColor: props.color
    }))

    return {
      hidePercent: toRef(props, 'hidePercent'),
      status: toRef(props, 'status'),
      rootClasses,
      iconClasses,
      progressStyle,
      percent,
    }
  }
})
</script>

