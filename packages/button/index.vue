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
        v-bind="genMiniAppButtonEvents()"
      />
    </form>

    <!-- alipay button -->
    <button
      v-if="isALIPAY && !disabled"
      class="at-button__wxbutton"
      :lang="lang"
      :scope="scope"
      :form-type="formType"
      :open-type="openType"
      v-bind="genMiniAppButtonEvents()"
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

    <!-- button text -->
    <view class="at-button__text">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType, warn } from 'vue'
import { AtButtonProps } from "@taro-ui-vue3/types/button"
import { getEnvs } from "@taro-ui-vue3/utils"
import AtLoading from '@taro-ui-vue3/loading/index.vue'

import Taro from '@tarojs/taro'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary'
}

const AtButton = defineComponent({
  name: "AtButton",

  components: {
    AtLoading
  },

  emits: [
    'click',
    'getUserInfo',
    'getAuthorize',
    'contact',
    'getPhoneNumber',
    'error',
    'openSetting',
    'launchapp',
  ],

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

    // Miniapp button props
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
        "getAuthorize",
        "getPhoneNumber",
        "getUserInfo",
        "lifestyle",
        "launchApp",
        "openSetting",
        "feedback",
      ].includes(prop)
    },
    lang: {
      type: String as PropType<AtButtonProps['lang']>,
      default: 'en'
    },
    // weixin specific props
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    // alipay specific props
    scope: String as PropType<AtButtonProps['scope']>
  },

  setup(props: AtButtonProps, { attrs, emit }) {
    const { isWEAPP, isALIPAY, isWEB } = getEnvs()

    const rootClasses = computed(() => (['at-button', {
      [`at-button--${Object.keys(SIZE_CLASS).includes(props.size!)
        ? props.size!
        : 'normal'
        }`]: Boolean(props.size!),
      [`at-button--${Object.keys(TYPE_CLASS).includes(props.type!)
        ? props.type!
        : 'primary'
        }`]: Boolean(props.type!),
      'at-button--circle': props.circle,
      'at-button--disabled': props.disabled,
      'at-button--full': props.full,
      'at-button--icon': props.loading
    }]))

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
        emit('click', event)
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
      emit('getUserInfo', event)
    }

    function handleGetPhoneNumber(event) {
      emit('getPhoneNumber', event)
    }

    function handleOpenSetting(event) {
      emit('openSetting', event)
    }

    function handleError(event) {
      if (isWEAPP && props.openType !== 'launchApp') return

      emit('error', event)
    }

    function handleContact(event) {
      emit('contact', event)
    }

    function handleLaunchapp(event) {
      emit('launchapp', event)
    }

    function handleGetAuthorize(event) {
      emit('getAuthorize', event)
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

    function genMiniAppButtonEvents(): miniAppEventHandleProps {
      if (!props.openType) return {}

      const miniAppButtonEvents: miniAppEventHandleProps = {
        onError: handleError
      }

      switch (props.openType) {
        case 'contact':
          miniAppButtonEvents.onContact = handleContact
          break
        case 'openSetting':
          miniAppButtonEvents.onOpensetting = handleOpenSetting
          break
        case 'getPhoneNumber':
          miniAppButtonEvents.onGetphonenumber = handleGetPhoneNumber
          break
        case 'getUserInfo':
          miniAppButtonEvents.onGetuserinfo = handleGetUserInfo
          break
        case 'getAuthorize':
          if (isALIPAY) {
            miniAppButtonEvents.onGetauthorize = handleGetAuthorize
          }
          break
        case 'launchApp':
          miniAppButtonEvents.onLaunchapp = handleLaunchapp
          break
        default:
          break
      }

      return miniAppButtonEvents
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
      genMiniAppButtonEvents
    }
  }
})

export default AtButton
</script>