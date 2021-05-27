<template>
  <view
    v-bind="$attrs"
    class="at-accordion"
  >
    <!-- header -->
    <view
      :class="['at-accordion__header', {
        'at-accordion__header--noborder': !hasBorder
      }]"
      @tap="handleClick"
    >
      <!-- icon -->
      <text
        v-if="Boolean(icon && icon.value)"
        :class="['at-accordion__icon', iconClasses]"
        :style="iconStyle"
      />

      <!-- info -->
      <view class="at-accordion__info">
        <view class="at-accordion__info__title">{{ title }}</view>
        <view class="at-accordion__info__note">{{ note }}</view>
      </view>

      <!-- arrow -->
      <view :class="['at-accordion__arrow', {
        'at-accordion__arrow--folded': !!open
      }]">
        <text class="at-icon at-icon-chevron-down" />
      </view>
    </view>

    <!-- content -->
    <view
      :class="[
        'at-accordion__content',
        {
          'at-accordion__content--inactive': (!open && isCompleted) || startOpen
        }
      ]"
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
  warn
} from "vue"
import {
  AtAccordionProps,
  AtAccordionState,
} from "@taro-ui-vue3/types/accordion"
import {
  delayQuerySelector,
  uuid
} from "@taro-ui-vue3/utils"
import {
  useIconClasses,
  useIconStyle
} from "@taro-ui-vue3/composables"

const AtAccordion = defineComponent({
  name: "AtAccordion",

  emits: {
    click: (open: boolean) => {
      if (typeof open === 'boolean') {
        return true
      } else {
        warn('click payload should be type boolean')
        return false
      }
    }
  },

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
    }
  },

  setup(props: AtAccordionProps, { emit }) {
    const startOpen = ref(false)
    const isCompleted = ref(true)
    const contentID = ref("content")
    const state = reactive<AtAccordionState>({
      wrapperHeight: 'unset'
    })

    const { iconStyle } = useIconStyle(props.icon)
    const { iconClasses } = useIconClasses(props.icon, true)

    const contentStyle = computed(() => ({
      height: isCompleted.value
        ? ''
        : state.wrapperHeight === 'unset'
          ? state.wrapperHeight
          : `${state.wrapperHeight}px`,
    }))

    // watcher
    watch(() => props.open, (open) => {
      startOpen.value = !!open && !!props.isAnimation
      toggleWithAnimation()
    })

    // methods
    function handleClick() {
      if (!isCompleted.value) return

      contentID.value = "content_" + uuid()
      emit("click", !props.open)
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
      contentID,
      startOpen,
      isCompleted,
      iconClasses,
      iconStyle,
      contentStyle,
      handleClick,
    }
  }
})

export default AtAccordion
</script>
