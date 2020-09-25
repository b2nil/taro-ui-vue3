import { h, defineComponent, computed, PropType } from "vue"
import { Text, View } from '@tarojs/components'
import { Calendar } from 'types/calendar'
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

  props: {
    list: {
      type: Array as PropType<AtCalendarListProps["list"]>,
      default: () => [] as Calendar.List<Calendar.Item>
    },
    onClick: {
      type: Function as PropType<AtCalendarListProps["onClick"]>,
      default: () => () => { }
    },
    onLongClick: {
      type: Function as PropType<AtCalendarListProps["onLongClick"]>,
      default: () => () => { }
    }
  },

  setup(props: AtCalendarListProps) {

    const flexItemClass = computed(() => (item: Calendar.Item) => ({
      'flex__item': true,
      [`flex__item--${MAP[item.type]}`]: true,
      'flex__item--today': item.isToday,
      'flex__item--active': item.isActive,
      'flex__item--selected': item.isSelected,
      'flex__item--selected-head': item.isSelectedHead,
      'flex__item--selected-tail': item.isSelectedTail,
      'flex__item--blur':
        item.isDisabled ||
        item.type === constant.TYPE_PRE_MONTH ||
        item.type === constant.TYPE_NEXT_MONTH
    }))

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

    if (!props.list || props.list.length === 0) return null

    return () => (
      h(View, {
        class: 'at-calendar__list flex'
      }, {
        default: () => props.list.map((item: Calendar.Item, index: number) => (
          h(View, {
            key: `list-item-${item.value}-${index}`,
            class: flexItemClass.value(item),
            onTap: handleClick.bind(this, item),
            onLongPress: handleLongClick.bind(this, item)
          }, {
            default: () => [
              h(View, {
                class: 'flex__item-container'
              }, {
                default: () => [
                  h(View, {
                    class: 'container-text'
                  }, { default: () => item.text })
                ]
              }),

              h(View, {
                class: 'flex__item-extra extra'
              }, {
                default: () => [
                  (item.marks && item.marks.length > 0) && (
                    h(View, {
                      class: 'extra-marks'
                    }, {
                      default: () => item.marks.map((mark, key) => (
                        h(Text, {
                          key: key,
                          class: 'mark'
                        }, { default: () => String(mark) })
                      ))
                    })
                  )
                ]
              }),
            ]
          })
        ))
      })
    )
  }
})

export default AtCalendarList