<template>
  <page header-title="Pagination 分页器">
    <panel
      no-padding
      title="基础用法"
    >
      <example-item>
        <at-pagination
          :total="20"
          :pageSize="10"
          :current="1"
        />
      </example-item>
    </panel>

    <panel
      no-padding
      title="图标类型"
    >
      <example-item>
        <at-pagination
          icon
          :total="20"
          :pageSize="10"
          :current="1"
        />
      </example-item>
    </panel>

    <!-- 点击页码出是否出现picker选择页码 -->
    <panel
      no-padding
      title="picker 快速选择页码"
    >
      <example-item>
        <at-pagination
          icon
          :total="20"
          :pageSize="10"
          :current="1"
        />
      </example-item>
    </panel>

    <panel
      no-padding
      title="改变数据长度"
    >
      <example-item>
        <at-pagination
          icon
          :total="len"
          :pageSize="pageSize"
          :current="current"
          @page-change="onPage"
        />
        <view class="btn-item">
          当前页：{{current}}，当前数据：{{len}}条，分页大小：
          {{pageSize}}
        </view>
        <view class="btn-item">
          <at-button
            type="primary"
            @click="onPageDataChange"
          >增加10条数据</at-button>
        </view>
        <view class="btn-item">
          <at-button @click="onCurrentChange">重置</at-button>
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue"
import Taro from "@tarojs/taro"
import { AtButton, AtPagination } from "@/components/index"
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import "./index.scss"

export default defineComponent({
  name: "PaginationDemo",
  
  components: {
    AtButton,
    AtPagination,
    Page,
    Panel,
    ExampleItem
  },

  setup() {

    const state = reactive({
      list: [],
      current: 1,
      pageSize: 10
    })

    const len = computed(() => state.list.length)

    function onPage(data) {
      state.current = data.current
      Taro.showToast({
        title: `Pagination: ${JSON.stringify(data)}`,
        icon: 'none'
      })
    }

    function onPageDataChange() {
      const _list = new Array(10).fill(1)
      state.list = state.list.concat(..._list)
    }

    function onCurrentChange() {
      state.current = 1
      state.list = []
    }

    return {
      ...toRefs(state),
      len,
      onPage,
      onPageDataChange,
      onCurrentChange
    }
  }
})
</script>
