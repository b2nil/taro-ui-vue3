<template>
  <view
    v-if="list && list.length > 0"
    class="at-calendar__list flex"
  >
    <view
      v-for="(item, index) in list"
      :key="`list-item-${item.value}-${index}`"
      :class="flexItemClass(item)"
      @tap="handleClick(item)"
      @long-press="handleLongClick(item)"
    >
      <view class="flex__item-container">
        <view class="container-text">{{ item.text }}</view>
      </view>
      <view class="flex__item-extra extra">
        <view
          v-if="item.marks && item.marks.length > 0"
          class="extra-marks"
        >
          <text
            v-for="(mark, key) in item.marks"
            :key="key"
            class="mark"
          >{{ String(mark) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from "../../api"
import { Calendar } from 'types/calendar'
import classNames from "classnames"
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

export default defineComponent({
  name: "AtCalendarList",



  data: () => ({ addGlobalClass: true }),

  props: {
    list: {
      type: Array as PropType<Calendar.List<Calendar.Item>>,
      default: () => [] as Calendar.List<Calendar.Item>
    },
    onClick: {
      type: Function as PropType<(item: Calendar.Item) => void>,
      default: () => () => { }
    },
    onLongClick: {
      type: Function as PropType<(item: Calendar.Item) => void>,
      default: () => () => { }
    }
  },

  setup(props: AtCalendarListProps) {

    const flexItemClass = computed(() => (item: Calendar.Item) => {
      return {
        [`flex__item--${MAP[item.type]}`]: true,
        'flex__item': true,
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
    })

    function handleClick(item: Calendar.Item) {
      if (typeof props.onClick === 'function') {
        props.onClick(item)
      }
    }

    function handleLongClick(item: Calendar.Item) {
      if (typeof props.onLongClick === 'function') {
        props.onLongClick(item)
      }
    }

    return {
      list: toRef(props, 'list'),
      flexItemClass,
      handleClick,
      handleLongClick
    }
  }
})
</script>

<style>
</style>