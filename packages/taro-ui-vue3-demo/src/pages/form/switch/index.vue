<template>
  <page header-title="Switch 开关">
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <at-switch v-bind="{
          title: switchValue ? '开启中' : '已关闭',
          checked: switchValue,
          onChange: handleChange
        }" />
        <at-switch v-bind="{
          title: '已关闭',
          border: false
        }" />
      </example-item>
    </panel>

    <panel
      title="禁用状态"
      no-padding
    >
      <example-item>
        <at-switch v-bind="{ title: '不可点击', checked: true, disabled: true }" />
        <at-switch v-bind="{ title: '不可点击', border: false, disabled: true }" />
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { AtForm, AtSwitch } from "taro-ui-vue3"
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

interface IndexState {
  switchValue: boolean
}

export default defineComponent({
  name: "SwitchDemo",

  components: {
    AtForm, AtSwitch, Page, Panel, ExampleItem
  },

  setup() {
    const state = reactive<IndexState>({
      switchValue: true
    })


    const handleChange = (value: boolean): void => {
      state.switchValue = value
    }


    return {
      ...toRefs(state),
      handleChange
    }
  }
})

</script>
