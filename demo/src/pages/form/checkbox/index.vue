<template>
  <page header-title="Checkbox 复选框">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <view class="checkbox-container">
          <at-checkbox
            :options="checkboxOption1"
            :selected-list="checkedList1"
            @change="handleChange"
          />
        </view>
      </example-item>
    </panel>

    <panel
      title="含描述信息"
      no-padding
    >
      <example-item>
        <view class="checkbox-container">
          <at-checkbox
            :options="checkboxOption2"
            :selected-list="checkedList2"
            @change="handleChange2nd"
          />
        </view>
      </example-item>
    </panel>

    <panel
      title="选项禁用"
      no-padding
    >
      <example-item>
        <view class="checkbox-container">
          <at-checkbox
            :options="checkboxOption3"
            :selected-list="checkedList3"
            @change="handleChange3rd"
          />
        </view>
      </example-item>
    </panel>

    <panel
      title="使用 vModel：`v-model:selected-list`"
      no-padding
    >
      <example-item>
        <view class="checkbox-container">
          <at-checkbox
            :options="checkboxOption4"
            v-model:selectedList="checkedList4"
          />
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { CheckboxOption } from 'taro-ui-vue3/types/checkbox'
import './index.scss'

interface IndexState {
  checkedList1: string[]
  checkedList2: string[]
  checkedList3: string[]
  checkedList4: string[]
  checkboxOption1: CheckboxOption<string>[]
  checkboxOption2: CheckboxOption<string>[]
  checkboxOption3: CheckboxOption<string>[]
  checkboxOption4: CheckboxOption<string>[]
}

export default defineComponent({
  name: "CheckboxDemo",

  setup() {

    const state = reactive<IndexState>({
      checkedList1: ['list1'],
      checkedList2: ['list1'],
      checkedList3: ['list1', 'list4'],
      checkedList4: ['list2'],
      checkboxOption1: [
        { value: 'list1', label: 'iPhone X' },
        { value: 'list2', label: 'HUAWEI P20' },
        { value: 'list3', label: 'OPPO Find X' }
      ],
      checkboxOption2: [
        {
          value: 'list1',
          label: 'iPhone X',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
        },
        {
          value: 'list2',
          label: 'HUAWEI P20',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
        },
        {
          value: 'list3',
          label: 'OPPO Find X',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
        }
      ],
      checkboxOption3: [
        {
          value: 'list1',
          label: 'iPhone X',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
        },
        { value: 'list2', label: 'HUAWEI P20' },
        {
          value: 'list3',
          label: 'OPPO Find X',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
          disabled: true
        },
        {
          value: 'list4',
          label: 'vivo NEX',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
          disabled: true
        }
      ],
      checkboxOption4: [
        {
          value: 'list1',
          label: 'iPhone X',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
        },
        { value: 'list2', label: 'HUAWEI P20' },
        {
          value: 'list3',
          label: 'OPPO Find X',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
        },
        {
          value: 'list4',
          label: 'vivo NEX',
          desc:
            '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
        }
      ]
    })

    function handleChange(value: string[]): void {
      state.checkedList1 = value
    }

    function handleChange2nd(value: string[]): void {
      state.checkedList2 = value
    }

    function handleChange3rd(value: string[]): void {
      state.checkedList3 = value
    }

    return {
      ...toRefs(state),
      handleChange,
      handleChange2nd,
      handleChange3rd
    }
  }
})

</script>