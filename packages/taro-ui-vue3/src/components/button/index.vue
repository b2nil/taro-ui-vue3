<template>
  <view
    :class="rootClass"
    :style="customStyle"
    @tap="handleClick"
  >
    <!-- web button -->
    <button
      v-if="isWEB && !disabled"
      class="at-button__wxbutton"
      :formType="formType === 'submit' || formType === 'reset' ? formType : undefined"
    />

    <!-- weapp button -->
    <form
      v-if="isWEAPP && !disabled"
      @submit="handleSubmit"
      @reset="handleReset"
    >
      <button
        class="at-button__wxbutton"
        :form-type="formType"
        :open-type="openType"
        :lang="lang"
        :session-from="sessionFrom"
        :app-parameter="appParameter"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :send-message-path="sendMessagePath"
        :send-message-title="sendMessageTitle"
        @error="handleError"
        @contact="handleContact"
        @launch-app="handleLaunchapp"
        @open-setting="handleOpenSetting"
        @get-user-info="handleGetUserInfo"
        @get-phone-number="handleGetPhoneNumber"
        @get-realname-auth-info="handleGetRealnameAuthInfo"
      />
    </form>

    <!-- alipay button -->
    <button
      v-if="isALIPAY && !disabled"
      class="at-button__wxbutton"
      :form-type="formType"
      :open-type="openType"
      :lang="lang"
      :scope="scope"
      :session-from="sessionFrom"
      :app-parameter="appParameter"
      :send-message-img="sendMessageImg"
      :show-message-card="showMessageCard"
      :send-message-path="sendMessagePath"
      :send-message-title="sendMessageTitle"
      @error="handleError"
      @contact="handleContact"
      @launch-app="handleLaunchapp"
      @open-setting="handleOpenSetting"
      @get-user-info="handleGetUserInfo"
      @get-authorize="handleGetAuthorize"
      @get-phone-number="handleGetPhoneNumber"
    />

    <!-- loading && icon -->
    <view
      v-if="loading"
      class="at-button__icon"
    >
      <at-loading
        :color="loadingColor"
        :size="loadingSize"
      />
    </view>

    <!-- button text slot -->
    <view class="at-button__text">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { ButtonProps } from "@tarojs/components/types/Button";
import { AtButtonProps } from "types/button";
import AtLoading from '../loading/index'
import { getEnvs } from '../../utils/common'
import AtComponentWithDefaultProps from '../mixins';
import Taro from '@tarojs/taro'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary',
}

export default defineComponent({
  name: "AtButton",

  mixins: [AtComponentWithDefaultProps],

  components: {
    AtLoading
  },

  props: {
    size: {
      type: String as () => 'normal' | 'small',
      default: 'normal' as 'normal' | 'small',
      validator: (prop: string) => ['normal', 'small'].includes(prop)
    },
    type: {
      type: String as () => 'primary' | 'secondary' | undefined,
      default: '' as 'primary' | 'secondary' | undefined,
      validator: (prop: string) => ['primary', 'secondary', ''].includes(prop)
    },
    circle: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { },
    },
    // Taro Button Props
    formType: {
      type: String as () => keyof ButtonProps.formType,
      default: undefined,
      validator: (prop: string) => ['submit', 'reset', ''].includes(prop)
    },
    openType: {
      type: String as () => keyof ButtonProps.openType,
      default: undefined,
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
      type: String as () => keyof ButtonProps.lang,
      default: 'en' as keyof ButtonProps.lang
    },
    scope: { // alipay scope, 当 open-type 为 getAuthorize 时有效。
      type: String as () => 'userInfo' | 'phoneNumber' | undefined,
      default: undefined
    },
    sessionFrom: { type: String, default: '', },
    appParameter: { type: String, default: '', },
    sendMessageImg: { type: String, default: '', },
    sendMessagePath: { type: String, default: '', },
    sendMessageTitle: { type: String, default: '', },
    showMessageCard: { type: Boolean, default: false, },
    // Taro Button Events
    onGetUserInfo: {
      type: Function as unknown as () => CommonEventFunction<ButtonProps.onGetUserInfoEventDetail>,
      default: () => () => { }
    },
    onGetAuthrize: { // Alipay auth
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { }
    },
    onContact: {
      type: Function as unknown as () => CommonEventFunction<ButtonProps.onContactEventDetail>,
      default: () => () => { }
    },
    onGetPhoneNumber: {
      type: Function as unknown as () => CommonEventFunction<ButtonProps.onGetPhoneNumberEventDetail>,
      default: () => () => { }
    },
    onGetRealnameAuthInfo: {
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { }
    },
    onError: {
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { }
    },
    onOpenSetting: {
      type: Function as unknown as () => CommonEventFunction<ButtonProps.onOpenSettingEventDetail>,
      default: () => () => { }
    },
    onLaunchapp: {
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { }
    }
  },

  setup(props: AtButtonProps, { slots }) {
    const { isWEAPP, isALIPAY, isWEB } = getEnvs()
    const loadingColor = computed(() => props.type === 'primary' ? '#fff' : '')
    const loadingSize = computed(() => props.size === 'small' ? '30' : '0')

    const rootClass = computed(() => ({
      [`at-button--${SIZE_CLASS[props.size ? props.size : 'normal']}`]: SIZE_CLASS[props.size ? props.size : 'normal'],
      [`at-button--${props.type}`]: TYPE_CLASS[props.type ? props.type : ''],
      [props.className]: true,
      'at-button--circle': props.circle,
      'at-button--disabled': props.disabled,
      'at-button--full': props.full,
      'at-button--icon': props.loading,
      'at-button': true,
    }))

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

    function handleGetRealnameAuthInfo(event) {
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

    return {
      ...toRefs(props),
      isWEB,
      isWEAPP,
      isALIPAY,
      handleClick,
      handleError,
      handleContact,
      handleLaunchapp,
      handleGetUserInfo,
      handleOpenSetting,
      handleGetAuthorize,
      handleGetPhoneNumber,
      handleGetRealnameAuthInfo,
    }
  }
})
</script>

<style>
</style>