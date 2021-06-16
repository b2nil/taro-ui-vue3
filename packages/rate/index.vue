<template>
  <view
    v-bind="$attrs"
    class="at-rate"
  >
    <view
      v-for="(className, i) in iconColorClasses"
      :key="`at-rate-star-${i}`"
      :class="className"
      :style="iconMarginStyle"
      @tap="handleClick(i + 1)"
    >
      <text
        :class="['at-icon', `at-icon-${icon}-2`]"
        :style="genIconStyle(className)"
      />
      <view class="at-rate__left">
        <text
          :class="['at-icon', `at-icon-${icon}-2`]"
          :style="genIconStyle(className)"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { AtRateProps } from "@taro-ui-vue3/types/rate"
import { useModelValue } from '@taro-ui-vue3/composables'
import { pxTransform, convertToUnit } from '@taro-ui-vue3/utils'

const AtRate = defineComponent({
  name: "AtRate",

  emits: ['update:modelValue'],

  props: {
    size: {
      type: [Number, String],
      default: 20,
      validator: (prop: number | string) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    modelValue: { type: Number, default: 0 },
    max: {
      type: [Number, String],
      default: 5,
      validator: (prop: number | string) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    margin: {
      type: [Number, String],
      default: 5,
      validator: (prop: number | string) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    icon: {
      type: String as PropType<AtRateProps['icon']>,
      default: 'star',
      validator: (prop: string) => ['star', 'heart'].includes(prop)
    },
    color: { type: String, default: '#FFCA3E' }
  },

  setup(props: AtRateProps, { emit }) {

    const modelValue = useModelValue(props, emit)

    const iconMarginStyle = computed(() => ({
      marginRight: pxTransform(parseInt(`${props.margin!}`))
    }))

    const genIconStyle = computed(() => (cls: string) => ({
      fontSize: convertToUnit(props.size),
      color: cls.includes('at-rate__icon--on') ? props.color : ''
    }))

    // 生成星星颜色 className 数组
    const iconColorClasses = computed(() => {
      const classNames: string[] = []
      const floorValue = Math.floor(props.modelValue!)
      const ceilValue = Math.ceil(props.modelValue!)

      for (let i = 0; i < parseInt(`${props.max!}`); i++) {
        if (floorValue > i) {
          classNames.push('at-rate__icon at-rate__icon--on')
        } else if (ceilValue - 1 === i) {
          classNames.push('at-rate__icon at-rate__icon--half')
        } else {
          classNames.push('at-rate__icon at-rate__icon--off')
        }
      }

      return classNames
    })

    function handleClick(index: number) {
      modelValue.value = index
    }

    return {
      genIconStyle,
      iconMarginStyle,
      iconColorClasses,
      handleClick
    }
  }
})

export default AtRate
</script>

