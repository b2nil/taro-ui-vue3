// Vue - anything pulling from vue or a vue library
import { h, defineComponent, ref, toRefs, computed } from "vue"

// Styles
// Components
import { Input, Text, View, Label } from "@tarojs/components";
import AtComponentWithDefaultProps from "../mixins"
// Effects
// Directives
// Utilities
import VueTypes from "@/utils/vue-types/index";
import classNames from 'classnames'
// Types
import { BaseEventOrig, ITouchEvent } from "@tarojs/components/types/common"
import { InputProps } from "@tarojs/components/types/Input"
import {
    AtInputProps,
    BlurEventDetail,
    ConfirmEventDetail,
    FocusEventDetail,
    InputEventDetail,
    KeyboardHeightEventDetail,
} from "types/input"
// Functions

type PickAtInputProps = Pick<AtInputProps, 'maxlength' | 'disabled' | 'password'>
type GetInputPropsReturn = PickAtInputProps & Pick<InputProps, 'type'>

function getInputProps(props: AtInputProps): GetInputPropsReturn {
    const actualProps = {
        type: props.type,
        maxLength: props.maxLength,
        disabled: props.disabled,
        password: false
    }

    switch (actualProps.type) {
        case 'phone':
            actualProps.type = 'number'
            actualProps.maxLength = 11
            break
        case 'password':
            actualProps.type = 'text'
            actualProps.password = true
            break
        default:
            break
    }

    if (!props.disabled && !props.editable) {
        actualProps.disabled = true
    }

    return actualProps as GetInputPropsReturn
}

const AtInput = defineComponent({
    extends: AtComponentWithDefaultProps,

    props: {
        name: VueTypes.string.def('').isRequired,
        title: VueTypes.string.def(''),
        value: VueTypes.string.def(''),
        placeholder: VueTypes.string.def(''),
        placeholderStyle: VueTypes.string.def(''),
        placeholderClass: VueTypes.string.def(''),
        cursorSpacing: VueTypes.integer.def(50),
        cursor: VueTypes.integer.def(0),
        selectionStart: VueTypes.integer.def(-1),
        selectionEnd: VueTypes.integer.def(-1),
        maxLength: VueTypes.integer.def(140),
        border: VueTypes.bool.def(true),
        editable: VueTypes.bool.def(true),
        disabled: VueTypes.bool.def(false),
        error: VueTypes.bool.def(false),
        clear: VueTypes.bool.def(false),
        focus: VueTypes.bool.def(false),
        autoFocus: VueTypes.bool.def(false),
        required: VueTypes.bool.def(false),
        confirmType: {
            type: String as () => AtInputProps["confirmType"],
            default: 'done' as AtInputProps["confirmType"],
            validator: (val: string) => ["done", "send", "search", "next", "go"].includes(val)
        },
        type: {
            type: String as () => AtInputProps['type'],
            default: 'text' as AtInputProps['type'],
            validator: (val: string) => ['text', 'number', 'password', 'phone', 'idcard', 'digit'].includes(val)
        },
        onChange: {
            type: Function as unknown as () => AtInputProps['onChange'],
            default: () => () => { }
        }
    },

    setup(props: AtInputProps, { slots }) {
        const inputClearing = ref(false)

        function handleInput(e: BaseEventOrig<InputEventDetail>) {
            props.onChange(e.detail.value, e)
        }

        function handleFocus(e: BaseEventOrig<FocusEventDetail>) {
            if (typeof props.onFocus === 'function') {
                props.onFocus(e.detail.value, e)
            }
        }

        function handleBlur(e: BaseEventOrig<BlurEventDetail>) {
            if (typeof props.onBlur === 'function') {
                props.onBlur(e.detail.value, e)
            }

            if (e.type === 'blur' && inputClearing.value) {
                // fix # 583 AtInput 不触发 onChange 的问题
                props.onChange(e.detail.value, e as BaseEventOrig<InputEventDetail>)
            }
            // 还原状态
            inputClearing.value = false
        }

        function handleConfirm(e: BaseEventOrig<ConfirmEventDetail>) {
            if (typeof props.onConfirm === 'function') {
                props.onConfirm(e.detail.value, e)
            }
        }

        function handleClick(e: ITouchEvent) {
            if (!props.editable && typeof props.onClick === 'function') {
                props.onClick(e)
            }
        }

        function handleClearValue(e: ITouchEvent) {
            inputClearing.value = true
            props.onChange('', e)
        }

        function handleKeyboardHeightChange(
            e: BaseEventOrig<KeyboardHeightEventDetail>
        ) {
            if (typeof props.onKeyboardHeightChange === 'function') {
                props.onKeyboardHeightChange(e)
            }
        }

        function handleErrorClick(e: ITouchEvent) {
            if (typeof props.onErrorClick === 'function') {
                props.onErrorClick(e)
            }
        }

        return () => {
            const {
                className,
                customStyle,
                name,
                cursorSpacing,
                confirmType,
                cursor,
                selectionStart,
                selectionEnd,
                adjustPosition,
                border,
                title,
                error,
                clear,
                placeholder,
                placeholderStyle,
                placeholderClass,
                autoFocus,
                focus,
                value,
                required
            } = toRefs(props)

            const { type, maxlength, disabled, password } = computed(() => getInputProps(props)).value

            const rootCls = classNames('at-input', className?.value, {
                'at-input--without-border': !border?.value
            })

            const containerCls = classNames('at-input__container', {
                'at-input--error': error?.value,
                'at-input--disabled': disabled
            })

            const overlayCls = classNames('at-input__overlay', {
                'at-input__overlay--hidden': !disabled
            })

            const placeholderCls = classNames('placeholder', placeholderClass?.value)

            // conditional nodes
            const titleNode = h(Label, {
                class: classNames(
                    'at-input__title',
                    required?.value && `at-input__title--required`
                ),
                for: name.value
            }, title?.value)

            const clearNode = h(View, {
                class: 'at-input__icon',
                onTouchEnd: handleClearValue
            }, [
                h(Text, {
                    class: classNames('at-icon', 'at-icon-close-circle', 'at-input__icon-close')
                })
            ])

            const errorNode = h(View, {
                class: 'at-input__icon',
                onTouchStart: handleErrorClick
            }, [
                h(Text, {
                    class: classNames('at-icon', 'at-icon-alert-circle', 'at-input__icon-alert')
                })
            ])

            return (
                h(View, { class: rootCls, style: customStyle?.value }, [
                    h(View, { class: containerCls }, [
                        h(View, { class: overlayCls, onTap: handleClick }),
                        title?.value && titleNode,
                        h(Input, {
                            class: 'at-input__input',
                            id: name.value,
                            name: name.value,
                            type: type,
                            password: password,
                            placeholderStyle: placeholderStyle?.value,
                            placeholderClass: placeholderCls,
                            placeholder: placeholder?.value,
                            cursorSpacing: cursorSpacing?.value,
                            maxlength: maxlength,
                            autoFocus: autoFocus?.value,
                            focus: focus?.value,
                            value: value?.value,
                            confirmType: confirmType?.value,
                            cursor: cursor?.value,
                            selectionStart: selectionStart?.value,
                            selectionEnd: selectionEnd?.value,
                            adjustPosition: adjustPosition?.value,
                            onInput: handleInput,
                            onFocus: handleFocus,
                            onBlur: handleBlur,
                            onConfirm: handleConfirm,
                            onKeyboardHeightChange: handleKeyboardHeightChange,
                        }),
                        (clear?.value && value?.value) && clearNode,
                        error?.value && errorNode,
                        h(View, { class: 'at-input__children' }, slots.default!())
                    ])
                ])
            )
        }
    }
})

export default AtInput