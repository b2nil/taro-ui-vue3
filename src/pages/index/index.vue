<template>
  <view class="index">
    <at-button type="primary" @tap="handleClick" loading> 主操作: {{ msg }} </at-button>
    <at-button type="secondary" @tap="handleClick" loading> 次操作 </at-button>
    <at-button type="primary" disabled> 不可操作 </at-button>
    <at-button @tap="handleClick" loading> 默认操作 </at-button>
    <at-button type="primary" openType="share"> 分享 </at-button>
    <at-fab>at-fat</at-fab>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'

import AtButton from '../../components/button'
import AtLoading from '../../components/loading'
import AtFab from '../../components/fab'

export default {
  components: {
    AtButton,
    AtLoading,
    AtFab
  },
  setup() {
    const msg = ref('Hello world')

    function handleClick() {
      console.log('msg: ', msg.value)
    }
    function onShareAppMessage(res) {
      if (res.from == 'button') {
        console.log(res.target)
      }
      return {
        title: '分享测试',
        path: '/pages/index/index?id=124'
      }
    }
    return {
      msg,
      handleClick
    }
  }
}
</script>

<style lang="scss">
.at-button {
  margin: 20px !important;
}
</style>
