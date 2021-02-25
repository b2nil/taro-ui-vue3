<template>
  <page header-title="Badge 徽标">
    <panel title="数字">
      <view class="badge-item">
        <view class="subitem">
          <at-badge
            :value="10"
            :max-value="99"
          >
            <at-button
              size="small"
              cirle
            >按钮</at-button>
          </at-badge>
        </view>
        <view class="subitem">
          <at-badge
            :value="100"
            :max-value="99"
          >
            <at-button size="small">按钮</at-button>
          </at-badge>
        </view>
      </view>
    </panel>
    <panel title="小红点">
      <view class="badge-item">
        <view class="subitem">
          <at-badge dot>
            <at-button
              circle
              size="small"
            >按钮</at-button>
          </at-badge>
        </view>

        <view class="subitem">
          <at-badge dot>
            <at-button size="small">按钮</at-button>
          </at-badge>
        </view>
      </view>
    </panel>
    <panel title="文本">
      <view class="badge-item">
        <view class="subitem">
          <at-badge value="NEW">
            <at-button
              circle
              size="small"
            >按钮</at-button>
          </at-badge>
        </view>
        <view class="subitem">
          <at-badge value="NEW">
            <at-button size="small">按钮</at-button>
          </at-badge>
        </view>
      </view>
    </panel>
    <panel title="省略号">
      <view class="badge-item">
        <view class="subitem">
          <at-badge :value="dot">
            <at-button
              circle
              size="small"
            >按钮</at-button>
          </at-badge>
        </view>
        <view class="subitem">
          <at-badge :value="dot">
            <at-button size="small">按钮</at-button>
          </at-badge>
        </view>
      </view>
    </panel>
  </page>
</template>

<script lang="ts">
import './index.scss'

export default defineComponent({
  name: "BadgeDemo",

  setup() {
    const dot = '···'

    return {
      dot
    }
  }
})
</script>
