import { h, defineComponent, reactive, computed, CSSProperties, mergeProps, ref, watch, PropType } from 'vue'
import { Input, Text, View } from '@tarojs/components'
import { BaseEventOrig, CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtSearchBarProps, AtSearchBarState } from 'types/search-bar'
import { ENV_TYPE, getEnv } from '@tarojs/taro'
import { uuid } from '@/utils/common'

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
    onChange: {
      type: Function as PropType<AtSearchBarProps['onChange']>,
      default: () => (value: string, event: CommonEvent) => { },
      required: true
    },
    onFocus: Function as PropType<AtSearchBarProps['onFocus']>,
    onBlur: Function as PropType<AtSearchBarProps['onBlur']>,
    onConfirm: Function as PropType<AtSearchBarProps['onConfirm']>,
    onActionClick: Function as PropType<AtSearchBarProps['onActionClick']>,
    onClear: Function as PropType<AtSearchBarProps['onClear']>,
  },

  setup(props: AtSearchBarProps, { attrs, slots }) {

    const state = reactive<AtSearchBarState>({
      isFocus: !!props.focus
    })

    const isWEB = ref(getEnv() === ENV_TYPE.WEB)
    const inputID = ref('weui-input' + uuid())
    const inputValue = ref(props.value)

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

    watch(() => props.value, (val, preVal) => {
      if (preVal !== val) {
        inputValue.value = val
      }
    })

    function handleFocus(event: BaseEventOrig<any>): void {
      if (isWEB.value) {
        // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
        inputID.value = 'weui-input' + String(event.timeStamp).replace('.', '')
      }

      state.isFocus = true
      props.onFocus && props.onFocus(event.detail.value, event)
    }

    function handleBlur(event: BaseEventOrig<any>): void {
      state.isFocus = false
      props.onBlur && props.onBlur(event.detail.value, event)
    }

    function handleChange(e: BaseEventOrig<any>): void {
      props.onChange(e.detail.value, e)

      if (isWEB.value && e.detail.value === '') {
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
        props.onChange('', event)
      }

      if (isWEB.value) {
        clearInputNodeValue()
      }
    }

    function handleConfirm(event: CommonEvent): void {
      props.onConfirm && props.onConfirm(event)
    }

    function handleActionClick(event: CommonEvent): void {
      props.onActionClick && props.onActionClick(event)

      // default to clear value after action click
      props.onChange('', event)
      if (isWEB.value) {
        clearInputNodeValue()
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
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
              h(Input, mergeProps(isWEB.value ? { id: inputID.value } : {}, {
                class: 'at-search-bar__input',
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
              })),

              // clear icon
              // v-if="props.value" is necessary, otherwise
              // value cannot be cleared from screen in alipay
              props.value && h(View, {
                class: 'at-search-bar__clear',
                style: clearIconStyle.value,
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
            style: actionStyle.value,
            onTap: handleActionClick
          }, { default: () => props.actionName })
        ]
      })
    )
  }
})

export default AtSearchBar

