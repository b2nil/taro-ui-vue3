<template>
  <page header-title="Form 表单">
    <panel
      title="表单提交与重置"
      no-padding
    >
      <view class="component-item">
        <at-form
          @submit="handleSubmit"
          @reset="handleReset"
        >
          <at-input
            required
            name="value1"
            title="文本"
            type="text"
            placeholder="单行文本"
            v-model:value="value1"
          />
          <at-input
            required
            name="value2"
            title="密码"
            type="password"
            placeholder="请输入密码"
            v-model:value="value2"
          />
          <at-checkbox
            :options="[
              { label: 'iPhone X', value: 'iPhone X' },
              { label: 'HUAWEI P20', value: 'HUAWEI P20' }
            ]"
            v-model:selected-list="value3"
          />

          <view class="component-item__btn-group">
            <view class="component-item__btn-group__btn-item">
              <at-button
                type="primary"
                form-type="submit"
              >提交</at-button>
            </view>
            <view class="component-item__btn-group__btn-item">
              <at-button
                type="primary"
                form-type="reset"
              >重置</at-button>
            </view>
          </view>
        </at-form>
      </view>
    </panel>
    <template #extra>
      <at-toast
        :text="text"
        :is-opened="isOpened"
      />
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { CheckboxOption } from 'taro-ui-vue3/types/checkbox'
import './index.scss'

interface PageFormState {
  value1: string
  value2: string
  value3: CheckboxOption<string>[]
  text: string
  isOpened: boolean
  [key: string]: string | boolean | CheckboxOption<string>[]
}

export default defineComponent({
  name: "FormDemo",
  setup() {

    const state = reactive<PageFormState>({
      value1: '',
      value2: '',
      value3: [],
      text: '',
      isOpened: false
    })

    function handleSubmit() {
      const { value1, value2, value3 } = state
      if (!value1 || !value2) {
        state.isOpened = true
        state.text = `表单必填项未填写完整`
      } else {
        state.isOpened = true
        state.text =
          value3 && value3.length > 0
            ? `${value1} / ${value2} / ${value3.join(',')}`
            : `${value1} / ${value2}`
      }
      closeToast()
    }

    function closeToast() {
      setTimeout(() => {
        state.isOpened = false
      }, 2000)
    }

    function handleReset() {
      state.isOpened = true
      state.text = `表单已被重置`
      state.value1 = ''
      state.value2 = ''
      state.value3 = []
      closeToast()
    }

    return {
      ...toRefs(state),
      handleSubmit,
      handleReset
    }
  }
})
</script>
