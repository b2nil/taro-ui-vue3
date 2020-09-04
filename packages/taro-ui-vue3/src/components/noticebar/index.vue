<template>
  <view
    v-if="show"
    :class="rootClass"
    :style="customStyle"
  >
    <!-- close icon -->
    <view
      v-if="_close"
      class="at-noticebar__close"
      @tap="handleClose"
    >
      <text class="at-icon at-icon-close" />
    </view>

    <!-- content -->
    <view class="at-noticebar__content">
      <!-- icon -->
      <view
        v-if="icon"
        class="at-noticebar__content-icon"
      >
        <text :class="iconClass" />
      </view>

      <!-- text -->
      <view class="at-noticebar__content-text">
        <!-- default content slot -->
        <view
          :id="animElemId"
          :animation="animationData"
          :class="innerContentClass"
          :style="animationStyle"
        >
          <slot />
        </view>

        <!-- show more content -->
        <view
          v-if="_showMore"
          class="at-noticebar__more"
          @tap="onGotoMore"
        >
          <text class="text">{{ moreText }}</text>
          <view class="at-noticebar__more-icon">
            <text class="at-icon at-icon-chevron-right" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, Ref, computed, ref, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtNoticeBarProps } from 'types/noticebar'

export default defineComponent({
  name: "AtNoticebar",

  props: {
    close: { type: Boolean, default: false },
    single: Boolean,
    marquee: Boolean,
    speed: {
      type: Number as () => AtNoticeBarProps['speed'],
      default: 100
    },
    moreText: {
      type: String,
      default: '查看详情'
    },
    showMore: { type: Boolean, default: false },
    icon: String as () => AtNoticeBarProps['icon'],
    // events
    onClose: Function as unknown as () => AtNoticeBarProps['onClose'],
    onGotoMore: Function as unknown as () => AtNoticeBarProps['onGotoMore']
  },

  setup(props: AtNoticeBarProps, { slots }) {
    // @ts-ignore
    const timeout: Ref<NodeJS.Timeout | null> = ref(null)
    // @ts-ignore
    const interval: Ref<NodeJS.Timer | null> = ref(null)

    const state = reactive({
      _showMore: !props.single ? false : props.showMore,
      _close: props.marquee ? false : props.close,
      show: true,
      animElemId: `J_${Math.ceil(Math.random() * 10e5).toString(36)}`,
      animationData: {
        actions: [{}]
      },
      dura: 15,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-noticebar--marquee': props.marquee,
      'at-noticebar--weapp': props.marquee && (state.isWEAPP || state.isALIPAY),
      'at-noticebar--single': !props.marquee && props.single,
      'at-noticebar': true,
    }))

    const animationStyle = computed(() => {
      const style = {}
      if (props.marquee) {
        style['animation-duration'] = `${state.dura}s`
      }
      return style
    })

    const innerContentClass = computed(() => ({
      [`${state.animElemId}`]: props.marquee,
      'at-noticebar__content-inner': true,
    }))

    const iconClass = computed(() => ({
      [`at-icon-${props.icon}`]: props.icon,
      'at-icon': true,
    }))

    function handleClose(event: CommonEvent): void {
      state.show = false
      props.onClose && props.onClose(event)
    }

    function onGotoMore(event: CommonEvent): void {
      props.onGotoMore && props.onGotoMore(event)
    }

    onMounted(() => {
      if (!props.marquee) return
      initAnimation()
    })

    function initAnimation(): void {
      const { isWEAPP, isALIPAY } = state
      timeout.value = setTimeout(() => {
        timeout.value = null
        if (state.isWEB) {
          const elem = document.querySelector(`.${state.animElemId}`)

          if (!elem) return

          const width = elem.getBoundingClientRect().width
          state.dura = width / +props.speed!

        } else if (isWEAPP || isALIPAY) {
          const query = Taro.createSelectorQuery()
          query
            .select(`.${state.animElemId}`)
            .boundingClientRect()
            .exec(res => {
              const queryRes = res[0]
              if (!queryRes) return

              const { width } = queryRes
              const dura = width / +props.speed!

              const animation = Taro.createAnimation({
                duration: dura * 1000,
                timingFunction: 'linear'
              })

              const resetAnimation = Taro.createAnimation({
                duration: 0,
                timingFunction: 'linear'
              })

              const resetOpacityAnimation = Taro.createAnimation({
                duration: 0,
                timingFunction: 'linear'
              })

              const animBody = (): void => {
                resetOpacityAnimation.opacity(0).step()
                state.animationData = resetOpacityAnimation.export()

                setTimeout(() => {
                  resetAnimation.translateX(0).step()
                  state.animationData = resetAnimation.export()
                }, 300)

                setTimeout(() => {
                  resetOpacityAnimation.opacity(1).step()
                  state.animationData = resetOpacityAnimation.export()
                }, 600)

                setTimeout(() => {
                  animation.translateX(-width).step()
                  state.animationData = animation.export()
                }, 900)
              }
              animBody()
              interval.value = setInterval(animBody, dura * 1000 + 1000)
            })
        }
      }, 100)
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      rootClass,
      iconClass,
      innerContentClass,
      animationStyle,
      handleClose,
    }
  }
})
</script>
