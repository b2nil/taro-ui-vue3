<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <view
      v-for="(item, index) in items"
      :key="`at-timeline-item-${index}`"
      :class="genItemRootClasses(item)"
    >
      <view class="at-timeline-item__tail" />

      <view :class="genDotClasses(item)">
        <text
          v-if="item.icon"
          :class="genIconClasses(item)"
        />
      </view>

      <view class="at-timeline-item__content">
        <view class="at-timeline-item__content-item">{{ item.title }}</view>

        <view
          v-for="(content, subIndex) in item.content"
          :key="subIndex"
          class="at-timeline-item__content-item at-timeline-item__content--sub"
        >{{ content }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue'
import { AtTimelineProps } from "@taro-ui-vue3/types/timeline"

export default defineComponent({
  name: "AtTimeline",

  props: {
    pending: Boolean,
    items: {
      type: Array as PropType<AtTimelineProps['items']>,
      default: []
    },
  },

  setup(props: AtTimelineProps) {

    const rootClasses = computed(() => ({
      'at-timeline': true,
      'at-timeline--pending': props.pending
    }))

    const genIconClasses = computed(() => (item) => ({
      'at-icon': true,
      [`at-icon-${item.icon}`]: item.icon
    }))

    const genItemRootClasses = computed(() => (item) => ({
      'at-timeline-item': true,
      [`${`at-timeline-item--${item.color}`}`]: item.color
    }))

    const genDotClasses = computed(() => (item) => ({
      'at-timeline-item__icon': item.icon,
      'at-timeline-item__dot': !item.icon
    }))

    return {
      items: toRef(props, 'items'),
      rootClasses,
      genDotClasses,
      genIconClasses,
      genItemRootClasses,
    }
  }
})
</script>

