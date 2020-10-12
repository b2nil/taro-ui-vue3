<template>
  <div
    id="J-page-header"
    :class="rootClasses"
    :style="rootStyle"
  >
    <div class="nav-container">
      <div class="nav-left">
        <div class="logo">
          <a @click="handleRedirect('', siteData.base, $event)">
            <img
              :src="taroUIvue3Logo"
              alt="taro ui vue3 logo"
              class="logo-img"
            />
            <span>Taro UI Vue3</span>
          </a>
        </div>
        <i
          class="at-icon at-icon-menu nav-icon"
          @click="toggleMenu"
        />
      </div>

      <div
        class="nav-right"
        :style="{ height: toggle ? '0px' : '100px' }"
      >
        <ul class="navbar">
          <li>
            <a
              :class="activeClass('introduction')"
              id="introduction"
              :href="`${siteData.base}docs/introduction.html`"
              @click="handleRedirect('introduction', `${siteData.base}docs/introduction.html`, $event)"
            >组件</a>
          </li>
          <li>
            <a
              :class="activeClass('resource')"
              id="resource"
              :href="`${siteData.base}docs/resource.html`"
              @click="handleRedirect('resource', `${siteData.base}docs/resource.html`, $event)"
            >设计资源</a>
          </li>
          <li>
            <a
              target="__blank"
              href="https://nervjs.github.io/taro-ui-theme-preview/"
            >主题生成器</a>
          </li>
          <li>
            <a
              target="__blank"
              href="https://aotu.io/"
            >关于我们</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useSiteData } from "vitepress"
import { computed, onMounted, ref, watch } from 'vue'

import taroUIvue3Logo from '../../../assets/logo-taro-ui-vue3.png'
import "./NavBar.scss"

export default {
  name: "NavBar",

  props: {
    collapse: Boolean
  },

  setup(props, { attrs }) {
    const siteData = useSiteData()
    const route = useRoute()
    const currentRoute = ref(route.path)
    const toggle = ref(true)
    const active = ref(false)
    const id = ref('introduction')
    const routerLinks = ref([])

    const rootClasses = computed(() => ({
      'page-header': true,
      'collapse': !!props.collapse
    }))

    const activeClass = computed(() => (activeID) => {
      if (route.path.includes('resource')) {
        return {
          'router-link-active': activeID === 'resource' && route.path.includes('resource')
        }
      }

      if (route.path.includes('introduction')) {
        return {
          'router-link-active': activeID === 'introduction' && route.path.includes('introduction')
        }
      }

      id.value = 'introduction'
      active.value = route.path !== siteData.value.base
      return {
        'router-link-active': active.value && activeID === id.value && !route.path.endsWith('resource.html')
      }
    })

    const rootStyle = computed(() => attrs.style
      ? attrs.style
      : {}
    )

    function handleRedirect(classID, to, e) {
      id.value = e.target.id
      active.value = id.value === classID

      if (to === siteData.value.base || currentRoute.value === siteData.value.base) {
        window.location.href = to
      }

      currentRoute.value = to
    }

    function toggleMenu() {
      toggle.value = !toggle.value
    }

    function goToGuide(e) {
      e.preventDefault()
    }

    function goToSource(e) {
      e.preventDefault()
    }

    return {
      siteData,
      rootClasses,
      rootStyle,
      toggle,
      toggleMenu,
      goToGuide,
      goToSource,
      taroUIvue3Logo,
      activeClass,
      handleRedirect,
      currentRoute
    }
  }
}
</script>
