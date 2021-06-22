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

        <template v-if="item.content && item.content.length > 0">
          <view
            v-for="(content, subIndex) in item.content"
            :key="subIndex"
            class="at-timeline-item__content-item at-timeline-item__content--sub"
          >{{ content }}</view>
        </template>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue'
import { AtTimelineProps, Item } from "@taro-ui-vue3/types/timeline"

const AtTimeline = defineComponent({
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

    const genIconClasses = (item: Item) => ({
      'at-icon': true,
      [`at-icon-${item.icon}`]: Boolean(item.icon)
    })

    const genItemRootClasses = (item: Item) => ({
      'at-timeline-item': true,
      [`${`at-timeline-item--${item.color}`}`]: Boolean(item.color)
    })

    const genDotClasses = (item: Item) => ({
      'at-timeline-item__icon': Boolean(item.icon),
      'at-timeline-item__dot': !Boolean(item.icon)
    })

    return {
      items: toRef(props, 'items'),
      rootClasses,
      genDotClasses,
      genIconClasses,
      genItemRootClasses,
    }
  }
})

export default AtTimeline
</script>

