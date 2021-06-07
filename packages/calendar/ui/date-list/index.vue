<template>
  <view
    v-if="list && list.length > 0"
    class="at-calendar__list flex"
  >
    <view
      v-for="(item, index) in list"
      :key="`list-item-${item.value}-${index}`"
      :class="genFlexItemClasses(item)"
      @tap="handleClick(item)"
      @longpress="handleLongClick(item)"
    >
      <!-- date text -->
      <view class="flex__item-container">
        <view class="container-text">{{ item.text }}</view>
      </view>

      <!-- extra marks -->
      <view class="flex__item-extra extra">
        <view
          v-if="item.marks && item.marks.length > 0"
          class="extra-marks"
        >
          <text
            v-for="(mark, key) in item.marks"
            :key="key"
            class="mark"
          >{{ mark.value }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from "vue"
import { Calendar } from "@taro-ui-vue3/types/calendar"
import * as constant from '../../common/constant'

const MAP: { [key: number]: string } = {
  [constant.TYPE_PRE_MONTH]: 'pre',
  [constant.TYPE_NOW_MONTH]: 'now',
  [constant.TYPE_NEXT_MONTH]: 'next'
}

export interface AtCalendarListProps {
  list: Calendar.List<Calendar.Item>
  onClick?: (item: Calendar.Item) => void
  onLongClick?: (item: Calendar.Item) => void
}

const AtCalendarList = defineComponent({
  name: "AtCalendarList",

  data: () => ({ addGlobalClass: true }),

  emits: {
    'click'(item: Calendar.Item) {
      return !!(item && typeof item === 'object')
    },

    'long-click'(item: Calendar.Item) {
      return !!(item && typeof item === 'object')
    }
  },

  props: {
    list: Array as PropType<Calendar.List<Calendar.Item>>,
  },

  setup(props: AtCalendarListProps, { emit }) {

    const genFlexItemClasses = computed(() => (item: Calendar.Item) => ([
      'flex__item',
      {
        [`flex__item--${MAP[item.type]}`]: Boolean(MAP[item.type]),
        'flex__item--today': item.isToday,
        'flex__item--active': item.isActive,
        'flex__item--selected': item.isSelected,
        'flex__item--selected-head': item.isSelectedHead,
        'flex__item--selected-tail': item.isSelectedTail,
        'flex__item--blur':
          item.isDisabled ||
          item.type === constant.TYPE_PRE_MONTH ||
          item.type === constant.TYPE_NEXT_MONTH
      }
    ]))

    function handleClick(item: Calendar.Item) {
      emit('click', item)
    }

    function handleLongClick(item: Calendar.Item) {
      emit('long-click', item)
    }

    return {
      ...toRefs(props),
      handleClick,
      handleLongClick,
      genFlexItemClasses
    }
  }
})

export default AtCalendarList
</script>