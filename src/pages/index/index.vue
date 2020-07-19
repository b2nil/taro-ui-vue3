<template>
  <view class="index">
    <at-button type="primary" @tap="handleClick" loading> 主操作: {{ msg }} </at-button>
    <at-button type="secondary" @tap="handleClick" loading> 次操作 </at-button>
    <at-button type="primary" disabled> 不可操作 </at-button>
    <at-button @tap="handleClick" loading> 默认操作 </at-button>
    <at-button type="primary" openType="share"> 分享 </at-button>
    <view class="wrapper">
      <at-fab class="avartar">at-fat</at-fab>
      <at-avatar class="avartar" size="normal" text="T"></at-avatar>
      <at-avatar class="avartar" size="large" text="A" circle></at-avatar>
      <at-avatar class="avartar" size="large" :image="imgSrc" circle></at-avatar>
    </view>
    <view class="wrapper">
      <at-accordion title="基础用法" note="这是一个测试" :open="isOpen" @tap="onClick" hasBorder>
        <at-list>
          <at-list-item
            title="标题文字"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <at-list-item
            hasBorder
            title="标题文字"
            note="描述信息，这里是对标题进行补充的地方"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </at-list>
      </at-accordion>
    </view>
  </view>
</template>

<script>
import { ref, computed } from 'vue'
import './index.scss'

import AtButton from '../../components/button'
import AtLoading from '../../components/loading'
import AtFab from '../../components/fab'
import AtAvatar from '../../components/avatar'
import AtAccordion from '../../components/accordion'
import AtList from '../../components/list'
import AtListItem from '../../components/list/item'

export default {
  components: {
    AtButton,
    AtLoading,
    AtFab,
    AtAvatar,
    AtAccordion,
    AtList,
    AtListItem
  },
  setup() {
    const msg = ref('Hello world')
    const imgSrc = ref('https://avatars1.githubusercontent.com/u/16893585?s=460&u=d96ed6c4dc00f6fba5c2f42cf7595df693e6f1db&v=4')
    // const avatarStyle = computed(() => {})
    const isOpen = ref(false)

    function handleClick() {
      console.log('msg: ', msg.value)
    }
    function onClick() {
      isOpen.value = !isOpen.value
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
      imgSrc,
      isOpen,
      handleClick,
      onClick
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  margin: 30px;
  align-items: center;
  align-content: center;
}
.at-button {
  margin: 20px !important;
}
.avartar {
  display: flex;
  margin: 20px;
  float: left;
  .at-avatar {
    &__text {
      text-align: center !important;
    }
  }
}
.acc {
  color: black;
  background-color: cadetblue;
}
</style>
