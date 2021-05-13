<template>
  <div
    id="J-page-header"
    :class="rootClasses"
    v-bind="$attrs"
  >
    <div class="nav-container">
      <div class="nav-left">
        <div class="logo">
          <a @click="handleRedirect('', baseURL)">
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
              :class="genActiveClass('introduction')"
              id="introduction"
              @click="handleRedirect('introduction', withBase(`docs/introduction.html`))"
            >组件</a>
          </li>
          <li>
            <a
              :class="genActiveClass('resource')"
              id="resource"
              @click="handleRedirect('resource', withBase(`docs/resource.html`))"
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

<script lang="ts">
import { useRouter } from "vitepress"
import { computed, onMounted, ref, watch, defineComponent } from 'vue'
import { useURL } from "../composables/url"

import taroUIvue3Logo from '../../../assets/logo-taro-ui-vue3.png'
import "./NavBar.scss"

export default defineComponent({
  name: "NavBar",

  props: {
    collapse: Boolean
  },

  setup(props) {
    const router = useRouter()
    const { baseURL, withBase } = useURL()
    const toggle = ref(true)
    const activeID = ref('introduction')

    const currentPath = computed(() => router.route.path)
    const isBaseURL = computed(() => currentPath.value === baseURL)
    const isResourceURL = computed(() => currentPath.value === withBase('docs/resource.html'))

    const rootClasses = computed(() => ({
      'page-header': true,
      'collapse': !!props.collapse && currentPath.value !== baseURL
    }))

    const genActiveClass = computed(() => (id: string) => {
      return {
        'router-link-active': activeID.value === id && !isBaseURL.value
      }
    })

    watch(currentPath, (path, prevPath) => {
      if (path !== prevPath) {
        if (isResourceURL.value) {
          activeID.value = 'resource'
        } else if (isBaseURL.value) {
          activeID.value = ''
        } else {
          activeID.value = 'introduction'
        }
      }
    })

    onMounted(() => {
      const id = window.location.href.replace('.html', '').split('docs/')[1]
      switch (id) {
        case 'resource':
          activeID.value = id
          return
        case undefined:
          activeID.value = ''
          return
        default:
          activeID.value = 'introduction'
      }
    })

    function handleRedirect(id: string, toHref: string) {
      activeID.value = id
      router.go(toHref)
    }

    function toggleMenu() {
      toggle.value = !toggle.value
    }

    return {
      baseURL,
      withBase,
      rootClasses,
      genActiveClass,
      taroUIvue3Logo,
      toggle,
      toggleMenu,
      handleRedirect
    }
  }
})
</script>
