import { h, defineComponent, reactive } from 'vue'
import { AtTextarea } from '@/components/index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: string
}

export default defineComponent({
  name: "TextareaDemo",
  
  setup() {
    const state = reactive<IndexState>({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })

    function handleChange(stateName: string, value: string): void {
      state[stateName] = value
    }

    return () => (
      h(Page, { headerTitle: 'Textarea 多行文本框' }, {
        default: () => [

          h(Panel, { title: '基础', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtTextarea, {
                    value: state.value1,
                    onChange: handleChange.bind(this, 'value1'),
                    maxLength: 200,
                    placeholder: '你的问题是...'
                  })
                ]
              }),
            ]
          }),

          h(Panel, { title: '不显示字数', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtTextarea, {
                    count: false,
                    value: state.value2,
                    onChange: handleChange.bind(this, 'value2'),
                    maxLength: 200,
                    placeholder: '你的问题是...'
                  })
                ]
              }),
            ]
          }),

          h(Panel, { title: '文字超出仍可输入', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtTextarea, {
                    textOverflowForbidden: false,
                    value: state.value3,
                    onChange: handleChange.bind(this, 'value3'),
                    maxLength: 200,
                    placeholder: '你的问题是...'
                  })
                ]
              }),
            ]
          }),

          h(Panel, { title: '自定义高度', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtTextarea, {
                    height: '300',
                    value: state.value4,
                    onChange: handleChange.bind(this, 'value4'),
                    maxLength: 200,
                    placeholder: '你的问题是...'
                  })
                ]
              }),
            ]
          }),
        ]
      })
    )
  }
})
