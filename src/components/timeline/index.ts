import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { AtTimelineProps } from 'types/timeline'

const AtTimeline = defineComponent({
  name: "AtTimeline",

  props: {
    pending: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array as PropType<AtTimelineProps['items']>,
      default: []
    },
  },

  setup(props: AtTimelineProps, { attrs, slots }) {

    const rootClasses = computed(() => ({
      'at-timeline': true,
      'at-timeline--pending': props.pending
    }))

    const iconClasses = computed(() => (item) => ({
      'at-icon': true,
      [`at-icon-${item.icon}`]: item.icon
    }))

    const itemRootClasses = computed(() => (item) => ({
      'at-timeline-item': true,
      [`${`at-timeline-item--${item.color}`}`]: item.color
    }))

    const dotClass = computed(() => (item) => ({
      'at-timeline-item__icon': item.icon,
      'at-timeline-item__dot': !item.icon
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => props.items.map((item, index) => (
          h(View, {
            key: `at-timeline-item-${index}`,
            class: itemRootClasses.value(item),
          }, {
            default: () => [
              // item tail
              h(View, { class: 'at-timeline-item__tail' }),

              // icon
              h(View, {
                class: dotClass.value(item)
              }, {
                default: () => [
                  item.icon && h(Text, { class: iconClasses.value(item) })
                ]
              }),

              // content
              h(View, {
                class: 'at-timeline-item__content'
              }, {
                default: () => [
                  // title
                  h(View, {
                    class: 'at-timeline-item__content-item'
                  }, { default: () => item.title }),

                  // content items
                  item.content && (
                    item.content!.map((sub, subIndex) => (
                      h(View, {
                        key: subIndex,
                        class: 'at-timeline-item__content-item at-timeline-item__content--sub',
                      }, { default: () => sub })
                    ))
                  )
                ]
              })
            ]
          })
        ))
      })
    )
  }
})

export default AtTimeline