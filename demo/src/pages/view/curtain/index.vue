<template>
  <page header-title="Curtain 幕帘">
    <template #extra>
      <at-curtain
        :is-opened="isOpened"
        :close-btn-position="closeBtnPosition"
        @close="onClose"
      >
        <image
          style="width: 100%;height: 100%;"
          mode="widthFix"
          :src="curtainPng"
        />
      </at-curtain>
    </template>

    <template
      v-for="(posName, pos) in positions"
      :key="pos"
    >
      <panel :title="`${posName}关闭`">
        <example-item>
          <at-button @click="handleChange('closeBtnPosition', pos)">
            {{ `${posName}关闭幕帘` }}
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
      "top": "顶部",
      "bottom": "底部",
      "top-left": "左上",
      "top-right": "右上",
      "bottom-left": "左下",
      "bottom-right": "右下",
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
      onClose,
      handleChange
    }
  }
})

</script>
