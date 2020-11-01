<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <view
      v-for="(cls, i) in starColorClasses"
      :key="i"
      :class="cls"
      :style="iconStyle"
      @tap="handleClick(i+1)"
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
import { defineComponent, computed, toRef } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtRateProps } from 'types/rate'
import { pxTransform } from '../../utils/common'


export default defineComponent({
  name: "AtRate",



  props: {
    size: {
      type: Number,
      default: 20
    },
    value: {
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
    },
    onChange: Function as unknown as () => AtRateProps['onChange']
  },

  setup(props: AtRateProps, { slots }) {

    const rootClasses = computed(() => ({
      'at-rate': true,
      [props.className]: true,
    }))

    const iconStyle = computed(() => ({
      marginRight: pxTransform(props.margin!)
    }))

    const starIconStyle = computed(() => ({
      fontSize: props.size ? `${props.size}px` : ''
    }))

    // 生成星星颜色 className 数组，方便在jsx中直接map
    const starColorClasses = computed(() => {
      const classNameArr: string[] = []
      const floorValue = Math.floor(props.value!)
      const ceilValue = Math.ceil(props.value!)
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

    function handleClick(event: CommonEvent): void {
      props.onChange && props.onChange(event)
    }

    return {
      customStyle: toRef(props, 'customStyle'),
      rootClasses,
      iconStyle,
      starIconStyle,
      starColorClasses,
      handleClick
    }
  }
})
</script>

