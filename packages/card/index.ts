import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import { Image, Text, View } from '@tarojs/components'
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables/icon"
import { AtCardProps } from '@taro-ui-vue3/types/card'

const AtCard = defineComponent({
  name: "AtCard",

  props: {
    note: String as PropType<AtCardProps['note']>,
    isFull: Boolean,
    thumb: String as PropType<AtCardProps['thumb']>,
    title: String as PropType<AtCardProps['title']>,
    extra: String as PropType<AtCardProps['extra']>,
    extraStyle: Object as PropType<AtCardProps['extraStyle']>,
    icon: Object as PropType<AtCardProps['icon']>,
    onClick: Function as unknown as PropType<AtCardProps['onClick']>
  },

  setup(props: AtCardProps, { attrs, slots }) {

    const rootClasses = computed(() => ({
      'at-card': true,
      'at-card--full': props.isFull
    }))

    const { iconClasses } = useIconClasses(props.icon)
    const { iconStyle } = useIconStyle(props.icon)

    function handleClick(args: any) {
      if (typeof props.onClick === 'function') {
        props.onClick(args)
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value,
        onTap: handleClick
      }), {
        default: () => [
          // header
          h(View, {
            class: 'at-card__header'
          }, {
            default: () => [
              props.thumb && h(View, {
                class: 'at-card__header-thumb'
              }, {
                default: () => [
                  h(Image, {
                    class: 'at-card__header-thumb-info',
                    mode: 'scaleToFill',
                    src: props.thumb
                  })
                ]
              }),

              (!props.thumb && slots.renderIcon) && slots.renderIcon(),

              (!props.thumb && props.icon && props.icon.value) && h(Text, {
                class: iconClasses.value,
                style: iconStyle.value
              }),

              props.title && h(Text, {
                class: 'at-card__header-title'
              }, { default: () => props.title }),

              props.extra && h(Text, {
                class: 'at-card__header-extra',
                style: { ...props.extraStyle }
              }, { default: () => props.extra })
            ]
          }),

          // content
          h(View, {
            class: 'at-card__content'
          }, {
            default: () => [
              h(View, {
                class: 'at-card__content-info'
              }, { default: () => slots.default?.() }),

              props.note && h(View, {
                class: 'at-card__content-note'
              }, { default: () => props.note })
            ]
          })
        ]
      })
    )
  }
})

export default AtCard

