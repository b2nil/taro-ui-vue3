<template>
  <view
    v-bind="$attrs"
    :class="['at-action-sheet', {
      'at-action-sheet--active': opened,
    }]"
    :catchMove="true"
    @touchmove="handleTouchmove"
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
import {
  defineComponent,
  ref,
  toRefs,
  watch
} from "vue"
import { CommonEvent } from "@tarojs/components/types/common"
import { AtActionSheetProps } from "@taro-ui-vue3/types/action-sheet"

import AtActionSheetHeader from "./header/index.vue"
import AtActionSheetBody from "./body/index.vue"
import AtActionSheetFooter from "./footer/index.vue"

const AtActionSheet = defineComponent({
  name: "AtActionSheet",

  components: {
    AtActionSheetHeader,
    AtActionSheetBody,
    AtActionSheetFooter
  },

  emits: ["close", "cancel"],

  props: {
    isOpened: Boolean,
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
    const opened = ref<boolean>(props.isOpened)

    watch(() => props.isOpened, (isOpened) => {
      if (isOpened !== opened.value) {
        opened.value = isOpened
      }
      !isOpened && handleClose()
    })

    function handleClose() {
      emit('close')
    }

    function handleCancel() {
      emit('cancel')
      close()
    }

    function close() {
      opened.value = false
      handleClose()
    }

    function handleTouchmove(e: CommonEvent) {
      e.stopPropagation()
      e.preventDefault()
    }

    return {
      ...toRefs(props),
      opened,
      close,
      handleCancel,
      handleTouchmove
    }
  }
})

export default AtActionSheet
</script>