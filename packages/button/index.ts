import { h, defineComponent, computed, mergeProps, warn, PropType } from 'vue'
import { Button, View, Form } from '@tarojs/components'
import { AtButtonProps } from '@taro-ui-vue3/types/button'
import AtLoading from '../loading/index'
import { getEnvs } from '@taro-ui-vue3/utils/common'
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
    onClick: Function as unknown as PropType<AtButtonProps['onClick']>,

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
    onGetUserInfo: Function as unknown as PropType<AtButtonProps['onGetUserInfo']>,
    onGetAuthorize: Function as unknown as PropType<AtButtonProps['onGetAuthorize']>, // Alipay auth
    onContact: Function as unknown as PropType<AtButtonProps['onContact']>,
    onGetPhoneNumber: Function as unknown as PropType<AtButtonProps['onGetPhoneNumber']>,
    onGetRealnameAuthInfo: Function as unknown as PropType<AtButtonProps['onGetRealnameAuthInfo']>,
    onError: Function as unknown as PropType<AtButtonProps['onError']>,
    onOpenSetting: Function as unknown as PropType<AtButtonProps['onOpenSetting']>,
    onLaunchapp: Function as unknown as PropType<AtButtonProps['onLaunchapp']>,
  },

  setup(props: AtButtonProps, { attrs, slots }) {
    const { isWEAPP, isALIPAY, isWEB } = getEnvs()

    const rootClasses = computed(() => ({
      [`at-button--${SIZE_CLASS[props.size!]}`]: SIZE_CLASS[props.size!],
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
      if (Boolean(attrs['onTap'])) {
        warn(
          'AtButton 绑定的点击事件应为 `click`， 而非 `tap`。',
          '正确示例：`<at-button @click="eventHandler"/>`'
        )
      }

      if (!props.disabled) {
        props.onClick?.(event)
      }
    }

    function handleGetUserInfo(event) {
      warn(
        "2021 年 4 月 13 日后发布的新版本小程序，",
        "开发者调用 `wx.getUserInfo` 或 `<button open-type=\"getUserInfo\"/>` 将不再弹出弹窗，",
        "直接返回匿名的用户个人信息。",
        "详情见：https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801?idescene=6&page=10,",
        "请使用 `getUserProfile` 进行适配。"
      )
      props.onGetUserInfo?.(event)
    }

    function handleGetPhoneNumber(event) {
      props.onGetPhoneNumber?.(event)
    }

    function handleOpenSetting(event) {
      props.onOpenSetting?.(event)
    }

    function handleError(event) {
      props.onError?.(event)
    }

    function handleContact(event) {
      props.onContact?.(event)
    }

    function handleLaunchapp(event) {
      props.onLaunchapp?.(event)
    }

    function handleGetRealNameAuthInfo(event) {
      props.onGetRealnameAuthInfo?.(event)
    }

    function handleGetAuthorize(event) {
      props.onGetAuthorize?.(event)
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
      onOpensetting?: typeof props.onOpenSetting
      onGetphonenumber?: typeof props.onGetPhoneNumber
      onGetuserinfo?: typeof props.onGetUserInfo
      onGetauthorize?: typeof props.onGetAuthorize
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
          wxButtonProps.onOpensetting = handleOpenSetting
          break
        case 'getPhoneNumber':
          wxButtonProps.onGetphonenumber = handleGetPhoneNumber
          break
        case 'getUserInfo':
          wxButtonProps.onGetuserinfo = handleGetUserInfo
          break
        case 'getAuthorize':
          wxButtonProps.onGetauthorize = handleGetAuthorize
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
          }, { default: () => slots.default?.() })
        ]
      })
    )
  }
})

export default AtButton
