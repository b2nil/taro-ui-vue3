<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <!-- btn prev -->
    <view class="at-pagination__btn-prev">
      <at-button
        v-if="icon"
        size="small"
        :disabled="prevDisabled"
        @click="onPrev"
      >
        <text class="at-icon at-icon-chevron-left" />
      </at-button>

      <at-button
        v-if="!icon"
        size="small"
        :disabled="prevDisabled"
        @click="onPrev"
      >上一页</at-button>
    </view>

    <!-- pagination number -->
    <view class="at-pagination__number">
      <text class="at-pagination__number-current">{{ currentPage }}</text>
      <text>{{ `/${maxPage}` }}</text>
    </view>

    <!-- btn next -->
    <view class="at-pagination__btn-next">
      <at-button
        v-if="icon"
        size="small"
        :disabled="nextDisabled"
        @click="onNext"
      >
        <text class="at-icon at-icon-chevron-right" />
      </at-button>

      <at-button
        v-if="!icon"
        size="small"
        :disabled="nextDisabled"
        @click="onNext"
      >下一页</at-button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, toRefs, toRef } from 'vue'
import { AtPaginationProps, AtPaginationState, PageChangeData } from "@taro-ui-vue3/types/pagination"
import { AtButton } from '@taro-ui-vue3/button'


const MIN_MAXPAGE = 1
const getMaxPage = (maxPage = 0): number => {
  if (maxPage <= 0) return MIN_MAXPAGE
  return maxPage
}

const createPickerRange = (max: number): number[] => {
  const range = new Array(max).fill(0).map((_val, index) => index + 1)
  return range
}

export default defineComponent({
  name: "AtPagination",

  components: {
    AtButton
  },

  emits: {
    'page-change'(data: PageChangeData) {
      return !!(
        data && data.type &&
        ['prev', 'next'].includes(data.type) &&
        data.current && typeof data.current === 'number'
      )
    }
  },

  props: {
    total: { type: Number, default: 0, required: true },
    current: { type: Number, default: 1 },
    pageSize: { type: Number, default: 20 },
    icon: { type: Boolean, default: false },
  },

  setup(props: AtPaginationProps, { emit }) {

    const maxPage = computed(() => getMaxPage(Math.ceil(props.total / props.pageSize!)))

    const state = reactive<AtPaginationState>({
      currentPage: props.current || 1,
      maxPage: maxPage.value,
      pickerRange: createPickerRange(maxPage.value)
    })

    const prevDisabled = computed(() => state.maxPage === MIN_MAXPAGE || state.currentPage === 1)
    const nextDisabled = computed(() => state.maxPage === MIN_MAXPAGE || state.currentPage === state.maxPage)

    const rootClasses = computed(() => ({
      'at-pagination': true,
      'at-pagination--icon': props.icon
    }))

    watch(() => [
      props.total,
      props.pageSize,
      props.current
    ], ([total, pageSize, current]) => {
      const maxPage = getMaxPage(Math.ceil(total! / pageSize!))

      if (maxPage !== state.maxPage) {
        state.maxPage = maxPage
        state.pickerRange = createPickerRange(maxPage)
      }

      if (typeof current === 'number' && current !== state.currentPage) {
        state.currentPage = current
      }
    })

    function onPrev(): void {
      let { currentPage } = state

      const originCur = currentPage
      currentPage -= 1
      currentPage = Math.max(1, currentPage)

      if (originCur === currentPage) return

      emit('page-change', { type: 'prev', current: currentPage })

      state.currentPage = currentPage
    }

    function onNext(): void {
      let { currentPage } = state
      const originCur = currentPage
      const { maxPage } = state
      currentPage += 1
      currentPage = Math.min(maxPage, currentPage)

      if (originCur === currentPage) return

      emit('page-change', { type: 'next', current: currentPage })

      state.currentPage = currentPage
    }


    return {
      ...toRefs(state),
      icon: toRef(props, 'icon'),
      rootClasses,
      prevDisabled,
      nextDisabled,
      onPrev,
      onNext
    }
  }
})
</script>
