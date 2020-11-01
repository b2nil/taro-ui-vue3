<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <view
      v-for="(option, idx) in options"
      :class="optionClass(option)"
      :key="option.value"
      @tap="handleClick(idx)"
    >
      <view class="at-checkbox__option-wrap">
        <view class="at-checkbox__option-cnt">
          <view class="at-checkbox__icon-cnt">
            <text class="at-icon at-icon-check" />
            <view class="at-checkbox__title">{{ option.label }}</view>
            <view
              v-if="option.desc"
              class="at-checkbox__desc"
            >{{ option.desc }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from "../../api"
import { AtCheckboxProps } from 'types/checkbox'



export default defineComponent({
  name: "AtCheckbox",


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
    },
    // 事件
    onChange: {
      type: Function as PropType<AtCheckboxProps<any>['onChange']>,
      default: () => () => { }
    }
  },

  setup(props: AtCheckboxProps<any>) {

    const rootClasses = computed(() => ({ 'at-checkbox': true, [props.className]: true }))

    const optionClass = computed(() => (option) => ({
      'at-checkbox__option': true,
      'at-checkbox__option--disabled': option.disabled as boolean,
      'at-checkbox__option--selected': props.selectedList.includes(option.value)
    }))

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
      props.onChange([...selectedSet])
    }

    return {
      options: toRef(props, 'options'),
      customStyle: toRef(props, 'customStyle'),
      rootClasses,
      optionClass,
      handleClick,
    }
  }
})
</script>

<style>
</style>