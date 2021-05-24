<template>
  <view
    class="btn-fab"
    v-bind="$attrs"
  >
    <at-fab
      :size="size"
      @click="handleClick"
    >
      <text v-if="btnText">{{ btnText }}</text>
      <text
        v-if="btnIcon && !btnText"
        :class="iconClasses"
      />
    </at-fab>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import Taro from "@tarojs/taro"

export default defineComponent({
  name: 'NavButton',

  props: {
    to: {
      type: String as PropType<'home' | 'back'>,
      default: 'home'
    },
    size: {
      type: String as PropType<'small' | 'normal'>,
      default: 'small'
    },
    btnIcon: {
      type: String,
      default: 'home'
    },
    btnText: String
  },

  setup(props, { attrs }) {

    const iconClasses = computed(() => ({
      [`at-icon-${props.btnIcon}`]: Boolean(props.btnIcon) && !Boolean(props.btnText),
      'at-icon': Boolean(props.btnIcon) && !Boolean(props.btnText),
      'at-fab__icon': Boolean(props.btnIcon) && !Boolean(props.btnText),
    }))

    function handleClick() {
      switch (props.to) {
        case 'home':
          Taro.navigateTo({ url: '/pages/index/index' })
          break
        case 'back':
          Taro.navigateBack({ delta: 1 })
          break
      }
    }

    return {
      ...toRefs(props),
      iconClasses,
      handleClick
    }
  }
})
</script>

<style lang="scss">
.btn-fab {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 1100;
}
</style>