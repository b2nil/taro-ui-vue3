import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { AtTimelineProps } from 'types/timeline'
import AtComponentWithDefaultProps from '../mixins'

const AtTimeline = defineComponent({
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


    return () => {

      const rootClass = computed(() => {
        const rootClassName = ['at-timeline']
        if (props.pending) rootClassName.push('at-timeline--pending')

        const rootClassObject = {
          'at-timeline--pending': props.pending
        }

        return classNames(rootClassName, rootClassObject, props.className)
      })


      const itemElems = props.items.map((item, index) => {
        const { title = '', color, icon, content = [] } = item

        const iconClass = classNames({
          'at-icon': true,
          [`at-icon-${icon}`]: icon
        })

        const itemRootClassName = ['at-timeline-item']
        if (color) itemRootClassName.push(`at-timeline-item--${color}`)

        const dotClass: string[] = []
        if (icon) {
          dotClass.push('at-timeline-item__icon')
        } else {
          dotClass.push('at-timeline-item__dot')
        }

        return (
          h(View, {
            class: classNames(itemRootClassName),
            key: `at-timeline-item-${index}`,
          }, {
            default: () => [
              // item tail
              h(View, { class: 'at-timeline-item__tail' }),
              // icon
              h(View, { class: classNames(dotClass) }, {
                default: () => [
                  icon && h(Text, { class: iconClass })
                ]
              }),
              // content
              h(View, { class: 'at-timeline-item__content' }, {
                default: () => [
                  // title
                  h(View, { class: 'at-timeline-item__content-item' }, title),
                  // content items
                  ...content.map((sub, subIndex) => (
                    h(View, {
                      key: subIndex,
                      class: 'at-timeline-item__content-item at-timeline-item__content--sub',
                    }, sub)
                  ))
                ]
              })
            ]
          })
        )
      })

      return (
        h(View, {
          class: rootClass.value,
          style: props.customStyle
        }, { default: () => itemElems })
      )
    }
  }
})

export default AtTimeline