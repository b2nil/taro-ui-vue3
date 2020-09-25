import { h, defineComponent, computed, reactive, onMounted, nextTick, watch, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { AtDrawerProps, AtDrawerState } from 'types/drawer'
import AtList from "../list"
import AtListItem from "../list/item"

const AtDrawer = defineComponent({
  name: "AtDrawer",

  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    mask: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String as PropType<AtDrawerProps['width']>,
      default: '',
    },
    right: Boolean,
    items: {
      type: Array as PropType<AtDrawerProps['items']>,
      default: () => [],
    },
    onItemClick: {
      type: Function as PropType<AtDrawerProps['onItemClick']>,
      default: () => () => { }
    },
    onClose: {
      type: Function as PropType<AtDrawerProps['onClose']>,
      default: () => () => { }
    }
  },

  setup(props: AtDrawerProps, { attrs, slots }) {
    const state = reactive<AtDrawerState>({
      animShow: false,
      _show: props.show
    })

    const rootClass = computed(() => ({
      'at-drawer': true,
      'at-drawer--show': state.animShow,
      'at-drawer--right': props.right,
      'at-drawer--left': !props.right
    }))

    const maskStyle = computed(() => ({
      display: props.mask ? 'block' : 'none',
      opacity: state.animShow ? 1 : 0
    }))

    const listStyle = computed(() => ({
      width: props.width,
      transition: state.animShow
        ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
        : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
    }))

    watch(() => props.show, (val) => {
      if (val !== state._show) {
        val ? showAnimation() : hideAnimation()
      }
    })

    onMounted(() => {
      if (state._show) {
        showAnimation()
      }
    })

    function handleItemClick(index: number) {
      props.onItemClick && props.onItemClick(index)
      hideAnimation()
    }

    function onHide() {
      state._show = false
      nextTick(() => {
        props.onClose && props.onClose()
      })
    }

    function hideAnimation() {
      state.animShow = false
      setTimeout(() => {
        onHide()
      }, 300)
    }

    function showAnimation() {
      state._show = true
      setTimeout(() => {
        state.animShow = true
      }, 200)
    }

    function handleMaskClick() {
      hideAnimation()
    }

    return () => {

      if (!state._show) return h(View)

      return h(View, mergeProps(attrs, {
        class: rootClass.value
      }), {
        default: () => [
          // mask
          h(View, {
            class: 'at-drawer__mask',
            style: maskStyle.value,
            onTap: handleMaskClick.bind(this)
          }),

          // content
          h(View, {
            class: 'at-drawer__content',
            style: listStyle.value
          }, (!!props.items && props.items.length)
            ? {
              default: () => [
                h(AtList, null, {
                  default: () => props.items?.map((name, index) => (
                    h(AtListItem, {
                      key: `${name}-${index}`,
                      'data-index': index,
                      title: name,
                      arrow: 'right',
                      onClick: handleItemClick.bind(this, index)
                    })
                  ))
                })
              ]
            }
            : { default: () => slots.default && slots.default() }
          )
        ]
      })
    }
  }
})

export default AtDrawer