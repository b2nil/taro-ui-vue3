<template>
  <view
    v-if="show"
    v-bind="$attrs"
    :class="['at-drawer', rootClasses]"
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
import { defineComponent, computed, reactive, onMounted, nextTick, watch, toRef, PropType } from "vue"
import { AtDrawerProps, AtDrawerState } from "@taro-ui-vue3/types/drawer"
import AtList from "@taro-ui-vue3/list/index.vue"
import AtListItem from "@taro-ui-vue3/list/item/index.vue"

const AtDrawer = defineComponent({
  name: "AtDrawer",

  components: {
    AtList,
    AtListItem
  },

  emits: {
    'close': null,
    'item-click'(index: number) {
      return !!(typeof index === 'number')
    }
  },

  props: {
    show: Boolean,
    right: Boolean,
    mask: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String as PropType<AtDrawerProps['width']>,
      default: '230px',
    },
    items: Array as PropType<AtDrawerProps['items']>
  },

  setup(props: AtDrawerProps, { emit }) {
    const state = reactive<AtDrawerState>({
      animShow: false,
      _show: props.show
    })

    const rootClasses = computed(() => ({
      'at-drawer--show': state.animShow,
      'at-drawer--right': props.right,
      'at-drawer--left': !props.right
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
      emit('item-click', index)
      hideAnimation()
    }

    function onHide() {
      state._show = false
      nextTick(() => {
        emit('close')
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

    return {
      show: toRef(state, "_show"),
      items: toRef(props, "items"),
      rootClasses,
      maskStyle,
      listStyle,
      handleMaskClick,
      handleItemClick
    }
  }
})

export default AtDrawer
</script>

