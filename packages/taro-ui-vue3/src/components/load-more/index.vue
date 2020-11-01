<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <at-activity-indicator
      v-if="status === 'loading'"
      mode="center"
      :content="loadingText"
    />
    <view
      class="at-load-more__cnt"
      v-else-if="status === 'more'"
    >
      <at-button
        full
        :customStyle="moreBtnStyle"
        @tap="handleClick"
      >
        <slot />
      </at-button>
    </view>
    <text
      class="at-load-more__tip"
      :style="noMoreTextStyle"
    >{{ noMoreText }}</text>
  </view>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from "../../api"
import { AtLoadMoreProps } from 'types/load-more'


import AtActivityIndicator from '../activity-indicator/index.vue'
import AtButton from "../button/index.vue"

export default defineComponent({
  name: "AtLoadMore",


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
      default: 'more' as AtLoadMoreProps['status']
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
    },
    // 事件
    onClick: {
      type: Function as PropType<AtLoadMoreProps['onClick']>,
      default: () => () => { }
    },
  },

  setup(props: AtLoadMoreProps) {

    const rootClasses = computed(() => ({
      'at-load-more': true,
      [props.className]: true
    }))

    function handleClick() {
      props.onClick && props.onClick(arguments as any)
    }

    return {
      ...toRefs(props),
      rootClasses,
      handleClick
    }
  }
})
</script>

