<template>
  <page header-title="Button 按钮">
    <!-- 主操作 -->
    <panel title="主操作">
      <view class="btn-item">
        <at-button
          type="primary"
          @click="handleButtonClick"
        >主要操作按钮</at-button>
      </view>
      <view class="btn-item">
        <at-button
          loading
          type="primary"
          @click="handleButtonClick"
        >加载中</at-button>
      </view>
      <view class="btn-item">
        <at-button
          disabled
          type="primary"
        >不可操作</at-button>
      </view>
    </panel>

    <!-- 次要操作 -->
    <panel title="次要操作">
      <view class="btn-item">
        <at-button type="secondary">次要操作</at-button>
      </view>
      <view class="btn-item">
        <at-button
          loading
          type="secondary"
        >加载中</at-button>
      </view>
      <view class="btn-item">
        <at-button
          disabled
          type="secondary"
        >不可操作</at-button>
      </view>
    </panel>

    <!-- 次次要操作 -->
    <panel title="次次要操作">
      <view class="btn-item">
        <at-button>次次要操作</at-button>
      </view>
      <view class="btn-item">
        <at-button loading>加载中</at-button>
      </view>
      <view class="btn-item">
        <at-button disabled>不可操作</at-button>
      </view>
    </panel>

    <!-- 通栏按钮 -->
    <panel title="通栏按钮">
      <view class="btn-item">
        <at-button
          full
          type="primary"
        >主操作按钮</at-button>
      </view>
      <view class="btn-item">
        <at-button
          full
          type="secondary"
        >次操作按钮</at-button>
      </view>
      <view class="btn-item">
        <at-button full>次次操作按钮</at-button>
      </view>
      <view class="btn-item">
        <at-button
          full
          disabled
        >不可操作</at-button>
      </view>
    </panel>

    <!-- 小按钮 -->
    <panel title="小按钮">
      <view class="btn-item">
        <view class="subitem">
          <at-button
            type="primary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button
            type="secondary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button size="small">按钮</at-button>
        </view>
      </view>
      <view class="btn-item">
        <view class="subitem">
          <at-button
            loading
            type="primary"
            size="small"
          ></at-button>
        </view>
        <view class="subitem">
          <at-button
            loading
            type="secondary"
            size="small"
          ></at-button>
        </view>
        <view class="subitem">
          <at-button
            loading
            size="small"
          ></at-button>
        </view>
      </view>
      <view class="btn-item">
        <view class="subitem">
          <at-button
            disabled
            type="primary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button
            disabled
            type="secondary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button
            disabled
            size="small"
          >按钮</at-button>
        </view>
      </view>
    </panel>

    <!-- 圆角按钮 -->
    <panel title="圆角按钮">
      <view class="btn-item">
        <view class="subitem">
          <at-button
            circle
            type="primary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button
            circle
            type="secondary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button
            circle
            size="small"
          >按钮</at-button>
        </view>
      </view>
      <view class="btn-item">
        <view class="subitem">
          <at-button
            circle
            loading
            type="primary"
            size="small"
          ></at-button>
        </view>
        <view class="subitem">
          <at-button
            circle
            loading
            type="secondary"
            size="small"
          ></at-button>
        </view>
        <view class="subitem">
          <at-button
            circle
            loading
            size="small"
          ></at-button>
        </view>
      </view>
      <view class="btn-item">
        <view class="subitem">
          <at-button
            circle
            disabled
            type="primary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button
            circle
            disabled
            type="secondary"
            size="small"
          >按钮</at-button>
        </view>
        <view class="subitem">
          <at-button
            circle
            disabled
            size="small"
          >按钮</at-button>
        </view>
      </view>
    </panel>

    <!-- 微信小程序 button 属性（仅部分支持） -->
    <panel title="微信小程序 button 属性">
      <view class="btn-item">
        <at-button
          type="primary"
          openType="share"
        >分享</at-button>
      </view>
      <view class="btn-item">
        <at-button
          type="primary"
          openType="getUserInfo"
          @get-user-info="onGetUserInfo"
        >登录授权</at-button>
      </view>
      <view class="btn-item">
        <at-button
          type="secondary"
          openType="contact"
          @contact="onContact"
        >联系 Taro UI 客服</at-button>
      </view>
      <view class="btn-item">
        <at-form
          report-submit
          @submit="onSubmit"
          @reset="onReset"
        >
          <view class="btn-item">
            <at-button
              type="primary"
              formType="submit"
            >表格提交</at-button>
          </view>
          <view class="btn-item">
            <at-button
              type="secondary"
              formType="reset"
            >表格重置</at-button>
          </view>
        </at-form>
      </view>
    </panel>

    <!-- 支付宝小程序 button 属性（仅部分支持） -->
    <panel
      class="demo-button"
      title="支付宝小程序 button 属性"
      v-if="isALIPAY"
    >
      <view class="btn-item">
        <at-button
          type="primary"
          openType="share"
        >分享</at-button>
      </view>
      <view class="btn-item">
        <at-button
          type="primary"
          openType="getAuthorize"
        >登录授权</at-button>
      </view>
      <at-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <view class="btn-item">
          <at-button
            type="primary"
            formType="submit"
          >表格提交</at-button>
        </view>
        <view class="btn-item">
          <at-button
            type="secondary"
            formType="reset"
          >表格重置</at-button>
        </view>
      </at-form>
    </panel>

    <!-- 浮动按钮 -->
    <panel
      title="浮动按钮"
      v-if="!isALIPAY"
    >
      <view class="at-article__p">右侧是浮动操作按钮👉</view>
      <view class="btn-demo-fab">
        <at-fab @click="handleButtonClick">
          <text class="at-fab__icon at-icon at-icon-menu"></text>
        </at-fab>
      </view>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import Taro from "@tarojs/taro"
import AtButton from "@/components/button"
import AtFab from "@/components/fab"
import AtForm from "@/components/form"
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default defineComponent({
  name: "ButtonDemo",

  components: {
    Page,
    Panel,
    ExampleItem,
    AtButton,
    AtFab,
    AtForm
  },

  setup() {

    const state = reactive({
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
    })

    function handleButtonClick() {
      const content = [...arguments].find(item => typeof item === 'string')
      if (state.isWEAPP) {
        Taro.showModal({
          content: content || '您点击了按钮！',
          showCancel: false
        })
      }

      if (state.isWEB) {
        alert(content || '您点击了按钮！')
      }
    }

    function onShareAppMessage() {
      return {
        title: 'Taro UI',
        path: '/pages/index/index',
        imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
      }
    }

    function onContact(event) {
      Taro.showToast({
        title: `呼起客服回调: ${event.detail}`
      })
    }

    function onSubmit(event) {
      Taro.showModal({
        content: `submit event detail: ${JSON.stringify(event.detail)}`,
        showCancel: false
      })
    }

    function onReset(event) {
      Taro.showModal({
        content: `reset event detail: ${JSON.stringify(
          event.detail || '无数据'
        )}`,
        showCancel: false
      })
    }

    function onGetUserInfo(event) {
      Taro.showModal({
        content: `getUserInfo event detail: ${JSON.stringify(event.detail)}`
      })
    }

    function onOpenSetting(event) {
      Taro.showToast({
        title: `onOpenSetting: ${event.detail}`
      })
    }


    return {
      ...toRefs(state),
      handleButtonClick,
      onShareAppMessage,
      onContact,
      onSubmit,
      onReset,
      onGetUserInfo,
      onOpenSetting
    }
  }
})
</script>
