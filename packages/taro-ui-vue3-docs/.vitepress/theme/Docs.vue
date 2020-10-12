<template>
  <div
    id="app"
    class="app"
  >
    <nav-bar collapse />

    <div class="at-container row">
      <div class="at-sidebar col-sm-24 col-md-6 col-lg-4">
        <side-bar :data="data" />
      </div>

      <div
        :ref="(e) => atMarkdownRef = e"
        :class="`at-markdown col-sm-24 col-md-18 col-lg-20 ${
          curDemoPath ? 'at-markdown--demo' : ''
        }`"
      >
        <div
          class="qrcode-menu"
          v-if="curDemoPath"
          :style="{right: '420px'}"
        >
          <div class="qrcode-container">
            <img
              :src="qrCodeImg"
              alt="qrcode"
            />
            <div class="qrcode-modal">
              <h6>扫描二维码查看演示效果</h6>
              <div class="code-image">
                <QrcodeVue
                  :value="getIframeURL()"
                  size="140"
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

        <Content />

        <div
          v-if="curDemoPath"
          id="J-demo-frame"
          :class="fixed ? 'demo-frame fixed' : 'demo-frame'"
        >
          <iframe
            v-if="curDemoPath"
            :src="getIframeURL()"
            :frame-border="0"
            :style="{ borderWidth: '0px' }"
          />
          <iframe
            v-else
            src="./h5/index.html"
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

<script>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vitepress'
import QrcodeVue from "./components/QrcodeVue.js"
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'

import hljs from "highlight.js"

import navsConfig from '../nav.config.json'
import { default as pathMap } from '../page-route'
import qrCodeImg from '../../assets/qr_code.png'
import wxAppLogo from '../../assets/wxapp-logo.png'
import qrCodeWxApp from '../../assets/wxapp.jpg'

import './style/docs.scss'

export default {
  name: "Docs",

  components: {
    NavBar,
    SideBar,
    QrcodeVue
  },

  mounted() {
    hljs.initHighlightingOnLoad()
  },

  setup(props) {
    const fixed = ref(false)
    const atMarkdownRef = ref(null)
    const data = ref(navsConfig.components)
    const route = useRoute()
    const curDemoPath = computed(() => getDemoPath())

    watch(() => curDemoPath, () => {
      atMarkdownRef.value.scrollTo(0, 0)
    })

    function getDemoPath() {
      const pathname = route.path.replace(".html", "")
      const result = pathname.split('/')
      const curDemoPath = result.length > 1 ? pathMap[result[3]] : ''
      return curDemoPath
    }

    function getIframeURL() {
      // const host = process.env.NODE_ENV !== 'production' ? 'http://localhost:10086' : 'http://taro-ui-vue3-demo.com'
      const host = 'https://taro-ui.aotu.io/h5/index.html#'
      const curDemoPath = getDemoPath()
      return `${host}/pages/${curDemoPath}/index`
    }

    return {
      data,
      fixed,
      curDemoPath,
      getIframeURL,
      qrCodeImg,
      wxAppLogo,
      qrCodeWxApp,
      atMarkdownRef
    }
  }
}
</script>
