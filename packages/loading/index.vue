<template>
  <view
    v-bind="$attrs"
    class="at-loading"
    :style="sizeStyle"
  >
    <view
      v-for="n in 3"
      :key="n"
      :style="ringStyle"
      class="at-loading__ring"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { pxTransform } from "@taro-ui-vue3/utils"
import { AtComponent } from "@taro-ui-vue3/types/base"

interface AtLoadingProps extends AtComponent {
  size?: string | number
  color?: string | number
}

const AtLoading = defineComponent({
  name: "AtLoading",

  props: {
    size: { type: [String, Number], default: 0 },
    color: { type: [String, Number], default: '' }
  },

  setup(props: AtLoadingProps) {
    const loadingSize = computed(() => {
      return pxTransform(parseInt(`${props.size || 0}`))
    })

    const sizeStyle = computed(() => ({
      width: loadingSize.value,
      height: loadingSize.value
    }))

    const ringStyle = computed(() => ({
      ...sizeStyle.value,
      border: props.color ? `1px solid ${props.color}` : '',
      'border-color':
        props.color
          ? `${props.color} transparent transparent transparent`
          : ''
    }))

    return {
      sizeStyle,
      ringStyle
    }
  }
})

export default AtLoading
</script>