<template>
  <page header-title="Switch 开关">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <at-switch
          title="开启中"
          checked
        />
        <at-switch
          title="已关闭"
          border
        />
      </example-item>
    </panel>

    <panel
      title="使用 v-model 获取开关状态"
      no-padding
    >
      <example-item>
        <at-switch
          :title="`使用 v-model:checked:${'&nbsp;'.repeat(13)}${switchValue ? '开启中' : '已关闭'}`"
          v-model:checked="switchValue"
          border
        />
      </example-item>
    </panel>

    <panel
      title="禁用状态"
      no-padding
    >
      <example-item>
        <at-switch
          title="不可点击： 无 border"
          checked
          disabled
        />
        <at-switch
          title="不可点击： 有 border"
          border
          disabled
        />
      </example-item>
    </panel>
  </page>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import './index.scss'

export default defineComponent({
  name: "SwitchDemo",

  setup() {
    const switchValue = ref(true)

    return {
      switchValue
    }
  }
})

</script>