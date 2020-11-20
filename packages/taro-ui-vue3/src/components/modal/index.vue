<template>
  <!-- use predefined simple modal with either title or content -->
  <view
    v-if="title || content"
    v-bind="$attrs"
    :class="rootClasses"
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

  <!-- use slot to customize modal contents -->
  <view
    v-else
    v-bind="$attrs"
    :class="rootClasses"
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
import {
  defineComponent,
  reactive,
  nextTick,
  watch,
  computed,
  toRefs,
  toRef,
  PropType
} from 'vue'

import { handleTouchScroll } from "@/utils/common"

import Taro from '@tarojs/taro'

import { CommonEvent } from '@tarojs/components/types/common'
import { AtModalProps, AtModalState } from "types/modal"


import AtModalAction from './action/index.vue'
import AtModalContent from './content/index.vue'
import AtModalHeader from './header/index.vue'

export default defineComponent({
  name: "AtModal",

  components: {
    AtModalHeader,
    AtModalAction,
    AtModalContent,
  },

  emits: [
    'close',
    'cancel',
    'confirm',
  ],

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
    confirmText: String as PropType<AtModalProps['confirmText']>
  },

  setup(props: AtModalProps, { emit }) {
    const state = reactive<AtModalState>({
      _isOpened: props.isOpened,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const rootClasses = computed(() => ({
      'at-modal': true,
      'at-modal--active': state._isOpened
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
        nextTick((event?: CommonEvent) => handleClose(event))
      }
    }

    function handleClose(event?: CommonEvent) {
      emit('close', event)
    }

    function handleCancel(event: CommonEvent) {
      emit('cancel', event)
    }

    function handleConfirm(event: CommonEvent) {
      emit('confirm', event)
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
