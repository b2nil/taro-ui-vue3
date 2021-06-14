<template>
  <view
    v-bind="$attrs"
    :class="['at-modal__footer', {
      'at-modal__footer--simple': Boolean($props.isSimple)
    }]"
  >
    <view class="at-modal__action">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const AtModalAction = defineComponent({
  name: "AtModalAction",

  props: {
    isSimple: Boolean
  }
})

export default AtModalAction
</script>

