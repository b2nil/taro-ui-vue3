<template>
  <view class="panel">
    <view
      v-if="title"
      class="panel__title"
    >{{ title }}</view>

    <slot name="controller" />

    <view
      :class="contentClasses"
      :style="$attrs.style"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: "Panel",

  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    noPadding: Boolean
  },

  setup(props, { slots, attrs }) {

    const contentClasses = computed(() => ({
      'panel__content': true,
      'no-padding': props.noPadding
    }))

    return {
      ...toRefs(props),
      contentClasses,
    }
  }
})
</script>

<style lang="scss">
.panel__content {
  .example-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .subitem {
      display: inline-block;
      margin-left: 24px;
    }

    &__desc {
      margin-bottom: 12px;
      color: #333;
      font-size: 24px;
    }
  }
}
</style>