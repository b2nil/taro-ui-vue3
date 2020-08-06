import { h, defineComponent } from "vue"
import DocsHeader from "../doc-header"
import { View } from "@tarojs/components"

const Page = defineComponent({
    props: {
        extraClass: String,
        headerTitle: {
            type: String,
            default: '',
            required: true
        }
    },

    setup(props, { slots }) {
        return () => (
            h(View, { class: `page ${props.extraClass}` }, {
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
        }
    },
    setup(props, { slots }) {
        return () => h(View, { class: 'panel' }, {
            default: () => [
                props.title && h(View, { class: 'panel__title' }, props.title),
                h(View, { class: 'panel__content' }, {
                    default: () => slots.default && slots.default()
                })
            ]
        })
    }
})

const ExampleItem = defineComponent({
    setup(props, { slots }) {
        return () => h(View, { class: 'example-item ' }, slots.default && slots.default() )
    }
})



export {
    Page,
    Panel,
    ExampleItem
}