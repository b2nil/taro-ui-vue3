<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    @tap="handleClick"
  >
    <view class="at-list__item-container">
      <!-- thumb -->
      <view
        v-if="thumb"
        class="item-thumb at-list__item-thumb"
      >
        <image
          class="item-thumb__info"
          mode="scaleToFill"
          :src="thumb"
        />
      </view>

      <!-- icon -->
      <view
        v-if="iconInfo.value"
        class="item-icon at-list__item-icon"
      >
        <view
          :class="iconClasses"
          :style="iconStyle"
        />
      </view>

      <!-- content -->
      <view class="item-content at-list__item-content">
        <view class="item-content__info">
          <view class="item-content__info-title">{{ title }}</view>

          <view
            v-if="note"
            class="item-content__info-note"
          >{{ note }}</view>
        </view>
      </view>

      <!-- extra items -->
      <view class="item-extra at-list__item-extra">
        <!-- extra text -->
        <view
          v-if="extraText"
          class="item-extra__info"
        >{{ extraText }}</view>

        <!-- extra image -->
        <view
          v-if="extraThumb && !extraText"
          class="item-extra__image"
        >
          <image
            class="item-extra__image-info"
            mode="aspectFit"
            :src="extraThumb"
          />
        </view>

        <!-- extra switch -->
        <view
          class="item-extra__switch"
          v-if="isSwitch && !extraThumb && !extraText"
          @tap="handleSwitchClick"
        >
          <switch
            :color="switchColor"
            :disabled="disabled"
            :checked="switchIsCheck"
            @change="handleSwitchChange"
          />
        </view>

        <!-- extra icon - arrow -->
        <view
          class="item-extra__icon"
          v-if="arrow"
        >
          <view :class="arrowClasses" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from 'vue'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtListItemProps } from "types/list"
import { AtIconBaseProps } from "types/base"
import { mergeStyle } from "@/utils/common"

export default defineComponent({
  name: "AtListItem",

  emits: ['click', 'switch-change'],

  props: {
    note: { type: String, default: '' },
    title: { type: String, default: '' },
    thumb: { type: String, default: '' },
    extraText: { type: String, default: '' },
    extraThumb: { type: String, default: '' },
    switchColor: { type: String, default: '#6190E8' },
    disabled: { type: Boolean, default: false },
    isSwitch: { type: Boolean, default: false },
    switchIsCheck: { type: Boolean, default: false },
    hasBorder: { type: Boolean, default: false },
    iconInfo: {
      type: Object as PropType<AtIconBaseProps>,
      default: () => ({ value: '' } as AtIconBaseProps)
    },
    arrow: {
      type: String as PropType<'up' | 'down' | 'right' | undefined>,
      default: '',
      validator: (prop: string) => ['up', 'down', 'right', ''].includes(prop)
    },
    onClick: {
      type: Function as PropType<AtListItemProps['onClick']>,
      default: () => () => { }
    },
    onSwitchChange: {
      type: Function as PropType<AtListItemProps['onSwitchChange']>,
      default: () => () => { }
    }
  },

  setup(props: AtListItemProps, { emit }) {

    const rootClasses = computed(() => ({
      'at-list__item': true,
      'at-list__item--thumb': props.thumb,
      'at-list__item--multiple': props.note,
      'at-list__item--disabled': props.disabled,
      'at-list__item--no-border': !props.hasBorder,
    }))

    const iconClasses = computed(() => ({
      [`${props.iconInfo!.prefixClass || 'at-icon'}`]: true,
      [`${props.iconInfo!.prefixClass || 'at-icon'}-${props.iconInfo!.value}`]: Boolean(props.iconInfo!.value),
      [`${props.iconInfo!.class}`]: Boolean(props.iconInfo!.class)
    }))

    const iconStyle = computed(() => mergeStyle(
      {
        color: props.iconInfo!.color || '',
        fontSize: `${props.iconInfo!.size || 24}px`,
      },
      props.iconInfo!.style! as Object
    ))

    const arrowClasses = computed(() => ({
      'at-icon': true,
      'item-extra__icon-arrow': true,
      [`at-icon-chevron-${props.arrow}`]: true
    }))

    function handleClick(e: ITouchEvent) {
      if (!props.disabled) {
        emit('click', e)
      }
    }

    function handleSwitchClick(e: CommonEvent) {
      e.stopPropagation()
    }

    function handleSwitchChange(e: CommonEvent) {
      if (!props.disabled) {
        emit('switch-change', e)
      }
    }

    return {
      ...toRefs(props),
      rootClasses,
      iconStyle,
      iconClasses,
      arrowClasses,
      handleClick,
      handleSwitchClick,
      handleSwitchChange,
    }
  }

})
</script>

