<template>
  <view
    v-bind="$attrs"
    :class="['at-card', { 'at-card--full': isFull }]"
    @tap="handleClick"
  >
    <!-- header -->
    <view class="at-card__header">
      <!-- thumb image -->
      <view
        v-if="thumb"
        class="at-card__header-thumb"
      >
        <image
          class="at-card__header-thumb-info"
          mode="scaleToFill"
          :src="thumb"
        />
      </view>

      <!-- renderIcon -->
      <slot
        v-else-if="$slots.renderIcon"
        name="renderIcon"
      />

      <!-- use icon if not thumb -->
      <text
        v-else-if="icon && icon.value"
        :class="['at-card__header-icon', iconClasses ]"
        :style="iconStyle"
      />

      <!-- title -->
      <text
        v-if="title"
        class="at-card__header-title"
      >{{ title }}</text>

      <!-- extra info -->
      <text
        v-if="extra"
        class="at-card__header-extra"
        :style="{ ...(extraStyle || {}) }"
      >{{ extra }}</text>
    </view>

    <!-- content -->
    <view class="at-card__content">
      <!-- main content -->
      <view class="at-card__content-info">
        <slot />
      </view>

      <!-- content note -->
      <view
        v-if="note"
        class="at-card__content-note"
      >{{ note }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from "vue"
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables"
import { AtCardProps } from "@taro-ui-vue3/types/card"

const AtCard = defineComponent({
  name: "AtCard",

  emits: ['click'],

  props: {
    isFull: Boolean,
    note: String as PropType<AtCardProps['note']>,
    thumb: String as PropType<AtCardProps['thumb']>,
    title: String as PropType<AtCardProps['title']>,
    extra: String as PropType<AtCardProps['extra']>,
    extraStyle: Object as PropType<AtCardProps['extraStyle']>,
    icon: Object as PropType<AtCardProps['icon']>
  },

  setup(props: AtCardProps, { emit }) {

    const { iconClasses } = useIconClasses(props.icon)
    const { iconStyle } = useIconStyle(props.icon)

    function handleClick(args: any) {
      emit('click', args)
    }

    return {
      ...toRefs(props),
      iconClasses,
      iconStyle,
      handleClick
    }
  }
})

export default AtCard
</script>