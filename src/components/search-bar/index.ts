import { h, defineComponent, reactive, computed, CSSProperties, mergeProps, ref, PropType } from 'vue'
import { Input, Text, View } from '@tarojs/components'
import { BaseEventOrig, CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtSearchBarProps, AtSearchBarState } from 'types/search-bar'
import { isTest, uuid } from '../../utils/common'
import { useModelValue } from '../../composables/model'

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
      type: String as PropType<AtSearchBarProps['inputType']>,
      default: 'text'
    },
    onChange: Function as PropType<AtSearchBarProps['onChange']>,
    onFocus: Function as PropType<AtSearchBarProps['onFocus']>,
    onBlur: Function as PropType<AtSearchBarProps['onBlur']>,
    onConfirm: Function as PropType<AtSearchBarProps['onConfirm']>,
    onActionClick: Function as PropType<AtSearchBarProps['onActionClick']>,
    onClear: Function as PropType<AtSearchBarProps['onClear']>,
  },

  setup(props: AtSearchBarProps, { attrs, emit }) {

    const state = reactive<AtSearchBarState>({
      isFocus: !!props.focus
    })

    const inputID = ref(isTest() ? 'weui-input_2020' : 'weui-input_' + uuid())
    const inputValue = useModelValue(props, emit, 'value')

    const fontSize = 14

    const rootClasses = computed(() => ({
      'at-search-bar': true,
      'at-search-bar--fixed': props.fixed
    }))

    const placeholderWrapStyle = computed(() => {
      const placeholderWrapStyle: CSSProperties = {}

      if (state.isFocus || (!state.isFocus && props.value)) {
        placeholderWrapStyle.flexGrow = 0
      } else if (!state.isFocus && !inputValue.value) {
        placeholderWrapStyle.flexGrow = 1
      }

      return placeholderWrapStyle
    })

    const actionStyle = computed(() => {
      const actionStyle: CSSProperties = {}

      if (state.isFocus || (!state.isFocus && inputValue.value)) {
        actionStyle.opacity = 1
        actionStyle.marginRight = `0`
      } else if (!state.isFocus && !inputValue.value) {
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
      display: !inputValue.value.length ? 'none' : 'flex'
    }))

    const placeholderStyle = computed(() => ({
      visibility: !inputValue.value.length ? 'visible' : 'hidden'
    }))

    function handleFocus(event: BaseEventOrig<any>): void {
      if (process.env.TARO_ENV === 'h5') {
        // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
        inputID.value = 'weui-input' + uuid(10, 32)
      }

      state.isFocus = true
      props.onFocus?.(event.detail.value, event)
    }

    function handleBlur(event: BaseEventOrig<any>): void {
      state.isFocus = false
      props.onBlur?.(event.detail.value, event)
    }

    function handleChange(e: BaseEventOrig<any>): void {
      if (attrs['onUpdate:value']) {
        inputValue.value = e.detail.value
      } else {
        props.onChange?.(e.detail.value, e)
      }

      if (process.env.TARO_ENV === 'h5' && e.detail.value === '') {
        clearInputNodeValue()
      }
    }

    // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
    function clearInputNodeValue() {
      const inputNode = document.querySelector<HTMLInputElement>(`#${inputID.value} > .weui-input`)
      inputNode!.value = ''
    }

    function handleClear(event: ITouchEvent): void {
      if (typeof props.onClear === 'function') {
        props.onClear(event)
      } else {
        if (attrs['onUpdate:value']) {
          inputValue.value = ''
        } else {
          props.onChange?.('', event)
        }
      }

      if (process.env.TARO_ENV === 'h5') {
        clearInputNodeValue()
      }
    }

    function handleConfirm(event: CommonEvent): void {
      props.onConfirm && props.onConfirm(event)
    }

    function handleActionClick(event: CommonEvent): void {
      props.onActionClick?.(event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => [
          // searchbar input
          h(View, {
            class: 'at-search-bar__input-cnt'
          }, {
            default: () => [
              // placeholder
              h(View, {
                class: 'at-search-bar__placeholder-wrap',
                style: placeholderWrapStyle.value
              }, {
                default: () => [
                  h(Text, { class: 'at-icon at-icon-search' }),
                  h(Text, {
                    class: 'at-search-bar__placeholder',
                    style: placeholderStyle.value
                  }, { default: () => state.isFocus ? '' : props.placeholder })
                ]
              }),

              // input
              h(Input, {
                class: 'at-search-bar__input',
                id: inputID.value,
                type: props.inputType,
                confirmType: 'search',
                value: inputValue.value,
                focus: state.isFocus,
                disabled: props.disabled,
                maxlength: props.maxLength,
                onBlur: handleBlur,
                onFocus: handleFocus,
                onInput: handleChange,
                onConfirm: handleConfirm,
              }),

              // clear icon
              // v-if="props.value" is necessary, otherwise
              // value cannot be cleared from screen in alipay
              inputValue.value && h(View, {
                class: 'at-search-bar__clear',
                style: clearIconStyle.value,
                onTouchstart: handleClear
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
            style: actionStyle.value,
            onTap: handleActionClick
          }, { default: () => props.actionName })
        ]
      })
    )
  }
})

export default AtSearchBar

