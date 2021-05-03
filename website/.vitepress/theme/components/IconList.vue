<template>
  <ul class="at-iconlist row">
    <li
      class="at-iconlist__item col-sm-6 col-md-4 col-lg-3 flex flex-middle flex-center"
      v-for="(icon, index) in iconlist"
      :key="`icon-list-${index}`"
    >
      <div>
        <i :class="iconClasses(icon)"></i>
        <p>{{icon}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import ICONS from './icons.js'

import "./IconList.scss"

export default {
  name: "IconList",

  props: {
    type: {
      type: String,
      default: 'main'
    }
  },

  setup(props) {
    const iconlist = computed(() => ICONS[props.type])

    const iconClasses = computed(() => (icon) => ({
      'at-icon': true,
      [`at-icon-${icon}`]: true
    }))

    return {
      iconlist,
      iconClasses
    }
  }
}
</script>

