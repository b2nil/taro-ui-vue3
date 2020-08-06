import { h, defineComponent, computed } from "vue"
import DocsHeader from "../doc-header"
import { View } from "@tarojs/components"

const Page = defineComponent({
    props: {
        headerTitle: {
            type: String,
            default: '',
            required: true
        }
    },

    setup(props, { slots, attrs }) {
        return () => (
            h(View, { class: `page ${attrs.class}` }, {
                default: () => [
                    h(DocsHeader, { title: props.headerTitle }),
                    h(View, { class: 'doc-body' }, slots.default && slots.default()),
                    slots.extra && slots.extra(),
                ]
            })
        )
    }
})


const Panel = defineComponent({
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        noPadding: { type: Boolean, default: false }
    },

    setup(props, { slots }) {
        const contentClass = computed(() => ({
            'panel__content': true,
            'no-padding': props.noPadding
        }))

        return () => h(View, { class: 'panel' }, {
            default: () => [
                props.title && h(View, { class: 'panel__title' }, props.title),
                slots.controller && slots.controller(),
                h(View, {
                    class: contentClass.value
                }, slots.default && slots.default())
            ]
        })
    }
})

const ExampleItem = defineComponent({

    setup(props, { slots, attrs }) {
        return () => h(View, {
            class: `example-item ${attrs.class}`
        }, slots.default && slots.default() )
    }
})



export {
    Page,
    Panel,
    ExampleItem
}