<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    @tap="handleClick"
  >
    <!-- web button -->
    <button
      v-if="isWEB && !disabled"
      class="at-button__wxbutton"
      lang="lang"
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
        :lang="lang"
        :form-type="formType"
        :open-type="openType"
        :session-from="sessionFrom"
        :app-parameter="appParameter"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :send-message-path="sendMessagePath"
        :send-message-title="sendMessageTitle"
        v-bind="eventHandles"
      />
    </form>

    <!-- alipay button -->
    <button
      v-if="isALIPAY && !disabled"
      class="at-button__wxbutton"
      :lang="lang"
      :form-type="formType"
      :open-type="openType"
      :scope="scope"
      :session-from="sessionFrom"
      :app-parameter="appParameter"
      :send-message-img="sendMessageImg"
      :show-message-card="showMessageCard"
      :send-message-path="sendMessagePath"
      :send-message-title="sendMessageTitle"
      v-bind="eventHandles"
    />

    <!-- loading && icon -->
    <view
      v-if="loading"
      class="at-button__icon"
    >
      <at-loading
        :size="loadingSize"
        :color="loadingColor"
      />
    </view>

    <!-- button text slot -->
    <view class="at-button__text">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from 'vue'
import { AtButtonProps } from "@taro-ui-vue3/types/button"
import { AtLoading } from '@taro-ui-vue3/loading'
import { getEnvs } from "@taro-ui-vue3/utils/common"

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

  components: {
    AtLoading
  },

  emits: ['click', 'submit', 'reset'],

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

  setup(props: AtButtonProps, { emit }) {
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

    const eventHandles = computed(() => getButtonEventHandlers())

    function handleClick(event) {
      if (!props.disabled) {
        emit('click', event)
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

    interface miniAppEventHandleProps {
      onError?: typeof props.onError
      onContact?: typeof props.onContact
      onOpenSetting?: typeof props.onOpenSetting
      onGetPhoneNumber?: typeof props.onGetPhoneNumber
      onGetUserInfo?: typeof props.onGetUserInfo
      onGetAuthorize?: typeof props.onGetAuthorize
      onLaunchapp?: typeof props.onLaunchapp
      onGetRealnameAuthInfo?: typeof props.onGetRealnameAuthInfo
    }

    function getButtonEventHandlers(): miniAppEventHandleProps {
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
        case 'getRealnameAuthInfo':
          wxButtonProps.onGetRealnameAuthInfo = handleGetRealnameAuthInfo
          break
        default:
          break
      }

      return wxButtonProps
    }

    return {
      ...toRefs(props),
      isWEB,
      isWEAPP,
      isALIPAY,
      rootClasses,
      loadingSize,
      loadingColor,
      handleClick,
      handleReset,
      handleSubmit,
      eventHandles
    }
  }
})
</script>

<style>
</style>