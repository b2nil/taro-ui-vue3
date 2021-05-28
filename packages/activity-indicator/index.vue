<template>
  <view
    v-bind="$attrs"
    :class="['at-activity-indicator', {
      'at-activity-indicator--center': mode === 'center',
      'at-activity-indicator--isopened': isOpened
    }]"
  >
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
import { defineComponent, toRefs, PropType } from "vue"
import { AtActivityIndicatorProps } from "@taro-ui-vue3/types/activity-indicator"
import AtLoading from "@taro-ui-vue3/loading/index.vue"

const AtActivityIndicator = defineComponent({
  name: "AtActivityIndicator",

  components: {
    AtLoading
  },

  props: {
    size: {
      type: Number,
      default: 48
    },
    mode: {
      type: String as PropType<'center' | 'normal'>,
      default: 'normal'
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
    }
  },

  setup(props: AtActivityIndicatorProps) {
    return { ...toRefs(props) }
  }
})

export default AtActivityIndicator
</script>