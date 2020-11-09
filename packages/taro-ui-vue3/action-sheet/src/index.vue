<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    @touch-move="handleTouchMove"
  >
    <!-- overlay -->
    <view
      class="at-action-sheet__overlay"
      @tap="close"
    />

    <!-- container -->
    <view class="at-action-sheet__container">
      <!-- title -->
      <at-action-sheet-header v-if="title">{{ title }}</at-action-sheet-header>

      <!-- body -->
      <at-action-sheet-body>
        <slot />
      </at-action-sheet-body>

      <!-- footer -->
      <at-action-sheet-footer
        v-if="cancelText"
        @click="handleCancel"
      >{{ cancelText }}</at-action-sheet-footer>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed, toRefs } from "vue"
import { CommonEvent } from "@tarojs/components/types/common"
import { AtActionSheetProps } from "@taro-ui-vue3/types/action-sheet"

import AtActionSheetHeader from "./header/index.vue"
import AtActionSheetBody from "./body/index.vue"
import AtActionSheetFooter from "./footer/index.vue"

export default defineComponent({
  name: "AtActionSheet",

  components: {
    AtActionSheetHeader,
    AtActionSheetBody,
    AtActionSheetFooter
  },

  emits: ["close", "cancel"],

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    }
  },

  setup(props: AtActionSheetProps, { emit }) {
    const _isOpened = ref<boolean>(props.isOpened)

    const { title, cancelText } = toRefs(props)

    const rootClasses = computed(() => ({
      'at-action-sheet': true,
      'at-action-sheet--active': _isOpened.value,
    }))

    watch(() => props.isOpened, (val) => {
      if (val !== _isOpened.value) {
        _isOpened.value = val
      }
      !val && handleClose()
    })

    function handleClose() {
      emit('close')
    }

    function handleCancel() {
      emit('cancel')
      close()
    }

    function close() {
      _isOpened.value = false
      handleClose()
    }

    function handleTouchMove(e: CommonEvent) {
      e.stopPropagation()
      e.preventDefault()
    }

    return {
      title,
      cancelText,
      rootClasses,
      close,
      handleCancel,
      handleTouchMove
    }
  }
})
</script>