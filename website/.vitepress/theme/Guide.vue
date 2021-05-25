<template>
  <view
    class="app"
    id="app"
  >
    <nav-bar collapse />

    <div class="at-container row">
      <div class="at-sidebar col-sm-24 col-md-6 col-lg-4">
        <side-bar />
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

export default {
  name: "Guide",

  components: {
    NavBar,
    PageFooter,
    SideBar
  }
}
</script>
