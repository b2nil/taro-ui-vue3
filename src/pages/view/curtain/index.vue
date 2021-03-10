<template>
  <page header-title="Curtain 幕帘">
    <template #extra>
      <at-curtain
        :is-opened="isOpened"
        :close-btn-position="closeBtnPosition"
        @close="onClose"
      >
        <image
          style="width:100%;"
          mode="widthFix"
          :src="curtainPng"
        ></image>
      </at-curtain>
    </template>

    <template #default>
      <panel
        v-for="(txt, pos) in positions"
        :key="pos"
        :title="txt"
      >
        <example-item>
          <at-button @click="handleChange('closeBtnPosition', pos)">
            {{`${txt}幕帘`}}
          </at-button>
        </example-item>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import curtainPng from '@/assets/images/curtain.png'
import './index.scss'

interface TagPageState {
  isOpened: boolean
  closeBtnPosition:
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  [key: string]: string | boolean
}

export default defineComponent({
  name: "CurtainDemo",

  setup() {

    const positions = {
      'top': '顶部关闭',
      'top-left': '底部关闭',
      'top-right': '左上关闭',
      'bottom': '右上关闭',
      'bottom-left': '左下关闭',
      'bottom-right': '右下关闭'
    }

    const state = reactive<TagPageState>({
      isOpened: false,
      closeBtnPosition: 'bottom'
    })

    function handleChange(stateName: string, value: string): void {
      state.isOpened = true
      state[stateName] = value
    }

    function onClose(): void {
      state.isOpened = false
    }

    return {
      ...toRefs(state),
      curtainPng,
      positions,
      handleChange,
      onClose
    }
  }
})
</script>