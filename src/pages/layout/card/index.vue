<template>
  <page header-title="Card 卡片">
    <!-- 基础卡片 -->
    <panel
      title="基础卡片"
      no-padding
    >
      <example-item>
        <at-card
          title="这是标题"
          @click="handleClick"
        >这也是内容区 可以随意定义功能</at-card>
      </example-item>
    </panel>
    <!-- 带缩略图的卡片 -->
    <panel
      title="带缩略图的卡片"
      no-padding
    >
      <example-item>
        <at-card
          title="这是标题"
          thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
        >这也是内容区 可以随意定义功能</at-card>
      </example-item>
    </panel>
    <!-- 带图标的卡片 -->
    <panel
      title="带图标的卡片"
      no-padding
    >
      <example-item>
        <at-card
          title="这是标题"
          :icon="{ value: 'tags', color: '#77a1fd' }"
        >这也是内容区 可以随意定义功能</at-card>
      </example-item>
    </panel>
    <!-- 自定义图标的卡片 -->
    <panel
      title="自定义图标的卡片"
      no-padding
    >
      <example-item>
        <at-card
          title="这是标题"
          :renderIcon="renderIcon"
        >这也是内容区 可以随意定义功能</at-card>
      </example-item>
    </panel>
    <!-- 带小信息的卡片 -->
    <panel
      title="带小信息的卡片"
      no-padding
    >
      <example-item>
        <at-card
          note="小Tips"
          title="这是个标题"
          thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
        >这也是内容区 可以随意定义功能</at-card>
      </example-item>
    </panel>
    <!-- 自定义额外信息样式的卡片 -->
    <panel
      title="自定义额外信息样式的卡片"
      no-padding
    >
      <example-item>
        <at-card
          note="小Tips"
          extra="2019/01/23 22:33:33"
          :extraStyle="{
            fontSize: '12px',
            maxWidth: '200px',
            color: '#6190e8',
          }"
          title="这是个标题"
          thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
        >这也是内容区 可以随意定义功能</at-card>
      </example-item>
    </panel>
    <!-- 通栏卡片  -->
    <panel
      title="通栏卡片"
      no-padding
    >
      <example-item>
        <at-card
          is-full
          note="小Tips"
          extra="额外信息"
          title="这是个标题"
          thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
        >这也是内容区 可以随意定义功能 这也是内容区 可以随意定义功能 这也是内容区 可以随意定义功能</at-card>
      </example-item>
    </panel>
  </page>
</template>

<script lang='ts'>
import { h, defineComponent } from "vue"
import Taro from "@tarojs/taro"
import { Page, Panel, ExampleItem } from '../../components/demo-page'
import AtIcon from '@/components/icon'
import AtCard from '@/components/card'

export default defineComponent({
  name: "CardDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtCard,
    AtIcon
  },

  setup() {
    const renderIcon = h(AtIcon, {
      prefixClass: 'at-icon',
      value: 'home',
      size: 16,
      color: '#6190e8',
      style: { marginRight: '10px' }
    })

    function handleClick() {
      Taro.showToast({
        title: 'Card handleClick',
        icon: 'none'
      })
    }

    return {
      handleClick,
      renderIcon
    }
  }
})
</script>