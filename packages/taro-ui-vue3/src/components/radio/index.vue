<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <view
      v-for="option in options"
      :key="option.value"
      :class="optionClass(option)"
      @tap="handleClick(option)"
    >
      <view class="at-radio__option-wrap">
        <view class="at-radio__option-container">
          <!-- title -->
          <view class="at-radio__title">{{ option.label }}</view>

          <!-- icon -->
          <view :class="iconClass(option)">
            <text class="at-icon at-icon-check" />
          </view>
        </view>

        <!-- description -->
        <view
          v-if="option.desc"
          class="at-radio__desc"
        >{{ option.desc }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtRadioProps, RadioOption } from 'types/radio'


export default defineComponent({
  name: "AtRadio",



  props: {
    value: {
      type: String as PropType<AtRadioProps<any>['value']>,
      default: '',
      required: true
    },
    options: {
      type: Array as PropType<AtRadioProps<any>['options']>,
      default: [],
      required: true
    },
    onClick: {
      type: Function as PropType<AtRadioProps<any>['options']>,
      default: () => (vaule: any, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtRadioProps<any>, { slots }) {

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-radio': true,
    }))

    const optionClass = computed(() => (option) => ({
      'at-radio__option': true,
      'at-radio__option--disabled': option.disabled
    }))

    const iconClass = computed(() => (option) => ({
      'at-radio__icon': true,
      'at-radio__icon--checked': props.value === option.value
    }))

    function handleClick(option: RadioOption<any>, event: CommonEvent): void {
      if (option.disabled) return
      props.onClick(option.value, event)
    }

    return {
      options: toRef(props, 'options'),
      rootClasses,
      iconClass,
      optionClass,
      handleClick,
    }
  }
})
</script>
