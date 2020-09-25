import { h, defineComponent, reactive, ref, watch, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtAccordionProps, AtAccordionState } from "types/accordion"
import { delayQuerySelector } from '../../utils/common'

const AtAccordion = defineComponent({
  name: "AtAccordion",

  props: {
    open: Boolean,
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: Object as PropType<AtAccordionProps['icon']>,
      default: () => ({ value: '' })
    },
    hasBorder: {
      type: Boolean,
      default: true
    },
    isAnimation: {
      type: Boolean,
      default: true
    },
    note: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function as PropType<AtAccordionProps['onClick']>,
      default: () => () => { }
    }
  },

  setup(props: AtAccordionProps, { attrs, slots }) {
    const isCompleted = ref(true)
    const startOpen = ref(false)
    const contentID = ref('content')
    const state = reactive<AtAccordionState>({ wrapperHeight: 'unset' })

    const iconClass = computed(() => ({
      [`${props.icon!.prefixClass || 'at-icon'}`]: Boolean(props.icon),
      [`${props.icon!.prefixClass || 'at-icon'}-${props.icon!.value}`]: Boolean(props.icon && props.icon.value),
      'at-accordion__icon': true
    }))

    const headerClass = computed(() => ({
      'at-accordion__header': true,
      'at-accordion__header--noborder': !props.hasBorder
    }))

    const arrowClass = computed(() => ({
      'at-accordion__arrow': true,
      'at-accordion__arrow--folded': !!props.open
    }))

    const contentClass = computed(() => ({
      'at-accordion__content': true,
      'at-accordion__content--inactive': (!props.open && isCompleted.value) || startOpen.value
    }))

    const iconStyle = computed(() => ({
      color: (props.icon && props.icon.color) ? props.icon.color : '',
      fontSize: (props.icon && props.icon.size) ? `${props.icon.size}px` : ''
    }))

    const contentStyle = computed(() => ({
      height: isCompleted.value
        ? ''
        : state.wrapperHeight === 'unset'
          ? state.wrapperHeight
          : `${state.wrapperHeight}px`
    }))

    watch(() => props.open, (val) => {
      startOpen.value = !!val && !!props.isAnimation
      toggleWithAnimation()
    })

    function handleClick(e: CommonEvent) {
      contentID.value = 'content' + String(e.timeStamp).replace('.', '')

      if (!isCompleted.value) return

      props.onClick && props.onClick(!props.open, e)
    }

    function toggleWithAnimation() {
      if (!isCompleted.value || !props.isAnimation) return

      isCompleted.value = false
      delayQuerySelector(this, `#${contentID.value}.at-accordion__body`, 30).then((rect) => {
        // @ts-ignore
        const height = parseInt(rect[0].height.toString())
        const startHeight = props.open ? 0 : height
        const endHeight = props.open ? height : 0

        startOpen.value = false
        state.wrapperHeight = startHeight

        setTimeout(() => {
          state.wrapperHeight = endHeight
        }, 100)

        setTimeout(() => {
          isCompleted.value = true
        }, 700)
      })
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-accordion'
      }), {
        default: () => [
          h(View, {
            class: headerClass.value,
            onTap: handleClick
          }, {
            default: () => [
              props.icon && props.icon.value && (
                h(Text, {
                  class: iconClass.value,
                  style: iconStyle.value
                })
              ),

              h(View, {
                class: 'at-accordion__info'
              }, {
                default: () => [
                  h(View, {
                    class: 'at-accordion__info__title'
                  }, { default: () => props.title }),
                  h(View, {
                    class: 'at-accordion__info__note'
                  }, { default: () => props.note })
                ]
              }),

              h(View, {
                class: arrowClass.value
              }, {
                default: () => [
                  h(Text, { class: 'at-icon at-icon-chevron-down' })
                ]
              })
            ]
          }),

          h(View, {
            class: contentClass.value,
            style: contentStyle.value
          }, {
            default: () => [
              h(View, {
                id: contentID.value,
                class: 'at-accordion__body'
              }, { default: () => slots.default && slots.default() })
            ]
          })
        ]
      })
    )
  }
})

export default AtAccordion
