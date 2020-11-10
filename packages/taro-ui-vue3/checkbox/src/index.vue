<template>
  <view
    v-bind="$attrs"
    class="at-checkbox"
  >
    <view
      v-for="(option, idx) in options"
      :key="option.value"
      :class="genOptionClasses(option)"
      @tap="handleClick(idx)"
    >
      <view class="at-checkbox__option-wrap">
        <!-- option container -->
        <view class="at-checkbox__option-cnt">
          <!-- checkbox option icon -->
          <view class="at-checkbox__icon-cnt">
            <text class="at-icon at-icon-check" />
          </view>

          <!-- checkbox title -->
          <view class="at-checkbox__title">{{ option.label }}</view>
        </view>

        <!-- option description -->
        <view
          v-if="option.desc"
          class="at-checkbox__desc"
        >{{ option.desc }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, toRef, PropType } from "vue"
import { AtCheckboxProps } from "@taro-ui-vue3/types/checkbox"

export default defineComponent({
  name: "AtCheckbox",

  emits: {
    'change'(selectedList: Array<any>) {
      return !!(selectedList && Array.isArray(selectedList))
    }
  },

  props: {
    // 参数
    options: {
      type: Array as PropType<AtCheckboxProps<any>['options']>,
      default: () => [],
      required: true
    },
    selectedList: {
      type: Array as PropType<AtCheckboxProps<any>['selectedList']>,
      default: () => [],
      required: true
    }
  },

  setup(props: AtCheckboxProps<any>, { emit }) {

    const genOptionClasses = (option) => ({
      'at-checkbox__option': true,
      'at-checkbox__option--disabled': option.disabled,
      'at-checkbox__option--selected': props.selectedList.includes(option.value)
    })

    function handleClick(idx: number) {
      const option = props.options[idx]
      const { disabled, value } = option

      if (disabled) return

      const selectedSet = new Set(props.selectedList)
      if (!selectedSet.has(value)) {
        selectedSet.add(value)
      } else {
        selectedSet.delete(value)
      }

      emit('change', [...selectedSet])
    }

    return {
      options: toRef(props, 'options'),
      genOptionClasses,
      handleClick,
    }
  }
})
</script>