<template>
  <view class="at-calendar__header header">
    <view class="header__flex">
      <view
        class="header__flex-item"
        v-for="(day, index) in days"
        :key="index"
      >{{ day }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AtCalendarHeader",

  data: () => ({
    addGlobalClass: true,
    days: ['日', '一', '二', '三', '四', '五', '六']
  })
})
</script>

<style>
</style>