<template>
  <page title="Grid 栅格">
    <panel title="正方形案例">
      <example-item>
        <at-grid
          :data="data"
          @click="handleClick"
        />
      </example-item>
    </panel>
    <panel title="矩形案例">
      <example-item>
        <at-grid
          mode="rect"
          :data="[
            ...data,
            {
                image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '手机馆'
            }
          ]"
          @click="handleClick"
        ></at-grid>
      </example-item>
    </panel>
    <panel title="无边框案例">
      <example-item>
        <at-grid
          mode="rect"
          :has-border="false"
          :data="[
            ...data,
            {
                image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '手机馆'
            }
          ]"
          @click="handleClick"
        ></at-grid>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Taro from '@tarojs/taro'
import AtGrid from '@/components/grid'
import { Page, Panel, ExampleItem } from '../../components/demo-page'

export default defineComponent({
  name: "GridDemo",
  
  components: {
    Page,
    Panel,
    ExampleItem,
    AtGrid
  },

  setup() {
    const data = ref([
      {
        image:
          'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '领取中心'
      },
      {
        image:
          'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
        value: '找折扣'
      },
      {
        image:
          'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        value: '领会员'
      },
      {
        image:
          'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
        value: '新品首发'
      },
      {
        image:
          'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
        value: '领京豆'
      },
      {
        value: '支持Icon',
        iconInfo: {
          size: 30,
          color: 'red',
          value: 'bookmark'
        },
        url: '支持自定义字段'
      }
    ])

    function handleClick(value, index) {
      Taro.showModal({
        title: '提示',
        content: `Value: ${JSON.stringify(value)}, Index: ${index}`,
        showCancel: false
      })
    }

    return {
      data,
      handleClick
    }
  }
})
</script>