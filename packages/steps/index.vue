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
            :class="genItemStatusClasses(item)"
          />
          <view
            v-else
            class="at-steps__circular"
          >
            <text
              v-if="item.icon"
              :class="genItemIconClasses(item)"
              :style="genItemIconStyle(item, i)"
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
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'
import { AtStepsProps, Item } from "@taro-ui-vue3/types/steps"
import { useIconStyle } from "@taro-ui-vue3/composables"

const AtSteps = defineComponent({
  name: "AtSteps",

  emits: {
    'change': (current: number) => !!(typeof current === 'number')
  },

  props: {
    current: {
      type: Number,
      default: 0
    },
    items: {
      type: Array as PropType<AtStepsProps['items']>,
      default: []
    }
  },

  setup(props: AtStepsProps, { emit }) {

    const genStepItemClasses = computed(() => (i: number) => ({
      'at-steps__item': true,
      'at-steps__item--active': i === props.current,
      'at-steps__item--inactive': i !== props.current
    }))

    const genItemStatusClasses = computed(() => (item: Item) => ({
      'at-icon': true,
      'at-steps__single-icon': true,
      'at-icon-check-circle': item.status === 'success',
      'at-icon-close-circle': item.status === 'error',
      'at-steps__single-icon--success':
        item.status === 'success',
      'at-steps__single-icon--error': item.status === 'error'
    }))

    const genItemIconClasses = computed(() => (item: Item) => ({
      'at-icon': true,
      'at-steps__circle-icon': true,
      [`at-icon-${item.icon?.value}`]: Boolean(item.icon && item.icon.value)
    }))

    const genItemIconStyle = (item: Item, i: number) => {
      const iconInfo: AtIconBaseProps = props.current === i
        ? {
          value: item.icon!.value!,
          size: item.icon!.size,
          color: item.icon!.activeColor,
        }
        : {
          value: item.icon!.value!,
          size: item.icon!.size,
          color: item.icon!.inactiveColor,
        }

      const { iconStyle } = useIconStyle(iconInfo)

      return iconStyle.value
    }

    function handleClick(current: number) {
      emit('change', current)
    }

    return {
      items: toRef(props, 'items'),
      genItemIconClasses,
      genStepItemClasses,
      genItemStatusClasses,
      genItemIconStyle,
      handleClick
    }
  }
})

export default AtSteps
</script>

