<template>
  <view
    v-if="_show"
    :class="rootClass"
  >
    <!-- mask -->
    <view
      class="at-drawer__mask"
      :style="maskStyle"
      @tap="handleMaskClick"
    />
    <!-- content -->
    <view
      class="at-drawer__content"
      :style="listStyle"
    >
      <at-list v-if="!!items && items.length">
        <at-list-item
          v-for="(name, index) in items"
          :key="`${name}-${index}`"
          :data-index="index"
          :title="name"
          arrow="right"
          @click="handleItemClick(index)"
        />
      </at-list>
      <slot v-else />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onMounted, nextTick, watch, toRef } from "vue"
import { AtDrawerProps, AtDrawerState } from 'types/drawer'

import AtComponentWithDefaultProps from '../mixins'
import AtList from "../list"
import AtListItem from "../list/item"

export default defineComponent({
  name: "AtDrawer",
  mixins: [AtComponentWithDefaultProps],

  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    mask: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String as () => AtDrawerProps['width'],
      default: '',
    },
    right: Boolean,
    items: {
      type: Array as () => AtDrawerProps['items'],
      default: () => [],
    },
    onItemClick: {
      type: Function as unknown as () => AtDrawerProps['onItemClick'],
      default: () => () => { }
    },
    onClose: {
      type: Function as unknown as () => AtDrawerProps['onClose'],
      default: () => () => { }
    }
  },

  setup(props: AtDrawerProps, { slots }) {
    const state = reactive<AtDrawerState>({
      animShow: false,
      _show: props.show
    })

    watch(() => props.show, (val) => {
      if (val !== state._show) {
        val ? showAnimation() : hideAnimation()
      }
    })

    onMounted(() => {
      if (state._show) {
        showAnimation()
      }
    })

    function handleItemClick(index: number) {
      props.onItemClick && props.onItemClick(index)
      hideAnimation()
    }

    function onHide() {
      state._show = false
      nextTick(() => {
        props.onClose && props.onClose()
      })
    }

    function hideAnimation() {
      state.animShow = false
      setTimeout(() => {
        onHide()
      }, 300)
    }

    function showAnimation() {
      state._show = true
      setTimeout(() => {
        state.animShow = true
      }, 200)
    }

    function handleMaskClick() {
      hideAnimation()
    }

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-drawer--show': state.animShow,
      'at-drawer--right': props.right,
      'at-drawer--left': !props.right,
      'at-drawer': true,
    }))

    const maskStyle = computed(() => ({
      display: props.mask ? 'block' : 'none',
      opacity: state.animShow ? 1 : 0
    }))

    const listStyle = computed(() => ({
      width: props.width,
      transition: state.animShow
        ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
        : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
    }))

    return {
      _show: toRef(state, "_show"),
      items: toRef(props, "items"),
      rootClass,
      maskStyle,
      listStyle,
      handleMaskClick,
      handleItemClick
    }
  }
})
</script>

