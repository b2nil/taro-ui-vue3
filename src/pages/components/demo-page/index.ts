import { h, defineComponent, computed, mergeProps } from "vue"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import "./index.scss"
import { AtFlex } from "@/components/index"
import { AtFlexItem } from "@/components/index"

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
    const rootClasses = computed(() => ({
      'page': true,
      [`${attrs.class}`]: Boolean(attrs.class)
    }))

    const rootStyle = computed(() => {
      const deviceWidth = Taro.getSystemInfoSync().windowWidth
      return Taro.getEnv() === Taro.ENV_TYPE.WEB
        ? {
          width: deviceWidth >= 1024 ? '75%' : '100%',
          margin: 'auto'
        }
        : null
    })
    return () => (
      h(View, {
        class: rootClasses.value,
        style: rootStyle.value
      }, {
        default: () => [
          h(View, {
            class: 'doc-header'
          }, {
            default: () => [
              h(View, {
                class: 'doc-header__title'
              }, { default: () => props.headerTitle })
            ]
          }),

          h(View, {
            class: 'doc-body',
            style: attrs.style
          }, { default: () => slots.default && slots.default() }),

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

    return () => h(View, {
      class: 'panel'
    }, {
      default: () => [
        props.title && h(View, {
          class: 'panel__title'
        }, { default: () => props.title }),

        slots.controller && slots.controller(),

        h(View, {
          class: contentClass.value,
          style: attrs.style
        }, { default: () => slots.default && slots.default() })
      ]
    })
  }
})

const ExampleItem = defineComponent({
  name: "ExampleItem",

  setup(props, { slots, attrs }) {
    return () => h(View, mergeProps(attrs, {
      class: 'example-item'
    }), { default: () => slots.default && slots.default() })
  }
})


const PropItem = defineComponent({
  name: "PropItem",

  props: {
    prop: String,
    desc: String
  },

  setup(props, { slots }) {

    return () => (
      h(AtFlex, {
        direction: 'column'
      }, {
        default: () => [
          h(AtFlexItem, {
            isWrap: true
          }, {
            default: () => [
              h(View, {
                class: 'example-item__desc'
              }, {
                default: () => [
                  h(View, {
                    style: 'color: red; font-style: italic;'
                  }, { default: () => props.prop }),

                  h(View, null, { default: () => props.desc })
                ]
              })
            ]
          }),

          h(AtFlexItem, null, { default: () => slots.default?.() })
        ]
      })
    )
  }
})

export {
  Page,
  Panel,
  PropItem,
  ExampleItem
}