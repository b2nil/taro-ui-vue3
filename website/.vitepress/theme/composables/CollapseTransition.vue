<template>
  <div
    class="collapse-transition"
    :style="{ overflow: 'hidden' }"
    :ref="(e) => selfRef = e"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted, onUnmounted } from 'vue'

import "./animation.scss"

const ANIMATION_DURATION = 300

export default defineComponent({
  name: "CollapseTransition",

  props: {
    isShow: Boolean,
  },

  setup(props) {

    const selfRef = ref<HTMLElement | null>(null)
    const enterTimer = ref<NodeJS.Timeout | null>(null)
    const leaveTimer = ref<NodeJS.Timeout | null>(null)

    onMounted(() => {
      beforeEnter()
      if (props.isShow) {
        enter()
      }
    })

    onUnmounted(() => {
      beforeLeave()
      leave()
    })

    watch(() => props.isShow, (isShow, prevIsShow) => {
      if (isShow !== prevIsShow) {
        triggerChange(isShow)
      }
    })

    function triggerChange(isShow: boolean) {
      clearTimeout(enterTimer.value!)
      clearTimeout(leaveTimer.value!)

      if (isShow) {
        beforeEnter()
        enter()
      } else {
        beforeLeave()
        leave()
      }
    }

    function beforeEnter() {
      const el = selfRef.value
      if (!el) return
      // prepare
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow
      el.style.height = '0'
      el.style.paddingTop = '0'
      el.style.paddingBottom = '0'
    }

    function enter() {
      const el = selfRef.value
      if (!el) return
      // start
      el.style.display = 'block'
      if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`
        el.style.paddingTop = el.dataset.oldPaddingTop!
        el.style.paddingBottom = el.dataset.oldPaddingBottom!
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop!
        el.style.paddingBottom = el.dataset.oldPaddingBottom!
      }

      el.style.overflow = 'hidden'

      enterTimer.value = setTimeout(() => afterEnter(), ANIMATION_DURATION)
    }

    function afterEnter() {
      const el = selfRef.value
      if (!el) return
      el.style.display = 'block'
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow!
    }

    function beforeLeave() {
      const el = selfRef.value

      if (!el) return

      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.display = 'block'
      if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`
      }
      el.style.overflow = 'hidden'
    }

    function leave() {
      const el = selfRef.value
      if (!el) return

      if (el.scrollHeight !== 0) {
        el.style.height = '0'
        el.style.paddingTop = '0'
        el.style.paddingBottom = '0'
      }
      leaveTimer.value = setTimeout(() => afterLeave(), ANIMATION_DURATION)
    }

    function afterLeave() {
      const el = selfRef.value
      if (!el) {
        return
      }

      el.style.display = 'none'
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow!
      el.style.paddingTop = el.dataset.oldPaddingTop!
      el.style.paddingBottom = el.dataset.oldPaddingBottom!
    }

    return {
      selfRef
    }
  }
})
</script>
