<template>
  <view
    :class="rootClass"
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
import { defineComponent, computed, toRefs } from "vue"
import { AtLoadMoreProps } from 'types/load-more'

import AtComponentWithDefaultProps from '../mixins'
import AtActivityIndicator from '../activity-indicator/index.vue'
import AtButton from "../button/index.vue"

export default defineComponent({
  name: "AtLoadMore",
  mixins: [AtComponentWithDefaultProps],

  props: {
    // 参数
    noMoreTextStyle: {
      type: String as () => AtLoadMoreProps['noMoreTextStyle'],
      default: ''
    },
    moreBtnStyle: {
      type: String as () => AtLoadMoreProps['moreBtnStyle'],
      default: ''
    },
    status: {
      type: String as () => AtLoadMoreProps['status'],
      default: 'more' as AtLoadMoreProps['status']
    },
    loadingText: {
      type: String as () => AtLoadMoreProps['loadingText'],
      default: '加载中'
    },
    moreText: {
      type: String as () => AtLoadMoreProps['moreText'],
      default: '查看更多'
    },
    noMoreText: {
      type: String as () => AtLoadMoreProps['noMoreText'],
      default: '没有更多'
    },
    // 事件
    onClick: {
      type: Function as unknown as () => AtLoadMoreProps['onClick'],
      default: () => () => { }
    },
  },

  setup(props: AtLoadMoreProps) {

    const rootClass = computed(() => ({
      'at-load-more': true,
      [props.className]: true
    }))

    function handleClick() {
      props.onClick && props.onClick(arguments as any)
    }

    return {
      ...toRefs(props),
      rootClass,
      handleClick
    }
  }
})
</script>

