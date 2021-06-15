<template>
  <view
    v-if="show"
    v-bind="$attrs"
    :class="rootClasses"
  >
    <!-- close icon -->
    <view
      v-if="close_"
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
        <text :class="iconClasses" />
      </view>

      <!-- text -->
      <view class="at-noticebar__content-text">
        <!-- default content slot -->
        <view
          :id="animationElId"
          :animation="animationData"
          :class="innerContentClasses"
          :style="animationStyle"
        >
          <slot />
        </view>

        <!-- show more content -->
        <view
          v-if="showMore_"
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
import Taro from '@tarojs/taro'
import {
  defineComponent,
  reactive,
  onMounted,
  Ref,
  computed,
  ref,
  toRefs,
  PropType,
  CSSProperties
} from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtNoticeBarProps } from "@taro-ui-vue3/types/noticebar"

const AtNoticebar = defineComponent({
  name: "AtNoticebar",

  emits: ['close', 'goto-more'],

  props: {
    close: Boolean,
    single: Boolean,
    marquee: Boolean,
    showMore: Boolean,
    speed: {
      type: Number as PropType<AtNoticeBarProps['speed']>,
      default: 100
    },
    moreText: {
      type: String,
      default: '查看详情'
    },
    icon: String as PropType<AtNoticeBarProps['icon']>
  },

  setup(props: AtNoticeBarProps, { emit }) {
    const timeout: Ref<NodeJS.Timeout | null> = ref(null)
    const interval: Ref<NodeJS.Timer | null> = ref(null)

    const state = reactive({
      dura: 15,
      show: true,
      close_: props.marquee ? false : props.close,
      showMore_: !props.single ? false : props.showMore,
      animationElId: `J_${Math.ceil(Math.random() * 10e5).toString(36)}`,
      animationData: { actions: [{}] },
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const rootClasses = computed(() => ({
      'at-noticebar': true,
      'at-noticebar--marquee': props.marquee,
      'at-noticebar--weapp': props.marquee && (!state.isWEB),
      'at-noticebar--single': !props.marquee && props.single
    }))

    const animationStyle = computed(() => {
      const style: CSSProperties = {}
      if (props.marquee) {
        style.animationDuration = `${state.dura}s`
      }
      return style
    })

    const innerContentClasses = computed(() => ({
      'at-noticebar__content-inner': true,
      [`${state.animationElId}`]: props.marquee
    }))

    const iconClasses = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon}`]: Boolean(props.icon)
    }))

    function handleClose(event: CommonEvent) {
      state.show = false
      emit('close', event)
    }

    function onGotoMore(event: CommonEvent) {
      emit('goto-more', event)
    }

    function initWebAnimation() {
      const elem = document.querySelector(`.${state.animationElId}`)

      if (!elem) return

      const width = elem.getBoundingClientRect().width
      state.dura = width / +props.speed!
    }

    function initMiniAppAnimation() {
      const query = Taro.createSelectorQuery()
      query
        .select(`.${state.animationElId}`)
        .boundingClientRect()
        .exec(res => {
          const queryRes = res[0]
          if (!queryRes) return

          const { width } = queryRes
          const dura = width / +props.speed!

          const animation = Taro.createAnimation({
            duration: dura * 1000,
          })

          const resetAnimation = Taro.createAnimation({
            duration: 0,
          })

          const resetOpacityAnimation = Taro.createAnimation({
            duration: 0,
          })

          const animateBody = () => {
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

          animateBody()
          interval.value = setInterval(animateBody, dura * 1000 + 1000)
        })
    }

    function initAnimation() {
      timeout.value = setTimeout(() => {
        timeout.value = null

        if (state.isWEB) initWebAnimation()
        else initMiniAppAnimation()
      }, 100)
    }

    onMounted(() => {
      if (!props.marquee) return
      initAnimation()
    })

    return {
      ...toRefs(state),
      ...toRefs(props),
      rootClasses,
      iconClasses,
      innerContentClasses,
      animationStyle,
      handleClose,
      onGotoMore
    }
  }
})

export default AtNoticebar
</script>
