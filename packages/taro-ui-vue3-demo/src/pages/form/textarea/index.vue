<template>
  <page header-title="Textarea 多行文本框">
    <template v-for="(panel, i) in panels">
      <panel
        :title="panel.title"
        :key="i"
      >
        <example-item>
          <at-textarea v-bind="panel.attrs" />
        </example-item>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { AtTextarea } from "taro-ui-vue3"
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

interface IndexState {
  [key: string]: string
}

export default defineComponent({
  name: "TextareaDemo",

  components: {
    AtTextarea, Page, Panel, ExampleItem
  },

  setup() {
    const state = reactive<IndexState>({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })

    const panels = [
      {
        title: "基础",
        attrs: {
          modelValue: state.value1,
          maxLength: 200,
          placeholder: '你的问题是...'
        }
      },
      {
        title: "不显示字数",
        attrs: {
          count: false,
          modelValue: state.value2,
          maxLength: 200,
          placeholder: '你的问题是...'
        }
      },
      {
        title: "文字超出仍可输入",
        attrs: {
          textOverflowForbidden: false,
          modelValue: state.value3,
          maxLength: 200,
          placeholder: '你的问题是...'
        }
      },
      {
        title: "自定义高度",
        attrs: {
          height: '300',
          modelValue: state.value4,
          maxLength: 200,
          placeholder: '你的问题是...'
        }
      }
    ]

    return {
      panels
    }
  }
})
</script>
