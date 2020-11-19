<template>
  <view
    v-bind="$attrs"
    class="at-accordion"
  >
    <!-- header -->
    <view
      :class="headerClasses"
      @tap="handleClick"
    >
      <!-- icon -->
      <text
        v-if="icon && icon.value"
        :class="iconClasses"
        :style="iconStyle"
      />

      <!-- info -->
      <view class="at-accordion__info">
        <view class="at-accordion__info__title">{{ title }}</view>
        <view class="at-accordion__info__note">{{ note }}</view>
      </view>

      <!-- arrow -->
      <view :class="arrowClasses">
        <text class="at-icon at-icon-chevron-down" />
      </view>
    </view>

    <!-- content -->
    <view
      :class="contentClasses"
      :style="contentStyle"
    >
      <view
        :id="contentID"
        class="at-accordion__body"
      >
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  computed,
  toRefs,
  PropType,
} from "vue"
import { CommonEvent } from "@tarojs/components/types/common"
import {
  AtAccordionProps,
  AtAccordionState,
} from "@taro-ui-vue3/types/accordion"
import { delayQuerySelector } from "@taro-ui-vue3/utils/common"

export default defineComponent({
  name: "AtAccordion",

  emits: ["click"],

  props: {
    open: Boolean,
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: Object as PropType<AtAccordionProps["icon"]>,
      default: () => ({ value: "" }),
    },
    hasBorder: {
      type: Boolean,
      default: true,
    },
    isAnimation: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
      default: "",
    },
  },

  setup(props: AtAccordionProps, { emit }) {
    const startOpen = ref(false)
    const isCompleted = ref(true)
    const contentID = ref("content")

    const state = reactive<AtAccordionState>({ wrapperHeight: 'unset' })

    // computed classes
    const iconClasses = computed(() => ({
      [`${props.icon!.prefixClass || "at-icon"}`]: Boolean(props.icon),
      [`${props.icon!.prefixClass || "at-icon"}-${props.icon!.value}`]: Boolean(
        props.icon && props.icon.value
      ),
      "at-accordion__icon": true,
    }))

    const headerClasses = computed(() => ({
      "at-accordion__header": true,
      "at-accordion__header--noborder": !props.hasBorder,
    }))

    const arrowClasses = computed(() => ({
      "at-accordion__arrow": true,
      "at-accordion__arrow--folded": !!props.open,
    }))

    const contentClasses = computed(() => ({
      "at-accordion__content": true,
      "at-accordion__content--inactive":
        (!props.open && isCompleted.value) || startOpen.value,
    }))

    // computed styles
    const iconStyle = computed(() => ({
      color: Boolean(props.icon && props.icon.color) ? props.icon!.color : "",
      fontSize: Boolean(props.icon && props.icon.size)
        ? `${props.icon!.size}px`
        : "",
    }))

    const contentStyle = computed(() => {
      const style = {
        height: isCompleted.value
          ? ""
          : state.wrapperHeight === 'unset'
            ? state.wrapperHeight
            : `${state.wrapperHeight}px`,
      }
      return style
    })

    // watcher
    watch(
      () => props.open,
      (val) => {
        startOpen.value = !!val && !!props.isAnimation
        toggleWithAnimation()
      }
    )

    // methods
    function handleClick(e: CommonEvent) {
      contentID.value = "content" + String(e.timeStamp).replace(".", "")

      if (!isCompleted.value) return

      emit("click", !props.open, e)
    }

    function toggleWithAnimation() {
      if (!isCompleted.value || !props.isAnimation) return
      isCompleted.value = false
      delayQuerySelector(
        this,
        `#${contentID.value}.at-accordion__body`,
        30
      ).then((rect) => {
        // @ts-ignore
        const height = parseInt(rect[0].height.toString())
        const startHeight = props.open ? 0 : height
        const endHeight = props.open ? height : 0

        startOpen.value = false
        state.wrapperHeight = startHeight
        setTimeout(() => {
          state.wrapperHeight = endHeight
        }, 100)

        setTimeout(() => {
          isCompleted.value = true
        }, 700)
      })
    }

    return {
      ...toRefs(props),
      headerClasses,
      iconClasses,
      arrowClasses,
      contentClasses,
      contentStyle,
      iconStyle,
      contentID,
      handleClick,
    }
  }
})
</script>
