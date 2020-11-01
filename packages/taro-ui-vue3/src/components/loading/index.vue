<template>
  <view
    class="at-loading"
    :style="sizeStyle"
  >
    <view
      class="at-loading__ring"
      v-for="(_, index) in Array.apply(null, {length: 3})"
      :key="index"
      :style="ringStyle"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { pxTransform } from '../../utils/common'
import { AtComponent } from 'types/base'


interface AtLoadingProps extends AtComponent {
  size?: string | number
  color?: string | number
}

export default defineComponent({
  name: "AtLoading",



  props: {
    size: { type: [String, Number], default: 0 },
    color: { type: [String, Number], default: '' }
  },

  setup(props: AtLoadingProps) {
    const loadingSize = computed(() => typeof props.size === 'string'
      ? props.size
      : String(props.size)
    )

    const sizeStyle = computed(() => ({
      width: props.size ? `${pxTransform(parseInt(loadingSize.value))}` : '',
      height: props.size ? `${pxTransform(parseInt(loadingSize.value))}` : '',
    }))

    const colorStyle = computed(() => ({
      border: props.color ? `1px solid ${props.color}` : '',
      'border-color':
        props.color
          ? `${props.color} transparent transparent transparent`
          : '',
    }))

    const ringStyle = computed(() => Object.assign({}, colorStyle.value, sizeStyle.value))

    return {
      sizeStyle,
      ringStyle
    }
  }
})
</script>