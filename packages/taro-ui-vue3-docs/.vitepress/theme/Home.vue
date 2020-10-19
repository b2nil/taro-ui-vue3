<template>
  <div class="wrapper">
    <nav-bar />

    <!-- /* Banner */ -->
    <div class="bg-container">
      <div class="bg-top-border"></div>
      <div class="bg-top-shadow"></div>
      <div class="bg-bottom-border"></div>
      <div class="bg-bottom-shadow"></div>
      <div class="info-container">
        <div class="img-container"></div>
        <h1>Taro UI Vue3</h1>
        <div class="info-desc">基于 Taro 开发，采用 Vue 3.0 重写的 Taro UI 组件库</div>
        <div class="btn-container">
          <a
            class="btn btn-start btn-start--pc"
            @click="goToGuide"
          >开始使用</a>
          <a
            class="btn btn-start btn-start--h5"
            href="https://b2nil.github.io/taro-ui-vue3-demo/index"
          >开始使用</a>
          <a
            class="btn btn-github"
            href="https://github.com/b2nil/taro-ui-vue3"
          >GitHub</a>
        </div>
      </div>
    </div>

    <!-- /* Features */ -->
    <div class="feature-wrapper">
      <div class="main-title">特性</div>
      <div class="panel-container">
        <div class="panel">
          <div class="panel-img">
            <img :src="panelImg1" />
          </div>
          <div class="panel-title">多端适配</div>
          <div class="panel-desc">一套组件可以在微信小程序 / H5 / 百度小程序 等多端适配运行</div>
        </div>
        <div class="panel">
          <div class="panel-img">
            <img :src="panelImg2" />
          </div>
          <div class="panel-title">组件丰富</div>
          <div class="panel-desc">提供丰富的基础组件，覆盖大部分使用场景，满足各种功能需求</div>
        </div>
        <div class="panel">
          <div class="panel-img">
            <img :src="panelImg3" />
          </div>
          <div class="panel-title">按需引用</div>
          <div class="panel-desc">可按需使用独立的组件，不必引入所有文件，可最小化的注入到项目中</div>
        </div>
        <div class="panel">
          <div class="panel-tip-container">
            <img :src="panelTip" />
          </div>
          <div class="panel-img">
            <img :src="panelImg4" />
          </div>
          <div class="panel-title">多套主题</div>
          <div class="panel-desc">提供默认的蓝色主题、红色主题以及自定义主题，后期会新增渐变色主题</div>
        </div>
      </div>
    </div>

    <page-footer />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useSiteData } from "vitepress"

import NavBar from './components/NavBar.vue'
import PageFooter from './components/PageFooter.vue'
import panelImg1 from '../../assets/panel-img1.png'
import panelImg2 from '../../assets/panel-img2.png'
import panelImg3 from '../../assets/panel-img3.png'
import panelImg4 from '../../assets/panel-img4.png'
import panelTip from '../../assets/panel-tip.png'
import './style/index.scss'

export default {
  name: 'Home',

  components: {
    NavBar,
    PageFooter
  },

  setup() {
    const siteData = useSiteData()

    function goToGuide(e) {
      e.preventDefault()
      window.location.href = siteData.value.base + 'docs/introduction.html'
    }

    function goToSource(e) {
      e.preventDefault()
    }

    onMounted(() => {
      const header = document.getElementById('J-page-header')
      // const panels = document.getElementsByClassName('panel')
      window.addEventListener(
        'scroll',
        () => {
          if (window.scrollY > 60) {
            header.classList.add('fixed')
          } else {
            header.classList.remove('fixed')
          }
        },
        100
      )
    })

    return {
      panelImg1,
      panelImg2,
      panelImg3,
      panelImg4,
      panelTip,
      goToGuide,
      goToSource
    }
  }
}
</script>
