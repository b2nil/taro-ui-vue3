<template>
  <page header-title="Avatar 头像">
    <panel title="圆形头像">
      <example-item>
        <view class="subitem">
          <at-avatar
            circle
            size="small"
            :image="avatarImg"
          />
        </view>
        <view class="subitem">
          <at-avatar
            circle
            :image="avatarImg"
          />
        </view>
        <view class="subitem">
          <at-avatar
            circle
            size="large"
            :image="avatarImg"
          />
        </view>
      </example-item>
    </panel>

    <panel title="圆角矩形头像">
      <example-item>
        <view class="subitem">
          <at-avatar
            size="small"
            :image="avatarImg"
          />
        </view>
        <view class="subitem">
          <at-avatar :image="avatarImg" />
        </view>
        <view class="subitem">
          <at-avatar
            size="large"
            :image="avatarImg"
          />
        </view>
      </example-item>
    </panel>

    <panel title="圆形头像（支持文本）">
      <example-item>
        <view class="subitem">
          <at-avatar
            circle
            size="small"
            text="凹"
          />
        </view>
        <view class="subitem">
          <at-avatar
            circle
            text="凹"
          />
        </view>
        <view class="subitem">
          <at-avatar
            circle
            size="large"
            text="凹"
          />
        </view>
      </example-item>
    </panel>

    <panel
      title="圆角矩形头像（支持文本）"
      class="panel__content"
    >
      <example-item>
        <view class="subitem">
          <at-avatar
            size="small"
            text="凹"
          />
        </view>
        <view class="subitem">
          <at-avatar text="凹" />
        </view>
        <view class="subitem">
          <at-avatar
            size="large"
            text="凹"
          />
        </view>
      </example-item>
    </panel>

    <panel
      v-if="isWeapp"
      title="openData 头像（仅微信小程序支持）"
      class="panel__content"
    >
      <example-item>
        <view class="subitem">
          <at-avatar
            size="small"
            :open-data="{ type: 'userAvatarUrl' }"
          />
        </view>
        <view class="subitem">
          <at-avatar :open-data="{ type: 'userAvatarUrl' }" />
        </view>
        <view class="subitem">
          <at-avatar
            size="large"
            :open-data="{ type: 'userAvatarUrl' }"
          />
        </view>
        <view class="subitem">
          <at-avatar
            circle
            size="large"
            :open-data="{ type: 'userAvatarUrl' }"
          />
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { AtAvatar } from "taro-ui-vue3"
import Taro from "@tarojs/taro"
import { Page, Panel, ExampleItem } from "@/components/index"
import "./index.scss"

export default defineComponent({
  name: "AvatarDemo",

  components: {
    AtAvatar,
    Page,
    Panel,
    ExampleItem,
  },

  setup() {
    const avatarImg =
      "http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"

    const isWeapp = computed(() => {
      return Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    })

    return {
      avatarImg,
      isWeapp,
    }
  }
})
</script>
