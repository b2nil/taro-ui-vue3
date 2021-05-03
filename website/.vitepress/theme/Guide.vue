<template>
  <view
    class="app"
    id="app"
  >
    <nav-bar collapse />

    <div class="at-container row">
      <div class="at-sidebar col-sm-24 col-md-6 col-lg-4">
        <side-bar :data="data" />
      </div>

      <div
        class="col-sm-24 col-md-18 col-lg-20"
        :style="{ padding: 0 }"
      >
        <div class="at-markdown">
          <Content />
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import PageFooter from './components/PageFooter.vue'
import SideBar from './components/SideBar.vue'
import navsConfig from '../nav.config.json'

export default {
  name: "Guide",

  components: {
    NavBar,
    PageFooter,
    SideBar
  },

  setup() {
    const data = ref(navsConfig.guide)

    return {
      data
    }
  }
}
</script>
