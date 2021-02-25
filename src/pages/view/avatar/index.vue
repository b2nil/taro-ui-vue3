<template>
  <page header-title="Avatar 头像">
    <panel title="圆形头像">
      <example-item>
        <view class="subitem">
          <at-avatar
            cirle
            size="small"
            :image="avatarImg"
          />
        </view>
        <view class="subitem">
          <at-avatar
            cirle
            :image="avatarImg"
          />
        </view>
        <view class="subitem">
          <at-avatar
            cirle
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
            cirle
            size="small"
            text="凹"
          />
        </view>
        <view class="subitem">
          <at-avatar
            cirle
            text="凹"
          />
        </view>
        <view class="subitem">
          <at-avatar
            cirle
            size="large"
            text="凹"
          />
        </view>
      </example-item>
    </panel>
    <panel title="圆角矩形头像（支持文本）">
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
    <panel title="openData 头像（仅微信小程序支持）">
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
import './index.scss'

export default defineComponent({
  name: "AvatarDemo",
  setup() {
    const avatarImg =
      'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'

    return {
      avatarImg
    }
  }
})
</script>