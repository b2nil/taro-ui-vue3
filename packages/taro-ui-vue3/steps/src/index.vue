<template>
  <view
    v-bind="$attrs"
    class="at-steps"
  >
    <template v-if="!!items">
      <view
        v-for="(item, i) in items"
        :key="`${item.title}-${i}`"
        :class="genStepItemClasses(i)"
        @tap="handleClick(i, $event)"
      >
        <!-- circular wrap -->
        <view class="at-steps__circular-wrap">
          <!-- left line -->
          <view
            v-if="i !== 0"
            class="at-steps__left-line"
          />

          <!-- status -->
          <view
            v-if="item.status"
            :class="genItemStatusClasses(item)"
          />
          <view
            v-else
            class="at-steps__circular"
          >
            <text
              v-if="item.icon"
              :class="genItemIconClasses(item)"
            />
            <text
              v-else
              class="at-steps__num"
            >{{ i+1 }}</text>
          </view>

          <!-- right line -->
          <view
            v-if="i !== items.length - 1"
            class="at-steps__right-line"
          />
        </view>

        <!-- title -->
        <view class="at-steps__title">{{ item.title }}</view>

        <!-- desc -->
        <view class="at-steps__desc">{{ item.desc }}</view>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtStepsProps } from "@taro-ui-vue3/types/steps"


export default defineComponent({
  name: "AtSteps",

  emits: {
    'change'(current: number, event: CommonEvent) {
      return !!(
        current && typeof current === 'number' &&
        event && typeof event === 'object'
      )
    }
  },

  props: {
    current: {
      type: Number,
      default: 0,
      required: true
    },
    items: {
      type: Array as PropType<AtStepsProps['items']>,
      default: []
    }
  },

  setup(props: AtStepsProps, { emit }) {

    const genStepItemClasses = computed(() => (i) => ({
      'at-steps__item': true,
      'at-steps__item--active': i === props.current,
      'at-steps__item--inactive': i !== props.current
    }))

    const genItemStatusClasses = computed(() => (item) => ({
      'at-icon': true,
      'at-steps__single-icon': true,
      'at-icon-check-circle': item.status === 'success',
      'at-icon-close-circle': item.status === 'error',
      'at-steps__single-icon--success':
        item.status === 'success',
      'at-steps__single-icon--error': item.status === 'error'
    }))

    const genItemIconClasses = computed(() => (item) => ({
      [`at-icon-${item.icon.value}`]: Boolean(item.icon && item.icon.value),
      'at-icon': true,
      'at-steps__circle-icon': true,
    }))

    function handleClick(current: number, event: CommonEvent): void {
      emit('change', current, event)
    }

    return {
      items: toRef(props, 'items'),
      genItemIconClasses,
      genStepItemClasses,
      genItemStatusClasses,
      handleClick
    }
  }
})
</script>

