<template>
  <view
    :class="rootClass"
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
          :class="iconClass"
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
          class="item-extra__image"
          v-if="extraThumb && !extraText"
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
          <view :class="extraIconClass" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { CommonEvent, ITouchEvent, CommonEventFunction } from '@tarojs/components/types/common'
import { AtListItemProps } from "types/list"
import { AtIconBaseProps } from "types/base"
import { mergeStyle } from "../../../utils/common"

export default defineComponent({
  name: "AtListItem",

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
      type: Object as () => AtIconBaseProps,
      default: () => ({ value: '' } as AtIconBaseProps)
    },
    arrow: {
      type: String as () => 'up' | 'down' | 'right' | undefined,
      default: '' as 'up' | 'down' | 'right' | undefined,
      validator: (prop: string) => ['up', 'down', 'right', ''].includes(prop)
    },
    onClick: {
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { }
    },
    onSwitchChange: {
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { }
    },
  },

  setup(props: AtListItemProps) {

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-list__item': true,
      'at-list__item--thumb': props.thumb,
      'at-list__item--multiple': props.note,
      'at-list__item--disabled': props.disabled,
      'at-list__item--no-border': !props.hasBorder,
    }))

    const iconClass = computed(() => ({
      [props.iconInfo!.prefixClass]: props.iconInfo!.prefixClass !== undefined,
      'at-icon': props.iconInfo!.prefixClass === undefined,
      [`${props.iconInfo!.prefixClass || 'at-icon'}-${props.iconInfo!.value}`]: props.iconInfo!.value,
      [props.iconInfo!.className]: true,
    }))

    const iconStyle = computed(() => mergeStyle({
      color: props.iconInfo!.color || '',
      fontSize: `${props.iconInfo!.size || 24}px`,
    }, props.iconInfo!.customStyle!))

    const extraIconClass = computed(() => ({
      [`at-icon-chevron-${props.arrow}`]: true,
      'item-extra__icon-arrow': true,
      'at-icon': true,
    }))


    function handleClick(e: ITouchEvent) {
      if (typeof props.onClick === 'function' && !props.disabled) {
        props.onClick(e)
      }
    }

    function handleSwitchClick(e: CommonEvent) {
      e.stopPropagation()
    }

    function handleSwitchChange(e: CommonEvent) {
      if (typeof props.onSwitchChange === 'function' && !props.disabled) {
        props.onSwitchChange(e)
      }
    }

    return {
      ...toRefs(props),
      rootClass,
      iconClass,
      iconStyle,
      extraIconClass,
      handleClick,
      handleSwitchClick,
      handleSwitchChange,
    }
  }

})
</script>

