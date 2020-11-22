<template>
  <div
    class="wrapper"
    :style="{ backgroundColor: '#F8FAFF' }"
  >
    <Home v-if="isHome" />
    <Docs v-else />
  </div>
</template>

<script>
import { computed } from "vue"
import { useRoute, useSiteData } from 'vitepress'

import Home from "./Home.vue"
import Docs from "./Docs.vue"
import Guide from "./Guide.vue"

export default {
  name: "Layout",

  components: {
    Home,
    Docs,
    Guide
  },

  setup() {
    const route = useRoute()
    const siteData = useSiteData()
    const isHome = computed(() => route.path === siteData.value.base)

    return {
      isHome
    }
  }
}
</script>