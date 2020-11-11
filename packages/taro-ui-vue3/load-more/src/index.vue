<template>
  <view
    v-bind="$attrs"
    class="at-load-more"
  >
    <!-- loading -->
    <at-activity-indicator
      v-if="status === 'loading'"
      mode="center"
      :content="loadingText"
    />

    <!-- more button -->
    <view
      v-else-if="status === 'more'"
      class="at-load-more__cnt"
    >
      <at-button
        full
        :style="moreBtnStyle"
        @click="handleClick"
      >
        {{ moreText }}
      </at-button>
    </view>

    <!-- no-more tip -->
    <text
      v-else
      class="at-load-more__tip"
      :style="noMoreTextStyle"
    >{{ noMoreText }}</text>
  </view>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from "vue"
import { AtLoadMoreProps } from "@taro-ui-vue3/types/load-more"
import { AtActivityIndicator } from '@taro-ui-vue3/activity-indicator'
import { AtButton } from "@taro-ui-vue3/button"

export default defineComponent({
  name: "AtLoadMore",

  components: {
    AtButton,
    AtActivityIndicator
  },

  emits: ['click'],

  props: {
    // 参数
    noMoreTextStyle: {
      type: String as PropType<AtLoadMoreProps['noMoreTextStyle']>,
      default: ''
    },
    moreBtnStyle: {
      type: String as PropType<AtLoadMoreProps['moreBtnStyle']>,
      default: ''
    },
    status: {
      type: String as PropType<AtLoadMoreProps['status']>,
      default: 'more'
    },
    loadingText: {
      type: String as PropType<AtLoadMoreProps['loadingText']>,
      default: '加载中'
    },
    moreText: {
      type: String as PropType<AtLoadMoreProps['moreText']>,
      default: '查看更多'
    },
    noMoreText: {
      type: String as PropType<AtLoadMoreProps['noMoreText']>,
      default: '没有更多'
    }
  },

  setup(props: AtLoadMoreProps, { emit }) {

    function handleClick() {
      emit('click', arguments as any)
    }

    return {
      ...toRefs(props),
      handleClick
    }
  }
})
</script>

