<template>
  <div
    class="wrapper"
    :style="{ backgroundColor: '#F8FAFF' }"
  >
    <Home v-if="isHome" />
    <Docs v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useHome } from './composables/url'

import Home from "./Home.vue"
import Docs from "./Docs.vue"

export default defineComponent({
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
})
</script>