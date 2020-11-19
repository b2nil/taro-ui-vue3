<template>
  <page header-title="Tag 标签">
    <panel title="空心标签">
      <example-item>
        <view
          v-for="(item, index) in hollowTagList"
          :key="`at-tag-${index}`"
          class="subitem"
        >
          <at-tag
            :name="item.name"
            :active="item.active"
            :circle="index % 2 === 0"
            @click="handleHollowClick"
          >
            <text>标签</text>
          </at-tag>
        </view>
      </example-item>
    </panel>

    <panel
      title="实心标签"
      class="panel__content"
    >
      <example-item>
        <view
          v-for="(item, index) in solidTagList"
          :key="`at-tag-${index}`"
          class="subitem"
        >
          <at-tag
            type="primary"
            :name="item.name"
            :active="item.active"
            :circle="index % 2 === 0"
            @click="handleSolidClick"
          >
            <text>标签</text>
          </at-tag>
        </view>
      </example-item>
    </panel>

    <panel
      title="点击事件"
      class="panel__content"
    >
      <example-item>
        <view
          v-for="(item, index) in tagList"
          :key="`at-tag-${index}`"
          class="subitem"
        >
          <at-tag
            type="primary"
            :name="item.name"
            :active="item.active"
            :circle="index % 2 === 0"
            @click="onClick"
          >
            <text>{{  `tag-${index + 1}` }}</text>
          </at-tag>
        </view>
      </example-item>
    </panel>

    <panel
      title="不可点击态"
      class="panel__content"
    >
      <example-item>
        <view class="subitem">
          <at-tag
            circle
            disabled
            type="primary"
          >
            <text>标签</text>
          </at-tag>
        </view>
        <view class="subitem">
          <at-tag
            disabled
            type="primary"
          >
            <text>标签</text>
          </at-tag>
        </view>
      </example-item>
    </panel>

    <panel
      title="空心标签（小）"
      class="panel__content"
    >
      <example-item>
        <view
          v-for="(item, index) in hollowTagList2"
          :key="`at-tag-${index}`"
          class="subitem"
        >
          <at-tag
            size="small"
            :name="item.name"
            :active="item.active"
            :circle="index % 2 === 0"
            @click="handleHollowSmallClick"
          >
            <text>标签</text>
          </at-tag>
        </view>
      </example-item>
    </panel>

    <panel
      title="实心标签（小）"
      class="panel__content"
    >
      <example-item>
        <view
          v-for="(item, index) in solidTagList2"
          :key="`at-tag-${index}`"
          class="subitem"
        >
          <at-tag
            size="small"
            type="primary"
            :name="item.name"
            :active="item.active"
            :circle="index % 2 === 0"
            @click="handleSolidSmallClick"
          >
            <text>标签</text>
          </at-tag>
        </view>
      </example-item>
    </panel>

    <panel
      title="不可点击态（小）"
      class="panel__content"
    >
      <example-item>
        <view class="subitem">
          <at-tag
            circle
            disabled
            size="small"
            type="primary"
          >
            <text>标签</text>
          </at-tag>
        </view>
        <view class="subitem">
          <at-tag
            disabled
            size="small"
            type="primary"
          >
            <text>标签</text>
          </at-tag>
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { AtTag } from "taro-ui-vue3"
import { defineComponent, reactive, toRefs } from 'vue'
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

type ListItem = {
  name: string
  active: boolean
}

interface TagPageState {
  tagList: ListItem[]
  hollowTagList: ListItem[]
  solidTagList: ListItem[]
  hollowTagList2: ListItem[]
  solidTagList2: ListItem[]
}

export default defineComponent({
  name: "TagDemo",

  components: {
    AtTag,
    Page,
    Panel,
    ExampleItem
  },

  setup() {

    const state = reactive<TagPageState>({
      tagList: [
        { name: 'tag-1', active: false },
        { name: 'tag-2', active: false },
        { name: 'tag-3', active: true },
        { name: 'tag-4', active: true }
      ],
      hollowTagList: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      solidTagList: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      hollowTagList2: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      solidTagList2: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ]
    })

    function onClick(data: ListItem): void {
      const { tagList } = state
      const findIndex = tagList.findIndex(item => item.name === data.name)
      const active = !tagList[findIndex].active
      const content = `您点击的 tag 标签名是：${data.name}，点击前是否选中：${data.active}，点击后：${active}`

      tagList[findIndex].active = active
      state.tagList = tagList

      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        alert(content)
      } else {
        Taro.showModal({ content, showCancel: false })
      }
    }

    function handleHollowClick(data: ListItem): void {
      const { hollowTagList } = state
      const findIndex = hollowTagList.findIndex(item => item.name === data.name)

      hollowTagList[findIndex].active = !hollowTagList[findIndex].active
      state.hollowTagList = hollowTagList
    }

    function handleSolidClick(data: ListItem): void {
      const { solidTagList } = state
      const findIndex = solidTagList.findIndex(item => item.name === data.name)

      solidTagList[findIndex].active = !solidTagList[findIndex].active
      state.solidTagList = solidTagList
    }

    function handleHollowSmallClick(data: ListItem): void {
      const { hollowTagList2 } = state
      const findIndex = hollowTagList2.findIndex(item => item.name === data.name)

      hollowTagList2[findIndex].active = !hollowTagList2[findIndex].active
      state.hollowTagList2 = hollowTagList2
    }

    function handleSolidSmallClick(data: ListItem): void {
      const { solidTagList2 } = state
      const findIndex = solidTagList2.findIndex(item => item.name === data.name)

      solidTagList2[findIndex].active = !solidTagList2[findIndex].active
      state.solidTagList2 = solidTagList2
    }

    return {
      ...toRefs(state),
      onClick,
      handleHollowClick,
      handleSolidClick,
      handleHollowSmallClick,
      handleSolidSmallClick
    }
  }
})

</script>
