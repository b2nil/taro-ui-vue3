import { h, defineComponent, reactive } from 'vue'
import { AtTextarea } from "taro-ui-vue3"
import { Page, Panel, ExampleItem } from '@/components/index'
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

    return () => (
      h(Page, { headerTitle: 'Textarea 多行文本框' }, {
        default: () => [

          h(Panel, { title: '基础', }, {
            default: () => [
              h(ExampleItem, null, {
                default: () => [
                  h(AtTextarea, {
                    modelmodelValue: state.value1,
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
                    modelValue: state.value2,
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
                    modelValue: state.value3,
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
                    modelValue: state.value4,
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
