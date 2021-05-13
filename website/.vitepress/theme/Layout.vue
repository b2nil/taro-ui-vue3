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
import { useHome } from './composables/url'

import Home from "./Home.vue"
import Docs from "./Docs.vue"

export default {
  name: "Layout",

  components: {
    Home,
    Docs
  },

  setup() {
    const { isHome } = useHome()

    return {
      isHome
    }
  }
}
</script>