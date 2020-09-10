<template>
  <page
    class="float-layout-page"
    header-title="Float Layout 浮动弹层"
  >
    <panel
      v-for="(title, index) in ['基本用法', '最大高度', '监听事件']"
      :title="title"
      :key="index"
    >
      <example-item>
        <at-button @click="handleClick(index+1)">打开 Float Layout</at-button>
      </example-item>
    </panel>

    <template #extra>
      <at-float-layout
        :is-opened="isOpened1"
        @close="handleClose(1)"
      >
        <view class="content-wrapper">
          云对雨，雪对风，晚照对晴空。
          来鸿对去雁，宿鸟对鸣虫。
          三尺剑，六钧弓，岭北对江东。
          人间清暑殿，天上广寒宫。
        </view>
      </at-float-layout>
      <at-float-layout
        title="诗人继续沉默"
        :is-opened="isOpened2"
        @close="handleClose(2)"
      >
        <view class="content-wrapper">
          《诗人继续沉默》收录了耶霍舒亚的十二个中短篇小说。它们以梦境一般的笔法塑造了一个个既敏感又迟钝的角色。故事有时在城市，有时在战场，有时在遥远的山村，有时完全囿于家庭，并总是从司空见惯中生出离奇。每个故事的主线带来不断加剧的紧张感，即使从表面上看，根本没有重要的事情发生：
          封笔的诗人与智力障碍的儿子一起生活；
          绝望的备胎照顾梦中情人与别人的孩子
          外派多年的父亲截取女儿追求者的信件 村民们每日仪式般等候火车经过
          指挥官拒绝命令他的部队上战场 渴睡的工人溜回家休息
          邻居当中有个永生不死的老头 …
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          《诗人继续沉默》收录了耶霍舒亚的十二个中短篇小说。它们以梦境一般的笔法塑造了一个个既敏感又迟钝的角色。故事有时在城市，有时在战场，有时在遥远的山村，有时完全囿于家庭，并总是从司空见惯中生出离奇。每个故事的主线带来不断加剧的紧张感，即使从表面上看，根本没有重要的事情发生：
          封笔的诗人与智力障碍的儿子一起生活；
          绝望的备胎照顾梦中情人与别人的孩子
          外派多年的父亲截取女儿追求者的信件 村民们每日仪式般等候火车经过
          指挥官拒绝命令他的部队上战场 渴睡的工人溜回家休息
          邻居当中有个永生不死的老头 …
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
        </view>
      </at-float-layout>
      <at-float-layout
        title="诗人的沉默"
        :is-opened="isOpened3"
        @scroll="onScroll"
        @scroll-to-lower="onScrollToLower"
        @scroll-to-upper="onScrollToUpper"
        @close="handleClose(3)"
      >
        <view class="content-wrapper">
          《诗人继续沉默》收录了耶霍舒亚的十二个中短篇小说。它们以梦境一般的笔法塑造了一个个既敏感又迟钝的角色。故事有时在城市，有时在战场，有时在遥远的山村，有时完全囿于家庭，并总是从司空见惯中生出离奇。每个故事的主线带来不断加剧的紧张感，即使从表面上看，根本没有重要的事情发生：
          封笔的诗人与智力障碍的儿子一起生活；
          绝望的备胎照顾梦中情人与别人的孩子
          外派多年的父亲截取女儿追求者的信件 村民们每日仪式般等候火车经过
          指挥官拒绝命令他的部队上战场 渴睡的工人溜回家休息
          邻居当中有个永生不死的老头 …
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          《诗人继续沉默》收录了耶霍舒亚的十二个中短篇小说。它们以梦境一般的笔法塑造了一个个既敏感又迟钝的角色。故事有时在城市，有时在战场，有时在遥远的山村，有时完全囿于家庭，并总是从司空见惯中生出离奇。每个故事的主线带来不断加剧的紧张感，即使从表面上看，根本没有重要的事情发生：
          封笔的诗人与智力障碍的儿子一起生活；
          绝望的备胎照顾梦中情人与别人的孩子
          外派多年的父亲截取女儿追求者的信件 村民们每日仪式般等候火车经过
          指挥官拒绝命令他的部队上战场 渴睡的工人溜回家休息
          邻居当中有个永生不死的老头 …
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
          然而，在这些虚构的世界里，即便是细微的行动也会陷入瘫痪。
        </view>
      </at-float-layout>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import Taro from '@tarojs/taro'
import AtButton from "@/components/button"
import AtFloatLayout from "@/components/float-layout"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

export default defineComponent({
  name: "FloatLayoutDemo",
  
  components: {
    Page,
    Panel,
    ExampleItem,
    AtButton,
    AtFloatLayout,
  },

  setup() {
    const state = reactive({
      isOpened1: false,
      isOpened2: false,
      isOpened3: false

    })

    function onScroll(event) {
      Taro.showToast({
        title: `onScroll: ${JSON.stringify(event.detail)}`,
        icon: 'none'
      })
    }

    function onScrollToLower(event) {
      Taro.showToast({
        title: `onScrollToLower: ${JSON.stringify(event.detail)}`,
        icon: 'none'
      })
    }

    function onScrollToUpper(event) {
      Taro.showToast({
        title: `onScrollToUpper: ${JSON.stringify(event.detail)}`,
        icon: 'none'
      })
    }

    function handleClick(type) {
      state[`isOpened${type}`] = true
    }

    function handleClose(type) {
      state[`isOpened${type}`] = false

      Taro.showToast({
        title: `handleClose: ${type}`,
        icon: 'none'
      })
    }


    return {
      ...toRefs(state),
      handleClose,
      handleClick,
      onScroll,
      onScrollToLower,
      onScrollToUpper,
    }
  }
})
</script>