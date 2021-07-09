import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'
import { AtStepsProps, Item } from '@taro-ui-vue3/types/steps'
import { useIconStyle } from "@taro-ui-vue3/composables/icon"

const AtSteps = defineComponent({
  name: "AtSteps",

  props: {
    current: {
      type: Number,
      default: 0
    },
    items: {
      type: Array as PropType<AtStepsProps['items']>,
      default: []
    },
    onChange: {
      type: Function as unknown as PropType<AtStepsProps['onChange']>,
      default: () => (current: number, event: CommonEvent) => { }
    },
  },

  setup(props: AtStepsProps, { attrs, slots }) {

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
      [`at-icon-${item.icon?.value}`]: Boolean(item.icon?.value),
      'at-steps__circle-icon': true
    }))

    const genItemIconStyle = (item: Item, i: number) => {
      const iconInfo: AtIconBaseProps = {
        value: item.icon!.value!,
        size: item.icon!.size
      }

      iconInfo.color = props.current === i
        ? item.icon!.activeColor
        : item.icon!.inactiveColor

      const { iconStyle } = useIconStyle(iconInfo)

      return iconStyle.value
    }

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
            class: genStepItemClasses.value(i),
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
                    ? h(View, { class: genItemStatusClasses.value(item) })
                    : h(View, {
                      class: 'at-steps__circular'
                    }, {
                      default: () => [
                        item.icon
                          ? h(Text, {
                            class: genItemIconClasses.value(item),
                            style: genItemIconStyle(item, i)
                          })
                          : h(Text, {
                            class: 'at-steps__num'
                          }, { default: () => i + 1 })
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