import { h, defineComponent, reactive } from 'vue'
import { AtButton, AtCheckbox, AtForm, AtInput, AtToast } from '@/components/index'
import { CheckboxOption } from 'types/checkbox'
import { View } from '@tarojs/components'
import { Page, Panel } from '../../components/demo-page'
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
  setup() {

    const state = reactive<PageFormState>({
      value1: '',
      value2: '',
      value3: [],
      text: '',
      isOpened: false
    })

    function handleChange(stateName: string, value: any): void {
      state[stateName] = value
    }

    function handleSubmit(): void {
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

    function closeToast(): void {
      setTimeout(() => {
        state.isOpened = false
      }, 2000)
    }

    function handleReset(): void {
      state.isOpened = true
      state.text = `表单已被重置`
      state.value1 = ''
      state.value2 = ''
      state.value3 = []
      closeToast()
    }

    return () => (
      h(Page, { headerTitle: 'Form 表单' }, {
        default: () => [
          /* 表单提交与重置*/
          h(Panel, { title: '表单提交与重置', noPadding: true }, {
            default: () => [
              h(View, { class: 'component-item' }, {
                default: () => [
                  h(AtForm, {
                    onSubmit: handleSubmit.bind(this),
                    onReset: handleReset.bind(this),
                  }, {
                    default: () => [
                      h(AtInput, {
                        required: true,
                        name: 'value1',
                        title: '文本',
                        type: 'text',
                        placeholder: '单行文本',
                        value: state.value1,
                        onChange: handleChange.bind(this, 'value1'),
                      }),

                      h(AtInput, {
                        required: true,
                        name: 'value2',
                        title: '密码',
                        type: 'password',
                        placeholder: '请输入密码',
                        value: state.value2,
                        onChange: handleChange.bind(this, 'value2'),
                      }),

                      h(AtCheckbox, {
                        options:
                          [
                            { label: 'iPhone X', value: 'iPhone X' },
                            { label: 'HUAWEI P20', value: 'HUAWEI P20' }
                          ],
                        selectedList: state.value3,
                        onChange: handleChange.bind(this, 'value3'),
                      }),

                      h(View, { class: 'component-item__btn-group' }, {
                        default: () => [
                          h(View, { class: 'component-item__btn-group__btn-item' }, {
                            default: () => [
                              h(AtButton, {
                                type: 'primary',
                                formType: 'submit'
                              }, { default: () => '提交' })
                            ]
                          }),

                          h(View, { class: 'component-item__btn-group__btn-item' }, {
                            default: () => [
                              h(AtButton, { formType: 'reset' }, { default: () => '重置' })
                            ]
                          }),
                        ]
                      }),
                    ]
                  })
                ]
              }),
            ]
          }),
        ],
        extra: () => [
          h(AtToast, {
            text: state.text,
            isOpened: state.isOpened,
          })
        ]
      })
    )
  }
})
