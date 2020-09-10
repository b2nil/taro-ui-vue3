<template>
  <page header-title="Accordion 手风琴">
    <!-- 基础用法 -->
    <panel
      title="基础用法"
      no-padding
    >
      <example-item>
        <at-accordion
          title="标题一"
          :open="value1"
          @click="handleClick('value1', $event)"
        >
          <at-list :has-border="false">
            <at-list-item
              title="标题文字"
              thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
            />
            <at-list-item
              title="标题文字"
              note="描述信息"
              thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            />
          </at-list>
        </at-accordion>
        <at-accordion
          title="默认开启"
          :open="value2"
          @click="handleClick('value2', $event)"
        >
          <at-list :has-border="false">
            <at-list-item
              title="标题文字"
              thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
            />
            <at-list-item
              title="标题文字"
              note="描述信息"
              thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
            />
            <at-list-item
              title="标题文字"
              note="描述信息"
              thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            />
          </at-list>
        </at-accordion>
      </example-item>
    </panel>

    <!-- 配置图标 -->
    <panel
      title="配置图标"
      no-padding
    >
      <example-item>
        <at-accordion
          title="标题三"
          :open="value3"
          :icon="{value: 'tags', color: '#77a1fd'}"
          @click="handleClick('value3', $event)"
        >
          <at-list :has-border="false">
            <at-list-item
              title="标题文字"
              thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
            />
            <at-list-item
              title="标题文字"
              note="描述信息"
              thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
            />
          </at-list>
        </at-accordion>
      </example-item>
    </panel>

    <!-- 包含描述信息 -->
    <panel
      title="包含描述信息"
      no-padding
    >
      <example-item>
        <at-accordion
          title="标题三"
          note="描述信息"
          :open="value4"
          :icon="{value: 'tags', color: '#77a1fd'}"
          @click="handleClick('value4', $event)"
        >
          <at-list :has-border="false">
            <at-list-item
              title="标题文字"
              thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
            />
            <at-list-item
              title="标题文字"
              note="描述信息"
              thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
            />
            <at-list-item
              title="标题文字"
              note="描述信息"
              thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            />
          </at-list>
        </at-accordion>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import AtAccordion from "@/components/accordion"
import AtList from "@/components/list"
import AtListItem from "@/components/list/item"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

export default defineComponent({
  name: "AccordionDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtAccordion,
    AtList,
    AtListItem
  },

  setup() {
    const state = reactive({
      value1: false,
      value2: true,
      value3: false,
      value4: false
    })

    function handleClick(stateName, value) {
      state[stateName] = value
    }

    return {
      ...toRefs(state),
      handleClick
    }
  }
})
</script>
