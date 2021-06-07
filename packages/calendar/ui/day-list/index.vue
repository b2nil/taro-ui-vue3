<template>
  <view class="header at-calendar__header">
    <view class="header__flex">
      <view
        v-for="(day, index) in days"
        :key="index"
        class="header__flex-item"
      >{{ day }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const AtCalendarHeader = defineComponent({
  name: "AtCalendarHeader",

  data: () => ({
    addGlobalClass: true,
    days: ['日', '一', '二', '三', '四', '五', '六']
  })
})

export default AtCalendarHeader
</script>