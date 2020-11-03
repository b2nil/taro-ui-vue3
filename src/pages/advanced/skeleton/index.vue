<template>
  <page
    class="skeleton-page"
    header-title="Skeleton 骨架"
  >
    <panel title="一般用法">
      <example-item>
        <at-skeleton
          style="margin: 10px;"
          type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        >
        </at-skeleton>
      </example-item>
    </panel>

    <panel title="加载">
      <template #controller>
        <at-switch
          :title="`${ loading ? '加载中' : '加载完毕'}`"
          :checked="loading"
          @change="handleChange"
        ></at-switch>
      </template>
      <example-item>
        <at-skeleton
          :loading="loading"
          type="list-item-avatar-two-line"
        >
          <at-flex-item>
            this ia test
          </at-flex-item>
          <at-flex-item>
            this is another thest
          </at-flex-item>
        </at-skeleton>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import {
  AtSkeleton,
  AtCard,
  AtFlex,
  AtFlexItem,
  AtSwitch,
} from '@/components/index'

import {
  Page,
  Panel,
  ExampleItem
} from '../../components/demo-page'

export default defineComponent({
  name: "SkeletonDemo",

  components: {
    AtSkeleton,
    AtCard,
    AtFlex,
    AtFlexItem,
    AtSwitch,
    Page,
    Panel,
    ExampleItem
  },

  setup() {
    const loading = ref(true)

    function handleChange(value) {
      loading.value = value
    }
    return {
      loading,
      handleChange
    }
  }
})
</script>

<style>
</style>