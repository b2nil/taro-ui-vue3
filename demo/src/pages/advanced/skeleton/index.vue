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
          v-model:checked="loading"
        ></at-switch>
      </template>
      <example-item>
        <at-skeleton
          :loading="loading"
          type="list-item-avatar-two-line"
        >
          <at-flex-item>
            this is test
          </at-flex-item>
          <at-flex-item>
            this is another test
          </at-flex-item>
        </at-skeleton>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "SkeletonDemo",

  setup() {
    const loading = ref(true)
    return {
      loading
    }
  }
})
</script>