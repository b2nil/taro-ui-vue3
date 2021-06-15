<template>
  <view
    v-bind="$attrs"
    class="at-radio"
  >
    <view
      v-for="(option, index) in options"
      :key="index"
      :class="genOptionClasses(option)"
      @tap="handleClick(option)"
    >
      <view class="at-radio__option-wrap">
        <view class="at-radio__option-container">
          <!-- title -->
          <view class="at-radio__title">{{ option.label }}</view>

          <!-- icon -->
          <view :class="genIconClasses(option)">
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
import { defineComponent, computed, toRef, PropType } from 'vue'
import { AtRadioProps, RadioOption } from "@taro-ui-vue3/types/radio"
import { useModelValue } from "@taro-ui-vue3/composables"

const AtRadio = defineComponent({
  name: "AtRadio",

  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: String as PropType<AtRadioProps<any>['modelValue']>,
      default: ''
    },
    options: {
      type: Array as PropType<AtRadioProps<any>['options']>,
      default: []
    }
  },

  setup(props: AtRadioProps<any>, { emit }) {

    const radioModelValue = useModelValue(props, emit)

    const genOptionClasses = computed(() => (option: RadioOption<any>) => ({
      'at-radio__option': true,
      'at-radio__option--disabled': option.disabled
    }))

    const genIconClasses = computed(() => (option: RadioOption<any>) => ({
      'at-radio__icon': true,
      'at-radio__icon--checked': props.modelValue === option.value
    }))

    function handleClick(option: RadioOption<any>) {
      if (option.disabled) return
      radioModelValue.value = option.value
    }

    return {
      options: toRef(props, 'options'),
      genOptionClasses,
      genIconClasses,
      handleClick,
    }
  }
})

export default AtRadio
</script>
