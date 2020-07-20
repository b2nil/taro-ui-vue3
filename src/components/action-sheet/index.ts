import { h, defineComponent, reactive, watch } from "vue"
import { View } from "@tarojs/components"
import { CommonEvent } from "@tarojs/components/types/common"
import classNames from "classnames"
import AtActionSheetHeader from "./header/index"
import AtActionSheetBody from "./body/index"
import AtActionSheetFooter from "./footer/index"
import "../../style/components/action-sheet.scss"

const AtActionSheet = defineComponent({
    props: {
        title: { type: String, default: '' },
        cancelText: { type: String, default: '' },
        isOpened: { type: Boolean, default: false },
        className: { type: Array || String, default: '' },
        onClose: { type: Function, default: () => {} },
        onCancel: { type: Function, default: () => {} },
    },

    setup(props, { slots }) {
        const state = reactive({ _isOpened: props.isOpened })

        watch(() => props.isOpened, (val) => {
            if (val !== state._isOpened) {
                state._isOpened = val
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
            state._isOpened = false
            handleClose()
        }

        function handleTouchMove(e: CommonEvent) {
            e.stopPropagation()
            e.preventDefault()
        }

        return () => {
            const rootClass = classNames(
                'at-action-sheet',
                { 'at-action-sheet--active': state._isOpened },
                props.className
            )
            
            return h(View, { class: rootClass, onTouchMove: handleTouchMove }, [
                h(View, { class: 'at-action-sheet__overlay', onTap: close }),
                h(View, { class: 'at-action-sheet__container' }, [
                    props.title && h(AtActionSheetHeader, null, props.title),
                    h(AtActionSheetBody, null, slots.default && slots.default()),
                    props.cancelText && h(AtActionSheetFooter, { onTap: handleCancel }, props.cancelText)
                ]),
            ]) 
        }
    }
})

export default AtActionSheet