<template>
  <view
    class="rootClasses"
    v-if="title || content"
  >
    <!-- overlay -->
    <view
      class="at-modal__overlay"
      @tap="handleClickOverlay"
    />

    <!-- container -->
    <view class="at-modal__container">
      <!-- title -->
      <at-modal-header v-if="title">
        <text>{{ title }}</text>
      </at-modal-header>

      <!-- content -->
      <at-modal-content v-if="content">
        <view class="content-simple">
          <text
            v-if="isWEB"
            v-html="content.replace(/\n/g, '<br])')"
          />
          <text v-else>{{ content }}</text>
        </view>
      </at-modal-content>

      <!-- render action -->
      <at-modal-action
        v-if="cancelText || confirmText"
        is-simple
      >
        <button
          v-if="cancelText"
          @tap="handleCancel"
        >{{ cancelText }}</button>
        <button
          v-if="confirmText"
          @tap="handleConfirm"
        >{{ confirmText }}</button>
      </at-modal-action>
    </view>
  </view>
  <view
    class="rootClasses"
    v-else
    @touch-move="handleTouchMove"
  >
    <view
      class="at-modal__overlay"
      @tap="handleClickOverlay"
    />
    <view class="at-modal__container">
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, nextTick, watch, computed, toRefs, toRef } from 'vue'

import { handleTouchScroll } from '../../utils/common'

import Taro from '@tarojs/taro'

import { CommonEvent } from '@tarojs/components/types/common'
import { AtModalProps, AtModalState } from 'types/modal'


import AtModalAction from './action/index.vue'
import AtModalContent from './content/index.vue'
import AtModalHeader from './header/index.vue'

export default defineComponent({
  name: "AtModal",



  components: {
    AtModalAction,
    AtModalContent,
    AtModalHeader
  },

  props: {
    title: String as PropType<AtModalProps['title']>,
    isOpened: {
      type: Boolean,
      default: false,
      required: true
    },
    content: String as PropType<AtModalProps['content']>,
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    cancelText: String as PropType<AtModalProps['cancelText']>,
    confirmText: String as PropType<AtModalProps['confirmText']>,
    onClose: Function as PropType<AtModalProps['onClose']>,
    onConfirm: Function as PropType<AtModalProps['onConfirm']>,
    onCancel: Function as PropType<AtModalProps['onCancel']>,
  },

  setup(props: AtModalProps, { slots }) {
    const state = reactive<AtModalState>({
      _isOpened: props.isOpened,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-modal--active': state._isOpened,
      'at-modal': true,
    }))


    watch(() => props.isOpened, (val, oldVal) => {
      if (val !== oldVal) {
        handleTouchScroll(val)
      }

      if (val !== state._isOpened) {
        state._isOpened = val
      }
    })

    function handleClickOverlay() {
      if (props.closeOnClickOverlay) {
        state._isOpened = false
        nextTick(handleClose)
      }
    }

    function handleClose(event?: CommonEvent) {
      if (typeof props.onClose === 'function') {
        props.onClose(event!)
      }
    }

    function handleCancel(event: CommonEvent) {
      if (typeof props.onCancel === 'function') {
        props.onCancel(event)
      }
    }

    function handleConfirm(event: CommonEvent) {
      if (typeof props.onConfirm === 'function') {
        props.onConfirm(event)
      }
    }

    function handleTouchMove(e: CommonEvent) {
      e.stopPropagation()
    }

    return {
      ...toRefs(props),
      isWEB: toRef(state, 'isWEB'),
      rootClasses,
      handleClickOverlay,
      handleCancel,
      handleConfirm,
      handleTouchMove
    }
  }
})
</script>
