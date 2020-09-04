<template>
  <view :class="rootClass">
    <!-- loading -->
    <view class="at-activity-indicator__body">
      <at-loading
        :size="size"
        :color="color"
      />
    </view>

    <!-- text content -->
    <text
      v-if="content"
      class="at-activity-indicator__content"
    >{{ content }}</text>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue"
import { AtActivityIndicatorProps } from "types/activity-indicator";
import AtLoading from "../loading"
import AtComponentWithDefaultProps from "../mixins";

export default defineComponent({
  name: "AtActivityIndicator",

  components: {
    AtLoading
  },

  mixins: [AtComponentWithDefaultProps],

  props: {
    size: {
      type: Number,
      default: 48
    },
    mode: {
      type: String as () => 'center' | 'normal',
      default: 'normal' as 'center' | 'normal'
    },
    color: {
      type: String,
      default: '#6190E8'
    },
    content: {
      type: String,
      default: ''
    },
    isOpened: {
      type: Boolean,
      default: true
    },
  },

  setup(props: AtActivityIndicatorProps) {

    const { size, color, content } = toRefs(props)

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-activity-indicator--center': props.mode === 'center',
      'at-activity-indicator--isopened': props.isOpened,
      'at-activity-indicator': true,
    }))

    return {
      size,
      color,
      content,
      rootClass
    }
  }
})
</script>