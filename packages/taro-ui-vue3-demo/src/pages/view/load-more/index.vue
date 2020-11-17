<template>
  <page header-title="LoadMore 页面提示">
    <panel
      no-padding
      title="一般用法"
    >
      <at-load-more
        @click="handleClick"
        :status="status"
      ></at-load-more>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { AtLoadMore } from "taro-ui-vue3"
import { Page, Panel } from '@/components/index'
import './index.scss'

interface LoadMorePageState {
  status: 'more' | 'loading' | 'noMore'
}

export default defineComponent({
  name: "LoadMoreDemo",

  components: {
    AtLoadMore,
    Page,
    Panel
  },

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