<template>
  <page header-title="LoadMore 页面提示">
    <panel
      no-padding
      title="一般用法"
    >
      <at-load-more
        :status="status"
        @click="handleClick"
      />
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import './index.scss'

interface LoadMorePageState {
  status: 'more' | 'loading' | 'noMore'
}

export default defineComponent({
  name: "LoadMoreDemo",

  setup() {

    const state = reactive<LoadMorePageState>({
      status: 'more'
    })

    function handleClick(): void {
      state.status = 'loading'
      setTimeout(() => {
        state.status = 'noMore'
      }, 2000)
    }

    return {
      ...toRefs(state),
      handleClick
    }
  }
})
</script>