import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import { Image, Text, View } from '@tarojs/components'
import { AtCardProps } from 'types/card'

const AtCard = defineComponent({
  name: "AtCard",

  props: {
    // 参数
    note: {
      type: String as PropType<AtCardProps['note']>,
      default: ''
    },
    isFull: Boolean,
    thumb: {
      type: String as PropType<AtCardProps['thumb']>,
      default: ''
    },
    title: {
      type: String as PropType<AtCardProps['title']>,
      default: ''
    },
    extra: {
      type: String as PropType<AtCardProps['extra']>,
      default: ''
    },
    extraStyle: {
      type: Object as PropType<AtCardProps['extraStyle']>,
      default: () => ({})
    },
    icon: Object as PropType<AtCardProps['icon']>,
    renderIcon: Object as PropType<AtCardProps['renderIcon']>,
    // 事件
    onClick: {
      type: Function as PropType<AtCardProps['onClick']>,
      default: () => () => { }
    }
  },

  setup(props: AtCardProps, { attrs, slots }) {

    const rootClass = computed(() => ({
      'at-card': true,
      'at-card--full': props.isFull
    }))

    const iconClass = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon && props.icon.value}`]: props.icon && props.icon.value,
      'at-card__header-icon': true
    }))

    const iconStyle = computed(() => ({
      color: (props.icon && props.icon.color) || '',
      fontSize: (props.icon && `${props.icon.size}px`) || ''
    }))

    function handleClick(args: any) {
      if (typeof props.onClick === 'function') {
        props.onClick(args)
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value,
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

              props.renderIcon && h(props.renderIcon),

              (!props.thumb && props.icon && props.icon.value) && h(Text, {
                class: iconClass.value,
                style: iconStyle.value
              }),

              h(Text, {
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
              }, { default: () => slots.default && slots.default() }),

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

