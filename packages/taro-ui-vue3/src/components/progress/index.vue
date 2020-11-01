<template>
  <view :class="rootClasses">
    <view class="at-progress__outer">
      <view class="at-progress__outer-inner">
        <view
          class="at-progress__outer-inner-background"
          :style="progressStyle"
        />
      </view>
    </view>

    <view
      v-if="!isHidePercent"
      class="at-progress__content"
    >
      <text v-if="!status || status === 'progress'">{{ `${percent}%` }}</text>
      <text
        v-else
        :class="iconClass"
      />
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed, toRef } from 'vue'
import { AtProgressProps } from 'types/progress'


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
    isHidePercent: Boolean,
  },

  setup(props: AtProgressProps, { slots }) {

    const { percent } = toRefs(props)

    if (percent!.value! < 0) {
      percent!.value = 0
    } else if (percent!.value! > 100) {
      percent!.value = 100
    }

    const rootClasses = computed(() => ({
      [props.className]: true,
      [`at-progress--${props.status}`]: !!props.status,
      'at-progress': true,
    }))

    const iconClass = computed(() => ({
      'at-icon-close-circle': props.status === 'error',
      'at-icon-check-circle': props.status === 'success',
      'at-icon': true,
    }))

    const progressStyle = computed(() => ({
      width: percent!.value ? `${+percent!.value}%` : '0%',
      height: props.strokeWidth && `${+props.strokeWidth}px`,
      backgroundColor: props.color
    }))

    return {
      isHidePercent: toRef(props, 'isHidePercent'),
      status: toRef(props, 'status'),
      rootClasses,
      iconClass,
      progressStyle,
      percent,
    }
  }
})
</script>

