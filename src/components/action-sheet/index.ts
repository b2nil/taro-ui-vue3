import { h, defineComponent, watch, ref } from "vue"
import { View } from "@/utils/components"
import { CommonEvent } from "@tarojs/components/types/common"
import { AtActionSheetProps } from "types/action-sheet";
import classNames from "classnames"
import AtActionSheetHeader from "./header/index"
import AtActionSheetBody from "./body/index"
import AtActionSheetFooter from "./footer/index"
import AtComponentWithDefaultProps from "../mixins";

const AtActionSheet = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        isOpened: {
            type: Boolean,
            default: false
        },
        title: {
            type: String, 
            default: ''
        },
        cancelText: {
            type: String, 
            default: ''
        },
        onClose: {
            type: Function as unknown as () => (event?: CommonEvent) => void, 
            default: () => () => {} 
        },
        onCancel: {
            type: Function as unknown as () => (event?: CommonEvent) => void,
            default: () => () => {} 
        },
    },

    setup(props: AtActionSheetProps, { slots }) {
        const _isOpened =  ref(props.isOpened)

        watch(() => props.isOpened, (val) => {
            if (val !== _isOpened.value) {
                _isOpened.value = val
            }
            !val && handleClose()
        })

        function handleClose() {
            props.onClose && props.onClose()
        }

        function handleCancel() {
            props.onCancel && props.onCancel()
            close()
        }

        function close() {
            _isOpened.value = false
            handleClose()
        }

        function handleTouchMove(e: CommonEvent) {
            e.stopPropagation()
            e.preventDefault()
        }

        return () => {
            const rootClass = classNames(
                'at-action-sheet',
                { 'at-action-sheet--active': _isOpened.value },
                props.className
            )
            
            return h(View, {
                class: rootClass,
                onTouchMove: handleTouchMove
            }, { default: () => [
                h(View, {
                    class: 'at-action-sheet__overlay',
                    onTap: close
                }),
                h(View, { class: 'at-action-sheet__container' }, { default: () => [
                    props.title && (
                        h(AtActionSheetHeader, null, { default: () => props.title })
                    ),
                    h(AtActionSheetBody, null, { default: () => slots.default && slots.default() }),
                    props.cancelText && (
                        h(AtActionSheetFooter, {
                            onClick: handleCancel
                        }, { default: () => props.cancelText })
                    )
                ]}),
            ]})
        }
    }
})

export default AtActionSheet