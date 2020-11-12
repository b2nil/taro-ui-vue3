<template>
  <view
    :class="rootClasses"
    :style="rootStyle"
  >
    <view class="doc-header">
      <view class="doc-header__title">{{ headerTitle }}</view>
    </view>

    <view
      class="doc-body"
      :style="$attrs.style"
    >
      <slot />
    </view>

    <slot name="extra" />

    <nav-button
      to="back"
      btn-icon="chevron-left"
      :style="{ bottom: `${bottomHeight}px` }"
    />

    <nav-button
      id="home"
      to="home"
    />
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs } from "vue"
import Taro from "@tarojs/taro"
import NavButton from "./NavButton.vue"

export default defineComponent({
  name: "Page",

  components: {
    NavButton
  },

  props: {
    headerTitle: {
      type: String,
      default: '标题',
      required: true
    }
  },

  setup(props, { slots, attrs }) {
    const bottomHeight = ref(0)

    const rootClasses = computed(() => ({
      'page': true,
      [`${attrs.class}`]: Boolean(attrs.class)
    }))

    const rootStyle = computed(() => {
      const deviceWidth = Taro.getSystemInfoSync().windowWidth
      return Taro.getEnv() === Taro.ENV_TYPE.WEB
        ? {
          width: deviceWidth >= 1024 ? '75%' : '100%',
          margin: 'auto'
        }
        : null
    })

    onMounted(() => {
      const selector = Taro.createSelectorQuery()

      setTimeout(() => {
        selector
          .select('#home')
          .boundingClientRect(res => {
            bottomHeight.value = res.height + 30
          })
          .exec()
      }, 300)
    })

    return {
      ...toRefs(props),
      bottomHeight,
      rootClasses,
      rootStyle
    }
  }
})
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.doc-header {
  display: flex;
  align-items: center;
  padding: 60px;
  height: 180px;

  &__title {
    position: relative;
    height: 90px;
    color: #333;
    font-size: 40px;
    font-weight: bold;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      display: inline-block;
      width: 120px;
      height: 2px;
      border-radius: 1px;
      background-color: #6190e8;
    }
  }
}

.doc-body {
  min-height: calc(100vh - 180px);
  background: #fff;
  box-shadow: 0 26px 163px 0 rgba(0, 0, 0, 0.11);
  padding-bottom: 60px;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 60px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 60px);

  .panel {
    margin: 32px 0 56px;

    &__title {
      position: relative;
      margin-bottom: 50px;
      padding-left: 50px;
      color: #6a6a77;
      font-size: 32px;
      font-weight: bold;
      line-height: 1.5;

      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 24px;
        top: 50%;
        margin-top: -20px;
        width: 2px;
        height: 40px;
        background-color: #6190e8;
        box-shadow: 0 7px 12px 0 rgba(97, 144, 232, 0.2);
        border-radius: 1px;
      }
    }

    &__content {
      padding: 0 20px;

      &.no-padding {
        padding: 0;
      }
    }
  }
}
</style>