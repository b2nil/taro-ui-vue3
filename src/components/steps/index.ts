import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtStepsProps } from 'types/steps'

const AtSteps = defineComponent({
  name: "AtSteps",

  props: {
    current: {
      type: Number,
      default: 0,
      required: true
    },
    items: {
      type: Array as PropType<AtStepsProps['items']>,
      default: []
    },
    onChange: {
      type: Function as PropType<AtStepsProps['onChange']>,
      default: () => (current: number, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtStepsProps, { attrs, slots }) {

    const stepItemClass = computed(() => (i) => ({
      'at-steps__item': true,
      'at-steps__item--active': i === props.current,
      'at-steps__item--inactive': i !== props.current
    }))

    const itemStatusClass = computed(() => (item) => ({
      'at-icon': true,
      'at-steps__single-icon': true,
      'at-icon-check-circle': item.status === 'success',
      'at-icon-close-circle': item.status === 'error',
      'at-steps__single-icon--success':
        item.status === 'success',
      'at-steps__single-icon--error': item.status === 'error'
    }))

    const itemIconClass = computed(() => (item) => ({
      'at-icon': true,
      [`at-icon-${item.icon.value}`]: item.icon.value,
      'at-steps__circle-icon': true
    }))

    function handleClick(current: number, event: CommonEvent): void {
      props.onChange(current, event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-steps'
      }), {
        default: () => !!props.items && props.items.map((item, i) => (
          h(View, {
            key: item.title,
            class: stepItemClass.value(i),
            onTap: handleClick.bind(this, i)
          }, {
            default: () => [
              // circular wrap
              h(View, {
                class: 'at-steps__circular-wrap'
              }, {
                default: () => [
                  // left-line
                  i !== 0 && h(View, { class: 'at-steps__left-line' }),

                  // status
                  item.status
                    ? h(View, { class: itemStatusClass.value(item) })
                    : h(View, {
                      class: 'at-steps__circular'
                    }, {
                      default: () => [
                        item.icon
                          ? h(Text, { class: itemIconClass.value(item) })
                          : h(Text, { class: 'at-steps__num' }, { default: () => i + 1 })
                      ]
                    }),

                  // right-line 
                  i !== props.items!.length - 1 && (
                    h(View, { class: 'at-steps__right-line' })
                  )
                ]
              }),

              // title
              h(View, {
                class: 'at-steps__title'
              }, { default: () => item.title }),

              // description
              h(View, {
                class: 'at-steps__desc'
              }, { default: () => item.desc })
            ]
          })
        ))
      })
    )
  }
})

export default AtSteps