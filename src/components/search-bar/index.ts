import { h, defineComponent, reactive, computed, CSSProperties, mergeProps } from 'vue'
import { Input, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSearchBarProps, AtSearchBarState } from 'types/search-bar'

type ExtendEvent = {
    target: {
        value: string
    }
}

const AtSearchBar = defineComponent({
    name: "AtSearchBar",

    props: {
        value: {
            type: String,
            default: '',
            required: true
        },
        placeholder: {
            type: String,
            default: '搜索'
        },
        maxLength: {
            type: Number,
            default: 140
        },
        fixed: {
            type: Boolean,
            default: false
        },
        focus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showActionButton: {
            type: Boolean,
            default: false
        },
        actionName: {
            type: String,
            default: '搜索'
        },
        inputType: {
            type: String as () => AtSearchBarProps['inputType'],
            default: 'text' as AtSearchBarProps['inputType']
        },
        onChange: {
            type: Function as unknown as () => AtSearchBarProps['onChange'],
            default: () => (value: string, event: CommonEvent) => { },
            required: true
        },
        onFocus: Function as unknown as () => AtSearchBarProps['onFocus'],
        onBlur: Function as unknown as () => AtSearchBarProps['onBlur'],
        onConfirm: Function as unknown as () => AtSearchBarProps['onConfirm'],
        onActionClick: Function as unknown as () => AtSearchBarProps['onActionClick'],
        onClear: Function as unknown as () => AtSearchBarProps['onClear'],
    },

    setup(props: AtSearchBarProps, { attrs, slots }) {

        const state = reactive<AtSearchBarState>({
            isFocus: !!props.focus
        })

        const fontSize = 14

        const rootClass = computed(() => ({
            'at-search-bar': true,
            'at-search-bar--fixed': props.fixed
        }))

        const placeholderWrapStyle = computed(() => {
            const placeholderWrapStyle: CSSProperties = {}

            if (state.isFocus || (!state.isFocus && props.value)) {
                placeholderWrapStyle.flexGrow = 0
            } else if (!state.isFocus && !props.value) {
                placeholderWrapStyle.flexGrow = 1
            }

            return placeholderWrapStyle
        })

        const actionStyle = computed(() => {
            const actionStyle: CSSProperties = {}

            if (state.isFocus || (!state.isFocus && props.value)) {
                actionStyle.opacity = 1
                actionStyle.marginRight = `0`
            } else if (!state.isFocus && !props.value) {
                actionStyle.opacity = 0
                actionStyle.marginRight = `-${(props.actionName!.length + 1) * fontSize + fontSize / 2 + 10
                    }px`
            }

            if (props.showActionButton) {
                actionStyle.opacity = 1
                actionStyle.marginRight = `0`
            }

            return actionStyle
        })

        const clearIconStyle = computed(() => ({
            display: !props.value.length ? 'none' : 'flex'
        }))

        const placeholderStyle = computed(() => ({
            visibility: !props.value.length ? 'visible' : 'hidden'
        }))

        function handleFocus(event: CommonEvent): void {
            state.isFocus = true
            props.onFocus && props.onFocus(event)
        }

        function handleBlur(event: CommonEvent): void {
            state.isFocus = false
            props.onBlur && props.onBlur(event)
        }

        function handleChange(e: CommonEvent & ExtendEvent): void {
            props.onChange(e.target.value, e)
        }

        function handleClear(event: CommonEvent): void {
            if (props.onClear) {
                props.onClear(event)
            } else {
                props.onChange('', event)
            }
        }

        function handleConfirm(event: CommonEvent): void {
            props.onConfirm && props.onConfirm(event)
        }

        function handleActionClick(event: CommonEvent): void {
            props.onActionClick && props.onActionClick(event)
        }

        return () => (
            h(View, mergeProps(attrs, {
                class: rootClass.value
            }), {
                default: () => [
                    // searchbar input
                    h(View, {
                        class: 'at-search-bar__input-cnt'
                    }, [
                        // placeholder
                        h(View, {
                            class: 'at-search-bar__placeholder-wrap',
                            style: placeholderWrapStyle.value
                        }, [
                            h(Text, { class: 'at-icon at-icon-search' }),
                            h(Text, {
                                class: 'at-search-bar__placeholder',
                                style: placeholderStyle.value
                            }, state.isFocus ? '' : props.placeholder)
                        ]),

                        // input
                        h(Input, {
                            class: 'at-search-bar__input',
                            type: props.inputType,
                            confirmType: 'search',
                            value: props.value,
                            focus: state.isFocus,
                            disabled: props.disabled,
                            maxlength: props.maxLength,
                            onBlur: handleBlur,
                            onFocus: handleFocus,
                            onInput: handleChange,
                            onConfirm: handleConfirm,
                        }),
                        // clear icon
                        h(View, {
                            class: 'at-search-bar__clear',
                            style: clearIconStyle.value,
                            onTouchStart: handleClear
                        }, [
                            h(Text, { class: 'at-icon at-icon-close-circle' })
                        ])
                    ]),

                    // searchbar action
                    h(View, {
                        class: 'at-search-bar__action',
                        style: actionStyle.value,
                        onTap: handleActionClick
                    }, props.actionName)
                ]
            })
        )
    }
})

export default AtSearchBar

