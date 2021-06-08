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
        v-if="iconInfo && iconInfo.value"
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
          @tap="e => handleSwitchClick(e)"
        >
          <switch
            :color="switchColor"
            :disabled="disabled"
            :checked="switchChecked"
            @change="handleSwitchChange"
          />
        </view>

        <!-- extra icon - arrow -->
        <view
          v-if="arrow"
          class="item-extra__icon"
        >
          <view :class="['at-icon', 'item-extra__icon-arrow', arrowClasses]" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from 'vue'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtListItemProps } from "@taro-ui-vue3/types/list"
import { AtIconBaseProps } from "@taro-ui-vue3/types/base"
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables"

const AtListItem = defineComponent({
  name: "AtListItem",

  emits: ['click', 'switch-change'],

  props: {
    note: String,
    title: { type: String, default: '' },
    thumb: String,
    extraText: String,
    extraThumb: String,
    switchColor: { type: String, default: '#6190E8' },
    disabled: Boolean,
    isSwitch: Boolean,
    switchChecked: Boolean,
    hasBorder: Boolean,
    iconInfo: Object as PropType<AtIconBaseProps>,
    arrow: {
      type: String as PropType<'up' | 'down' | 'right'>,
      validator: (prop: string) => ['up', 'down', 'right'].includes(prop)
    }
  },

  setup(props: AtListItemProps, { emit }) {

    const rootClasses = computed(() => (['at-list__item', {
      'at-list__item--thumb': props.thumb,
      'at-list__item--multiple': props.note,
      'at-list__item--disabled': props.disabled,
      'at-list__item--no-border': !props.hasBorder,
    }]))

    const { iconStyle } = useIconStyle(props.iconInfo, '', 24)
    const { iconClasses } = useIconClasses(props.iconInfo, true)

    const arrowClasses = computed(() => {
      if (!props.arrow) return {}

      let arrow = 'right'
      if (['up', 'down'].includes(props.arrow)) {
        arrow = props.arrow
      }

      return {
        [`at-icon-chevron-${arrow}`]: Boolean(props.arrow)
      }
    })

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

export default AtListItem
</script>

