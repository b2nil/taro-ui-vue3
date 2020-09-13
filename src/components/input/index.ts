import { h, defineComponent, ref, computed, mergeProps } from "vue"
import { Input, Text, View, Label } from "@tarojs/components";
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
    name: "AtInput",

    props: {
        name: {
            type: String as () => AtInputProps['name'],
            default: '',
            required: true
        },
        title: {
            type: String as () => AtInputProps['title'],
            default: ''
        },
        type: {
            type: String as () => AtInputProps['type'],
            default: 'text' as AtInputProps['type'],
            validator: (val: string) => ['text', 'number', 'password', 'phone', 'idcard', 'digit'].includes(val)
        },
        error: Boolean,
        clear: Boolean,
        border: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        value: {
            type: String as () => AtInputProps['value'],
            default: ''
        },
        placeholder: {
            type: String as () => AtInputProps['placeholder'],
            default: ''
        },
        placeholderStyle: {
            type: String as () => AtInputProps['placeholderStyle'],
            default: ''
        },
        placeholderClass: {
            type: String as () => AtInputProps['placeholderClass'],
            default: ''
        },
        editable: {
            type: Boolean,
            default: true
        },
        adjustPosition: Boolean,
        autoFocus: Boolean,
        focus: Boolean,
        required: Boolean,
        cursorSpacing: {
            type: Number as () => AtInputProps['cursorSpacing'],
            default: 50
        },
        cursor: {
            type: Number as () => AtInputProps['cursor'],
            default: 0
        },
        selectionStart: {
            type: Number as () => AtInputProps['selectionStart'],
            default: -1
        },
        selectionEnd: {
            type: Number as () => AtInputProps['selectionEnd'],
            default: -1
        },
        maxLength: {
            type: Number as () => AtInputProps['maxLength'],
            default: 140
        },
        confirmType: {
            type: String as () => AtInputProps["confirmType"],
            default: 'done' as AtInputProps["confirmType"],
            validator: (val: string) => ["done", "send", "search", "next", "go"].includes(val)
        },
        // events
        onChange: {
            type: Function as unknown as () => AtInputProps['onChange'],
            default: () => () => { },
            required: true
        },
        onBlur: Function as unknown as () => AtInputProps['onBlur'],
        onFocus: Function as unknown as () => AtInputProps['onFocus'],
        onConfirm: Function as unknown as () => AtInputProps['onConfirm'],
        onClick: Function as unknown as () => AtInputProps['onClick'],
        onKeyboardHeightChange: Function as unknown as () => AtInputProps['onKeyboardHeightChange'],
        onErrorClick: Function as unknown as () => AtInputProps['onErrorClick']
    },

    setup(props: AtInputProps, { attrs, slots }) {
        const inputClearing = ref(false)

        const inputProps = computed(() => getInputProps(props))

        const rootClasses = computed(() => ({
            'at-input': true,
            'at-input--without-border': props.border
        }))

        const containerClasses = computed(() => ({
            'at-input__container': true,
            'at-input--error': props.error,
            'at-input--disabled': inputProps.value.disabled
        }))

        const overlayClasses = computed(() => ({
            'at-input__overlay': true,
            'at-input__overlay--hidden': !inputProps.value.disabled
        }))

        const placeholderClasses = computed(() => ({
            'placeholder': true,
            [`${props.placeholderClass}`]: props.placeholderClass !== ''
        }))

        const titleClasses = computed(() => ({
            'at-input__title': true,
            'at-input__title--required': props.required
        }))

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
            return (
                h(View, mergeProps(attrs, {
                    class: rootClasses.value,
                }), [
                    h(View, {
                        class: containerClasses.value
                    }, [
                        h(View, {
                            class: overlayClasses.value,
                            onTap: handleClick
                        }),

                        props.title && (
                            h(Label, {
                                class: titleClasses.value,
                                for: props.name
                            }, props.title)
                        ),

                        h(Input, {
                            class: 'at-input__input',
                            id: props.name,
                            name: props.name,
                            type: inputProps.value.type,
                            password: inputProps.value.password,
                            placeholderStyle: props.placeholderStyle,
                            placeholderClass: placeholderClasses.value,
                            placeholder: props.placeholder,
                            cursorSpacing: props.cursorSpacing,
                            maxlength: inputProps.value.maxlength,
                            autoFocus: props.autoFocus,
                            focus: props.focus,
                            value: props.value,
                            confirmType: props.confirmType,
                            cursor: props.cursor,
                            selectionStart: props.selectionStart,
                            selectionEnd: props.selectionEnd,
                            adjustPosition: props.adjustPosition,
                            onBlur: handleBlur,
                            onInput: handleInput,
                            onFocus: handleFocus,
                            onConfirm: handleConfirm,
                            onKeyboardHeightChange: handleKeyboardHeightChange,
                        }),

                        (props.clear && props.value) && (
                            h(View, {
                                class: 'at-input__icon',
                                onTouchEnd: handleClearValue
                            }, [
                                h(Text, {
                                    class: 'at-icon at-icon-close-circle at-input__icon-close'
                                })
                            ])
                        ),

                        props.error && (
                            h(View, {
                                class: 'at-input__icon',
                                onTouchStart: handleErrorClick
                            }, [
                                h(Text, {
                                    class: 'at-icon at-icon-alert-circle at-input__icon-alert'
                                })
                            ])
                        ),

                        h(View, {
                            class: 'at-input__children'
                        }, slots.default && slots.default())
                    ])
                ])
            )
        }
    }
})

export default AtInput