<template>
  <page header-title="TabBar 标签栏">
    <panel
      no-padding
      title="文本标签栏"
    >
      <at-tab-bar
        :tab-list="tabList1"
        :current="current1"
        @click="handleClick(1, $event)"
      />
    </panel>
    <panel
      no-padding
      title="图标文本标签栏"
    >
      <at-tab-bar
        :tab-list="tabList2"
        :current="current2"
        @click="handleClick(2, $event)"
      />
    </panel>
    <panel
      no-padding
      title="自定义图标颜色、字体颜色、背景颜色"
    >
      <at-tab-bar
        color="#ea6bb8"
        selected-color="#e64340"
        background-color="#FAFBFC"
        :tab-list="tabList2"
        :current="current3"
        @click="handleClick(3, $event)"
      />
    </panel>
    <panel
      no-padding
      title="图片icon"
      :style="{ paddingBottom: '24px' }"
    >
      <at-tab-bar
        :tab-list="tabList3"
        :current="current5"
        @click="handleClick(5, $event)"
      />
    </panel>
    <panel
      no-padding
      title="固定底部"
      :style="{ paddingBottom: '24px' }"
    >
      <at-tab-bar
        fixed
        :tab-list="tabList2"
        :current="current4"
        @click="handleClick(4, $event)"
      />
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue"
import { AtTabBar } from "@/components/index"
import { Page, Panel, ExampleItem } from '../../components/demo-page'

import "./index.scss"

export default defineComponent({
  name: "TabbarDemo",

  components: {
    AtTabBar,
    Page,
    Panel,
    ExampleItem
  },

  setup() {

    const state = reactive({
      current1: 0,
      current2: 0,
      current3: 0,
      current4: 0,
      current5: 0
    })

    const tabList1 = ref([
      { title: '待办事项', text: 8 },
      { title: '拍照' },
      { title: '通讯录', dot: true }
    ])

    const tabList2 = ref([
      { title: '待办事项', iconType: 'bullet-list', text: 'new' },
      { title: '拍照', iconType: 'camera' },
      { title: '文件夹', iconType: 'folder', text: '100', max: 99 }
    ])

    const tabList3 = ref([
      {
        title: '领取中心',
        image:
          'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        selectedImage:
          'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
        text: 'new'
      },
      {
        title: '找折扣',
        image:
          'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png'
      },
      {
        title: '领会员',
        image:
          'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        text: '100',
        max: 99
      }
    ])

    function handleClick(num, value) {
      state[`current${num}`] = value
    }

    return {
      ...toRefs(state),
      tabList1,
      tabList2,
      tabList3,
      handleClick
    }
  }
})
</script>
