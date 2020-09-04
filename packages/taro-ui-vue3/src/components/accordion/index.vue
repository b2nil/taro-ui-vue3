<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <!-- header -->
    <view
      :class="headerClass"
      @tap="handleClick"
    >
      <!-- icon -->
      <text
        v-if="icon && icon.value"
        :class="iconClass"
        :style="iconStyle"
      />

      <!-- info -->
      <view class="at-accordion__info">
        <view class="at-accordion__info__title">{{ title }}</view>
        <view class="at-accordion__info__note">{{ note }}</view>
      </view>

      <!-- arrow -->
      <view :class="arrowClass">
        <text class="at-icon at-icon-chevron-down" />
      </view>
    </view>

    <!-- content -->
    <view
      :class="contentClass"
      :style="contentStyle"
    >
      <view class="at-accordion__body">
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed, toRefs } from 'vue'
import AtComponentWithDefaultProps from "../mixins";
import { CommonEvent } from '@tarojs/components/types/common'
import { AtAccordionProps, AtAccordionState } from "types/accordion";
import { delayQuerySelector } from '../../utils/common'

export default defineComponent({
  name: "AtAccordion",

  mixins: [AtComponentWithDefaultProps],

  emits: ['click'],

  props: {
    open: Boolean,
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: Object as () => AtAccordionProps['icon'],
      default: () => ({ value: '' })
    },
    hasBorder: {
      type: Boolean,
      default: true
    },
    isAnimation: {
      type: Boolean,
      default: true
    },
    note: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function as unknown as () => AtAccordionProps['onClick'],
      default: () => () => { }
    }
  },

  setup(props: AtAccordionProps, { slots, emit }) {
    const isCompleted = ref(true)
    const startOpen = ref(false)
    const state = reactive<AtAccordionState>({ wrapperHeight: 0 })

    // computed classes
    const rootClass = computed(() => ({
      'at-accordion': true,
      [props.className]: true
    }))

    const prefixClass = computed(() => (props.icon
      ? { [props.icon.prefixClass]: true }
      : { 'at-icon': true }
    ))

    const iconClass = computed(() => ({
      ...prefixClass.value,
      [`${prefixClass.value}-${props.icon && props.icon.value}`]: props.icon && props.icon.value,
      'at-accordion__icon': true
    }))

    const headerClass = computed(() => ({
      'at-accordion__header': true,
      'at-accordion__header--noborder': !props.hasBorder
    }))

    const arrowClass = computed(() => ({
      'at-accordion__arrow': true,
      'at-accordion__arrow--folded': !!props.open
    }))

    const contentClass = computed(() => ({
      'at-accordion__content': true,
      'at-accordion__content--inactive': (!props.open && isCompleted.value) || startOpen.value
    }))

    // computed styles
    const iconStyle = computed(() => ({
      color: (props.icon && props.icon.color) || '',
      fontSize: (props.icon && `${props.icon.size}px`) || ''
    }))

    const contentStyle = computed(() => ({
      height: isCompleted.value ? '' : `${state.wrapperHeight}px`
    }))

    // watcher
    watch(() => props.open, (val) => {
      startOpen.value = !!val && !!props.isAnimation
      toggleWithAnimation()
    })

    // methods
    function handleClick(e: CommonEvent) {
      if (!isCompleted.value) return

      // props.onClick && props.onClick(!props.open, e)
      emit('click', !props.open, e)
    }

    function toggleWithAnimation() {
      if (!isCompleted.value || !props.isAnimation) return

      isCompleted.value = false
      delayQuerySelector(this, '.at-accordion__body', 0).then((rect) => {
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
      rootClass,
      headerClass,
      iconClass,
      arrowClass,
      contentClass,
      contentStyle,
      iconStyle,
      handleClick
    }
  }
})
</script>

<style>
</style>
