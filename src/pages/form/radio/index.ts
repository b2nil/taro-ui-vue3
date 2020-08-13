import { h, defineComponent, reactive } from 'vue'
import { AtRadio } from '@/components/index'
import { RadioOption } from 'types/radio'
import { View } from '@tarojs/components'
import { Page, Panel } from '../../components/demo-page'
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

    function handleRadioChange(value: string): void {
      state.radioValue1 = value
    }
    function handleRadioChangeScnd(value: string): void {
      state.radioValue2 = value
    }
    function handleRadioChangeThd(value: string): void {
      state.radioValue3 = value
    }

    return () => {
      return (
        h(Page, { headerTitle: 'Radio 单选框' }, {
          default: () => [

            /* 基础用法*/
            h(Panel, { title: '基础用法', noPadding: true }, {
              default: () => [
                h(View, { class: 'radio-container' }, {
                  default: () => [
                    h(AtRadio, {
                      options: state.radioOptions1,
                      value: state.radioValue1,
                      onClick: handleRadioChange.bind(this),
                    })
                  ]
                }),
              ]
            }),

            /* 含有单项描述*/
            h(Panel, { title: '含有单项描述', noPadding: true }, {
              default: () => [
                h(View, { class: 'radio-container' }, {
                  default: () => [
                    h(AtRadio, {
                      options: state.radioOptions2,
                      value: state.radioValue2,
                      onClick: handleRadioChangeScnd.bind(this),
                    })
                  ]
                }),
              ]
            }),

            /* 单项禁用*/
            h(Panel, { title: '单项禁用', noPadding: true }, {
              default: () => [
                h(View, { class: 'radio-container' }, {
                  default: () => [
                    h(AtRadio, {
                      options: state.radioOptions3,
                      value: state.radioValue3,
                      onClick: handleRadioChangeThd.bind(this),
                    })
                  ]
                }),
              ]
            }),
          ]
        })
        /* E Body*/
      )
    }
  }
})
