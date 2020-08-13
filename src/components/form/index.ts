// Vue - anything pulling from vue or a vue library
import { h, defineComponent } from "vue"

// Styles
// Components
import { Form } from "@tarojs/components";
// Effects
// Directives
// Utilities
import classNames from 'classnames'
// Types
import { AtFormProps } from "types/form"
// Functions

const AtForm = defineComponent({
    props: {
        reportSubmit: Boolean
    },

    setup(props: AtFormProps, { slots }) {
        
        function onSubmit() {
            if (typeof props.onSubmit === 'function') {
                props.onSubmit(arguments as any)
            }
        }

        function onReset() {
            if (typeof props.onReset === 'function') {
                props.onReset(arguments as any)
            }
        }

        return () => {

            const rootClass = classNames('at-form', props.className)

            return (
               h(Form, {
                   class: rootClass,
                   style: props.customStyle,
                   reportSubmit: props.reportSubmit,
                   onSubmit: onSubmit.bind(this),
                   onReset: onReset.bind(this)
               }, slots.default && slots.default())
            )
        }
    }
})

export default AtForm