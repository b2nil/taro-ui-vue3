<template>
  <page header-title="List 列表">
    <panel
      no-padding
      title="基本用法"
    >
      <example-item>
        <at-list>
          <at-list-item
            title="标题文字"
            @click="handleClick"
          />
          <at-list-item
            title="标题文字"
            arrow="right"
          />
          <at-list-item
            title="标题文字"
            extraText="详细信息"
          />
          <at-list-item
            disabled
            title="禁用状态"
            extraText="详细信息"
          />
        </at-list>
      </example-item>
    </panel>
    <panel
      no-padding
      title="包含描述信息"
    >
      <example-item>
        <at-list>
          <at-list-item
            title="标题文字"
            note="描述信息"
          />
          <at-list-item
            title="标题文字"
            note="描述信息"
            arrow="right"
          />
          <at-list-item
            arrow="right"
            note="描述信息"
            title="我是一个很长很长很长的标题文字"
            extraText="详细信息详细信息详细信息详细信息"
          />
        </at-list>
      </example-item>
    </panel>
    <panel
      no-padding
      title="包含图片"
    >
      <example-item>
        <at-list>
          <at-list-item
            title="标题文字"
            arrow="right"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <at-list-item
            title="标题文字"
            note="描述信息"
            arrow="right"
            thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
          />
          <at-list-item
            title="标题文字"
            note="描述信息"
            extraText="详细信息"
            arrow="right"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </at-list>
      </example-item>
    </panel>
    <panel
      no-padding
      title="支持图标(不能与thumb同时存在)"
    >
      <example-item>
        <at-list>
          <at-list-item
            title="标题文字"
            note="描述信息"
            arrow="right"
            :iconInfo="{
              size: 25,
              color: '#78A4FA',
              value: 'calendar'
            }"
          />
          <at-list-item
            title="标题文字"
            note="描述信息"
            extraText="详细信息"
            arrow="right"
            :iconInfo="{
              size: 25,
              color: '#FF4949',
              value: 'bookmark'
            }"
          />
        </at-list>
      </example-item>
    </panel>
    <panel
      no-padding
      title="无边框"
    >
      <example-item>
        <at-list>
          <at-list-item
            is-switch
            title="标题文字"
            :has-border="false"
            @switch-change="handleChange"
          />
          <at-list-item
            is-switch
            title="标题文字"
            :has-border="false"
            @switch-change="handleChange"
          />
        </at-list>
      </example-item>
    </panel>
    <panel
      no-padding
      title="Switch 按钮列表"
    >
      <example-item>
        <at-list>
          <at-list-item
            title="标题文字"
            is-switch
            @click="handleClick"
            @switch-change="handleChange"
          />
          <at-list-item
            is-switch
            disabled
            switch-is-check
            title="禁用状态"
            @switch-change="handleChange"
          />
          <at-list-item
            is-switch
            switch-is-check
            title="标题文字"
            @switch-change="handleChange"
          />
        </at-list>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Taro from "@tarojs/taro"
import AtList from "@/components/list"
import AtListItem from "@/components/list/item"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

export default defineComponent({
  name: "ListDemo",
  
  components: {
    Page,
    Panel,
    ExampleItem,
    AtList,
    AtListItem,
  },

  setup() {
    function handleChange(e) {
      Taro.showToast({
        title: `Change Switch: ${JSON.stringify(e.detail)}`,
        icon: 'none'
      })
    }

    function handleClick(e) {
      Taro.showToast({
        title: `Click Item: ${JSON.stringify(e.detail)}`,
        icon: 'none'
      })
    }

    return {
      handleChange,
      handleClick
    }
  }
})
</script>
