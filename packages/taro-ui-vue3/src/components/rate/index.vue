<template>
  <view
    v-bind="$attrs"
    class="at-rate"
  >
    <view
      v-for="(cls, i) in starColorClasses"
      :key="i"
      :class="cls"
      :style="iconStyle"
      @tap="$emit('update:modelValue', i+1)"
    >
      <text
        class="at-icon at-icon-star-2"
        :style="starIconStyle"
      />
      <view class="at-rate__left">
        <text
          class="at-icon at-icon-star-2"
          :style="starIconStyle"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AtRateProps } from "types/rate"
import { pxTransform } from "@/utils/common"

export default defineComponent({
  name: "AtRate",

  emits: ['update:modelValue'],

  props: {
    size: {
      type: Number,
      default: 20
    },
    modelValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    margin: {
      type: Number,
      default: 5
    }
  },

  setup(props: AtRateProps) {

    const modelValue = computed(() => props.modelValue)

    const iconStyle = computed(() => ({
      marginRight: pxTransform(props.margin!)
    }))

    const starIconStyle = computed(() => ({
      fontSize: props.size ? `${props.size}px` : ''
    }))

    // 生成星星颜色 className 数组，方便在jsx中直接map
    const starColorClasses = computed(() => {
      const classNameArr: string[] = []
      const floorValue = Math.floor(modelValue.value)
      const ceilValue = Math.ceil(modelValue.value)
      for (let i = 0; i < props.max!; i++) {
        if (floorValue > i) {
          classNameArr.push('at-rate__icon at-rate__icon--on')
        } else if (ceilValue - 1 === i) {
          classNameArr.push('at-rate__icon at-rate__icon--half')
        } else {
          classNameArr.push('at-rate__icon at-rate__icon--off')
        }
      }
      return classNameArr
    })

    return {
      iconStyle,
      starIconStyle,
      starColorClasses
    }
  }
})
</script>

