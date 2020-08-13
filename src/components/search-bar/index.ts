import { h, defineComponent, reactive, computed, CSSProperties } from 'vue'
import classNames from 'classnames'
import { Input, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSearchBarProps, AtSearchBarState } from 'types/search-bar'
import AtComponentWithDefaultProps from '../mixins'

type ExtendEvent = {
    target: {
        value: string
    }
}

const AtSearchBar = defineComponent({
    mixins: [AtComponentWithDefaultProps],

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

    setup(props: AtSearchBarProps, { slots }) {

        const state = reactive<AtSearchBarState>({
            isFocus: !!props.focus
        })

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

        return () => {
            const { isFocus } = state
            const fontSize = 14

            const rootClass = computed(() => classNames(
                'at-search-bar',
                {
                    'at-search-bar--fixed': props.fixed
                },
                props.className
            ))

            const { placeholderWrapStyle, actionStyle } = computed(() => {
                const placeholderWrapStyle: CSSProperties = {}
                const actionStyle: CSSProperties = {}

                if (isFocus || (!isFocus && props.value)) {
                    actionStyle.opacity = 1
                    actionStyle.marginRight = `0`
                    placeholderWrapStyle.flexGrow = 0
                } else if (!isFocus && !props.value) {
                    placeholderWrapStyle.flexGrow = 1
                    actionStyle.opacity = 0
                    actionStyle.marginRight = `-${
                        (props.actionName!.length + 1) * fontSize + fontSize / 2 + 10
                        }px`
                }

                if (props.showActionButton) {
                    actionStyle.opacity = 1
                    actionStyle.marginRight = `0`
                }

                return {
                    placeholderWrapStyle,
                    actionStyle
                }

            }).value

            const { clearIconStyle, placeholderStyle } = computed(() => {
                const clearIconStyle: CSSProperties = { display: 'flex' }
                const placeholderStyle: CSSProperties = { visibility: 'hidden' }

                if (!props.value.length) {
                    clearIconStyle.display = 'none'
                    placeholderStyle.visibility = 'visible'
                }

                return {
                    clearIconStyle,
                    placeholderStyle
                }

            }).value

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle
                }, {
                    default: () => [
                        // searchbar input
                        h(View, { class: 'at-search-bar__input-cnt' }, {
                            default: () => [
                                // placeholder
                                h(View, {
                                    class: 'at-search-bar__placeholder-wrap',
                                    style: placeholderWrapStyle
                                }, {
                                    default: () => [
                                        h(Text, { class: 'at-icon at-icon-search' }),
                                        h(Text, {
                                            class: 'at-search-bar__placeholder',
                                            style: placeholderStyle
                                        }, isFocus ? '' : props.placeholder)
                                    ]
                                }),
                                // input
                                h(Input, {
                                    class: 'at-search-bar__input',
                                    type: props.inputType,
                                    confirmType: 'search',
                                    value: props.value,
                                    focus: isFocus,
                                    disabled: props.disabled,
                                    maxlength: props.maxLength,
                                    onInput: handleChange,
                                    onFocus: handleFocus,
                                    onBlur: handleBlur,
                                    onConfirm: handleConfirm,
                                }),
                                // clear icon
                                h(View, {
                                    class: 'at-search-bar__clear',
                                    style: clearIconStyle,
                                    onTouchStart: handleClear
                                }, {
                                    default: () => [
                                        h(Text, { class: 'at-icon at-icon-close-circle' })
                                    ]
                                })
                            ]
                        }),
                        // searchbar action
                        h(View, {
                            class: 'at-search-bar__action',
                            style: actionStyle,
                            onTap: handleActionClick
                        }, props.actionName)
                    ]
                })
            )
        }
    }
})

export default AtSearchBar

