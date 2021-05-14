<template>
  <div
    id="app"
    class="app"
  >
    <nav-bar collapse />

    <div class="at-container row">
      <div class="at-sidebar col-sm-8 col-md-6 col-lg-4">
        <side-bar />
      </div>

      <div
        :ref="(e) => atMarkdownRef = e"
        class="at-markdown col-sm-24 col-md-18 col-lg-20"
        :class="mdDemoClass"
      >
        <div
          class="qrcode-menu"
          v-if="demoPath"
          :style="{right: '420px'}"
        >
          <div class="qrcode-container">
            <img
              :src="qrCodeImg"
              alt="qrcode"
            />
            <div class="qrcode-modal">
              <h6>扫描二维码查看 H5 演示效果</h6>
              <div class="code-image">
                <QrcodeVue
                  :value="getIframeURL()"
                  renderAs="svg"
                  :size="140"
                />
              </div>
            </div>
          </div>

          <div class="wxapp-container">
            <img
              :src="wxAppLogo"
              alt="qrcode"
            />
            <div class="qrcode-modal">
              <h6>扫描二维码查看演示效果</h6>
              <h6>taro-ui, 非 taro-ui-vue3</h6>
              <div class="code-image">
                <img
                  class="wxapp-qrcode"
                  :src="qrCodeWxApp"
                  alt="wxapp"
                />
              </div>
            </div>
          </div>
        </div>

        <Content class="theme" />

        <div
          v-if="demoPath"
          id="J-demo-frame"
          class="demo-frame"
        >
          <iframe
            v-if="demoPath"
            :src="getIframeURL()"
            :frame-border="0"
            :style="{ borderWidth: '0px' }"
          />
          <iframe
            v-else
            src="https://b2nil.github.io/taro-ui-vue3-demo/#/index"
            :frame-border="0"
            :style="{ borderWidth: '0px' }"
          />
          <div class="iphone-frame" />
        </div>
      </div>
    </div>
    <Debug />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref } from 'vue'
import QrcodeVue from "./components/QrcodeVue.vue"
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'

import { useCustomRoute } from './composables/url'
import qrCodeImg from '../../assets/qr_code.png'
import wxAppLogo from '../../assets/wxapp-logo.png'
import qrCodeWxApp from '../../assets/wxapp.jpg'

import './style/docs.scss'

export default defineComponent({
  name: "Docs",

  components: {
    NavBar,
    SideBar,
    QrcodeVue
  },

  setup() {
    const fixed = ref(false)
    const atMarkdownRef = ref<null | HTMLElement>(null)
    const { path, demoPath } = useCustomRoute()

    const mdDemoClass = computed(() => ({
      'at-markdown--demo': Boolean(demoPath.value)
    }))

    watch(() => path, (path, prevPath) => {
      if (prevPath !== path) {
        atMarkdownRef.value!.scrollTop = 0
      }
    })

    function getIframeURL() {
      const host = 'https://b2nil.github.io/taro-ui-vue3-demo/#'
      return `${host}/${demoPath.value}`
    }

    return {
      fixed,
      demoPath,
      mdDemoClass,
      getIframeURL,
      qrCodeImg,
      wxAppLogo,
      qrCodeWxApp,
      atMarkdownRef
    }
  }
})
</script>
