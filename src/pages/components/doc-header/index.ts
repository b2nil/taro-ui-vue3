import { h, defineComponent } from "vue"
import { View } from "@tarojs/components";
import './index.scss'
import { PropOptions } from "@/utils/vue-types/types";

export interface DocsHeaderProps extends Record<string, unknown> {
    title?: PropOptions<string>
}

const DocsHeader = defineComponent({
    props: {
        title: {
            default: '标题'
        }
    },

    setup(props) {
        return () => h(View, { class: 'doc-header'}, [
            h(View, { class: 'doc-header__title' }, props.title)
        ])
    }
})

export default DocsHeader