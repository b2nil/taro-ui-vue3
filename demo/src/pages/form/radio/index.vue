<template>
  <page header-title="Radio 单选框">
    <panel
      title="基础用法"
      no-padding
    >
      <view class="radio-container">
        <at-radio
          :options="radioOptions1"
          v-model="radioValue1"
        />
      </view>
    </panel>

    <panel
      title="含有单项描述"
      no-padding
    >
      <view class="radio-container">
        <at-radio
          :options="radioOptions2"
          v-model="radioValue2"
        />
      </view>
    </panel>

    <panel
      title="单项禁用"
      no-padding
    >
      <view class="radio-container">
        <at-radio
          :options="radioOptions3"
          v-model="radioValue3"
        />
      </view>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { RadioOption } from 'taro-ui-vue3/types/radio'
import './index.scss'

interface IndexState {
  radioValue1: string
  radioValue2: string
  radioValue3: string
  radioOptions1: RadioOption<string>[]
  radioOptions2: RadioOption<string>[]
  radioOptions3: RadioOption<string>[]
}

export default defineComponent({

  name: "RadioDemo",

  setup() {

    const state = reactive<IndexState>({
      radioValue1: 'option1',
      radioValue2: 'option1',
      radioValue3: 'option3',
      radioOptions1: [
        { label: '单选项一', value: 'option1' },
        { label: '单选项二', value: 'option2' },
        { label: '单选项三', value: 'option3' }
      ],
      radioOptions2: [
        { label: '单选项一', value: 'option1', desc: '单选项描述一' },
        { label: '单选项二', value: 'option2', desc: '单选项描述二' },
        { label: '单选项三', value: 'option3', desc: '单选项描述三' }
      ],
      radioOptions3: [
        { label: '单选项一', value: 'option1', desc: '单选项描述' },
        { label: '单选项二', value: 'option2' },
        {
          label: '单选项三禁用',
          value: 'option3',
          desc: '单选项描述',
          disabled: true
        }
      ]
    })

    return {
      ...toRefs(state)
    }
  }
})

</script>