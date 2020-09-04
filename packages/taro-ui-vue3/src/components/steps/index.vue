<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <view v-if="!!items">
      <view
        v-for="(item, i) in items"
        :key="item.title"
        :class="stepItemClass(i)"
        @tap="handleClick(i)"
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
            :class="itemStatusClass(item)"
          />
          <view
            v-else
            class="at-steps__circular"
          >
            <text
              v-if="item.icon"
              :class="itemIconClass(item)"
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
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtStepsProps } from 'types/steps'
import AtComponentWithDefaultProps from '../mixins'

export default defineComponent({
  name: "AtSteps",
  mixins: [AtComponentWithDefaultProps],

  props: {
    current: {
      type: Number,
      default: 0,
      required: true
    },
    items: {
      type: Array as () => AtStepsProps['items'],
      default: []
    },
    onChange: {
      type: Function as unknown as () => AtStepsProps['onChange'],
      default: () => (current: number, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtStepsProps, { slots }) {

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-steps': true
    }))

    const stepItemClass = computed(() => (i) => ({
      'at-steps__item--active': i === props.current,
      'at-steps__item--inactive': i !== props.current,
      'at-steps__item': true,
    }))

    const itemStatusClass = computed(() => (item) => ({
      'at-icon-check-circle': item.status === 'success',
      'at-icon-close-circle': item.status === 'error',
      'at-steps__single-icon--success':
        item.status === 'success',
      'at-steps__single-icon--error': item.status === 'error',
      'at-steps__single-icon': true,
      'at-icon': true,
    }))

    const itemIconClass = computed(() => (item) => ({
      [`at-icon-${item.icon.value}`]: item.icon.value,
      'at-steps__circle-icon': true,
      'at-icon': true,
    }))


    function handleClick(current: number, event: CommonEvent): void {
      props.onChange(current, event)
    }

    return {
      items: toRef(props, 'items'),
      rootClass,
      stepItemClass,
      itemIconClass,
      itemStatusClass,
      handleClick
    }
  }
})
</script>

