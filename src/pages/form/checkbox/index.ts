import { h, defineComponent, reactive } from 'vue'
import { AtCheckbox } from '@/components/index'
import { CheckboxOption } from 'types/checkbox'
import { View } from '@tarojs/components'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  checkedList1: string[]
  checkedList2: string[]
  checkedList3: string[]
  checkboxOption1: CheckboxOption<string>[]
  checkboxOption2: CheckboxOption<string>[]
  checkboxOption3: CheckboxOption<string>[]
}

export default defineComponent({

  setup() {

    const state = reactive<IndexState>({
      checkedList1: ['list1'],
      checkedList2: ['list1'],
      checkedList3: ['list1', 'list4'],
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
      ]
    })

    function handleChange(value: string[]): void {
      state.checkedList1 = value
    }

    function handleChangeSnd(value: string[]): void {
      state.checkedList2 = value
    }

    function handleChangeThd(value: string[]): void {
      state.checkedList3 = value
    }

    return () => (
      h(Page, { headerTitle: 'Checkbox 复选框' }, {
        default: () => [
          /* 基础用法*/
          h(Panel, { title: '基础用法', noPadding: true }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'checkbox-container' }, {
                    default: () => [
                      h(AtCheckbox, {
                        options: state.checkboxOption1,
                        selectedList: state.checkedList1,
                        onChange: handleChange.bind(this),
                      })
                    ]
                  }),
                ]
              }),
            ]
          }),

          /* 含描述信息*/
          h(Panel, { title: '含描述信息', noPadding: true }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'checkbox-container' }, {
                    default: () => [
                      h(AtCheckbox, {
                        options: state.checkboxOption2,
                        selectedList: state.checkedList2,
                        onChange: handleChangeSnd.bind(this),
                      })
                    ]
                  }),
                ]
              }),
            ]
          }),

          /* 选项禁用*/
          h(Panel, { title: '选项禁用', noPadding: true }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(View, { class: 'checkbox-container' }, {
                    default: () => [
                      h(AtCheckbox, {
                        options: state.checkboxOption3,
                        selectedList: state.checkedList3,
                        onChange: handleChangeThd.bind(this),
                      })
                    ]
                  }),
                ]
              }),
            ]
          }),
        ]
      })
    )
  }
})
