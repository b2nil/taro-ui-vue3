<template>
  <page header-title="Textarea 多行文本框">
    <panel title="基础用法">
      <example-item>
        <at-textarea
          placeholder="通过 onChange 更新 value 的值..."
          :max-length="200"
          :value="value1"
          @change="handleChange('value1', $event)"
        />
      </example-item>
    </panel>

    <panel title="不显示字数">
      <example-item>
        <at-textarea
          placeholder="通过 v-model:value 更新 value 的值..."
          :count="false"
          :max-length="200"
          v-model:value="value2"
        />
      </example-item>
    </panel>

    <panel title="文字超出仍可输入">
      <example-item>
        <at-textarea
          placeholder="通过 v-model:value 更新 value 的值..."
          :text-overflow-forbidden="false"
          :max-length="200"
          v-model:value="value3"
        />
      </example-item>
    </panel>

    <panel title="自定义高度">
      <example-item>
        <at-textarea
          placeholder="通过 v-model:value 更新 value 的值..."
          height="300"
          :max-length="200"
          v-model:value="value4"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { AtTextarea } from '../../../index'
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import './index.scss'

interface IndexState {
  [key: string]: string
}

export default defineComponent({
  name: "TextareaDemo",

  components: {
    AtTextarea,
    Page,
    Panel,
    ExampleItem
  },

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

    return {
      ...toRefs(state),
      handleChange
    }
  }
})

</script>