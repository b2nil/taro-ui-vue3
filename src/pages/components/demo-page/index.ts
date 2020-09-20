import { h, defineComponent, computed, mergeProps } from "vue"
import { View } from "@tarojs/components"
import "./index.scss"

const Page = defineComponent({
  name: "Page",

  props: {
    headerTitle: {
      type: String,
      default: '标题',
      required: true
    }
  },

  setup(props, { slots, attrs }) {
    return () => (
      h(View, { class: `page ${attrs.class ? attrs.class : ''}` }, {
        default: () => [
          h(View, { class: 'doc-header' }, [
            h(View, { class: 'doc-header__title' }, props.headerTitle)
          ]),
          h(View, { class: 'doc-body', style: attrs.style }, slots.default && slots.default()),
          slots.extra && slots.extra(),
        ]
      })
    )
  }
})


const Panel = defineComponent({
  name: "Panel",

  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    noPadding: Boolean
  },

  setup(props, { slots, attrs }) {
    const contentClass = computed(() => ({
      'panel__content': true,
      'no-padding': props.noPadding
    }))

    return () => h(View, { class: 'panel' }, {
      default: () => [
        props.title && h(View, { class: 'panel__title' }, props.title),
        slots.controller && slots.controller(),
        h(View, {
          class: contentClass.value,
          style: attrs.style
        }, slots.default && slots.default())
      ]
    })
  }
})

const ExampleItem = defineComponent({
  name: "ExampleItem",

  setup(props, { slots, attrs }) {
    return () => h(View, mergeProps(attrs, {
      class: 'example-item'
    }), slots.default && slots.default())
  }
})

export {
  Page,
  Panel,
  ExampleItem
}