import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Button, View, Form } from '@tarojs/components'
import { AtButtonProps } from "types/button"
import AtLoading from '../loading/index'
import { getEnvs } from '../../utils/common'
import Taro from '@tarojs/taro'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary',
}

const AtButton = defineComponent({
  name: "AtButton",

  components: {
    AtLoading
  },

  props: {
    size: {
      type: String as PropType<AtButtonProps['size']>,
      default: 'normal',
      validator: (prop: string) => ['normal', 'small'].includes(prop)
    },
    type: {
      type: String as PropType<AtButtonProps['type']>,
      default: '',
      validator: (prop: string) => ['primary', 'secondary', ''].includes(prop)
    },
    circle: Boolean,
    full: Boolean,
    loading: Boolean,
    disabled: Boolean,
    onClick: {
      type: Function as PropType<AtButtonProps['onClick']>,
      default: () => () => { },
    },

    // Taro Button Props
    formType: {
      type: String as PropType<AtButtonProps['formType']>,
      default: '',
      validator: (prop: string) => ['submit', 'reset', ''].includes(prop)
    },
    openType: {
      type: String as PropType<AtButtonProps['openType']>,
      validator: (prop: string) => [
        'contact',
        "contactShare",
        'share',
        "getRealnameAuthInfo",
        "getAuthorize",
        "getPhoneNumber",
        "getUserInfo",
        "lifestyle",
        "launchApp",
        "openSetting",
        "feedback",
      ].includes(prop),
    },
    lang: {
      type: String as PropType<AtButtonProps['lang']>,
      default: 'en'
    },
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    scope: String as PropType<AtButtonProps['scope']>, // alipay scope

    // Taro Button Events
    onGetUserInfo: Function as PropType<AtButtonProps['onGetUserInfo']>,
    onGetAuthorize: Function as PropType<AtButtonProps['onGetAuthorize']>, // Alipay auth
    onContact: Function as PropType<AtButtonProps['onContact']>,
    onGetPhoneNumber: Function as PropType<AtButtonProps['onGetPhoneNumber']>,
    onGetRealnameAuthInfo: Function as PropType<AtButtonProps['onGetRealnameAuthInfo']>,
    onError: Function as PropType<AtButtonProps['onError']>,
    onOpenSetting: Function as PropType<AtButtonProps['onOpenSetting']>,
    onLaunchapp: Function as PropType<AtButtonProps['onLaunchapp']>,
  },

  setup(props: AtButtonProps, { attrs, slots }) {
    const { isWEAPP, isALIPAY, isWEB } = getEnvs()

    const rootClasses = computed(() => ({
      [`at-button--${SIZE_CLASS[props.size ? props.size : 'normal']}`]: SIZE_CLASS[props.size ? props.size : 'normal'],
      [`at-button--${props.type}`]: TYPE_CLASS[props.type ? props.type : ''],
      'at-button--circle': props.circle,
      'at-button--disabled': props.disabled,
      'at-button--full': props.full,
      'at-button--icon': props.loading,
      'at-button': true,
    }))

    const loadingColor = computed(() => props.type === 'primary' ? '#fff' : '')
    const loadingSize = computed(() => props.size === 'small' ? '30' : '0')

    function handleClick(event) {
      if (!props.disabled) {
        props.onClick && props.onClick(event)
      }
    }

    function handleGetUserInfo(event) {
      props.onGetUserInfo && props.onGetUserInfo(event)
    }

    function handleGetPhoneNumber(event) {
      props.onGetPhoneNumber && props.onGetPhoneNumber(event)
    }

    function handleOpenSetting(event) {
      props.onOpenSetting && props.onOpenSetting(event)
    }

    function handleError(event) {
      props.onError && props.onError(event)
    }

    function handleContact(event) {
      props.onContact && props.onContact(event)
    }

    function handleLaunchapp(event) {
      props.onLaunchapp && props.onLaunchapp(event)
    }

    function handleGetRealNameAuthInfo(event) {
      props.onGetRealnameAuthInfo && props.onGetRealnameAuthInfo(event)
    }

    function handleGetAuthorize(event) {
      props.onGetAuthorize && props.onGetAuthorize(event)
    }

    function handleSubmit(event) {
      if (isWEAPP || isWEB) {
        // 已知问题：https://github.com/NervJS/taro-ui/issues/96
        Taro.eventCenter.trigger('submit', event.detail, {
          bubbles: true,
          composed: true,
        })
      }
    }

    function handleReset(event) {
      if (isWEAPP || isWEB) {
        // 已知问题：https://github.com/NervJS/taro-ui/issues/96
        Taro.eventCenter.trigger('reset', event.detail, {
          bubbles: true,
          composed: true,
        })
      }
    }

    interface miniAppEventHandleProps {
      onError?: typeof props.onError
      onContact?: typeof props.onContact
      onOpenSetting?: typeof props.onOpenSetting
      onGetPhoneNumber?: typeof props.onGetPhoneNumber
      onGetUserInfo?: typeof props.onGetUserInfo
      onGetAuthorize?: typeof props.onGetAuthorize
      onLaunchapp?: typeof props.onLaunchapp
    }

    function getWxButtonProps(): miniAppEventHandleProps {
      if (!props.openType) return {}

      const wxButtonProps: miniAppEventHandleProps = {}

      switch (props.openType) {
        case 'contact':
          wxButtonProps.onContact = handleContact
          break
        case 'openSetting':
          wxButtonProps.onOpenSetting = handleOpenSetting
          break
        case 'getPhoneNumber':
          wxButtonProps.onGetPhoneNumber = handleGetPhoneNumber
          break
        case 'getUserInfo':
          wxButtonProps.onGetUserInfo = handleGetUserInfo
          break
        case 'getAuthorize':
          wxButtonProps.onGetAuthorize = handleGetAuthorize
          break
        case 'launchApp':
          wxButtonProps.onLaunchapp = handleLaunchapp
          wxButtonProps.onError = handleError
          break
        default:
          break
      }

      return wxButtonProps
    }

    const webButton = h(Button, {
      class: 'at-button__wxbutton',
      lang: props.lang,
      formType: props.formType === 'submit' || props.formType === 'reset' ? props.formType : undefined
    })

    const miniAppButton = h(Button, {
      class: 'at-button__wxbutton',
      formType: props.formType,
      openType: props.openType,
      lang: props.lang,
      sessionFrom: props.sessionFrom,
      sendMessageTitle: props.sendMessageTitle,
      sendMessagePath: props.sendMessagePath,
      sendMessageImg: props.sendMessageImg,
      showMessageCard: props.showMessageCard,
      appParameter: props.appParameter,
      ...getWxButtonProps()
    })

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value,
        onTap: handleClick
      }), {
        default: () => [
          // web button
          isWEB && !props.disabled && webButton,

          // weapp button
          isWEAPP && !props.disabled && h(Form, {
            onSubmit: handleSubmit,
            onReset: handleReset
          }, { default: () => [miniAppButton] }),

          // alipay button
          isALIPAY && !props.disabled && miniAppButton,

          // loading icon
          props.loading && h(View, {
            class: 'at-button__icon'
          }, {
            default: () => [
              h(AtLoading, {
                color: loadingColor.value,
                size: loadingSize.value
              })
            ]
          }),

          // button text
          h(View, {
            class: 'at-button__text'
          }, { default: () => slots.default && slots.default() })
        ]
      })
    )
  }
})

export default AtButton
