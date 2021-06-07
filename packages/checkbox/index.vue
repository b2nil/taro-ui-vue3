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
import { useModelValue } from "@taro-ui-vue3/composables"
import { AtCheckboxProps, CheckboxOption } from "@taro-ui-vue3/types/checkbox"

const AtCheckbox = defineComponent({
  name: "AtCheckbox",

  emits: {
    'update:selectedList'(selectedList: Array<any>) {
      return !!(selectedList && Array.isArray(selectedList))
    }
  },

  props: {
    options: {
      type: Array as PropType<AtCheckboxProps<any>['options']>,
      required: true
    },
    selectedList: {
      type: Array as PropType<AtCheckboxProps<any>['selectedList']>,
      default: () => []
    }
  },

  setup(props: AtCheckboxProps<any>, { emit }) {
    const selectedList = useModelValue(props, emit, "selectedList")

    const genOptionClasses = (option: CheckboxOption<any>) => ({
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

      selectedList.value = Array.from(selectedSet)
    }

    return {
      options: toRef(props, 'options'),
      genOptionClasses,
      handleClick,
    }
  }
})

export default AtCheckbox
</script>