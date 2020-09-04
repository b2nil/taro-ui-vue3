<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <view
      v-for="(item, index) in items"
      :key="`at-timeline-item-${index}`"
      :class="itemRootClass(item)"
    >
      <view class="at-timeline-item__tail" />

      <view :class="dotClass(item)">
        <text
          v-if="item.icon"
          :class="iconClass(item)"
        />
      </view>

      <view class="at-timeline-item__content">
        <view class="at-timeline-item__content-item">{{ item.title }}</view>

        <view
          v-for="(sub, subIndex) in item.content"
          :key="subIndex"
          class="at-timeline-item__content-item at-timeline-item__content--sub"
        >{{ sub }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import { AtTimelineProps } from 'types/timeline'
import AtComponentWithDefaultProps from '../mixins'

export default defineComponent({
  name: "AtTimeline",

  mixins: [AtComponentWithDefaultProps],

  props: {
    pending: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array as () => AtTimelineProps['items'],
      default: []
    },
  },

  setup(props: AtTimelineProps, { slots }) {
    const rootClass = computed(() => ({
      'at-timeline': true,
      'at-timeline--pending': props.pending,
      [props.className]: true,
    }))

    const iconClass = computed(() => (item) => ({
      'at-icon': true,
      [`at-icon-${item.icon}`]: item.icon
    }))

    const itemRootClass = computed(() => (item) => ({
      'at-timeline-item': true,
      [`at-timeline-item--${item.color}`]: item.color
    }))

    const dotClass = computed(() => (item) => ({
      'at-timeline-item__icon': item.icon,
      'at-timeline-item__dot': !item.icon,
    }))



    return {
      customStyle: toRef(props, 'customStyle'),
      items: toRef(props, 'items'),
      rootClass,
      dotClass,
      iconClass,
      itemRootClass,
    }
  }
})
</script>

