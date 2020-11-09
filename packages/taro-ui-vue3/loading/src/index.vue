<template>
  <view
    v-bind="$attrs"
    class="at-loading"
    :style="sizeStyle"
  >
    <view
      v-for="(_, index) in Array.apply(null, {length: 3})"
      :key="index"
      :style="ringStyle"
      class="at-loading__ring"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { pxTransform } from "@taro-ui-vue3/utils/common"
import { AtComponent } from "@taro-ui-vue3/types/base"


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

    const ringStyle = computed(() => ({
      ...sizeStyle.value,
      border: props.color ? `1px solid ${props.color}` : '',
      'border-color':
        props.color
          ? `${props.color} transparent transparent transparent`
          : '',
    }))

    return {
      sizeStyle,
      ringStyle
    }
  }
})
</script>