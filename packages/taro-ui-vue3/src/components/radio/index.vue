<template>
  <view
    v-bind="$attrs"
    class="at-radio"
  >
    <view
      v-for="option in options"
      :key="option.value"
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
import { AtRadioProps, RadioOption } from "types/radio"

export default defineComponent({
  name: "AtRadio",

  emits: {
    'click'(value: any) {
      return !!(value)
    }
  },

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
    }
  },

  setup(props: AtRadioProps<any>, { emit }) {

    const genOptionClasses = computed(() => (option) => ({
      'at-radio__option': true,
      'at-radio__option--disabled': option.disabled
    }))

    const genIconClasses = computed(() => (option) => ({
      'at-radio__icon': true,
      'at-radio__icon--checked': props.value === option.value
    }))

    function handleClick(option: RadioOption<any>): void {
      if (option.disabled) return
      emit('click', option.value)
    }

    return {
      options: toRef(props, 'options'),
      genOptionClasses,
      genIconClasses,
      handleClick,
    }
  }
})
</script>
