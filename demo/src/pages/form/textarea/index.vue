<template>
  <page header-title="Textarea 多行文本框">
    <panel title="基础用法">
      <example-item>
        <at-textarea
          placeholder="基础用法..."
          :max-length="200"
          v-model="value1"
        />
      </example-item>
    </panel>

    <panel title="不显示字数">
      <example-item>
        <at-textarea
          placeholder="不显示字数..."
          :count="false"
          :max-length="200"
          v-model="value2"
        />
      </example-item>
    </panel>

    <panel title="文字超出仍可输入">
      <example-item>
        <at-textarea
          placeholder="文字超出仍可输入..."
          :text-overflow-forbidden="false"
          :max-length="200"
          v-model="value3"
        />
      </example-item>
    </panel>

    <panel title="自定义高度">
      <example-item>
        <at-textarea
          placeholder="自定义高度..."
          height="300"
          :max-length="200"
          v-model="value4"
        />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import './index.scss'

export default defineComponent({
  name: "TextareaDemo",

  setup() {
    const state = reactive({
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    })

    return {
      ...toRefs(state)
    }
  }
})

</script>