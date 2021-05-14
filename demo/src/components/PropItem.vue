<template>
  <at-flex direction="column">
    <at-flex-item is-wrap>
      <view class="example-item__desc">
        <view style="color: red; font-style: italic;">{{ prop }}</view>
        <view>{{ desc }}</view>
      </view>
    </at-flex-item>

    <at-flex-item>
      <slot />
    </at-flex-item>
  </at-flex>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue"

export default defineComponent({
  name: "PropItem",

  props: {
    prop: String,
    desc: String
  },

  setup(props) {
    return {
      ...toRefs(props)
    }
  }
})
</script>